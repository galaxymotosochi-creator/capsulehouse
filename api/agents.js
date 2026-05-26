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
    throw new Error('Firebase: ' + e.message);
  }
  
  fbApp = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  return fbApp;
}

function json(res, status, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json(data);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  
  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }
  
  try {
    const firestore = getFirebase().firestore();
    const snap = await firestore.collection('galaxy_agents').get();
    const agents = [];
    snap.forEach(d => agents.push({ id: d.id, ...d.data() }));
    return json(res, 200, agents);
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: err.message });
  }
}
