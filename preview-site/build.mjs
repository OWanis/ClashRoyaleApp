import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const assets=JSON.parse(await readFile(new URL('./assets.json',import.meta.url),'utf8'));
await mkdir('public/assets',{recursive:true});
await copyFile('index.html','public/index.html');
await writeFile('public/robots.txt','User-agent: *\nDisallow: /\n');
let next=0,completed=0;
async function download(a){
 if(!/^[a-f0-9]{64}\.png$/.test(a.filename)||new URL(a.url).origin!=='https://api-assets.clashroyale.com')throw new Error('Invalid artwork manifest');
 for(let attempt=0;attempt<3;attempt++){
  try{
   const response=await fetch(a.url,{signal:AbortSignal.timeout(30000)});
   if(!response.ok)throw new Error('Artwork HTTP '+response.status);
   const bytes=Buffer.from(await response.arrayBuffer());
   if(bytes.length!==a.bytes||createHash('sha256').update(bytes).digest('hex')!==a.sha256)throw new Error('Artwork hash mismatch; refusing changed source');
   await writeFile('public/assets/'+a.filename,bytes);completed++;return;
  }catch(error){if(attempt===2)throw error;await new Promise(r=>setTimeout(r,500*(attempt+1)));}
 }
}
await Promise.all(Array.from({length:6},async()=>{while(next<assets.length){const asset=assets[next++];await download(asset);}}));
console.log('Built card explorer with '+completed+' verified original icons.');
