(()=>{
const D=window.CERVEZAS,$=s=>document.querySelector(s);
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
D.forEach(d=>d.k=norm(d.n+' '+d.p));
const q=$('#q'),rej=$('#rejilla'),cnt=$('#cuenta'),nav=$('#letras'),chips=$('#paises'),dlg=$('#visor'),vimg=$('#vimg'),vcap=$('#vcap');
let pais='',lista=[],cur=0;
const tot={};D.forEach(d=>tot[d.p]=(tot[d.p]||0)+1);
const ord=Object.keys(tot).sort((a,b)=>(a.startsWith('Otras')-b.startsWith('Otras'))||tot[b]-tot[a]);
chips.innerHTML=[['','Todas',D.length],...ord.map(p=>[p,p,tot[p]])].map(([v,t,n])=>`<button type="button" data-v="${esc(v)}">${esc(t)} (${n})</button>`).join('');
chips.onclick=e=>{const b=e.target.closest('button');if(b){pais=b.dataset.v;render()}};
const casi=(a,b)=>{if(Math.abs(a.length-b.length)>1)return false;let i=0,j=0,e=0;
while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++}else{if(++e>1)return false;if(a.length>b.length)i++;else if(a.length<b.length)j++;else{i++;j++}}}
return e+(a.length-i)+(b.length-j)<=1};
function buscar(){
const t=norm(q.value).split(' ').filter(Boolean),base=D.filter(d=>!pais||d.p===pais);
let r=base.filter(d=>t.every(x=>d.k.includes(x)));
if(!r.length&&t.length){r=base.filter(d=>t.every(x=>d.k.includes(x)||(x.length>3&&d.k.split(' ').some(w=>casi(x,w)))));return[r,r.length>0]}
return[r,false]}
function render(){
const[r,aprox]=buscar();lista=r;let h='',L='',ls=[];
r.forEach((d,i)=>{const c=norm(d.n)[0],l=/[a-z]/.test(c)?c.toUpperCase():'#';
if(l!==L){L=l;ls.push(l);h+=`<h2 class="letra" id="l-${l==='#'?'num':l}">${l}</h2>`}
h+=`<button type="button" class="tarjeta" data-i="${i}"><img src="img/etiquetas/m/${d.f}.webp" alt="" width="${d.w}" height="${d.h}" loading="lazy" decoding="async"><span>${esc(d.n)}</span></button>`});
rej.innerHTML=r.length?h:'<p class="vacio">No hay etiquetas con esa búsqueda. <button type="button" class="cerrar" id="limpiar">Quitar filtros</button></p>';
nav.innerHTML=ls.map(l=>`<a href="#l-${l==='#'?'num':l}">${l}</a>`).join('');
cnt.textContent=r.length?`${r.length} de ${D.length} etiquetas${aprox?' · resultados aproximados':''}`:'';
chips.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===pais));
try{history.replaceState(null,'',q.value.trim()?'#q='+encodeURIComponent(q.value.trim()):location.pathname+location.search)}catch(e){}}
function ver(i){cur=(i+lista.length)%lista.length;const d=lista[cur];vimg.src=`img/etiquetas/g/${d.f}.webp`;vimg.alt=d.n;vcap.textContent=`${d.n} · ${d.p}`}
rej.onclick=e=>{if(e.target.id==='limpiar'){q.value='';pais='';render();return}
const b=e.target.closest('.tarjeta');if(b){ver(+b.dataset.i);dlg.showModal()}};
$('#ant').onclick=()=>ver(cur-1);$('#sig').onclick=()=>ver(cur+1);$('#cerrar').onclick=()=>dlg.close();
dlg.onclick=e=>{if(e.target===dlg)dlg.close()};
dlg.onkeydown=e=>{if(e.key==='ArrowLeft')ver(cur-1);if(e.key==='ArrowRight')ver(cur+1)};
let x0=0;dlg.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
dlg.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)ver(cur+(dx<0?1:-1))});
document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==q&&!dlg.open){e.preventDefault();q.focus()}});
q.oninput=render;
if(location.hash.startsWith('#q='))q.value=decodeURIComponent(location.hash.slice(3));
render()})();
