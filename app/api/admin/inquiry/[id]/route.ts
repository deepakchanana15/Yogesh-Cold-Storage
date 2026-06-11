export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, InquiryStatus } from '@/lib/firebase-admin';

const VALID_STATUSES: InquiryStatus[] = ['New', 'Contacted', 'Quoted', 'Converted', 'Closed'];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Missing inquiry ID.' }, { status: 400 });
  }

  const { status } = await req.json().catch(() => ({ status: '' }));

  if (!status || !VALID_STATUSES.includes(status as InquiryStatus)) {
    return NextResponse.json(
      { success: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    );
  }

  try {
    const ref = getAdminDb().collection('inquiries').doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return NextResponse.json({ success: false, error: 'Inquiry not found.' }, { status: 404 });
    }

    await ref.update({ status, updatedAt: new Date().toISOString() });

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    console.error('[Admin] Status update failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update status.' },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const doc = await getAdminDb().collection('inquiries').doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, inquiry: { id: doc.id, ...doc.data() } });
  } catch (err) {
    console.error('[Admin] Fetch inquiry failed:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch.' }, { status: 500 });
  }
}
