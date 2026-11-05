import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
test('seeded security risk blocks release',()=>{
 execFileSync(process.execPath,['src/review.js','sample-app/app.js']);
 const report=JSON.parse(readFileSync('reports/security.json','utf8'));
 assert.equal(report.status,'BLOCK');
 assert.ok(report.findings.some(f=>f.id==='eval'));
});
