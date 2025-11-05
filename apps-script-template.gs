/**
 * Web App: Fiesta Social 2024
 * - Acepta GET y POST.
 * - Parsea JSON, text/plain con JSON, y x-www-form-urlencoded.
 * - Normaliza "acompanantes".
 * - Evita preflight CORS apoyándose en el frontend (ver más abajo).
 */

const SHEET_ID = 'REEMPLAZA_CON_EL_ID_DE_TU_HOJA';
const SHEET_NAME = 'Datos de Invitados';
const MAX_COMPANIONS = 5;

const HEADER_ROW = (() => {
  const base = [
    'Fecha (servidor)',
    'Fecha enviada (cliente)',
    'Mesa',
    'Grado',
    'Escalafón',
    'Nombre',
    'Apellido',
    'Cédula',
    'Correo',
    'Menú titular',
    '¿Acompañante?',
    'Cantidad de acompañantes'
  ];
  for (let i = 1; i <= MAX_COMPANIONS; i++) {
    base.push(`Acompañante ${i} - Nombre`);
    base.push(`Acompañante ${i} - Menú`);
  }
  base.push('JSON original');
  return base;
})();

function doGet(e)  { return handleSubmission_(e); }
function doPost(e) { return handleSubmission_(e); }

function handleSubmission_(e) {
  const lock = LockService.getScriptLock();
  try {
    if (e?.parameter?.ping === '1') {
      return asJSON_({ success: true, ping: true, time: new Date().toISOString() });
    }

    const data = parsePayload_(e);
    const sheet = resolveSheet_();
    ensureHeader_(sheet);

    lock.tryLock(5000);
    sheet.appendRow(buildRow_(data));

    return asJSON_({ success: true });
  } catch (error) {
    console.error('Error al guardar la reserva', error);
    return asJSON_({ success: false, message: (error && error.message) || 'Error inesperado' });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function parsePayload_(e) {
  if (!e) throw new Error('Solicitud vacía');

  let data = {};
  const type = (e.postData && e.postData.type) || '';
  const body = e.postData && e.postData.contents;

  if (type.includes('application/json')) {
    data = safeJSON_(body, {});
  } else if (type.toLowerCase().startsWith('text/plain')) {
    data = safeJSON_((body || ''), {});
  } else if (type === 'application/x-www-form-urlencoded') {
    // Los datos vendrán en e.parameter; no hacemos nada aquí.
  } else if (!type && e.parameter && e.parameter.payload) {
    data = safeJSON_(e.parameter.payload, {});
  }

  const params = e.parameter || {};
  Object.keys(params).forEach(key => {
    if (key === 'payload') return;
    if (data[key] === undefined) data[key] = tryParse_(params[key]);
  });

  if (!data.submittedAt && params.submittedAt) data.submittedAt = params.submittedAt;

  const rawCompanions = (data.acompanantes !== undefined)
    ? data.acompanantes
    : params.acompanantes;
  data.acompanantes = normalizeCompanions_(rawCompanions);

  return data;
}

function safeJSON_(value, fallback) {
  try { return JSON.parse(value || ''); } catch (error) { return fallback; }
}

function tryParse_(value) {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (!isNaN(trimmed)) {
    const numeric = Number(trimmed);
    if (!isNaN(numeric)) return numeric;
  }
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    const parsed = safeJSON_(trimmed, undefined);
    if (parsed !== undefined) return parsed;
  }
  return trimmed;
}

function normalizeCompanions_(raw) {
  let companions = [];

  if (Array.isArray(raw)) {
    companions = raw;
  } else if (raw && typeof raw === 'string') {
    const parsed = safeJSON_(raw, null);
    if (Array.isArray(parsed)) {
      companions = parsed;
    } else {
      companions = raw
        .split(/[|;,]/)
        .map(item => item.trim())
        .filter(Boolean)
        .map(nombre => ({ nombre, menu: '' }));
    }
  }

  return companions
    .filter(Boolean)
    .map(entry => {
      if (typeof entry === 'string') {
        return { nombre: entry, menu: '' };
      }
      if (typeof entry === 'object') {
        return {
          nombre: sanitizeText_(entry.nombre),
          menu: sanitizeText_(entry.menu)
        };
      }
      return { nombre: sanitizeText_(String(entry)), menu: '' };
    })
    .slice(0, MAX_COMPANIONS);
}

function sanitizeText_(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function resolveSheet_() {
  let spreadsheet = null;

  if (SHEET_ID && SHEET_ID !== 'REEMPLAZA_CON_EL_ID_DE_TU_HOJA') {
    spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  } else {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error('Falta SHEET_ID o el proyecto no está vinculado a una hoja.');
    }
  }

  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(HEADER_ROW);
}

function buildRow_(data) {
  const timestamp = new Date();
  const companions = Array.isArray(data.acompanantes) ? data.acompanantes : [];

  const cantidadAcompanantes =
    data.cantidadAcompanantes != null ? data.cantidadAcompanantes : companions.length;

  const acompFlag =
    data.acompanante != null ? sanitizeText_(data.acompanante) : (companions.length > 0 ? 'Sí' : 'No');

  const row = [
    timestamp,
    sanitizeText_(data.submittedAt),
    sanitizeText_(data.mesa),
    sanitizeText_(data.grado),
    sanitizeText_(data.escalafon),
    sanitizeText_(data.nombre),
    sanitizeText_(data.apellido),
    sanitizeText_(data.cedula),
    sanitizeText_(data.correo),
    sanitizeText_(data.menu),
    acompFlag,
    cantidadAcompanantes
  ];

  companions.forEach(companion => {
    row.push(sanitizeText_(companion.nombre));
    row.push(sanitizeText_(companion.menu));
  });

  for (let i = companions.length; i < MAX_COMPANIONS; i++) {
    row.push('');
    row.push('');
  }

  row.push(JSON.stringify(data));
  return row;
}

function asJSON_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
