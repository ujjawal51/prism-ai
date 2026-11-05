import {sourceEvidence} from './evidence.js';
import {buildDecision,loadReport,saveDecision} from './decision.js';
const [actor,action]=process.argv.slice(2);
if(!actor||!action){console.error('Usage: npm run decide -- "Human Name" APPROVE|REJECT');process.exit(2)}
try{
 const qa=loadReport('reports/qa.json'),security=loadReport('reports/security.json');
 if(qa.source?.revision!==sourceEvidence().revision || security.source?.revision!==sourceEvidence().revision) throw new Error("Source changed after review; rerun QA and security checks");
 const record=buildDecision(qa,security,actor,action.toUpperCase());saveDecision(record);
 console.log(JSON.stringify({actor:record.actor,action:record.action,assessment:record.assessment,evidenceHash:record.evidenceHash},null,2));
}catch(e){console.error(e.message);process.exitCode=1}
