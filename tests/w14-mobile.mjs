import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const {chromium}=await import(process.env.W14_PLAYWRIGHT_MODULE);
const browser=await chromium.launch();
const results=[];
await fs.mkdir('w14-receipts',{recursive:true});
const base=process.env.W14_BASE_URL||'http://127.0.0.1:4173';
try{
 for(const width of [320,390,768,1363]){
  const context=await browser.newContext({viewport:{width,height:936},hasTouch:width<768,isMobile:width<768,deviceScaleFactor:1});
  const page=await context.newPage();
  for(const route of ['/','/recipes','/recipes/1']){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   assert.equal(response?.status(),200);
   assert.equal(await page.locator('main').count(),1);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('img:not([alt])').count(),0);
   const d=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(d.scroll<=d.width+1,JSON.stringify({route,width,...d}));
   results.push({width,route,status:'PASS',case:'render, landmarks, image alt attributes, no horizontal overflow',...d});
   await page.screenshot({path:'w14-receipts/'+width+'-'+(route==='/'?'home':route==='/recipes'?'catalog':'recipe')+'.png'});
  }
  await page.goto(base+'/',{waitUntil:'networkidle'});
  const cta=page.getByRole('link',{name:'Browse all 120 recipes',exact:false});
  assert.equal(await cta.count(),1);
  for(let i=0;i<35&&!await cta.evaluate(e=>e===document.activeElement);i++)await page.keyboard.press('Tab');
  assert.ok(await cta.evaluate(e=>e===document.activeElement),'CTA must be Tab reachable');
  assert.ok(await cta.evaluate(e=>e.matches(':focus-visible')));
  const box=await cta.boundingBox();assert.ok(box&&box.height>=44&&box.width>=44);
  await page.keyboard.press('Enter');await page.waitForURL('**/recipes');
  await page.locator('a[href="/recipes/1"]').first().press('Enter');await page.waitForURL('**/recipes/1');
  assert.match(await page.locator('h1').innerText(),/Tunisian Brik/i);
  results.push({width,status:'PASS',case:'keyboard CTA -> catalog -> Tunisian Brik',ctaBox:box});
  await context.close();
 }
}catch(e){results.push({status:'FAIL',error:String(e)});throw e}
finally{await fs.writeFile('w14-receipts/results.json',JSON.stringify({observedAt:new Date().toISOString(),source:process.env.GITHUB_SHA,base,results,limits:'Bounded built-candidate Chromium viewport/keyboard checks; not full accessibility compliance or field performance.'},null,2));await browser.close()}
