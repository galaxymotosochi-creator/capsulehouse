import admin from 'firebase-admin';

let fb = null;
function init() {
  if (fb) return fb;
  const key = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!key) throw Error('FB key missing');
  fb = admin.initializeApp({credential:admin.credential.cert(JSON.parse(key))});
  return fb;
}

function json(res,s,d) {
  ['Access-Control-Allow-Origin','Access-Control-Allow-Methods','Access-Control-Allow-Headers'].forEach(h=>res.setHeader(h,'*'));
  res.setHeader('Content-Type','application/json');
  return res.status(s).json(d);
}

export default async function handler(req,res) {
  if (req.method==='OPTIONS') {json(res,204,{});return;}
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split('/').filter(Boolean);
  
  try {
    const db = init().firestore();
    const COLL = 'galaxy_activities';
    
    // GET /api/activities
    if (req.method==='GET' && parts.length===2) {
      const snap = await db.collection(COLL).orderBy('createdAt','desc').get();
      const items = [];
      snap.forEach(d => items.push({id:d.id,...d.data()}));
      return json(res,200,items);
    }
    
    // GET /api/activities/by-agent/:agentId
    if (req.method==='GET' && parts.length===4 && parts[2]==='by-agent') {
      const agentId = parts[3];
      const snap = await db.collection(COLL).where('agentId','==',agentId).orderBy('createdAt','desc').get();
      const items = [];
      snap.forEach(d => items.push({id:d.id,...d.data()}));
      return json(res,200,items);
    }
    
    // PUT /api/activities/:id
    if (req.method==='PUT' && parts.length===3) {
      const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
      if (!body.type || !body.agentId) return json(res,400,{ok:false,error:'type+agentId required'});
      await db.collection(COLL).doc(parts[2]).set({...body,createdAt:body.createdAt||new Date().toISOString()},{merge:true});
      return json(res,200,{ok:true,id:parts[2]});
    }
    
    return json(res,404,{ok:false,error:'Not found'});
  } catch(e) { console.error(e); return json(res,500,{ok:false,error:e.message}); }
}
