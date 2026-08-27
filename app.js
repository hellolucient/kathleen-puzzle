var S={name:"Friend",gender:"",avatar:"",world:null,page:0,screen:"hello",talk:0};
function extra(){
var a=[["cats","girl","Cats","Pip","cats",5],["toys","girl","Toy Factory","The Last Bow","toys",5],["dinos","boy","Dinosaurs","The Warm Egg","dinos",5],["dogs","boy","Dogs","The Red Ball","dogs",5],["sand","boy","Sandpit","The Little Truck","sand",5]];
var P=window.PAGES||{},I=window.ITEMS||{};
for(var i=0;i<a.length;i++){var x=a[i],pages=P[x[0]];if(!pages){pages=[];for(var n=1;n<=x[5];n++)pages.push("Page "+n+".");}
var items=I[x[0]]||[{id:"a",label:"one"},{id:"b",label:"two"},{id:"c",label:"three"},{id:"d",label:"four"},{id:"e",label:"five"}];
W(x[0],x[1],x[2],x[3],x[4],pages,items);}}
if(window.SUITE&&SUITE.worlds)extra();
function el(h){var d=document.createElement("div");d.innerHTML=h;return d.firstChild;}
function app(){return document.getElementById("app");}
function go(n){S.screen=n;draw();}
function worlds(){return (SUITE.worlds||[]).filter(function(w){return w.gender===S.gender;});}
function pic(w,n){return "assets/"+w.folder+"/p"+n+".jpg";}
function col(w,n){return "assets/color/"+w.folder+"/c"+n+".png";}
function av(){return S.avatar||("assets/avatars/"+(S.gender==="boy"?"boy":"girl")+".png");}
function you(t){return String(t).replace(/\bYou\b/g,S.name).replace(/\byou\b/g,S.name);}
function btn(t,fn,cls){var b=document.createElement("button");b.textContent=t;if(cls)b.className=cls;b.onclick=fn;return b;}
function back(fn){return btn("Back",fn,"back");}
function draw(){var a=app();a.innerHTML="";var m={hello:viewHello,sex:viewSex,grownup:viewGrown,photo:viewPhoto,worlds:viewWorlds,hub:viewHub,book:viewBook,jigsaw:viewJig,find:viewFind,color:viewColor};(m[S.screen]||viewHello)(a);}
function viewHello(a){a.appendChild(el("<h1>My Story Games</h1>"));a.appendChild(el("<p>What is your name?</p>"));var i=el("<input id=nm placeholder=Friend>");a.appendChild(i);a.appendChild(btn("Next",function(){S.name=document.getElementById("nm").value||"Friend";go("sex");}));}
function viewSex(a){a.appendChild(el("<h1>Hi "+S.name+"</h1>"));a.appendChild(el("<p>Are you a boy or a girl?</p>"));var r=el("<div class=row>");r.appendChild(btn("Girl",function(){S.gender="girl";go("grownup");},"card"));r.appendChild(btn("Boy",function(){S.gender="boy";go("grownup");},"card"));a.appendChild(r);}
function cartoon(img){var c=document.createElement("canvas");c.width=256;c.height=256;var g=c.getContext("2d");g.drawImage(img,0,0,256,256);var d=g.getImageData(0,0,256,256),p=d.data;for(var i=0;i<p.length;i+=4){p[i]=Math.round(p[i]/48)*48;p[i+1]=Math.round(p[i+1]/48)*48;p[i+2]=Math.round(p[i+2]/48)*48;}g.putImageData(d,0,0);return c.toDataURL("image/jpeg",0.7);}
function viewGrown(a){a.appendChild(el("<h1>A grown-up has to tap this</h1>"));a.appendChild(el("<p>What is two plus two?</p>"));var r=el("<div class=row>");r.appendChild(btn("3",function(){}));r.appendChild(btn("4",function(){go("photo");},"card"));r.appendChild(btn("5",function(){}));a.appendChild(r);}
function viewPhoto(a){a.appendChild(el("<h1>Your picture</h1>"));a.appendChild(el("<p>Add a photo. We will make a cartoon.</p>"));var i=el("<input type=file accept=image/* capture=user>");a.appendChild(i);var prev=el("<img class=pic>");prev.style.display="none";a.appendChild(prev);i.onchange=function(){var f=i.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){S.avatar=cartoon(im);prev.src=S.avatar;prev.style.display="block";};im.src=r.result;};r.readAsDataURL(f);};a.appendChild(btn("Use this",function(){go("worlds");}));a.appendChild(btn("Skip",function(){S.avatar="";go("worlds");}));}
function viewWorlds(a){a.appendChild(el("<h1>Pick a world</h1>"));var avt=el("<img class=pic>");avt.src=av();avt.style.maxHeight="96px";avt.style.width="96px";avt.style.borderRadius="50%";a.appendChild(avt);var r=el("<div class=row>");worlds().forEach(function(w){var c=btn(w.name,function(){S.world=w;S.page=0;go("hub");},"card");r.appendChild(c);});a.appendChild(r);}
function viewHub(a){a.appendChild(back(function(){go("worlds");}));a.appendChild(el("<h1>"+S.world.name+"</h1>"));a.appendChild(el("<p>"+S.world.story+"</p>"));var r=el("<div class=row>");r.appendChild(btn("Read the book",function(){S.page=0;go("book");},"card"));r.appendChild(btn("Jigsaw",function(){S.page=0;go("jigsaw");},"card"));r.appendChild(btn("Find it",function(){S.page=0;go("find");},"card"));r.appendChild(btn("Color in",function(){S.page=0;go("color");},"card"));a.appendChild(r);}
function speak(t){try{speechSynthesis.cancel();if(S.talk){S.talk=0;return;}var u=new SpeechSynthesisUtterance(t);u.rate=0.9;S.talk=1;u.onend=function(){S.talk=0;};speechSynthesis.speak(u);}catch(e){S.talk=0;}}
function viewBook(a){var w=S.world,n=S.page,p=w.pages[n],tx=you(p.text);a.appendChild(back(function(){speechSynthesis.cancel();S.talk=0;go("hub");}));var im=el("<img class=pic>");im.src=pic(w,n+1);a.appendChild(im);a.appendChild(el("<p>"+tx+"</p>"));var r=el("<div class=row>");r.appendChild(btn(S.talk?"Stop":"Read to me",function(){speak(tx);draw();}));if(n>0)r.appendChild(btn("Back a page",function(){S.page--;draw();}));if(n<w.pages.length-1)r.appendChild(btn("Next",function(){S.page++;draw();}));else r.appendChild(btn("Done",function(){go("hub");}));a.appendChild(r);}
function viewFind(a){
var w=S.world,n=S.page,items=(w.items||[]).slice(0,5);
a.appendChild(back(function(){go("hub");}));
var names=items.map(function(it){return it.label;}).join(", ");
a.appendChild(el("<p>Find the "+names+"</p>"));
var st=el("<div id=stage>");var im=el("<img class=pic>");
im.src=pic(w,n+1);st.appendChild(im);a.appendChild(st);
var found=0,need=items.length,lab=el("<p>");a.appendChild(lab);
function mark(){lab.textContent="Found "+found+" of "+need;}mark();
var pos=[[20,25],[70,22],[50,50],[25,72],[75,68]];
im.onload=function(){
var sr=st.getBoundingClientRect(),ir=im.getBoundingClientRect();
var nw=im.naturalWidth||1,nh=im.naturalHeight||1;
var er=ir.width/ir.height,ar=nw/nh,cw,ch;
if(er>ar){ch=ir.height;cw=ch*ar;}else{cw=ir.width;ch=cw/ar;}
var ox=ir.left-sr.left+(ir.width-cw)/2,oy=ir.top-sr.top+(ir.height-ch)/2,iw=cw,ih=ch;
for(var i=0;i<need;i++){(function(i){
var d=document.createElement("button");d.className="dot";
d.textContent=items[i].label;
d.style.left=(ox+iw*pos[i][0]/100-28)+"px";
d.style.top=(oy+ih*pos[i][1]/100-28)+"px";
d.onclick=function(ev){ev.stopPropagation();if(d.done)return;d.done=1;d.style.opacity=".25";found++;mark();if(found>=need){if(S.page+1<w.pages.length){S.page++;draw();}else go("hub");}};
st.appendChild(d);})(i);}};}
function viewColor(a){
var w=S.world,n=S.page,tool="crayon",color="#f4a4c0",undo=[],drawing=0;
a.appendChild(back(function(){go("hub");}));
a.appendChild(el("<h1>Color in</h1>"));
var wrap=el("<div class=wrap>");var cv=document.createElement("canvas");wrap.appendChild(cv);a.appendChild(wrap);
var g=cv.getContext("2d");var im=new Image();
im.onload=function(){cv.width=im.width;cv.height=im.height;g.drawImage(im,0,0);cv.style.width="100%";cv.style.height="auto";};
im.src=col(w,n+1);
function snap(){undo.push(g.getImageData(0,0,cv.width,cv.height));if(undo.length>12)undo.shift();}
function pt(e){var r=cv.getBoundingClientRect();return {x:Math.floor((e.clientX-r.left)*cv.width/r.width),y:Math.floor((e.clientY-r.top)*cv.height/r.height)};}
function fill(x,y){
snap();var tgt=g.getImageData(x,y,1,1).data;if(tgt[0]<40&&tgt[1]<40&&tgt[2]<40)return;
var hex=color.replace("#","");var R=parseInt(hex.slice(0,2),16),G=parseInt(hex.slice(2,4),16),B=parseInt(hex.slice(4,6),16);
var img=g.getImageData(0,0,cv.width,cv.height),d=img.data,w0=cv.width,h0=cv.height,s=[x,y],seen={};
function id(xx,yy){return yy*w0+xx;}
function ok(xx,yy){if(xx<0||yy<0||xx>=w0||yy>=h0)return 0;var i=(yy*w0+xx)*4;if(d[i]<50&&d[i+1]<50&&d[i+2]<50)return 0;return Math.abs(d[i]-tgt[0])+Math.abs(d[i+1]-tgt[1])+Math.abs(d[i+2]-tgt[2])<48;}
while(s.length){var yy=s.pop(),xx=s.pop();if(seen[id(xx,yy)])continue;seen[id(xx,yy)]=1;if(!ok(xx,yy))continue;var i=(yy*w0+xx)*4;d[i]=R;d[i+1]=G;d[i+2]=B;s.push(xx+1,yy,xx-1,yy,xx,yy+1,xx,yy-1);}g.putImageData(img,0,0);}
cv.onpointerdown=function(e){e.preventDefault();e.stopPropagation();var p=pt(e);if(tool==="fill")fill(p.x,p.y);else{drawing=1;snap();g.strokeStyle=color;g.lineWidth=22;g.lineCap="round";g.beginPath();g.moveTo(p.x,p.y);}};
cv.onpointermove=function(e){if(!drawing)return;e.preventDefault();var p=pt(e);g.strokeStyle=color;g.lineTo(p.x,p.y);g.stroke();g.beginPath();g.moveTo(p.x,p.y);};
cv.onpointerup=function(){drawing=0;};
var pal=el("<div class=pal>");var row=el("<div class=row>");pal.appendChild(row);
(SUITE.colors||[]).forEach(function(c){var b=btn(" ",function(ev){ev.stopPropagation();color=c.hex;});b.style.background=c.hex;b.style.minWidth="48px";row.appendChild(b);});
a.appendChild(pal);
var r=el("<div class=row>");
r.appendChild(btn("Crayon",function(){tool="crayon";}));
r.appendChild(btn("Undo",function(){var u=undo.pop();if(u)g.putImageData(u,0,0);}));
if(n>0)r.appendChild(btn("Back a page",function(){S.page--;draw();}));
if(n<w.pages.length-1)r.appendChild(btn("Next",function(){S.page++;draw();}));
a.appendChild(r);}
function viewJig(a){
var w=S.world,n=S.page,cols=3,rows=2,pieces=[];
a.appendChild(back(function(){go("hub");}));
a.appendChild(el("<p>Put the picture back together.</p>"));
var st=el("<div id=stage>");a.appendChild(st);
var im=new Image();
im.onload=function(){
var sw=st.clientWidth||320,sh=st.clientHeight||360;if(sh<200)sh=360;
var asp=im.width/im.height,bw=sw*0.62,bh=bw/asp;if(bh>sh*0.72){bh=sh*0.72;bw=bh*asp;}
var bx=(sw-bw)/2,by=(sh-bh)/2,cw=im.width/cols,ch=im.height/rows,sc=bw/im.width;
var ghost=document.createElement("canvas");ghost.width=im.width;ghost.height=im.height;ghost.getContext("2d").drawImage(im,0,0);
ghost.style.position="absolute";ghost.style.left=bx+"px";ghost.style.top=by+"px";ghost.style.width=bw+"px";ghost.style.height=bh+"px";ghost.style.opacity=".28";ghost.style.pointerEvents="none";st.appendChild(ghost);
for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){(function(r,c){
var tcv=document.createElement("canvas");tcv.width=cw;tcv.height=ch;tcv.getContext("2d").drawImage(im,c*cw,r*ch,cw,ch,0,0,cw,ch);
var e=document.createElement("img");e.className="piece";e.src=tcv.toDataURL();
e.style.position="absolute";e.style.width=(cw*sc)+"px";e.style.height=(ch*sc)+"px";e.style.border="2px solid #9a6e30";e.style.touchAction="none";e.style.zIndex="2";st.appendChild(e);
var home={x:bx+c*cw*sc,y:by+r*ch*sc};
var p={el:e,home:home,x:12+Math.random()*Math.max(8,sw-cw*sc-24),y:12+Math.random()*Math.max(8,sh-ch*sc-24),lock:0};
function place(){e.style.left=p.x+"px";e.style.top=p.y+"px";}place();
var drag=null;e.onpointerdown=function(ev){if(p.lock)return;ev.preventDefault();e.setPointerCapture(ev.pointerId);var rr=st.getBoundingClientRect();drag={ox:ev.clientX-rr.left-p.x,oy:ev.clientY-rr.top-p.y};e.style.zIndex="5";};
e.onpointermove=function(ev){if(!drag)return;var rr=st.getBoundingClientRect();p.x=ev.clientX-rr.left-drag.ox;p.y=ev.clientY-rr.top-drag.oy;place();};
e.onpointerup=function(){drag=null;e.style.zIndex="2";if(Math.hypot(p.x-p.home.x,p.y-p.home.y)<48){p.x=p.home.x;p.y=p.home.y;p.lock=1;place();e.style.pointerEvents="none";if(pieces.every(function(q){return q.lock;})){if(S.page+1<w.pages.length){S.page++;draw();}else go("hub");}}};
pieces.push(p);})(r,c);}
};im.src=pic(w,n+1);
a.appendChild(btn("Reset",function(){draw();}));
}
window.onload=draw;
if(document.readyState!=="loading")draw();
