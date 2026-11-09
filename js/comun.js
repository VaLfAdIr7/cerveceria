const b=document.querySelector('.menu-btn'),m=document.getElementById('menu');
b&&b.addEventListener('click',()=>b.setAttribute('aria-expanded',m.classList.toggle('abierto')));
function ajustar(){document.querySelectorAll('h1[data-una-linea]').forEach(h=>{
h.style.fontSize='';h.style.whiteSpace='nowrap';let s=parseFloat(getComputedStyle(h).fontSize);
while(h.scrollWidth>h.clientWidth&&s>20){s-=1;h.style.fontSize=s+'px'}
if(h.scrollWidth>h.clientWidth){h.style.fontSize='';h.style.whiteSpace=''}})}
addEventListener('resize',ajustar);(document.fonts?document.fonts.ready:Promise.resolve()).then(ajustar);ajustar();
const d=document.getElementById('secreto');
if(d){const i=d.querySelector('input'),f=d.querySelector('form');
document.getElementById('abrir-secreto').onclick=()=>{d.showModal();i.focus()};
d.querySelector('.cerrar').onclick=()=>d.close();
f.onsubmit=e=>{e.preventDefault();const v=i.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
if(v==='blade runner')location.href='secreta/runner.html';else d.querySelector('.msg').textContent='Inténtelo de nuevo.'}}
