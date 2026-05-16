import { createClient } from '@supabase/supabase-js';
import QuoteForm from '@/app/components/QuoteForm';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Build-safe initialization to prevent Vercel deployment crashes
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export default async function ServicePage({ params }: { params: { id: string } }) {
  // Await params as required by modern Next.js versions
  const { id } = await params;

  if (!supabase) {
    return <div className="p-10 text-center">Database configuration missing.</div>;
  }

  const { data: pageData, error } = await supabase
    .from('nz_leads_pool')
    .select('*')
    .eq('id', parseInt(id))
    .single();

  if (error || !pageData) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-xl font-bold text-red-600">Asset Not Found</h1>
        <p className="text-gray-500 text-sm mt-2">ID {id} does not exist in your database.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
      {/* Dynamic Header based on AI-generated Title */}
      <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
        {pageData.page_title}
      </h1>
      
      {/* AI-Generated Educational Content */}
      <div className="prose prose-lg text-gray-700 mb-12">
        <p className="whitespace-pre-wrap leading-relaxed text-lg">
          {pageData.educational_content}
        </p>
      </div>

      <hr className="border-slate-200 mb-12" />

      {/* The Interactive Lead Capture Component */}
      <QuoteForm 
        serviceId={id} 
        suburb={pageData.suburb} 
        keyword={pageData.keyword} 
      />

      {/* Trust Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
        Connect with vetted local {pageData.keyword} specialists in {pageData.suburb}, New Zealand.
      </footer>
    </div>
  );
}