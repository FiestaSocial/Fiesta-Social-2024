const SHEET_ID   = '13TU5Qzi7L1mqFY4DInLB_1iFHstz5nfeM-A-C-a9NvI';
const SHEET_NAME = 'Datos de invitados';  // nombre EXACTO de la pestaña (solapa)
const MAX_COMPANIONS = 5;

const HEADER_ROW = (() => {
  const base = [
    'Fecha (servidor)','Fecha enviada (cliente)','Mesa','Grado','Escalafón',
    'Nombre','Apellido','Cédula','Correo','Menú titular','¿Acompañante?','Cantidad de acompañantes'
  ];
  for (let i = 1; i <= MAX_COMPANIONS; i++) { base.push(`Acompañante ${i} - Nombre`, `Acompañante ${i} - Menú`); }
  base.push('JSON original');
  return base;
})();

function doGet(e) {
  if (e?.parameter?.ping === '1') {
    return asJSON_({ ok: true, ping: true, time: new Date().toISOString() });
  }
  if (e?.parameter?.debug === '1') {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const names = ss.getSheets().map(s => s.getName());
    const exists = !!ss.getSheetByName(SHEET_NAME);
    return asJSON_({ ok: true, sheetId: SHEET_ID, targetSheet: SHEET_NAME, targetExists: exists, sheets: names });
  }
  if (e?.parameter?.create === '1') {
    const sh = resolveSheet_(); ensureHeader_(sh);
    return asJSON_({ ok: true, createdOrFound: sh.getName() });
  }
  if (e?.parameter?.read === '1') {
    const sh = resolveSheet_(); ensureHeader_(sh);
    const limit = Math.max(1, Math.min(Number(e.parameter.limit || 500), 5000));
    const rows = Math.min(sh.getLastRow(), limit);
    const values = rows ? sh.getRange(1,1,rows,sh.getLastColumn()).getValues() : [];
    return asJSON_({ ok: true, values });
  }
  return asJSON_({ ok: true, info: 'Usa POST para guardar; GET ?read=1 para leer; ?debug=1 para diagnosticar.' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    const data = parsePayload_(e);
    const sh = resolveSheet_(); ensureHeader_(sh);
    sh.appendRow(buildRow_(data));
    return asJSON_({ ok: true });
  } catch (error) {
    console.error(error);
    return asJSON_({ ok: false, error: String(error && error.message || error) });
  } finally { try { lock.releaseLock(); } catch (_) {} }
}

function parsePayload_(e) {
  if (!e) throw new Error('Solicitud vacía');
  const type = ((e.postData && e.postData.type) || '').toLowerCase();
  const body = e.postData && e.postData.contents;
  const params = e.parameter || {};

  let data = {};
  if (type.includes('application/json')) {
    data = safeJSON_(body, {});
  } else if (type.startsWith('text/plain')) {
    data = safeJSON_(body, {});
  } else if (type.includes('application/x-www-form-urlencoded')) {
    // datos en e.parameter
  } else if (!type && params.payload) {
    data = safeJSON_(params.payload, {});
  }

  Object.keys(params).forEach(k => { if (k !== 'payload' && data[k] === undefined) data[k] = tryParse_(params[k]); });
  if (!data.submittedAt && params.submittedAt) data.submittedAt = params.submittedAt;

  const rawComp = (data.acompanantes !== undefined) ? data.acompanantes : params.acompanantes;
  data.acompanantes = normalizeCompanions_(rawComp);
  return data;
}

function safeJSON_(v, fb) { try { return JSON.parse(v || ''); } catch { return fb; } }
function tryParse_(v) {
  if (v === undefined || v === null) return '';
  if (typeof v !== 'string') return v;
  const t = v.trim(); if (!t) return '';
  if (t === 'true') return true; if (t === 'false') return false;
  if (!isNaN(t)) { const n = Number(t); if (!isNaN(n)) return n; }
  if ((t.startsWith('{') && t.endsWith('}')) || (t.startsWith('[') && t.endsWith(']'))) {
    const p = safeJSON_(t, undefined); if (p !== undefined) return p;
  }
  return t;
}
function normalizeCompanions_(raw) {
  let a = [];
  if (Array.isArray(raw)) a = raw;
  else if (raw && typeof raw === 'string') {
    const parsed = safeJSON_(raw, null);
    a = Array.isArray(parsed) ? parsed :
      raw.split(/[|;,]/).map(s => s.trim()).filter(Boolean).map(nombre => ({ nombre, menu: '' }));
  }
  return a.filter(Boolean).map(e => {
    if (typeof e === 'string') return { nombre: e, menu: '' };
    if (typeof e === 'object') return { nombre: sanitizeText_(e.nombre), menu: sanitizeText_(e.menu) };
    return { nombre: sanitizeText_(String(e)), menu: '' };
  }).slice(0, MAX_COMPANIONS);
}
function sanitizeText_(v){ return (v===undefined||v===null) ? '' : String(v).trim(); }

function resolveSheet_() {
  if (!SHEET_ID) throw new Error('Falta SHEET_ID');
  const ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}
function ensureHeader_(sh){ if (sh.getLastRow() === 0) sh.appendRow(HEADER_ROW); }

function buildRow_(d) {
  const t = new Date();
  const comps = Array.isArray(d.acompanantes) ? d.acompanantes : [];
  const cant = d.cantidadAcompanantes != null ? d.cantidadAcompanantes : comps.length;
  const acompFlag = d.acompanante != null ? sanitizeText_(d.acompanante) : (comps.length > 0 ? 'Sí' : 'No');
  const row = [
    t, sanitizeText_(d.submittedAt), sanitizeText_(d.mesa), sanitizeText_(d.grado),
    sanitizeText_(d.escalafon), sanitizeText_(d.nombre), sanitizeText_(d.apellido),
    sanitizeText_(d.cedula), sanitizeText_(d.correo), sanitizeText_(d.menu), acompFlag, cant
  ];
  comps.forEach(c => { row.push(sanitizeText_(c.nombre), sanitizeText_(c.menu)); });
  for (let i = comps.length; i < MAX_COMPANIONS; i++) { row.push('',''); }
  row.push(JSON.stringify(d));
  return row;
}
function asJSON_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
