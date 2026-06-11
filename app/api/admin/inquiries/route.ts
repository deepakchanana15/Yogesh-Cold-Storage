export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const limit  = Math.min(parseInt(searchParams.get('limit') || '200'), 500);

    let query = getAdminDb().collection('inquiries').orderBy('createdAt', 'desc').limit(limit);

    if (status && status !== 'all') {
      query = getAdminDb()
        .collection('inquiries')
        .where('status', '==', status)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }

    const snap = await query.get();
    const inquiries = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ success: true, inquiries, count: inquiries.length });
  } catch (err) {
    console.error('[Admin] Failed to fetch inquiries:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries.' },
      { status: 500 }
    );
  }
}
