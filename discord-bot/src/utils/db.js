import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');
const STORE_PATH = join(DATA_DIR, 'store.json');

const DEFAULT_STORE = {
  price: { buy: null, sell: null, updatedAt: null, updatedBy: null },
  warnings: {},
  tickets: {},
  dealCounter: 0,
};

function ensureStore() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(STORE_PATH)) writeFileSync(STORE_PATH, JSON.stringify(DEFAULT_STORE, null, 2));
}

export function readStore() {
  ensureStore();
  return JSON.parse(readFileSync(STORE_PATH, 'utf-8'));
}

export function writeStore(store) {
  ensureStore();
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}
