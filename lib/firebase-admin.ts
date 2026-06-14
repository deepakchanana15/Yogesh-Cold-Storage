import { getApps, initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let _db: Firestore | null = null;

export function getAdminDb(): Firestore {
  if (_db) return _db;

  if (getApps().length === 0) {
    const projectId   = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey  = process.env.FIREBASE_PRIVATE_KEY;

    // Clean up private key: strip outer quotes and convert escaped newlines
    const cleanKey = privateKey
      ? privateKey.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n')
      : '';

    const hasExplicitCreds = clientEmail && cleanKey.includes('BEGIN');

    if (hasExplicitCreds) {
      // Use service account credentials (local dev with .env.local)
      initializeApp({
        credential: cert({
          projectId:   projectId!,
          clientEmail: clientEmail!,
          privateKey:  cleanKey,
        }),
      });
      console.log('[Firebase Admin] Initialised with service account credentials');
    } else {
      // Application Default Credentials — works automatically on Firebase App Hosting
      // The backend service account has Firestore access within the same project
      initializeApp({
        credential: applicationDefault(),
        projectId:  projectId || process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
      });
      console.log('[Firebase Admin] Initialised with Application Default Credentials');
    }
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
  createdAt: string;
  status: InquiryStatus;
  source: string;
}
