import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

let fbApp = null;
function getFirebase() {
  if (fbApp) return fbApp;
  
  let serviceAccount;
  try {
    const envKey = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (envKey) {
      serviceAccount = JSON.parse(envKey);
    } else {
      const keyPath = join(process.cwd(), 'capsulehouse-firebase-key.json');
      serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'));
    }
  } catch (e) {
    throw new Error('Firebase config: ' + e.message);
  }
  
  fbApp = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  return fbApp;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, status, data) {
  cors(res);
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json(data);
}

async function sendTelegram(lead, agent) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;
    
    let text = `🆕 Новая заявка с сайта!\n`;
    text += `Имя: ${lead.name || '-'}\n`;
    text += `Телефон: ${lead.phone || '-'}\n`;
    text += `Город: ${lead.city || '-'}\n`;
    text += `Дом: ${lead.houseName || 'Не указан'}\n`;
    text += `Количество: ${lead.houseCount || '1'} шт\n`;
    text += `Бюджет на 1 дом: ${lead.budgetPerHouse || '-'} ₽\n\n`;
    
    if (agent) {
      text += `👤 Агент: ${agent.fullName}\n📞 Телефон агента: ${agent.phone || '-'}\n✉️ Почта агента: ${agent.email || '-'}\n🔗 Реферальный код: ${agent.referralCode || '-'}`;
    } else if (lead.agentId) {
      text += `👤 Агент: ID ${lead.agentId}`;
    } else {
      text += `👤 Агент: не указан`;
    }
    
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: parseInt(chatId), text })
    });
  } catch (e) {
    console.error('Telegram error:', e);
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      cors(res);
      return res.status(204).end();
    }
    
    const url = new URL(req.url, `http://${req.headers.host}`);
    const parts = url.pathname.split('/').filter(Boolean);
    const firestore = getFirebase().firestore();
    const LEADS = 'galaxy_leads';
    const AGENTS = 'galaxy_agents';
    
    // GET /api/leads
    if (req.method === 'GET' && parts[1] === 'leads' && parts.length === 2) {
      const snap = await firestore.collection(LEADS).get();
      const leads = [];
      snap.forEach(d => leads.push({ id: d.id, ...d.data() }));
      return json(res, 200, leads);
    }
    
    // GET /api/agents
    if (req.method === 'GET' && parts[1] === 'agents' && parts.length === 2) {
      const snap = await firestore.collection(AGENTS).get();
      const agents = [];
      snap.forEach(d => agents.push({ id: d.id, ...d.data() }));
      return json(res, 200, agents);
    }
    
    // PUT /api/leads/:id
    if (req.method === 'PUT' && parts[1] === 'leads' && parts.length === 3) {
      const body = await parseBody(req);
      if (!body.name || !body.phone) {
        return json(res, 400, { ok: false, error: 'Name and phone required' });
      }
      
      await firestore.collection(LEADS).doc(parts[2]).set(body, { merge: true });
      
      let agentData = null;
      if (body.agentId) {
        const snap = await firestore.collection(AGENTS).where('id', '==', body.agentId).get();
        if (!snap.empty) agentData = snap.docs[0].data();
      }
      
      sendTelegram(body, agentData).catch(() => {});
      return json(res, 200, { ok: true, id: parts[2] });
    }
    
    // DELETE /api/leads/:id
    if (req.method === 'DELETE' && parts[1] === 'leads' && parts.length === 3) {
      await firestore.collection(LEADS).doc(parts[2]).delete();
      return json(res, 200, { ok: true });
    }
    
    return json(res, 404, { ok: false, error: 'Not found' });
    
  } catch (err) {
    console.error('API error:', err.message, err.stack);
    return json(res, 500, { ok: false, error: err.message });
  }
}
