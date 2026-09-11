import fs from 'node:fs';
import './build-original.mjs';
fs.cpSync('src','docs',{recursive:true});
fs.cpSync('dist','docs',{recursive:true});
fs.writeFileSync('docs/.nojekyll','');
fs.writeFileSync('docs/CNAME','adensia.com\n');
