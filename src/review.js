import {sourceEvidence} from './evidence.js';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
const target=resolve(process.argv[2]||'sample-app/app.js');
if(target!==resolve('sample-app/app.js')) throw new Error('This demo reviews only the fingerprinted sample-app/app.js');
const code=readFileSync(target,'utf8');
const checks=[
 {id:'eval',severity:'high',pattern:/\beval\s*\(/,message:'Dynamic eval() detected'},
 {id:'secret',severity:'high',pattern:/(?:api[_-]?key|password|secret)\s*[:=]\s*['"][^'"]+['"]/i,message:'Possible hard-coded credential'},
 {id:'debug',severity:'low',pattern:/console\.log\s*\(/,message:'Debug logging present'}
];
const findings=checks.filter(c=>c.pattern.test(code)).map(({id,severity,message})=>({id,severity,message}));
const report={source:sourceEvidence(),file:target,generatedAt:new Date().toISOString(),status:findings.some(f=>f.severity==='high')?'BLOCK':'REVIEW',findings,disclaimer:'Pattern-based demo checks; not a full security audit.'};
mkdirSync('reports',{recursive:true});writeFileSync('reports/security.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
