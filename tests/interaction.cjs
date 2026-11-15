const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
class Element{constructor(){this.dataset={};this.attrs={};this.events={};this.values={};this.classList={toggle(){},remove(){},contains(){return false}};this.style={setProperty:(k,v)=>this.values[k]=v};this.value='0'}addEventListener(k,f){this.events[k]=f}setAttribute(k,v){this.attrs[k]=v}getAttribute(k){return this.attrs[k]}removeAttribute(k){delete this.attrs[k]}getBoundingClientRect(){return {top:0,height:2400}}}
const elements=new Map();const get=s=>elements.get(s)||(elements.set(s,new Element()),elements.get(s));
const chapters=[new Element(),new Element(),new Element()];const body=new Element();body.dataset={};
const context={document:{querySelector:get,querySelectorAll:s=>s==='.story-chapter'?chapters:[],body,addEventListener(){}},matchMedia:()=>({matches:true,addEventListener(){}}),localStorage:{getItem(){return null},setItem(){}},window:{},navigator:{},location:{href:'https://headywater.vercel.app/'},addEventListener(){},requestAnimationFrame:f=>f(),innerHeight:800,Date,console};
vm.runInNewContext(fs.readFileSync('site.js','utf8'),context);
const slider=get('#temperature'),product=get('.cold-product');
assert.equal(body.dataset.motion,'off');assert.equal(slider.disabled,false);assert.equal(product.values['--cold'],'0');assert.match(slider.attrs['aria-valuetext'],/hidden/);
slider.value='60';slider.events.input();assert.ok(Number(product.values['--cold'])>.5);assert.match(slider.attrs['aria-valuetext'],/Cooling/);
slider.value='100';slider.events.input();assert.equal(product.values['--cold'],'1');assert.match(get('#cold-status').textContent,/revealed/);
slider.value='0';slider.events.input();assert.equal(product.values['--cold'],'0');
get('#motion-toggle').events.click();assert.equal(body.dataset.motion,'on');get('#motion-toggle').events.click();assert.equal(body.dataset.motion,'off');
const html=fs.readFileSync('dist/index.html','utf8');const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(m[1]),'Missing anchor '+m[1]);assert.equal((html.match(/class="can"/g)||[]).length,3);assert.ok(fs.existsSync('dist/assets/italy.svg'));
console.log('Passed cold reveal endpoints and intermediate state, reduced-motion default, motion toggle, section links, and built assets.');
