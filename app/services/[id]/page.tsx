import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: services } = await supabase
    .from('nz_leads_pool')
    .select('id, keyword, suburb')
    .eq('processed_by_ai', true);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            NZ Business <span className="text-blue-600">Asset Engine</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Connecting high-ticket New Zealand service providers with local demand in every suburb.
          </p>
        </div>
      </header>

      {/* Directory Section */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Available Service Hubs</h2>
          <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
            {services?.length || 0} Assets Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services?.map((s) => (
            <Link 
              key={s.id} 
              href={`/services/${s.id}`}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {s.keyword}
                  </h3>
                  <p className="text-slate-500 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {s.suburb}, NZ
                  </p>
                </div>
                <span className="text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                  View Asset →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {services?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No assets have been processed by the AI harvester yet.</p>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="text-center py-12 text-slate-400 text-sm">
        &copy; 2026 NZ Asset Engine • Built for the New Zealand Market
      </footer>
    </div>
  );
}