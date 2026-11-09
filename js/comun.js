const b=document.querySelector('.menu-btn'),m=document.getElementById('menu');
b&&b.addEventListener('click',()=>b.setAttribute('aria-expanded',m.classList.toggle('abierto')));
const d=document.getElementById('secreto');
if(d){const i=d.querySelector('input'),f=d.querySelector('form');
document.getElementById('abrir-secreto').onclick=()=>{d.showModal();i.focus()};
d.querySelector('.cerrar').onclick=()=>d.close();
f.onsubmit=e=>{e.preventDefault();const v=i.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
if(v==='blade runner')location.href='secreta/runner.html';else d.querySelector('.msg').textContent='Inténtelo de nuevo.'}}
