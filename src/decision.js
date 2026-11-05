import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';

export function evaluate(qa,security){
 if(!qa || !security || typeof qa.passed!=='boolean' || !Array.isArray(security.findings)) throw new Error('Missing verified QA or security evidence');
 if(!/^[a-f0-9]{64}$/.test(qa.source?.revision||'') || qa.source.revision!==security.source?.revision) throw new Error('Evidence must refer to the same source revision');
 for(const date of [qa.checkedAt,security.generatedAt]) {
  const age=Date.now()-Date.parse(date);
  if(!Number.isFinite(age)||age>30*60*1000||age < -60000) throw new Error('Evidence is stale or has an invalid timestamp; rerun checks');
 }
 if(security.findings.some(f=>!f || !['low','medium','high','critical'].includes(f.severity))) throw new Error('Invalid finding severity');
 const high=security.findings.filter(x=>['high','critical'].includes(x.severity));
 const reasons=[...(!qa.passed?['QA tests failed']:[]),...(high.length?[`${high.length} high/critical security finding(s)`]:[])];
 return {recommendation:reasons.length?'BLOCK':'REVIEW',reasons,requiresHumanApproval:true};
}
export function buildDecision(qa,security,actor,action){
 if(!['APPROVE','REJECT'].includes(action)) throw new Error('Human action must be APPROVE or REJECT');
 if(!actor?.trim()) throw new Error('Human identity required');
 const assessment=evaluate(qa,security);
 if(assessment.recommendation==='BLOCK' && action==='APPROVE') throw new Error('Cannot approve blocked release; resolve findings and retest');
 const evidence={qa,security};
 const evidenceHash=createHash('sha256').update(JSON.stringify(evidence)).digest('hex');
 return {schemaVersion:1,createdAt:new Date().toISOString(),actor,action,assessment,evidenceHash,evidence,disclaimer:'Local evidence workflow; not proof of Switch integration or production readiness.'};
}
export function saveDecision(record,file='reports/decision.json'){
 mkdirSync('reports',{recursive:true});writeFileSync(resolve(file),JSON.stringify(record,null,2));
}
export function loadReport(file){return JSON.parse(readFileSync(resolve(file),'utf8'));}
