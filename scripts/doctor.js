import {spawnSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
const checks={node:{ok:Number(process.versions.node.split('.')[0])>=20,version:process.versions.node}};
for(const [name,args] of [['docker',['info','--format','{{.ServerVersion}}']],['codex',['--version']],['claude',['--version']],['opencode',['--version']],['gh',['auth','status']]]) {
 const r=spawnSync(name,args,{encoding:'utf8',timeout:10000,shell:false});
 checks[name]={ok:r.status===0,exitCode:r.status,error:r.error?.code||null};
}
const report={checkedAt:new Date().toISOString(),checks,liveSwitchVerified:false,note:'Installed tools do not establish an authenticated agent session or working Switch room. Windows Docker installation on another computer is not visible here.'};
mkdirSync('reports',{recursive:true});writeFileSync('reports/environment.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
