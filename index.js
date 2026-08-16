import axios from 'axios';
import http from 'http';
import Textdata from './Config/text.json' with { type: 'json' };
import Imagedata from './Config/image.json' with { type: 'json' };
import dotenv from 'dotenv';
import * as command from "./Srcs/command.js";
dotenv.config();

let Lasted_Mes = "";
let chat_id = "";
let MODE = "NULL";
let enabled = false;

const PORT = process.env.PORT || 8000;
const KEY = process.env.ZALO_KEY;
const URL = process.env.WEBHOOK;
const ZL_TOKEN = process.env.ZALO_TOKEN;
const server=http.createServer((req,res)=>{if(req.method==='POST'&&req.url==='/webhook'){let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>{try{const webhookData=JSON.parse(body);Lasted_Mes=webhookData.message?.text||webhookData.message?.content||'';chat_id=webhookData.message?.chat?.id||webhookData.message?.from?.id||webhookData.sender?.id;res.writeHead(200);res.end('OK')}catch(e){console.error(e);res.writeHead(200);res.end('OK')}});return}res.writeHead(200);res.end('HI')});

if (!ZL_TOKEN) {console.error('Can phai co ZL_TOKEN trong .env');process.exit(1);}
if (!KEY) {console.error('Can phai co ZL_KEY trong .env');process.exit(1);}
if (!URL) {console.error('Can phai co WEBHOOK trong .env');process.exit(1);}

//mo sever memaybeo
server.listen(PORT, () => {console.log(`\n\nServer đang chay tai: http://localhost:${PORT} \n\n`);});
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {console.error(`Port:  ${PORT} da dc su dung`);} 
  else {console.error('Loi server:', err);}});

//getme btw toi yeu ban (in data cua con bot)
//try {let MODE = "getMe";const entrypoint = `https://bot-api.zaloplatforms.com/bot${ZL_TOKEN}/${MODE}`;const response = await axios.post(entrypoint, {});console.log('Data:', response.data);} catch (error) {console.error('Error: ', error.message);if (error.response) {console.error('Chi tiet:', error.response.data);}}
//dat webhook 
//try{let MODE = "setWebhook";const entrypoint = `https://bot-api.zaloplatforms.com/bot${ZL_TOKEN}/${MODE}`;const response = await axios.post(entrypoint, {url: URL,secret_token: KEY});console.log('Webhook: ',response.data);} catch(error){console.error('Error: ', error.message);if (error.response){console.error('Chi tiet: ', error.response.data);}}
//try{let MODE = "testWebhook";const entrypoint = `https://bot-api.zaloplatforms.com/bot${ZL_TOKEN}/${MODE}`;const response = await axios.post(entrypoint, {});console.log("Testing: ", response.data);} catch(error){console.log('Error:', error.message);if (error.response){console.error('Chi tiet: ', error.response.data);}};


while(true){
    //dem 1s
    await new Promise(resolve => setTimeout(resolve, 1000));
    //kich hoat
    if (enabled == false){
        if (Lasted_Mes == "/on"){
            await command.Enable(chat_id,ZL_TOKEN);
            enabled=true;
            Lasted_Mes="";
        } 
        if (Lasted_Mes == "/help"){
            await command.Help_WO(chat_id,ZL_TOKEN);
            Lasted_Mes="";
        } 
    } else {
        if (Lasted_Mes == "/off"){
            await command.Disable(chat_id,ZL_TOKEN);
            enabled = false;
            Lasted_Mes="";
        }
        if (Lasted_Mes == "/help"){
            await command.Help(chat_id,ZL_TOKEN);
            Lasted_Mes="";
        } 
        if (Lasted_Mes == "/dangnhap"){
            await command.Login_Help(chat_id,ZL_TOKEN)
            Lasted_Mes="";
        }
        if (Lasted_Mes == "/dangnhap_cookie"){
            await command.Login_Cookie(chat_id,ZL_TOKEN)
            Lasted_Mes="";
        }
        if (Lasted_Mes.startsWith("/dangnhap_bth")){
            await command.Login_Nor(chat_id,ZL_TOKEN,Lasted_Mes)
            Lasted_Mes="";
        }
    }










}
