import {spawnSync} from 'node:child_process';
// Local evidence demo only. Never impersonate a human approval.
for(const file of ['src/qa.js','src/review.js','src/assess.js']) {
 const r=spawnSync(process.execPath,[file],{stdio:'inherit',timeout:60000});
 if(r.status!==0) process.exit(r.status||1);
}
console.log('Local demo complete. Await an explicit human decision in the real Switch room.');
