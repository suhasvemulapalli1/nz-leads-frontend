import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ServicePage({ params }: { params: { id: string } }) {
  // We await params in the new version of Next.js
  const { id } = await params;

  const { data: pageData, error } = await supabase
    .from('nz_leads_pool')
    .select('*')
    .eq('id', parseInt(id)) // Ensure ID is treated as a number
    .single();

  if (error || !pageData) {
    console.error("Supabase Error:", error);
    return (
      <div className="p-20 text-center">
        <h1 className="text-xl font-bold text-red-600">Asset Not Found</h1>
        <p className="text-gray-500">ID {id} returned no data from Supabase.</p>
        <p className="text-xs mt-4 text-gray-400">Check your Browser Console (F12) for details.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">{pageData.page_title}</h1>
      
      <div className="prose prose-lg text-gray-700 mb-10">
        {/* Use white-space-pre-wrap to keep the formatting neat */}
        <p className="whitespace-pre-wrap">{pageData.educational_content}</p>
      </div>

      <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Request a Professional Quote in {pageData.suburb}</h2>
        <p className="mb-6 opacity-90">Enter your details and we'll connect you with a vetted {pageData.keyword} specialist.</p>
        
        <form className="grid gap-4">
          <input type="text" placeholder="Full Name" className="p-3 rounded-lg text-black outline-none" required />
          <input type="tel" placeholder="NZ Phone Number" className="p-3 rounded-lg text-black outline-none" required />
          <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 rounded-lg transition-all uppercase tracking-wider">
            Get My Quote
          </button>
        </form>
      </div>
    </div>
  );
}