import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','styles.css','site.js','mark.svg'])await copyFile(file,'dist/'+file);
console.log('Built static Headywater site in dist/.');
