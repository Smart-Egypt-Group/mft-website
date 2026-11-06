// SEG logo, raster track (6 Nov 2026): cleans the CEO's 180×180 JPEG (marketing/brand/assets/logo/seg-logo_source_180x180.jpg).
// edge-sharpen, and emit colour + white versions. Prints the trimmed box.
const { chromium } = require(process.env.PLAYWRIGHT_PATH);
const fs=require('fs'),path=require('path');
// White → transparent (colour-to-alpha), trim, upscale ×4 (two ×2 steps) with an alpha edge-sharpen,
// then colour / white / navy versions and a 256 px-tall signature size. Writes marketing/brand/assets/logo/.
//   PLAYWRIGHT_PATH=<path to playwright> node scripts/seg-logo-raster.js
// The source is 180 px: the ×4 file is an upscale, fine for signatures (≤ 128 px) and screens, NOT for
// print or large covers. The vector redraw (seg-logo-vector) replaces it once the CEO picks a direction.
const ROOT=path.join(__dirname,'..'),out=path.join(ROOT,'marketing/brand/assets/logo'),src=path.join(out,'seg-logo_source_180x180.jpg');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const data='data:image/jpeg;base64,'+fs.readFileSync(src).toString('base64');
const r=await p.evaluate(async(data)=>{
 const i=new Image();i.src=data;await i.decode();
 const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const g=c.getContext('2d');g.drawImage(i,0,0);
 const im=g.getImageData(0,0,c.width,c.height),d=im.data;
 let x0=c.width,y0=c.height,x1=0,y1=0;
 for(let k=0;k<d.length;k+=4){const m=Math.min(d[k],d[k+1],d[k+2]);
  let a=(255-m)/(255-60); a=Math.max(0,Math.min(1,a)); if(a<0.07)a=0;
  if(a>0){for(let ch=0;ch<3;ch++){d[k+ch]=Math.max(0,Math.min(255,Math.round((d[k+ch]-(1-a)*255)/a)));}}
  d[k+3]=Math.round(a*255);
  if(a>0.5){const px=(k/4)%c.width,py=Math.floor(k/4/c.width);x0=Math.min(x0,px);x1=Math.max(x1,px);y0=Math.min(y0,py);y1=Math.max(y1,py);}
 }
 g.putImageData(im,0,0);
 const pad=1,bx=x0-pad,by=y0-pad,bw=x1-x0+1+2*pad,bh=y1-y0+1+2*pad;
 const t=document.createElement('canvas');t.width=bw;t.height=bh;t.getContext('2d').drawImage(c,bx,by,bw,bh,0,0,bw,bh);
 const native=t.toDataURL('image/png');
 // upscale ×4 in two ×2 steps, then sharpen the alpha edge (smoothstep .3→.7)
 let cur=t;for(let s=0;s<2;s++){const n=document.createElement('canvas');n.width=cur.width*2;n.height=cur.height*2;const ng=n.getContext('2d');ng.imageSmoothingEnabled=true;ng.imageSmoothingQuality='high';ng.drawImage(cur,0,0,n.width,n.height);cur=n;}
 const ug=cur.getContext('2d'),U=ug.getImageData(0,0,cur.width,cur.height),u=U.data;
 for(let k=0;k<u.length;k+=4){let a=u[k+3]/255;a=Math.max(0,Math.min(1,(a-.3)/.4));a=a*a*(3-2*a);u[k+3]=Math.round(a*255);}
 ug.putImageData(U,0,0);
 const big=cur.toDataURL('image/png');
 // white mono from the same alpha
 const wcv=document.createElement('canvas');wcv.width=cur.width;wcv.height=cur.height;const wg=wcv.getContext('2d');const W=wg.createImageData(cur.width,cur.height);
 for(let k=0;k<u.length;k+=4){W.data[k]=W.data[k+1]=W.data[k+2]=255;W.data[k+3]=u[k+3];}wg.putImageData(W,0,0);
 const white=wcv.toDataURL('image/png');
 // navy mono
 const N=wg.createImageData(cur.width,cur.height);for(let k=0;k<u.length;k+=4){N.data[k]=13;N.data[k+1]=27;N.data[k+2]=62;N.data[k+3]=u[k+3];}wg.putImageData(N,0,0);
 const navy=wcv.toDataURL('image/png');
 // signature size: 256 px tall, downscaled from the ×4 master
 const sc=(srcCanvasUrl,h)=>new Promise(async res=>{const im2=new Image();im2.src=srcCanvasUrl;await im2.decode();const s=document.createElement('canvas');s.height=h;s.width=Math.round(h*im2.width/im2.height);const sg=s.getContext('2d');sg.imageSmoothingQuality='high';sg.drawImage(im2,0,0,s.width,s.height);res(s.toDataURL('image/png'));});
 return {box:[bx,by,bw,bh],native,big,white,navy,sign:await sc(big,256),signWhite:await sc(white,256),size:[cur.width,cur.height]};
},data);
const w=(n,u)=>fs.writeFileSync(path.join(out,n),Buffer.from(u.split(',')[1],'base64'));
fs.mkdirSync(out,{recursive:true});
w('seg-logo_native.png',r.native);w('seg-logo_full.png',r.big);w('seg-logo_white.png',r.white);w('seg-logo_navy.png',r.navy);w('seg-logo_sign.png',r.sign);w('seg-logo_sign-white.png',r.signWhite);
console.log('box',r.box,'full',r.size);await b.close();})();
