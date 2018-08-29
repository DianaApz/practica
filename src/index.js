const path=require('path');
const fs = require("fs");

const changeAbs=(insertPath)=>{
    if(path.isAbsolute(insertPath)){
        console.log('es abs');
        return insertPath;
    }
    else {
        let pathAbs = path.resolve(insertPath);
        console.log('es relat');
        console.log(pathAbs);
        return pathAbs
    }
}



const readDir = (dir,ext)=> {
        
    let results = [];
      
        // leer dir
        fs.readdir(dir, (err, files) => {
          files.forEach((file)=>{
              // Obtener  path absolute
              let filePath = path.resolve(dir, file);
      
             //si es  directory o file
             
             fs.lstat(filePath, (err, stat) =>{
                 //  directory
                 if (stat.isDirectory()) {
                    readDir(filePath, ext)
                    // results = results.concat(readDire(filePath, ext));
                    // console.log(results);
                    // return results
                    }
      
                 // file push 
                  if (stat.isFile() && filePath.endsWith(ext)) {
                     results.push(filePath);
                     console.log(results);
                    //  return results
                     
                    }
                });
            })
       });
    // console.log(results);
    return results
};
 
      
const readFile =(filemd)=>{
    fs.readFile(filemd, 'utf8', function(err, contents) {
        console.log(contents);
        if (err) {
            //       return console.log(err);
        }
    });
}
const directoryFile=(change)=> new Promise((resolve,reject)=>{

    fs.lstat(change, (err, stats) =>{
        if (err) {
            console.log("Error");
        } else if(stats.isDirectory()){
            // console.log("carpeta");
            // fs.readdir(change, (err, files) => {
                // console.log(files);
               let answer=readDir(change,'.md');
            //    console.log(answer);
            // });
            
            
        } else if(stats.isFile()){
           console.log("archivo");
           let ext=path.extname(change);
            if(ext==='.md'){
              console.log('si es md');
              readFile(change);
            }else{
              console.log('no es md')
            }
        }
    });
    
})


const mdlinks=(insertPath)=>{
    let change= changeAbs(insertPath);
    
   
}


mdlinks('\track-project-1\lim20181-Track-FE-markdown-list\files');


