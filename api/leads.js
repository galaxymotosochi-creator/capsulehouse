import admin from 'firebase-admin';

// Initialize Firebase Admin (singleton)
let fbApp = null;
function getFirebase() {
  if (fbApp) return fbApp;
  
  let serviceAccount;
  try {
    const envKey = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (envKey) {
      serviceAccount = JSON.parse(envKey);
    } else {
      // Fallback for local dev - not used on Vercel
      const { readFileSync } = await import('fs');
      const { join } = await import('path');
      const keyPath = join(process.cwd(), 'capsulehouse-firebase-key.json');
      serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'));
    }
  } catch (e) {
    throw new Error('Firebase service account not configured: ' + e.message);
  }
  
  fbApp = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  return fbApp;
}

function json(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json(data);
}

async function sendTelegram(lead, agent) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN || '8897088626:AAHD9v9kGhGm9QvkRyUh33hvmH4cSQMzZw';
    const chatId = process.env.TELEGRAM_CHAT_ID || '5368408796';
    
    let text = `🆕 Новая заявка с сайта!\n`;
    text += `Имя: ${lead.name || '-'}\n`;
    text += `Телефон: ${lead.phone || '-'}\n`;
    text += `Город: ${lead.city || '-'}\n`;
    text += `Дом: ${lead.houseName || 'Не указан'}\n`;
    text += `Количество: ${lead.houseCount || '1'} шт\n`;
    text += `Бюджет на 1 дом: ${lead.budgetPerHouse || '-'} ₽\n\n`;
    
    if (agent) {
      text += `👤 Агент: ${agent.fullName}\n`;
      text += `📞 Телефон агента: ${agent.phone || '-'}\n`;
      text += `✉️ Почта агента: ${agent.email || '-'}\n`;
      text += `🔗 Реферальный код: ${agent.referralCode || '-'}`;
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
      catch { reject(new Error('Invalid JSON body')); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split('/').filter(Boolean);
  
  try {
    const firestore = getFirebase().firestore();
    const LEADS_COLL = 'galaxy_leads';
    const AGENTS_COLL = 'galaxy_agents';
    
    // GET /api/leads
    if (req.method === 'GET' && parts.length === 2 && parts[1] === 'leads') {
      const snapshot = await firestore.collection(LEADS_COLL).get();
      const leads = [];
      snapshot.forEach(doc => leads.push({ id: doc.id, ...doc.data() }));
      return json(res, 200, leads);
    }
    
    // GET /api/agents
    if (req.method === 'GET' && parts.length === 2 && parts[1] === 'agents') {
      const snapshot = await firestore.collection(AGENTS_COLL).get();
      const agents = [];
      snapshot.forEach(doc => agents.push({ id: doc.id, ...doc.data() }));
      return json(res, 200, agents);
    }
    
    // PUT /api/leads/:id
    if (req.method === 'PUT' && parts.length === 3 && parts[1] === 'leads') {
      const leadId = parts[2];
      const body = await parseBody(req);
      
      if (!body.name || !body.phone) {
        return json(res, 400, { ok: false, error: 'Name and phone required' });
      }
      
      // Save lead to Firestore
      await firestore.collection(LEADS_COLL).doc(leadId).set(body, { merge: true });
      
      // Find agent by ID
      let agentData = null;
      if (body.agentId) {
        const agentSnap = await firestore.collection(AGENTS_COLL)
          .where('id', '==', body.agentId).get();
        if (!agentSnap.empty) {
          agentData = agentSnap.docs[0].data();
        }
      }
      
      // Send Telegram notification (fire and forget)
      if (body.notifyTelegram !== false) {
        sendTelegram(body, agentData).catch(() => {});
      }
      
      return json(res, 200, { ok: true, id: leadId });
    }
    
    // DELETE /api/leads/:id
    if (req.method === 'DELETE' && parts.length === 3 && parts[1] === 'leads') {
      const leadId = parts[2];
      await firestore.collection(LEADS_COLL).doc(leadId).delete();
      return json(res, 200, { ok: true });
    }
    
    return json(res, 404, { ok: false, error: 'Not found' });
    
  } catch (err) {
    console.error('API error:', err);
    return json(res, 500, { ok: false, error: err.message });
  }
}
