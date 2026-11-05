import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluate,buildDecision} from './decision.js';
const source={revision:'a'.repeat(64)};
const qa={passed:true,source,checkedAt:new Date().toISOString()},safe={findings:[],source,generatedAt:new Date().toISOString()},risk={...safe,findings:[{severity:'high',id:'eval'}]};
test('safe evidence requires human review',()=>assert.equal(evaluate(qa,safe).recommendation,'REVIEW'));
test('security finding blocks release',()=>assert.equal(evaluate(qa,risk).recommendation,'BLOCK'));
test('QA failure blocks release',()=>assert.equal(evaluate({...qa,passed:false},safe).recommendation,'BLOCK'));
test('missing evidence fails closed',()=>assert.throws(()=>evaluate(null,safe)));
test('blocked release cannot be approved',()=>assert.throws(()=>buildDecision(qa,risk,'Reviewer','APPROVE')));
test('human may reject blocked release',()=>assert.equal(buildDecision(qa,risk,'Reviewer','REJECT').action,'REJECT'));
test('reviewable release needs explicit approval',()=>assert.equal(buildDecision(qa,safe,'Reviewer','APPROVE').action,'APPROVE'));

test('different revisions fail closed',()=>assert.throws(()=>evaluate(qa,{...safe,source:{revision:'b'.repeat(64)}}),/same source/));
test('old evidence fails closed',()=>assert.throws(()=>evaluate({...qa,checkedAt:'2020-01-01'},safe),/stale/));
test('invalid date fails closed',()=>assert.throws(()=>evaluate({...qa,checkedAt:'bad'},safe),/stale/));
test('future evidence fails closed',()=>assert.throws(()=>evaluate({...qa,checkedAt:new Date(Date.now()+120000).toISOString()},safe),/timestamp/));
test('unknown severity fails closed',()=>assert.throws(()=>evaluate(qa,{...safe,findings:[{severity:'unknown'}]}),/severity/));
