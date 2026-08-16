// ==================== index.js ====================
import http from 'http';
import dotenv from 'dotenv';
import * as command from './srcs/command.js';
import { clearLoginInterval, closeBrowser } from './srcs/browser.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
const ZL_TOKEN = process.env.ZALO_TOKEN;

if (!ZL_TOKEN) { console.error('Need ZALO_TOKEN in .env'); process.exit(1); }

let Lasted_Mes = "", chat_id = "";
let enabled = false;
let processing = false;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const message = data.message?.text || data.message?.content || '';
        const sender = data.message?.chat?.id || data.message?.from?.id || data.sender?.id;
        
        if (message && sender) {
          Lasted_Mes = message.trim();
          chat_id = sender;
          console.log(`📩 Received: "${Lasted_Mes}" from ${chat_id}`);
        }
        res.writeHead(200);
        res.end('OK');
      } catch (e) { 
        console.error('Webhook error:', e);
        res.writeHead(200); 
        res.end('OK'); 
      }
    });
    return;
  }
  res.writeHead(200);
  res.end('HI');
});

server.listen(PORT, () => console.log(`🚀 Server running: http://localhost:${PORT}`));

// Main loop
while (true) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!Lasted_Mes || Lasted_Mes === '') continue;
  if (processing) continue;
  
  processing = true;
  const msg = Lasted_Mes;
  const chat = chat_id;
  
  console.log(`🔄 Processing: "${msg}", enabled: ${enabled}`);
  
  try {
    // ALWAYS handle /on and /help regardless of enabled state
    if (msg === '/on') {
      console.log('✅ Executing /on command');
      await command.Enable(chat);
      enabled = true;
      Lasted_Mes = '';
      processing = false;
      continue;
    }
    
    if (msg === '/help') {
      console.log('✅ Executing /help command');
      await command.Help(chat, enabled);
      Lasted_Mes = '';
      processing = false;
      continue;
    }
    
    // Only process other commands if enabled
    if (enabled) {
      if (msg === '/off') {
        console.log('✅ Executing /off command');
        await command.Disable(chat);
        enabled = false;
        clearLoginInterval();
        await closeBrowser();
        Lasted_Mes = '';
        processing = false;
        continue;
      }
      
      if (msg === '/status') {
        console.log('✅ Executing /status command');
        await command.StatusCommand(chat);
        Lasted_Mes = '';
        processing = false;
        continue;
      }
      
      if (msg === '/logout') {
        console.log('✅ Executing /logout command');
        await command.LogoutCommand(chat);
        Lasted_Mes = '';
        processing = false;
        continue;
      }
      
      if (msg === '/login') {
        console.log('✅ Executing /login command');
        await command.LoginCommand(chat);
        Lasted_Mes = '';
        processing = false;
        continue;
      }
      
      if (msg.startsWith('/chuoi')) {
        console.log('✅ Executing /chuoi command');
        const parts = msg.trim().split(/\s+/);
        const targetUser = parts.length > 1 ? parts[1] : '';
        await command.StreakCommand(chat, targetUser, process.env.STREAK_URL);
        Lasted_Mes = '';
        processing = false;
        continue;
      }
      
      // Unknown command when enabled
      console.log('⚠️ Unknown command:', msg);
      await command.Error(chat);
    } else {
      // Bot disabled, reject other commands
      if (msg !== '/on' && msg !== '/help') {
        console.log(`⚠️ Bot disabled, rejecting: "${msg}"`);
        await command.Error(chat);
      }
    }
  } catch (error) {
    console.error('❌ Command error:', error);
    try {
      await command.Error(chat);
    } catch (e) {}
  }
  
  Lasted_Mes = '';
  processing = false;
}