import {createHash} from 'node:crypto';
import {readFileSync,readdirSync} from 'node:fs';
import {resolve,relative} from 'node:path';
export function sourceEvidence(root=process.cwd()) {
 const files=[];
 function walk(dir) { for (const e of readdirSync(dir,{withFileTypes:true})) {
  if(e.isSymbolicLink()) throw new Error('Symlinks are not supported in review inputs');
  const p=resolve(dir,e.name); if(e.isDirectory()) walk(p); else files.push(p);
 }}
 for(const dir of ['src','sample-app']) walk(resolve(root,dir));
 files.push(resolve(root,'package.json'));
 const entries=files.map(p=>[relative(root,p).replaceAll('\\','/'),createHash('sha256').update(readFileSync(p)).digest('hex')]).sort((a,b)=>a[0].localeCompare(b[0]));
 return {revision:createHash('sha256').update(JSON.stringify(entries)).digest('hex'),files:entries};
}
