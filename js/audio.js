/* ---------- Ambient audio ---------- */
let ac,G={};const sl=[0,1,2].map(i=>$('#s'+i)),SC=[.25,.8,.5];
function mk(n,type,fq,burst,v){const b=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){const w=Math.random()*2-1;if(burst){l=(l+.02*w)/1.02;d[i]=l;if(Math.random()<.0008)d[i]+=(Math.random()*2-1)*5}else d[i]=w}
 const s=ac.createBufferSource();s.buffer=b;s.loop=true;const f=ac.createBiquadFilter();f.type=type;f.frequency.value=fq;const g=ac.createGain();g.gain.value=v;s.connect(f);f.connect(g);g.connect(ac.destination);s.start();G[n]=g}
function initA(){if(ac){ac.resume();return}try{ac=new(window.AudioContext||window.webkitAudioContext)();mk(0,'highpass',1400,0,0);mk(1,'bandpass',800,1,.45*SC[1]);mk(2,'lowpass',350,0,.25*SC[2]);sl.forEach((s,i)=>s.dispatchEvent(new Event('input')))}catch(e){}}
sl.forEach((s,i)=>s.addEventListener('input',()=>{const v=+s.value;$('#v'+i).textContent=v+'%';if(i==0)rain=v;if(i==2)wind=v;initA();if(G[i])G[i].gain.setTargetAtTime(v/100*SC[i],ac.currentTime,.05)}));
rain=+sl[0].value;wind=+sl[2].value;
