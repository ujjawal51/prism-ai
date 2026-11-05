import {evaluate,loadReport} from './decision.js';
import {sourceEvidence} from './evidence.js';
try {
 const qa=loadReport('reports/qa.json'),security=loadReport('reports/security.json');
 if(qa.source?.revision!==sourceEvidence().revision) throw new Error('Source changed; rerun evidence checks');
 console.log(JSON.stringify({source:qa.source.revision,...evaluate(qa,security)},null,2));
} catch(e) { console.error(e.message); process.exitCode=1; }
