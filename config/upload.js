const multer =require('multer')
const path =require('path')


const storage = multer.diskStorage({
    destination : (req,file,cb)=>cb(null,path.join(__dirname,'../upload-pic')),
    filename:(req,file,cd)=>{
        console.log(file.originalname);
        console.log(path.extname(file.originalname));
        let fileExt = path.extname(file.originalname)
        cd(null,`pic_${Date.now()}_${Math.round(Math.random()*100)}${fileExt}`)
    }
})


module.exports=multer({storage:storage})