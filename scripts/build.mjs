import {mkdir,copyFile,rm,cp} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','site.js','mark.svg'])await copyFile(file,'dist/'+file);
await cp('assets','dist/assets',{recursive:true});
console.log('Built static Headywater site in dist/.');
