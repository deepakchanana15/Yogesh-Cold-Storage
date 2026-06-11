import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// ── Lazy singleton — never initialises at module load time ───────────────────
// This prevents build-time crashes when credentials aren't in .env.local yet.

let _db: Firestore | null = null;

export function getAdminDb(): Firestore {
  if (_db) return _db;

  // Re-use existing app if already initialised (e.g. hot reload in dev)
  if (getApps().length === 0) {
    const projectId   = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey  = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        '[Firebase Admin] Missing credentials. ' +
        'Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local\n' +
        'See FIREBASE_SETUP.md for instructions.'
      );
    }

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        // Service account keys use literal \n — convert to real newlines
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  }

  _db = getFirestore();

  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log('[Firebase Admin] Using Firestore emulator at', process.env.FIRESTORE_EMULATOR_HOST);
  }

  return _db;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type InquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Closed';

export interface Inquiry {
  id?: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  commodity: string;
  storageRequirement: string;
  duration: string;
  message: string;
  createdAt: string;       // ISO string
  status: InquiryStatus;
  source: string;
}
