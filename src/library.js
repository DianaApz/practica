const path=require('path');
const fs = require('fs');
let Parser=require('markdown-parser');
let parser= new Parser();

    

const changeAbs=(insertPath)=>{
    if(path.isAbsolute(insertPath)){
        return insertPath;
    } else {
        const pathAbs= path.resolve(insertPath);
        return pathAbs
    }
}
const readDir = (dir,arf)=> {
    arf=arf || [];
    fs.readdir(dir, (err, files) => {
        files.forEach((file)=>{
            const filePath = path.resolve(dir, file);
            fs.lstat(filePath, (err, stat) =>{
                const ext=path.extname(filePath); 
                if (stat.isDirectory()) {
                    readDir(filePath,arf);
                } else if(ext==='.md'){
                    // console.log(file);
                   arf.push(file)
                }
            });
        })
    });
    
    return arf;
    
};

const mdlinks=(all,string,filemd)=>{
    let ar=[]
    all.forEach((obj)=>{
        ar.push({
            href:obj.href,
            text:obj.title,
            file:filemd
        })
        
    })
    console.log(ar);
    return ar;
}
const arrlinkstext=(string,filemd)=>{
    
    let arrlink=parser.parse(string, function(err, result) {
        // console.log(result.references)
        let all=result.references;
        mdlinks(all,string,filemd);
    });
}




const readFile =(filemd)=>{
    
    fs.readFile(filemd,(err, content)=> {
        let string= content.toString();
        
      arrlinkstext(string,filemd);
    });
    
}


const fileOrDir=(insertPath)=>{
    const change= changeAbs(insertPath);
    fs.lstat(change, (err, stats) =>{
        if (err) {
            throw("Error");
        } else if(stats.isDirectory()){
            const answer=readDir(change);
            console.log(answer);
        } else if(stats.isFile()){
           const ext=path.extname(change);
            if(ext==='.md'){
              readFile(change);
            }
        }
   });
}

fileOrDir('../files');


