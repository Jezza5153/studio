import fs from "node:fs";
const pkg = JSON.parse(fs.readFileSync("package.json","utf8"));
const dep = (n)=>pkg.dependencies?.[n]??pkg.devDependencies?.[n]??null;
const sv = (v)=>v?.replace(/^[^\d]*/, "") || "";
const next = sv(dep("next"));
function P(v){return v.split(".").map(x=>parseInt(x||"0",10));}
function gte(a,b){const A=P(a),B=P(b);for(let i=0;i<3;i++){if(A[i]>B[i])return true;if(A[i]<B[i])return false;}return true;}
function lt(a,b){const A=P(a),B=P(b);for(let i=0;i<3;i++){if(A[i]<B[i])return true;if(A[i]>B[i])return false;}return false;}
function patched(v){
  if(!v) return false;
  if(v.includes("canary")){
    if(v.startsWith("14.") && v > "14.3.0-canary.76") return false;
    if(v.startsWith("15.") && v < "15.6.0-canary.58") return false;
    if(v.startsWith("16.") && v < "16.1.0-canary.12") return false;
    return true;
  }
  const floors=[
    {r:["15.0.0","15.1.0"],min:"15.0.5"},
    {r:["15.1.0","15.2.0"],min:"15.1.9"},
    {r:["15.2.0","15.3.0"],min:"15.2.6"},
    {r:["15.3.0","15.4.0"],min:"15.3.6"},
    {r:["15.4.0","15.5.0"],min:"15.4.8"},
    {r:["15.5.0","15.6.0"],min:"15.5.7"},
    {r:["16.0.0","16.1.0"],min:"16.0.7"},
  ];
  for(const f of floors){ if(gte(v,f.r[0]) && lt(v,f.r[1])) return gte(v,f.min); }
  return true;
}
if(!patched(next)){ console.error(`❌ Next.js ${next||"(missing)"} vulnerable`); process.exit(1); }
console.log(`✅ Next.js ${next} looks patched`);
