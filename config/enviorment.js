const fs = require('fs');
require('dotenv').config();
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
console.log(rfs);
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development={
    name:'development',
   // asset_path:'./assets',
   asset_path:'process.env.ASSET_PATH',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
   
    smtp:{
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user:process.env.AUTH_USER ,
                pass: process.env.AUTH_PASS
            }
        },
           google_client_id:process.env.AUTH_CLIENTID, 
           google_client_secret:process.env.AUTH_CLIENTSECRET, 
           google_call_back_url:process.env.AUTH_CALLBACKURL,
           jwt_secret:'codeial',
           morgan: {
            mode: 'dev',
            options: {stream: accessLogStream}
        }
    
        
    
}
const production={
    name:'production',
    asset_path:'process.env.CODEIAL_ASSET_PATH',
    session_cookie_key:'process.env.CODEIAL_SESSION_COOKIE_KEY',
    db:process.env.CODEIAL_DB,
   
    smtp:{
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                
                user:process.env.CODEIAL_GMAIL_USERNAME,
                pass:process.env.CODEIAL_GMAIL_PASSWORD
            }
        },
        //    
        google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
        google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,//yha kya hua kch smjh nhi aya
        jwt_secret:process.env.CODEIAL_JWT_SECRET,//video me 6:29 se doubt hai
        morgan: {
            mode: 'combined',
            options: {stream: accessLogStream}
        }
    
    
}
module.exports=eval(process.env.CODEIAL_ENVIORMENT)==undefined?development:eval(process.env.CODEIAL_ENVIORMENT);