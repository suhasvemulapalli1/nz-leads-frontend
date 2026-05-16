'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function QuoteForm({ serviceId, suburb, keyword }: { serviceId: string, suburb: string, keyword: string }) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from('leads').insert({
      customer_name: formData.get('name'),
      customer_phone: formData.get('phone'),
      service_id: parseInt(serviceId),
      suburb: suburb,
      keyword: keyword
    });

    if (!error) setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="bg-green-500 text-white p-8 rounded-2xl text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
        <p>A {keyword} specialist in {suburb} will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
      <h2 className="text-2xl font-bold mb-2">Request a Professional Quote in {suburb}</h2>
      <p className="mb-6 opacity-90">Enter your details and we'll connect you with a vetted {keyword} specialist.</p>
      
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" type="text" placeholder="Full Name" className="p-3 rounded-lg text-black outline-none" required />
        <input name="phone" type="tel" placeholder="NZ Phone Number" className="p-3 rounded-lg text-black outline-none" required />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 rounded-lg transition-all uppercase tracking-wider disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Get My Quote'}
        </button>
      </form>
    </div>
  );
}