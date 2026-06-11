'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  commodity: string;
  storageRequirement: string;
  duration: string;
  message: string;
}

interface InquiryFormProps {
  sourcePage?: string;
  compact?: boolean;
}

const COMMODITIES = [
  'Potato',
  'Apple',
  'Onion',
  'Garlic',
  'Other Vegetables',
  'Other Fruits',
  'FMCG Products',
  'Other / Multiple Commodities',
];

const DURATIONS = [
  '1 Month',
  '2 – 3 Months',
  '3 – 6 Months',
  '6 Months – 1 Year',
  'More than 1 Year',
  'Seasonal (as needed)',
];

export default function InquiryForm({ sourcePage = 'Website', compact = false }: InquiryFormProps) {
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    commodity: '',
    storageRequirement: '',
    duration: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      return 'Please enter a valid 10-digit Indian mobile number.';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      return 'Please enter a valid email address.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/submit-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sourcePage }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({
        name: '',
        company: '',
        phone: '',
        email: '',
        commodity: '',
        storageRequirement: '',
        duration: '',
        message: '',
      });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please call us directly or try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-display font-bold text-green-950">Inquiry Submitted!</h3>
        <p className="text-steel-600 max-w-sm">
          Thank you. We will contact you within 24 hours to discuss storage availability.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-green-700 text-sm underline underline-offset-2 hover:text-green-900"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="form-label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="form-input"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="form-label">
            Company / Farm Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Business or farm name"
            className="form-input"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="form-label">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            className="form-input"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com (optional)"
            className="form-input"
          />
        </div>

        {/* Commodity */}
        <div>
          <label htmlFor="commodity" className="form-label">
            Commodity Type
          </label>
          <select
            id="commodity"
            name="commodity"
            value={form.commodity}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select commodity</option>
            {COMMODITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Storage Requirement */}
        <div>
          <label htmlFor="storageRequirement" className="form-label">
            Storage Required (MT)
          </label>
          <input
            id="storageRequirement"
            name="storageRequirement"
            type="text"
            value={form.storageRequirement}
            onChange={handleChange}
            placeholder="e.g., 50 MT"
            className="form-input"
          />
        </div>

        {/* Duration */}
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label htmlFor="duration" className="form-label">
            Expected Storage Duration
          </label>
          <select
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select duration</option>
            {DURATIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      {!compact && (
        <div>
          <label htmlFor="message" className="form-label">
            Additional Requirements
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Any specific requirements, questions, or details..."
            className="form-input resize-none"
          />
        </div>
      )}

      {/* Error */}
      {status === 'error' && errorMsg && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle size={16} className="shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Honeypot anti-spam */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-green-sm hover:shadow-green-md text-sm"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={16} />
            Submit Inquiry
          </>
        )}
      </button>

      <p className="text-steel-400 text-xs text-center">
        We respond within 24 hours. Your data is secure and never shared.
      </p>
    </form>
  );
}
