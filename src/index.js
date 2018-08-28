#!/usr/bin/env node
//get files()
const [,, ...args] = process.argv;
const path=require('path');
const fs=require('fs')
// let dir=process.cwd();


const changeAbs=(insertPath)=>{
    if(path.isAbsolute(insertPath)){
        return insertPath;
    } else {
        const pathAbs= path.resolve(insertPath);
        return pathAbs
    }
}
const fileOrDir=(insertPath)=>{
    const change= changeAbs(insertPath);
    fs.lstat(change, (err, stats) =>{
        if (err) {
            throw("Error");
        } else if(stats.isDirectory()){
            console.log('es carpeta')
            // const answer=readDir(change);
        } else if(stats.isFile()){
           const ext=path.extname(change);
            // if(ext==='.md'){
                console.log('es archivo')
              readFile(change);
            // }
        }
   });
}


const marked=require('marked');
const readFile =(filemd)=>{
    // console.log(filemd)
    // fs.readlink(filemd,(err, content)=>{
        
    //     console.log(content);

    // })
    let hrefobj=[{
        href:null,
        text:null
    }];
    fs.readFile(filemd,(err, content)=> {
        // let exre='https?://';
       
        let contentString=content.toString();
        // console.log(text);
        let tokens = marked.lexer(contentString);
        // console.log(tokens);
        const html=marked.parser(tokens);
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        let arrlink =html.match(urlRegex);
        arrlink.forEach((e)=>{
            hrefobj.href+=e;

        })
    //     let textTag = html.match(/(<a href="([^"]+)">([^<]+)<\/a>)/g).map((val)=>{
    //       return val.replace(/<a([^>]*?)href\s*=\s*(['"])([^\2]*?)\2\1*>/i,''); 
    //    });
    //    let arText = textTag.map((val)=>{
    //      return val.replace(/<\/?a>/,''); 
    //    });
    //    arText.forEach((el)=>{
    //        hrefobj.text+=el;
    //    })
    //     console.log(hrefobj);

        
    });
};



let answer=fileOrDir(args[0]);
// console.log(answer);