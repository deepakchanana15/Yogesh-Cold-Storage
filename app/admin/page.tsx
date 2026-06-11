'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Leaf, LogOut, RefreshCw, Download, Search, Filter,
  ChevronDown, Users, AlertCircle, Phone, Mail, Package,
  Calendar, Loader2, CheckCircle2, X,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = 'New' | 'Contacted' | 'Quoted' | 'Converted' | 'Closed';

interface Inquiry {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  commodity: string;
  storageRequirement: string;
  duration: string;
  message: string;
  createdAt: string;
  status: Status;
  source: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUSES: Status[] = ['New', 'Contacted', 'Quoted', 'Converted', 'Closed'];

const STATUS_STYLES: Record<Status, string> = {
  New:       'bg-blue-100 text-blue-700 border-blue-200',
  Contacted: 'bg-amber-100 text-amber-700 border-amber-200',
  Quoted:    'bg-purple-100 text-purple-700 border-purple-200',
  Converted: 'bg-green-100 text-green-700 border-green-200',
  Closed:    'bg-steel-100 text-steel-500 border-steel-200',
};

const STAT_CONFIGS = [
  { label: 'Total',     key: 'total',     color: 'border-t-green-600',  icon: Users },
  { label: 'New',       key: 'New',       color: 'border-t-blue-500',   icon: AlertCircle },
  { label: 'Contacted', key: 'Contacted', color: 'border-t-amber-500',  icon: Phone },
  { label: 'Quoted',    key: 'Quoted',    color: 'border-t-purple-500', icon: Package },
  { label: 'Converted', key: 'Converted', color: 'border-t-green-500',  icon: CheckCircle2 },
  { label: 'Closed',    key: 'Closed',    color: 'border-t-steel-400',  icon: X },
];

function formatDate(iso: string) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
    });
  } catch { return iso; }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();

  const [inquiries,   setInquiries]   = useState<Inquiry[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [search,      setSearch]      = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterComm,  setFilterComm]  = useState<string>('all');
  const [updatingId,  setUpdatingId]  = useState<string | null>(null);
  const [toast,       setToast]       = useState<{ msg: string; ok: boolean } | null>(null);
  const [exporting,   setExporting]   = useState(false);

  // ── Fetch ────────────────────────────────────────────────────────────────

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/inquiries');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      if (data.success) setInquiries(data.inquiries);
      else setError(data.error || 'Failed to load inquiries.');
    } catch {
      setError('Network error. Could not load inquiries.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Derived data ──────────────────────────────────────────────────────────

  const stats: Record<string, number> = { total: inquiries.length };
  STATUSES.forEach((s) => { stats[s] = inquiries.filter((i) => i.status === s).length; });

  const commodities = ['all', ...Array.from(new Set(inquiries.map((i) => i.commodity).filter(Boolean)))];

  const filtered = inquiries.filter((i) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.phone.includes(q) ||
      i.email.toLowerCase().includes(q) ||
      i.companyName.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    const matchComm   = filterComm   === 'all' || i.commodity === filterComm;
    return matchSearch && matchStatus && matchComm;
  });

  // ── Actions ───────────────────────────────────────────────────────────────

  async function updateStatus(id: string, status: Status) {
    setUpdatingId(id);
    try {
      const res  = await fetch(`/api/admin/inquiry/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
        setToast({ msg: `Status updated to "${status}"`, ok: true });
      } else {
        setToast({ msg: data.error || 'Update failed.', ok: false });
      }
    } catch {
      setToast({ msg: 'Network error during update.', ok: false });
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function handleExport() {
    setExporting(true);
    try {
      const qs  = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const res = await fetch(`/api/admin/export${qs}`);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setToast({ msg: 'Export failed. Please try again.', ok: false });
    } finally {
      setExporting(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-green-50">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${toast.ok ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
          {toast.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-green-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
              <Leaf size={15} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-green-900 text-sm">Yogesh Cold Storage</span>
              <span className="text-steel-400 text-xs ml-2">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="flex items-center gap-1.5 text-xs text-steel-500 hover:text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-50 border border-green-100 transition-all"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-steel-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 border border-green-100 transition-all"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-green-950">Inquiry Dashboard</h1>
          <p className="text-steel-500 text-sm mt-1">All customer inquiries from the website</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {STAT_CONFIGS.map(({ label, key, color, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key === 'total' ? 'all' : key)}
              className={`bg-white rounded-2xl p-4 border border-green-200 border-t-4 ${color} text-left hover:shadow-green-sm transition-all ${(filterStatus === key || (key === 'total' && filterStatus === 'all')) ? 'ring-2 ring-green-500 ring-offset-1' : ''}`}
            >
              <Icon size={16} className="text-green-600 mb-2" />
              <div className="text-xl font-bold text-green-950">{stats[key] ?? 0}</div>
              <div className="text-steel-500 text-xs">{label}</div>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-green-200 p-4 mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, email…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-green-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2 text-sm border border-green-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-steel-400 pointer-events-none" />
            </div>

            {/* Commodity filter */}
            <div className="relative">
              <Package size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
              <select
                value={filterComm}
                onChange={(e) => setFilterComm(e.target.value)}
                className="appearance-none pl-8 pr-8 py-2 text-sm border border-green-200 rounded-lg bg-green-50 focus:outline-none focus:border-green-500 cursor-pointer"
              >
                <option value="all">All Commodities</option>
                {commodities.filter((c) => c !== 'all').map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-steel-400 pointer-events-none" />
            </div>
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 border border-green-300 hover:border-green-500 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Export CSV
          </button>
        </div>

        {/* Results count */}
        <div className="text-xs text-steel-400 mb-3 px-1">
          Showing {filtered.length} of {inquiries.length} inquiries
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-steel-400">
              <Loader2 size={20} className="animate-spin text-green-500" />
              <span className="text-sm">Loading inquiries…</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20 gap-3 text-red-500">
              <AlertCircle size={18} />
              <span className="text-sm">{error}</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-steel-400">
              <Package size={36} className="mx-auto mb-3 text-green-300" />
              <p className="text-sm font-medium text-green-900">No inquiries found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-50 border-b border-green-200">
                    {['Name / Company', 'Contact', 'Commodity', 'Requirement', 'Date', 'Status', 'Action'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inq, idx) => (
                    <tr
                      key={inq.id}
                      className={`border-b border-green-100 hover:bg-green-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}`}
                    >
                      {/* Name / Company */}
                      <td className="px-4 py-3 max-w-[180px]">
                        <div className="font-semibold text-green-900 truncate">{inq.name}</div>
                        {inq.companyName && (
                          <div className="text-steel-500 text-xs truncate">{inq.companyName}</div>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="px-4 py-3">
                        <a href={`tel:+91${inq.phone}`} className="flex items-center gap-1 text-green-700 hover:text-green-900 font-medium whitespace-nowrap">
                          <Phone size={11} />
                          {inq.phone}
                        </a>
                        {inq.email && (
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-1 text-steel-400 hover:text-green-700 text-xs mt-0.5 truncate max-w-[160px]">
                            <Mail size={10} />
                            {inq.email}
                          </a>
                        )}
                      </td>

                      {/* Commodity */}
                      <td className="px-4 py-3 text-steel-600 whitespace-nowrap">
                        {inq.commodity || '—'}
                      </td>

                      {/* Requirement */}
                      <td className="px-4 py-3 text-steel-600 whitespace-nowrap">
                        {inq.storageRequirement ? `${inq.storageRequirement} MT` : '—'}
                        {inq.duration && (
                          <div className="text-xs text-steel-400">{inq.duration}</div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-steel-500 text-xs">
                          <Calendar size={11} />
                          {formatDate(inq.createdAt)}
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[inq.status]}`}>
                          {inq.status}
                        </span>
                      </td>

                      {/* Status dropdown */}
                      <td className="px-4 py-3">
                        {updatingId === inq.id ? (
                          <Loader2 size={16} className="animate-spin text-green-500" />
                        ) : (
                          <div className="relative">
                            <select
                              value={inq.status}
                              onChange={(e) => updateStatus(inq.id, e.target.value as Status)}
                              className="appearance-none text-xs border border-green-200 rounded-lg bg-white px-2.5 py-1.5 pr-6 focus:outline-none focus:border-green-500 cursor-pointer"
                            >
                              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-steel-400 pointer-events-none" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Message preview panel — shown if a row has a message */}
        {filtered.some((i) => i.message) && (
          <div className="mt-6 bg-white rounded-2xl border border-green-200 p-4">
            <h3 className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-3">Customer Messages</h3>
            <div className="space-y-3">
              {filtered.filter((i) => i.message).map((i) => (
                <div key={i.id} className="flex gap-3 text-sm">
                  <div className="font-semibold text-green-900 whitespace-nowrap w-32 shrink-0 truncate">{i.name}</div>
                  <div className="text-steel-500 leading-relaxed">{i.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
