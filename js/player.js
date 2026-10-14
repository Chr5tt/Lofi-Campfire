/* ---------- Player ---------- */
const Q=[];
let cur=-1,au=null,yf=null,started=false;
const pl=$('#pl'),seek=$('#seek'),tag={yt:'YT',sp:'SP',au:'MP3'};
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(e.h);e.h=setTimeout(()=>e.classList.remove('on'),3200)}
function setP(v){playing=v;$('#pp use').setAttribute('href',v?'#pause':'#play');$('#disc').classList.toggle('on',v);$('#st').textContent=v?'● live':'● jeda'}
function fmt(s){s=s|0;return(s/60|0)+':'+String(s%60).padStart(2,'0')}
function parse(u){u=u.trim();let m;
 if(m=u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/)([\w-]{11})/))return{k:'yt',id:m[1],t:'YouTube '+m[1]};
 if(m=u.match(/open\.spotify\.com\/(?:intl-\w+\/)?(track|album|playlist|episode|show|artist)\/(\w+)/))return{k:'sp',id:m[2],sp:m[1],t:'Spotify '+m[1]};
 if(/^https?:\/\//i.test(u))return{k:'au',u,t:decodeURIComponent(u.split('/').pop().split('?')[0])||'Audio'};
 return null}
function render(){$('#q').innerHTML=Q.length?'':'<p class="hint">Belum ada lagu. Tempel link YouTube, Spotify, atau .mp3 di atas untuk mulai.</p>';Q.forEach((q,i)=>{const b=document.createElement('button');b.className='it'+(i==cur?' on':'');b.innerHTML='<em>'+tag[q.k]+'</em><span></span>';b.lastChild.textContent=q.t;b.onclick=()=>load(i);$('#q').append(b)})}
function stop(){if(au){au.pause();au.src='';au=null}pl.innerHTML='';yf=null;seek.style.display='none'}
function setExt(q){const e=$('#ext');if(q.k=='au'){e.style.display='none';return}e.href=q.k=='yt'?'https://www.youtube.com/watch?v='+q.id:'https://open.spotify.com/'+q.sp+'/'+q.id;e.textContent=q.k=='yt'?'↗ Buka di YouTube (jika player error)':'↗ Buka di Spotify';e.style.display='flex'}
function load(i){if(i<0||i>=Q.length)return;stop();cur=i;const q=Q[i];started=true;$('#ttl').textContent=q.t;$('#sub').textContent={yt:'YouTube',sp:'Spotify',au:'Audio'}[q.k];render();pl.style.display='block';setExt(q);
 if(q.k=='yt'){pl.innerHTML='<iframe allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/'+q.id+'?autoplay=1&playsinline=1&enablejsapi=1&rel=0'+(location.origin.startsWith('http')?'&origin='+encodeURIComponent(location.origin):'')+'"></iframe>';yf=pl.firstChild;yf.onload=()=>yf.contentWindow.postMessage(JSON.stringify({event:'listening',id:1}),'*');setP(true)}
 else if(q.k=='sp'){pl.innerHTML='<iframe allow="autoplay; encrypted-media" height="'+(q.sp=='track'?152:352)+'" src="https://open.spotify.com/embed/'+q.sp+'/'+q.id+'?theme=0"></iframe>';setP(true);toast('Tekan play di player Spotify')}
 else{pl.style.display='none';seek.style.display='flex';au=new Audio();au.crossOrigin='anonymous';au.src=q.u;au.ontimeupdate=()=>{$('#tc').textContent=fmt(au.currentTime);$('#td').textContent=fmt(au.duration||0);$('#sk').value=au.duration?au.currentTime/au.duration*1000:0};au.onended=()=>nxt(1);au.onerror=()=>{toast('Link audio tidak bisa diputar. Pastikan link langsung ke file audio.');setP(false)};au.play().then(()=>setP(true)).catch(()=>setP(false))}
 if(q.k=='yt'&&/^YouTube /.test(q.t))fetch('https://www.youtube.com/oembed?format=json&url=https://youtu.be/'+q.id).then(r=>r.json()).then(j=>{q.t=j.title;if(Q[cur]===q)$('#ttl').textContent=q.t;render()}).catch(()=>{})}
function nxt(d){if(Q.length)load((cur+d+Q.length)%Q.length)}
function yc(f){yf&&yf.contentWindow.postMessage(JSON.stringify({event:'command',func:f,args:[]}),'*')}
addEventListener('message',e=>{if(!yf||e.source!==yf.contentWindow)return;try{const d=JSON.parse(e.data);const s=d.info&&d.info.playerState;if(d.event=='onStateChange'||d.event=='infoDelivery'){if(s===0)nxt(1);else if(s===1)setP(true);else if(s===2)setP(false)}}catch(_){}});
$('#sk').oninput=e=>{if(au&&au.duration)au.currentTime=e.target.value/1000*au.duration};
$('#pp').onclick=()=>{initA();if(!started){if(Q.length)load(0);else{panel.classList.remove('shut');toast('Tempel link lagu dulu');}return}if(au){au.paused?au.play():au.pause();au.onplay=()=>setP(true);au.onpause=()=>setP(false);setP(!au.paused)}else if(yf){playing?yc('pauseVideo'):yc('playVideo');setP(!playing)}else toast('Gunakan tombol play di player Spotify')};
$('#prev').onclick=()=>nxt(-1);$('#next').onclick=()=>nxt(1);
function addLink(){const v=$('#url').value;const p=parse(v);if(!p){toast('Tempel link YouTube, Spotify, atau file audio (.mp3)');return}initA();Q.push(p);$('#url').value='';load(Q.length-1)}
$('#add').onclick=addLink;$('#url').onkeydown=e=>{if(e.key=='Enter')addLink()};
$('#fb').onclick=()=>$('#file').click();
$('#file').onchange=e=>{const f=e.target.files[0];if(!f)return;initA();Q.push({k:'au',u:URL.createObjectURL(f),t:f.name.replace(/\.[^.]+$/,''),loc:f.name});load(Q.length-1)};
async function dl(){const q=Q[cur];if(!q)return toast('Belum ada lagu yang dipilih');
 if(q.k!='au')return toast('YouTube & Spotify tidak bisa diunduh dari sini. Pakai link audio langsung (.mp3) atau file dari perangkat.');
 const name=(q.loc||q.t||'lofi').replace(/[^\w.\- ]+/g,'_');const ext=/\.\w{2,4}$/.test(name)?'':'.mp3';
 const go=h=>{const a=document.createElement('a');a.href=h;a.download=name+ext;document.body.append(a);a.click();a.remove()};
 if(q.u.startsWith('blob:')){go(q.u);return toast('Mengunduh: '+q.t)}
 toast('Menyiapkan unduhan…');try{const r=await fetch(q.u);const b=await r.blob();const u=URL.createObjectURL(b);go(u);setTimeout(()=>URL.revokeObjectURL(u),9e3);toast('Terunduh: '+q.t)}catch(e){window.open(q.u,'_blank');toast('Dibuka di tab baru. Simpan dari sana.')}}
$('#dlb').onclick=dl;$('#dl2').onclick=dl;
$('#th').onclick=()=>{mode=(mode+1)%3;$('#th').textContent=['🌙','🌇','❄️'][mode];toast(['Malam berbintang','Senja hangat','Malam bersalju'][mode])};
$('#mn').onclick=()=>{const m=$('#mix').classList.toggle('min');$('#mn').textContent=m?'+':'–';$('#mn').title=m?'Buka mixer':'Minimize'};
const panel=$('#panel');$('#tg').onclick=()=>panel.classList.toggle('shut');$('#cl').onclick=()=>panel.classList.add('shut');
if(innerWidth<900)panel.classList.add('shut');
$('#go').onclick=()=>{$('#start').style.display='none';initA();if(Q.length)load(0);else{panel.classList.remove('shut');$('#url').focus()}};
render();
