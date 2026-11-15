const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
document.querySelector('#year').textContent=String(new Date().getFullYear());
document.querySelector('#share').addEventListener('click',async()=>{const status=document.querySelector('#share-status');try{if(navigator.share){await navigator.share({title:'Headywater — For the heads.',url:location.href.split('#')[0]});status.textContent='Good taste travels.';}else{await navigator.clipboard.writeText(location.href.split('#')[0]);status.textContent='Link copied. Pass it around.';}}catch(error){if(error.name!=='AbortError')status.textContent='Copy the address from your browser to share this preview.';}});
const story=document.querySelector('.scroll-story');
const chapters=[...document.querySelectorAll('.story-chapter')];
const motionButton=document.querySelector('#motion-toggle');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled=!motionPreference.matches;
try{const saved=localStorage.getItem('headywater-motion');if(saved!==null)motionEnabled=saved==='on'&&!motionPreference.matches;}catch{}
let pendingFrame=false;
function updateStory(){pendingFrame=false;if(!motionEnabled)return;const rect=story.getBoundingClientRect();const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight)));story.style.setProperty('--story-progress',progress.toFixed(4));const step=Math.min(2,Math.floor(progress*3));story.dataset.step=String(step);chapters.forEach((chapter,index)=>{chapter.classList.toggle('active',index===step);chapter.setAttribute('aria-hidden',String(index!==step));});document.querySelector('.story-count').textContent=String(step+1).padStart(2,'0')+' / 03';}
const reveals=[];
const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.12}):null;
function applyMotion(){document.body.dataset.motion=motionEnabled?'on':'off';document.body.classList.toggle('js-motion',motionEnabled&&Boolean(observer));motionButton.textContent=motionEnabled?'Motion on':'Motion off';motionButton.setAttribute('aria-pressed',String(!motionEnabled));if(motionEnabled){reveals.forEach(el=>observer?.observe(el));updateStory();}else chapters.forEach(chapter=>chapter.removeAttribute('aria-hidden'));}
motionButton.addEventListener('click',()=>{motionEnabled=!motionEnabled;try{localStorage.setItem('headywater-motion',motionEnabled?'on':'off');}catch{}applyMotion();});
motionPreference.addEventListener('change',event=>{if(event.matches){motionEnabled=false;applyMotion();}});
addEventListener('scroll',()=>{if(motionEnabled&&!pendingFrame){pendingFrame=true;requestAnimationFrame(updateStory);}},{passive:true});
addEventListener('resize',()=>{if(motionEnabled&&!pendingFrame){pendingFrame=true;requestAnimationFrame(updateStory);}});
applyMotion();

// Manual temperature preview stays independent of scroll and works with motion off.
const temperature=document.querySelector('#temperature');
const coldProduct=document.querySelector('.cold-product');
const coldStatus=document.querySelector('#cold-status');
let lastColdStage='';
function updateTemperature(){
 const chill=Number(temperature.value)/100;
 const reveal=Math.max(0,Math.min(1,(chill-.25)/.6));
 coldProduct.style.setProperty('--cold',String(reveal));
 const stage=chill<.3?'Room temperature. Italy map hidden.':chill<.85?'Cooling down. Italy is coming into view.':'Ice cold. Italy revealed.';
 temperature.setAttribute('aria-valuetext',stage);
 if(stage!==lastColdStage){coldStatus.textContent=stage;lastColdStage=stage;}
}
temperature.disabled=false;
temperature.addEventListener('input',updateTemperature);
updateTemperature();
