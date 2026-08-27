var S={name:"Friend",gender:"",mum:false,avatar:"",world:null,page:0,game:null};
function extra(){
var a=[["cats","girl","Cats","Pip","cats",5],["toys","girl","Toy Factory","The Bow","toys",5],["dinos","boy","Dinosaurs","The Egg","dinos",5],["dogs","boy","Dogs","The Ball","dogs",5],["sand","boy","Sandpit","The Truck","sand",5]];
for(var i=0;i<a.length;i++){var x=a[i],pages=[];for(var n=1;n<=x[5];n++)pages.push("Page "+n+".");W(x[0],x[1],x[2],x[3],x[4],pages,[{id:"a",label:"one"},{id:"b",label:"two"},{id:"c",label:"three"},{id:"d",label:"four"},{id:"e",label:"five"}]);}
}
if(window.SUITE&&SUITE.worlds)extra();
function el(h){var d=document.createElement("div");d.innerHTML=h;return d.firstChild;}
function app(){return document.getElementById("app");}
function go(name){S.screen=name;draw();}
function worlds(){return (SUITE.worlds||[]).filter(function(w){return w.gender===S.gender;});}
function pic(w,n){return "assets/"+w.folder+"/p"+n+".jpg";}
function col(w,n){return "assets/color/"+w.folder+"/c"+n+".png";}
function av(){return S.avatar||("assets/avatars/"+(S.gender==="boy"?"boy":"girl")+".png");}
function draw(){
var a=app(); a.innerHTML="";
if(S.screen==="hello")viewHello(a);
else if(S.screen==="sex")viewSex(a);
else if(S.screen==="mum")viewMum(a);
else if(S.screen==="photo")viewPhoto(a);
else if(S.screen==="worlds")viewWorlds(a);
else if(S.screen==="hub")viewHub(a);
else if(S.screen==="book")viewBook(a);
else if(S.screen==="jigsaw")viewJig(a);
else if(S.screen==="find")viewFind(a);
else if(S.screen==="color")viewColor(a);
else viewHello(a);
}
function btn(t,fn,cls){var b=document.createElement("button");b.textContent=t;if(cls)b.className=cls;b.onclick=fn;return b;}
function viewHello(a){a.appendChild(el("<h1>My Story Games</h1>"));a.appendChild(el("<p>What is your name?</p>"));var i=el("<input id=nm placeholder=Friend>");a.appendChild(i);a.appendChild(btn("Next",function(){S.name=document.getElementById("nm").value||"Friend";go("sex");}));}
function viewSex(a){a.appendChild(el("<h1>Hi "+S.name+"</h1>"));a.appendChild(el("<p>Are you a boy or a girl?</p>"));var r=el("<div class=row>");r.appendChild(btn("Girl",function(){S.gender="girl";go("mum");},"card"));r.appendChild(btn("Boy",function(){S.gender="boy";go("mum");},"card"));a.appendChild(r);}
function viewMum(a){a.appendChild(el("<h1>One thing first</h1>"));a.appendChild(el("<p>Mum has to say the photo is OK.</p>"));a.appendChild(btn("Mum says this photo is OK",function(){S.mum=true;go("photo");}));a.appendChild(btn("Maybe later",function(){S.mum=false;S.avatar="";go("worlds");}));}
function cartoon(img){var c=document.createElement("canvas");c.width=256;c.height=256;var g=c.getContext("2d");g.drawImage(img,0,0,256,256);var d=g.getImageData(0,0,256,256),p=d.data;for(var i=0;i<p.length;i+=4){p[i]=Math.round(p[i]/48)*48;p[i+1]=Math.round(p[i+1]/48)*48;p[i+2]=Math.round(p[i+2]/48)*48;}g.putImageData(d,0,0);return c.toDataURL("image/jpeg",0.7);}
function viewPhoto(a){a.appendChild(el("<h1>Your picture</h1>"));a.appendChild(el("<p>Add a photo. We will make a cartoon.</p>"));var i=el("<input type=file accept=image/* capture=user>");a.appendChild(i);var prev=el("<img class=pic>");prev.style.display="none";a.appendChild(prev);i.onchange=function(){var f=i.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){S.avatar=cartoon(im);prev.src=S.avatar;prev.style.display="block";};im.src=r.result;};r.readAsDataURL(f);};a.appendChild(btn("Use this",function(){go("worlds");}));a.appendChild(btn("Skip",function(){S.avatar="";go("worlds");}));}
function viewWorlds(a){a.appendChild(el("<h1>Pick a world</h1>"));var img=el("<img class=pic>");img.src=av();img.style.maxHeight="22vh";a.appendChild(img);var r=el("<div class=row>");worlds().forEach(function(w){r.appendChild(btn(w.name,function(){S.world=w;S.page=0;go("hub");},"card"));});a.appendChild(r);}
function viewHub(a){a.appendChild(btn("Back",function(){go("worlds");}));a.appendChild(el("<h1>"+S.world.name+"</h1>"));a.appendChild(el("<p>"+S.world.story+"</p>"));var r=el("<div class=row>");r.appendChild(btn("Read the book",function(){S.page=0;go("book");},"card"));r.appendChild(btn("Jigsaw",function(){S.page=0;go("jigsaw");},"card"));r.appendChild(btn("Find it",function(){S.page=0;go("find");},"card"));r.appendChild(btn("Color in",function(){S.page=0;go("color");},"card"));a.appendChild(r);}
function speak(t){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.rate=0.9;speechSynthesis.speak(u);}catch(e){}}
function viewBook(a){var w=S.world,n=S.page,p=w.pages[n];a.appendChild(btn("Back",function(){speechSynthesis.cancel();go("hub");}));var im=el("<img class=pic>");im.src=pic(w,n+1);a.appendChild(im);a.appendChild(el("<p>"+p.text+"</p>"));var r=el("<div class=row>");r.appendChild(btn("Read to me",function(){speak(p.text);}));if(n>0)r.appendChild(btn("Back a page",function(){S.page--;draw();}));if(n<w.pages.length-1)r.appendChild(btn("Next",function(){S.page++;draw();}));else r.appendChild(btn("Done",function(){go("hub");}));a.appendChild(r);}
function viewFind(a){var w=S.world,n=S.page;a.appendChild(btn("Back",function(){go("hub");}));a.appendChild(el("<p>Find the five dots.</p>"));var st=el("<div id=stage>");var im=el("<img class=pic>");im.src=pic(w,n+1);st.appendChild(im);a.appendChild(st);var found=0,need=5;var r=el("<div class=row>");a.appendChild(r);function mark(){r.textContent="Found "+found+" of "+need;}mark();im.onload=function(){var br=st.getBoundingClientRect();for(var i=0;i<need;i++){var d=document.createElement("button");d.textContent="o";d.style.position="absolute";d.style.left=(12+Math.random()*70)+"%";d.style.top=(12+Math.random()*60)+"%";d.style.minHeight="48px";d.onclick=function(){if(this.done)return;this.done=1;this.style.opacity=".2";found++;mark();if(found>=need){var n2=S.page+1;if(n2<w.pages.length){S.page=n2;draw();}else go("hub");}};st.appendChild(d);}};}
function viewColor(a){var w=S.world,n=S.page,tool="fill",color="#d64545",undo=[];a.appendChild(btn("Back",function(){go("hub");}));var cv=document.createElement("canvas");cv.style.width="100%";cv.style.maxHeight="48vh";cv.style.touchAction="none";a.appendChild(cv);var g=cv.getContext("2d");var im=new Image();im.onload=function(){cv.width=im.width;cv.height=im.height;g.drawImage(im,0,0);};im.src=col(w,n+1);function snap(){undo.push(g.getImageData(0,0,cv.width,cv.height));if(undo.length>12)undo.shift();}
function fill(x,y){snap();var tgt=g.getImageData(x,y,1,1).data;if(tgt[0]<40&&tgt[1]<40&&tgt[2]<40)return;var hex=color.replace("#","");var R=parseInt(hex.slice(0,2),16),G=parseInt(hex.slice(2,4),16),B=parseInt(hex.slice(4,6),16);var img=g.getImageData(0,0,cv.width,cv.height),d=img.data,w0=cv.width,h0=cv.height,s=[x,y],seen={};function id(xx,yy){return yy*w0+xx;}function ok(xx,yy){if(xx<0||yy<0||xx>=w0||yy>=h0)return 0;var i=(yy*w0+xx)*4;if(d[i]<50&&d[i+1]<50&&d[i+2]<50)return 0;return Math.abs(d[i]-tgt[0])+Math.abs(d[i+1]-tgt[1])+Math.abs(d[i+2]-tgt[2])<48;}while(s.length){var yy=s.pop(),xx=s.pop();if(seen[id(xx,yy)])continue;seen[id(xx,yy)]=1;if(!ok(xx,yy))continue;var i=(yy*w0+xx)*4;d[i]=R;d[i+1]=G;d[i+2]=B;s.push(xx+1,yy,xx-1,yy,xx,yy+1,xx,yy-1);}g.putImageData(img,0,0);}
function pt(e){var r=cv.getBoundingClientRect();var t=e.touches?e.touches[0]:e;return {x:Math.floor((t.clientX-r.left)*cv.width/r.width),y:Math.floor((t.clientY-r.top)*cv.height/r.height)};}
var drawing=0;cv.onpointerdown=function(e){e.preventDefault();var p=pt(e);if(tool==="fill")fill(p.x,p.y);else{drawing=1;snap();g.strokeStyle=color;g.lineWidth=28;g.lineCap="round";g.beginPath();g.moveTo(p.x,p.y);}};
cv.onpointermove=function(e){if(!drawing)return;e.preventDefault();var p=pt(e);g.lineTo(p.x,p.y);g.stroke();g.beginPath();g.moveTo(p.x,p.y);};
cv.onpointerup=function(){drawing=0;};
var pal=el("<div class=row>");(SUITE.colors||[]).forEach(function(c){var b=btn(" ",function(){color=c.hex;});b.style.background=c.hex;b.style.minWidth="44px";pal.appendChild(b);});a.appendChild(pal);
var r=el("<div class=row>");r.appendChild(btn("Fill",function(){tool="fill";}));r.appendChild(btn("Crayon",function(){tool="crayon";}));r.appendChild(btn("Undo",function(){var u=undo.pop();if(u)g.putImageData(u,0,0);}));if(n>0)r.appendChild(btn("Back a page",function(){S.page--;draw();}));if(n<w.pages.length-1)r.appendChild(btn("Next",function(){S.page++;draw();}));a.appendChild(r);}
function viewJig(a){var w=S.world,n=S.page,cols=3,rows=2,pieces=[];a.appendChild(btn("Back",function(){go("hub");}));var st=el("<div id=stage>");a.appendChild(st);var im=new Image();im.onload=function(){var sw=st.clientWidth,sh=st.clientHeight||360;var asp=im.width/im.height,bw=sw*0.7,bh=bw/asp;if(bh>sh*0.7){bh=sh*0.7;bw=bh*asp;}var bx=(sw-bw)/2,by=(sh-bh)/2,cw=im.width/cols,ch=im.height/rows,sc=bw/im.width;
for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var cv=document.createElement("canvas");cv.width=cw;cv.height=ch;cv.getContext("2d").drawImage(im,c*cw,r*ch,cw,ch,0,0,cw,ch);var e=document.createElement("img");e.className="piece";e.src=cv.toDataURL();e.style.position="absolute";e.style.width=(cw*sc)+"px";e.style.height=(ch*sc)+"px";e.style.touchAction="none";st.appendChild(e);var home={x:bx+c*cw*sc,y:by+r*ch*sc};var p={el:e,home:home,x:16+Math.random()*(sw-cw*sc-32),y:16+Math.random()*(sh-ch*sc-32),lock:0};place(p);bind(p);pieces.push(p);} };im.src=pic(w,n+1);
function place(p){p.el.style.transform="translate("+p.x+"px,"+p.y+"px)";}
function bind(p){var drag=null;p.el.onpointerdown=function(ev){if(p.lock)return;ev.preventDefault();var r=st.getBoundingClientRect();drag={ox:ev.clientX-r.left-p.x,oy:ev.clientY-r.top-p.y};p.el.setPointerCapture(ev.pointerId);};
p.el.onpointermove=function(ev){if(!drag)return;var r=st.getBoundingClientRect();p.x=ev.clientX-r.left-drag.ox;p.y=ev.clientY-r.top-drag.oy;place(p);};
p.el.onpointerup=function(){drag=null;if(Math.hypot(p.x-p.home.x,p.y-p.home.y)<36){p.x=p.home.x;p.y=p.home.y;p.lock=1;place(p);if(pieces.every(function(q){return q.lock;}))go("hub");}};}
}
S.screen="hello"; window.onload=draw;
