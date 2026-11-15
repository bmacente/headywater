const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',event=>{if(event.target.closest('a')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
document.querySelector('#year').textContent=String(new Date().getFullYear());
document.querySelector('#share').addEventListener('click',async()=>{const status=document.querySelector('#share-status');try{if(navigator.share){await navigator.share({title:'Headywater — For the heads.',url:location.href.split('#')[0]});status.textContent='Good taste travels.';}else{await navigator.clipboard.writeText(location.href.split('#')[0]);status.textContent='Link copied. Pass it around.';}}catch(error){if(error.name!=='AbortError')status.textContent='Copy the address from your browser to share this preview.';}});
