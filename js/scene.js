/* Pemandangan canvas: langit, gunung, api unggun, karakter, kucing, burung hantu, tema */
const $=s=>document.querySelector(s);
const cv=$('#c'),x=cv.getContext('2d');
let W,H,S,gy,stars=[],trees=[],T0=performance.now();
const rnd=(a,b)=>a+Math.random()*(b-a);
let playing=false,mx=0,rain=0,wind=25;
function rs(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);const mb=W<700;S=mb?Math.min(W/540,H/900,1):Math.max(.55,Math.min(W/950,H/650,1.25));gy=H*(mb?.56:.8);
 stars=Array.from({length:230},()=>({x:Math.random(),y:Math.random()*.62,r:rnd(.4,1.7),p:rnd(0,6.3),s:rnd(.6,2)}));
 trees=Array.from({length:Math.ceil(W/55)},(_,i)=>({x:i*55+rnd(-18,18),h:rnd(80,170)*S,f:false,k:rnd(0,6)}));trees.forEach(r=>{r.f=Math.random()<.5&&(r.x<W*.14||r.x>W*.86)})}
addEventListener('resize',rs);rs();
addEventListener('pointermove',e=>mx=(e.clientX/W-.5)*2);
const ff=Array.from({length:28},()=>({x:Math.random(),y:rnd(.45,.85),p:rnd(0,6),v:rnd(.2,.6)}));
let fire=[],notes=[],drops=[],shoot=null;
function mtn(yb,amp,f,c,ph,px){x.fillStyle=c;x.beginPath();x.moveTo(0,H);for(let i=0;i<=W+8;i+=8){const u=(i+px)*f;x.lineTo(i,yb-amp*(Math.sin(u+ph)*.5+Math.sin(u*2.3+ph*2)*.3+Math.sin(u*5.1+ph)*.1+.6))}x.lineTo(W,H);x.fill()}
function pine(px,py,h,c,sw){x.fillStyle=c;const w=h*.36;for(let k=0;k<3;k++){const yy=py-h*(.3+k*.27),ww=w*(1-k*.27),o=sw*(k+1)*.5;x.beginPath();x.moveTo(px-ww,yy+h*.3);x.lineTo(px+o,yy-h*.3);x.lineTo(px+ww,yy+h*.3);x.fill()}x.fillRect(px-h*.025,py-h*.1,h*.05,h*.1)}
function aurora(t){x.save();x.globalCompositeOperation='lighter';[[.5,'80,255,190'],[.4,'150,120,255'],[.35,'80,200,255']].forEach((a,k)=>{const g=x.createLinearGradient(0,0,0,H*.45);g.addColorStop(0,'rgba('+a[1]+',0)');g.addColorStop(.7,'rgba('+a[1]+','+a[0]*.28+')');g.addColorStop(1,'rgba('+a[1]+',0)');x.fillStyle=g;x.beginPath();x.moveTo(0,0);for(let i=0;i<=W;i+=16)x.lineTo(i,H*(.14+k*.06)+Math.sin(i*.004+t*.3+k*2)*H*.05+Math.sin(i*.011-t*.2)*H*.02);x.lineTo(W,0);x.fill()});x.restore()}
let mode=0,sn=[];
const TH=[{s:['#050818','#1b1442','#5a2a52'],st:1,au:1,m:'#fdf3d8',m1:'#2b2058',m2:'#1a1445',m3:'#100c2e',t:'#0c0a24',g0:'#1a1230',g1:'#07050f'},
{s:['#2b1b5e','#c2417a','#ffb066'],st:.2,au:0,m:'#ffe2a8',m1:'#7a3478',m2:'#4a2366',m3:'#2b1347',t:'#1e0f3a',g0:'#2e1636',g1:'#120a1c'},
{s:['#0a1330','#27407a','#8aa6d8'],st:.9,au:1,m:'#fdf3d8',m1:'#6479ad',m2:'#41558f',m3:'#26356a',t:'#16224a',g0:'#d5def0',g1:'#8190b8'}];
function snow(t){while(sn.length<170)sn.push({x:rnd(0,W),y:rnd(-H,H),r:rnd(1,3),v:rnd(.6,1.8),p:rnd(0,6)});x.fillStyle='rgba(255,255,255,.85)';sn.forEach(f=>{f.y+=f.v;f.x+=Math.sin(t+f.p)*.5+wind*.01;if(f.y>H){f.y=-5;f.x=rnd(0,W)}x.beginPath();x.arc(f.x,f.y,f.r,0,7);x.fill()})}
function limb(a,b,c,w,col){x.strokeStyle=col;x.lineWidth=w;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(c[0],c[1]);x.stroke()}
function person(px,py,dir,o,t){x.save();x.translate(px,py);x.scale(dir*S,S);
 const P=playing,br=Math.sin(t*1.6)*1.1,b=P?Math.sin(t*3.2):Math.sin(t*1.1)*.3,bl=(t%4.3)<.14?.1:1,SK='#f2b690',sd=Math.sin(t*(P?9:3))*(P?1:.35),u=o.gtr?0:Math.pow(Math.max(0,Math.sin(t*.5)),6);
 x.fillStyle='#3a2314';x.beginPath();x.roundRect(-52,0,104,20,10);x.fill();x.fillStyle='#5a3820';x.beginPath();x.ellipse(52,10,6,10,0,0,7);x.fill();
 limb([-2,-14],[34,-26],[44,14],15,o.pants);x.fillStyle='#e8d4b8';x.beginPath();x.ellipse(51,15,12,6,0,0,7);x.fill();x.fillStyle='#7a6a58';x.fillRect(40,18,24,3);
 x.save();x.translate(0,br*.3);x.fillStyle=o.hood2;x.beginPath();x.arc(-9,-68,12,0,7);x.fill();
 x.fillStyle=o.col;x.beginPath();x.moveTo(-24,-4);x.bezierCurveTo(-30,-44,-18,-70,4,-72);x.bezierCurveTo(26,-70,28,-30,22,-8);x.closePath();x.fill();
 x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.moveTo(-24,-4);x.bezierCurveTo(-30,-44,-18,-70,-8,-71);x.bezierCurveTo(-13,-40,-13,-20,-8,-6);x.fill();
 x.strokeStyle='rgba(255,150,60,.6)';x.lineWidth=2.5;x.beginPath();x.moveTo(4,-72);x.bezierCurveTo(26,-70,28,-30,22,-8);x.stroke();x.restore();
 x.save();x.translate(4,-72+br*.3);x.rotate(b*.05-u*.14);x.fillStyle='#d9a07a';x.fillRect(-4,-6,9,8);
 if(o.long){x.fillStyle=o.hairc;x.beginPath();x.ellipse(-7,-12,13,20,.1,0,7);x.fill()}
 x.fillStyle=SK;x.beginPath();x.arc(2,-16,14.5,0,7);x.fill();x.fillStyle='#d9a07a';x.beginPath();x.ellipse(-4,-14,3,4,0,0,7);x.fill();
 x.fillStyle=o.hairc;x.beginPath();x.ellipse(-9,-9,6,7,0,0,7);x.fill();
 x.fillStyle=o.hat;x.beginPath();x.arc(1,-18,15.8,Math.PI,2*Math.PI);x.fill();x.fillStyle=o.hat2;x.fillRect(-14.8,-20,31.2,6);x.fillStyle='#fff';x.beginPath();x.arc(1,-34,5,0,7);x.fill();
 x.fillStyle='#2a1810';x.beginPath();x.ellipse(10,-13,1.9,2.4*bl,0,0,7);x.fill();x.strokeStyle='#2a1810';x.lineWidth=1.4;x.beginPath();x.moveTo(6,-19);x.lineTo(13,-19.8);x.stroke();
 x.fillStyle='#e49c78';x.beginPath();x.arc(17,-10,2.4,0,7);x.fill();x.fillStyle='rgba(255,90,110,.35)';x.beginPath();x.arc(8,-7,3.2,0,7);x.fill();
 if(P&&o.gtr){x.fillStyle='#7a2a2a';x.beginPath();x.ellipse(12,-4,2.5,1+Math.abs(Math.sin(t*7))*1.6,0,0,7);x.fill()}else{x.strokeStyle='#7a2a2a';x.lineWidth=1.4;x.beginPath();x.arc(11,-6,3.5,.3,2.4);x.stroke()}
 x.strokeStyle='rgba(255,150,60,.75)';x.lineWidth=2;x.beginPath();x.arc(2,-16,14.5,-.9,.9);x.stroke();x.restore();
 if(o.gtr){x.save();x.translate(24,-34);x.rotate(-.42);x.fillStyle='#b5651d';x.beginPath();x.ellipse(-4,0,17,14,0,0,7);x.ellipse(13,0,11,9,0,0,7);x.fill();
  x.strokeStyle='#7a3f10';x.lineWidth=2;x.beginPath();x.ellipse(-4,0,17,14,0,0,7);x.stroke();x.fillStyle='#2a1208';x.beginPath();x.arc(6,0,4.5,0,7);x.fill();x.fillRect(-12,-3,3,6);
  x.fillStyle='#4a2a12';x.fillRect(20,-2.8,50,5.6);x.fillStyle='#d9b88a';for(let i=0;i<5;i++)x.fillRect(28+i*8,-2.8,1,5.6);x.fillStyle='#2a1208';x.beginPath();x.roundRect(68,-4.5,13,9,2);x.fill();
  x.strokeStyle='rgba(255,255,255,.45)';x.lineWidth=.7;x.beginPath();x.moveTo(-10,0);x.lineTo(70,0);x.stroke();x.restore();
  limb([6,-64],[34,-46],[55,-49],9,o.col2);x.fillStyle=SK;x.beginPath();x.arc(57,-49,4.6,0,7);x.fill();
  limb([2,-62],[2,-38],[24+sd*2,-30+sd*4],9,o.col);x.fillStyle=SK;x.beginPath();x.arc(26+sd*2,-29+sd*4,4.6,0,7);x.fill()}
 else{const hx=30-12*u,hy=-44-30*u;limb([6,-64],[12,-42],[hx-3,hy+2],9,o.col2);x.fillStyle='#e8d4b8';x.beginPath();x.roundRect(hx-3,hy-8,13,15,3);x.fill();x.strokeStyle='#e8d4b8';x.lineWidth=2;x.beginPath();x.arc(hx+10,hy-1,4,-1.5,1.5);x.stroke();
  limb([2,-62],[8,-40],[hx+2,hy+4],9,o.col);x.fillStyle=SK;x.beginPath();x.arc(hx+4,hy+3,4.4,0,7);x.fill();
  if(u<.4){x.fillStyle='rgba(255,255,255,.3)';for(let i=0;i<3;i++){x.beginPath();x.arc(hx+4+Math.sin(t*2+i*2)*3,hy-14-i*9-(t*6%6),2.8-i*.5,0,7);x.fill()}}}
 x.restore()}
function cat(cx,cy,t){x.save();x.translate(cx,cy);x.scale(S,S);const br=Math.sin(t*1.8)*1.2,w=Math.sin(t*1.5);
 x.strokeStyle='#c9772e';x.lineWidth=7;x.lineCap='round';x.beginPath();x.moveTo(20,-4);x.quadraticCurveTo(40,2+w*6,32,-16+w*10);x.stroke();
 x.fillStyle='#d98a3d';x.beginPath();x.ellipse(0,-9,24,12+br*.4,0,0,7);x.fill();x.beginPath();x.arc(-22,-8,10,0,7);x.fill();
 x.beginPath();x.moveTo(-30,-12);x.lineTo(-27,-23);x.lineTo(-21,-15);x.moveTo(-19,-15);x.lineTo(-14,-23);x.lineTo(-13,-11);x.fill();
 x.strokeStyle='rgba(120,60,10,.5)';x.lineWidth=2;[-8,0,8].forEach(i=>{x.beginPath();x.moveTo(i,-20);x.lineTo(i+2,-12);x.stroke()});
 x.strokeStyle='#3a1c08';x.lineWidth=1.4;x.beginPath();x.arc(-25,-8,2.2,.1,3);x.stroke();x.beginPath();x.arc(-18,-8,2.2,.1,3);x.stroke();x.fillStyle='#ff9aa8';x.beginPath();x.arc(-31,-5,1.5,0,7);x.fill();
 x.strokeStyle='rgba(255,170,70,.7)';x.lineWidth=2;x.beginPath();x.ellipse(0,-9,24,12,0,Math.PI*.6,Math.PI*1.3);x.stroke();
 x.fillStyle='rgba(255,255,255,'+(.4+.4*Math.sin(t*2))+')';x.font='bold 12px serif';x.fillText('z',-38,-26-(t*8%10));x.fillText('Z',-44,-36-((t*8+5)%10));x.restore()}
function owl(t){const by=H*.4,k=S;x.strokeStyle='#05030c';x.lineWidth=7*k;x.lineCap='round';x.beginPath();x.moveTo(-10,by+30*k);x.lineTo(150*k,by-2*k);x.stroke();x.lineWidth=3*k;x.beginPath();x.moveTo(60*k,by+14*k);x.lineTo(100*k,by+40*k);x.moveTo(110*k,by+4*k);x.lineTo(140*k,by-34*k);x.stroke();
 x.save();x.translate(118*k,by-2*k);x.scale(k,k);x.fillStyle='#6b4a2e';x.beginPath();x.ellipse(0,-20,16,22,0,0,7);x.fill();x.fillStyle='#c9a77c';x.beginPath();x.ellipse(0,-14,10,15,0,0,7);x.fill();
 x.save();x.translate(0,-40);x.rotate(mx*.12+Math.sin(t*.5)*.05);x.fillStyle='#6b4a2e';x.beginPath();x.ellipse(0,0,17,14,0,0,7);x.moveTo(-15,-8);x.lineTo(-12,-20);x.lineTo(-5,-12);x.moveTo(15,-8);x.lineTo(12,-20);x.lineTo(5,-12);x.fill();
 const bl=(t%5)<.15?.15:1;[-7,7].forEach(e=>{x.fillStyle='#ffd66b';x.beginPath();x.ellipse(e,0,6.5,6.5*bl,0,0,7);x.fill();x.fillStyle='#1a0e04';x.beginPath();x.ellipse(e+mx*2,0,3,3*bl,0,0,7);x.fill()});
 x.fillStyle='#e0a030';x.beginPath();x.moveTo(-2.5,3);x.lineTo(2.5,3);x.lineTo(0,9);x.fill();x.restore();x.restore()}
function frame(now){const t=(now-T0)/1000,fx=W*.5,fy=gy+18*S;
 const th=TH[mode];let g=x.createLinearGradient(0,0,0,gy);g.addColorStop(0,th.s[0]);g.addColorStop(.55,th.s[1]);g.addColorStop(1,th.s[2]);x.fillStyle=g;x.fillRect(0,0,W,H);
 stars.forEach(s=>{x.globalAlpha=(.3+.7*Math.abs(Math.sin(t*s.s+s.p)))*th.st;x.fillStyle='#fff';x.beginPath();x.arc(s.x*W+mx*-3,s.y*H,s.r,0,7);x.fill()});x.globalAlpha=1;
 if(th.au)aurora(t);
 if(!shoot&&Math.random()<.004)shoot={x:rnd(.2,.9)*W,y:rnd(0,.25)*H,l:1};
 if(shoot){x.strokeStyle='rgba(255,255,255,'+shoot.l+')';x.lineWidth=2;x.beginPath();x.moveTo(shoot.x,shoot.y);x.lineTo(shoot.x+70,shoot.y-35);x.stroke();shoot.x-=14;shoot.y+=7;shoot.l-=.03;if(shoot.l<=0)shoot=null}
 const mxp=W*.78+mx*-6,myp=mode==1?gy-150*S:H*.17;g=x.createRadialGradient(mxp,myp,10,mxp,myp,170*S);g.addColorStop(0,'rgba(255,240,210,.5)');g.addColorStop(1,'rgba(255,240,210,0)');x.fillStyle=g;x.fillRect(mxp-200,myp-200,400,400);
 x.fillStyle=th.m;x.beginPath();x.arc(mxp,myp,(mode==1?52:36)*S,0,7);x.fill();x.fillStyle='rgba(200,170,130,'+(mode==1?0:.35)+')';[[-10,-8,8],[12,6,6],[-4,14,5]].forEach(c=>{x.beginPath();x.arc(mxp+c[0]*S,myp+c[1]*S,c[2]*S,0,7);x.fill()});
 mtn(gy-90*S,170*S,.0035,th.m1,1,mx*-10);mtn(gy-45*S,130*S,.005,th.m2,4,mx*-20);mtn(gy-10*S,90*S,.008,th.m3,7,mx*-34);
 const sw=Math.sin(t*.9)*wind*.05;
 trees.forEach(r=>{if(!r.f)pine(r.x+mx*-14,gy-6*S,r.h*.75,th.t,sw*Math.sin(t+r.k)*2.5)});
 g=x.createLinearGradient(0,gy-6,0,H);g.addColorStop(0,th.g0);g.addColorStop(1,th.g1);x.fillStyle=g;x.fillRect(0,gy-6*S,W,H);
 if(W>700){const tx=fx-330*S,ty=gy+14*S;x.fillStyle='#2a2150';x.beginPath();x.moveTo(tx-70*S,ty);x.lineTo(tx,ty-85*S);x.lineTo(tx+70*S,ty);x.fill();x.fillStyle='rgba(255,170,70,'+(.6+.15*Math.sin(t*7))+')';x.beginPath();x.moveTo(tx-16*S,ty);x.lineTo(tx,ty-48*S);x.lineTo(tx+16*S,ty);x.fill()}
 g=x.createRadialGradient(fx,fy,5,fx,fy,380*S);const fl=.5+.08*Math.sin(t*13)+.05*Math.sin(t*5);g.addColorStop(0,'rgba(255,130,40,'+fl+')');g.addColorStop(.4,'rgba(255,90,40,'+fl*.3+')');g.addColorStop(1,'rgba(255,90,40,0)');x.fillStyle=g;x.fillRect(0,gy-250*S,W,H);
 person(fx-175*S,fy-14*S,1,{gtr:1,col:'#4f6bd8',col2:'#3d54aa',hood2:'#3a4fa0',pants:'#262c52',hat:'#ff5e8a',hat2:'#e64773',hairc:'#3a2314'},t);person(fx+175*S,fy-14*S,-1,{col:'#16a6a0',col2:'#0f827d',hood2:'#0d746f',pants:'#2a2540',hat:'#ffd166',hat2:'#f0b030',hairc:'#5a3018',long:1},t+1);cat(fx+105*S,fy+24*S,t);
 x.fillStyle='#8d8aa8';for(let i=0;i<9;i++){const a=i/9*6.28;x.beginPath();x.ellipse(fx+Math.cos(a)*38*S,fy+Math.sin(a)*8*S+4,9*S,6*S,0,0,7);x.fill()}
 x.save();x.translate(fx,fy-2);[[.35,'#4a2e1b'],[-.35,'#3d2314']].forEach(l=>{x.save();x.rotate(l[0]);x.fillStyle=l[1];x.beginPath();x.roundRect(-34*S,-6*S,68*S,12*S,6*S);x.fill();x.restore()});x.restore();
 for(let i=0;i<5;i++)fire.push({x:fx+rnd(-14,14)*S,y:fy-6*S,vx:rnd(-.4,.4)+Math.sin(t)*.2*wind/30,vy:-rnd(1.4,3.2)*S,l:1,r:rnd(9,17)*S,k:0});
 if(Math.random()<.35)fire.push({x:fx+rnd(-20,20)*S,y:fy-20*S,vx:rnd(-.8,.8),vy:-rnd(1.5,3.5)*S,l:1,r:1.8*S,k:1});
 if(Math.random()<.2)fire.push({x:fx+rnd(-8,8),y:fy-60*S,vx:rnd(-.3,.5)+wind/80,vy:-rnd(.5,1)*S,l:.8,r:rnd(14,24)*S,k:2});
 x.save();fire=fire.filter(p=>p.l>0);fire.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.l-=p.k==2?.007:p.k?.012:.03;
  if(p.k==2){x.globalCompositeOperation='source-over';x.fillStyle='rgba(150,140,170,'+p.l*.06+')';x.beginPath();x.arc(p.x,p.y,p.r*(2-p.l),0,7);x.fill();return}
  x.globalCompositeOperation='lighter';if(p.k){x.fillStyle='rgba(255,'+(150+p.l*80|0)+',60,'+p.l+')';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();return}
  const r=p.r*(.3+p.l),gg=x.createRadialGradient(p.x,p.y,0,p.x,p.y,r);gg.addColorStop(0,p.l>.6?'rgba(255,240,170,.9)':'rgba(255,150,40,.8)');gg.addColorStop(1,'rgba(255,60,20,0)');x.fillStyle=gg;x.beginPath();x.arc(p.x,p.y,r,0,7);x.fill()});x.restore();
 trees.forEach(r=>{if(r.f)pine(r.x,H+20,r.h*2.2,'#05030c',sw*Math.sin(t+r.k)*5)});owl(t);
 ff.forEach(f=>{f.p+=.01;f.x+=Math.sin(f.p*3)*.0004*f.v;f.y+=Math.cos(f.p*2)*.0003;const a=.4+.6*Math.abs(Math.sin(f.p*4));const gg=x.createRadialGradient(f.x*W,f.y*H,0,f.x*W,f.y*H,9);gg.addColorStop(0,'rgba(255,245,150,'+a+')');gg.addColorStop(1,'rgba(255,245,150,0)');x.fillStyle=gg;x.fillRect(f.x*W-9,f.y*H-9,18,18)});
 if(playing&&Math.random()<.04)notes.push({x:fx-175*S+30*S,y:fy-110*S,l:1,d:rnd(-.5,.5),c:Math.random()<.5?'♪':'♫'});
 notes=notes.filter(n=>n.l>0);notes.forEach(n=>{n.y-=.9;n.x+=Math.sin(n.y*.05)*.6+n.d*.3;n.l-=.008;x.globalAlpha=n.l;x.fillStyle='#ffb3c8';x.font=(22*S)+'px serif';x.fillText(n.c,n.x,n.y)});x.globalAlpha=1;
 if(mode==2)snow(t);
 if(rain>0){const want=rain*4;while(drops.length<want)drops.push({x:rnd(0,W+200),y:rnd(-H,0),v:rnd(14,22)});drops.length=Math.min(drops.length,want|0);x.strokeStyle='rgba(170,200,255,.35)';x.lineWidth=1;x.beginPath();drops.forEach(d=>{x.moveTo(d.x,d.y);x.lineTo(d.x-4,d.y+14);d.y+=d.v;d.x-=2;if(d.y>H){d.y=-20;d.x=rnd(0,W+200)}});x.stroke()}
 x.fillStyle='rgba(255,120,40,'+(.05+.02*Math.sin(t*11))+')';x.fillRect(0,0,W,H);
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
