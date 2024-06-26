
const whiteList = [
    'https://www.yourSite.com',
    'http://127.0.0.1:5500',
    'https://expense-api.onrender.com',
    'https://expense-frontend-5dj3.onrender.com'
]
const corsOptions = {
        origin:(origin,callback)=>{
                if(whiteList.indexOf(origin) !== -1 || !origin){
                        callback(null,true);    
                }else{
                        callback(new Error("not allowed by CORS"))
                }
        },
        optionsSuccessStatus:200
}

export default corsOptions;