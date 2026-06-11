export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

function escapeCSV(val: unknown): string {
  const s = val == null ? '' : String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';

    let query = getAdminDb().collection('inquiries').orderBy('createdAt', 'desc');
    if (status && status !== 'all') {
      query = getAdminDb().collection('inquiries').where('status', '==', status).orderBy('createdAt', 'desc') as typeof query;
    }

    const snap = await query.get();

    const headers = [
      'ID', 'Timestamp', 'Name', 'Company', 'Phone', 'Email',
      'Commodity', 'Storage (MT)', 'Duration', 'Message', 'Status', 'Source',
    ];

    const rows = snap.docs.map((doc) => {
      const d = doc.data();
      return [
        doc.id,
        d.createdAt,
        d.name,
        d.companyName,
        d.phone,
        d.email,
        d.commodity,
        d.storageRequirement,
        d.duration,
        d.message,
        d.status,
        d.source,
      ].map(escapeCSV).join(',');
    });

    const csv = [headers.join(','), ...rows].join('\r\n');
    const filename = `yogesh-cold-storage-inquiries-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('[Admin] CSV export failed:', err);
    return NextResponse.json({ success: false, error: 'Export failed.' }, { status: 500 });
  }
}
