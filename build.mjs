import fs from 'node:fs';
import './build-original.mjs';
const base='/adensia-website';
fs.cpSync('src','docs',{recursive:true});
fs.cpSync('dist','docs',{recursive:true});
function visit(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=dir+'/'+f.name;if(f.isDirectory())visit(p);else if(p.endsWith('.html')){let s=fs.readFileSync(p,'utf8');s=s.replaceAll('="/','="'+base+'/').replaceAll(', /assets/',', '+base+'/assets/');fs.writeFileSync(p,s);}}}
visit('docs');
let app=fs.readFileSync('src/app.js','utf8');
app=app.replace("location.pathname.split('/')", "location.pathname.slice('/adensia-website'.length).split('/')");
app=app.replace("return header+`<main id=\"main\">${content}</main>`+footer;", "return (header+`<main id=\"main\">${content}</main>`+footer).replaceAll('=\"/', '=\"/adensia-website/').replaceAll(', /assets/', ', /adensia-website/assets/');");
fs.writeFileSync('docs/app.js',app);
let css=fs.readFileSync('src/style.css','utf8').replaceAll('/assets/','/adensia-website/assets/');fs.writeFileSync('docs/style.css',css);
fs.writeFileSync('docs/.nojekyll','');
