import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

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
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">NZ Business Asset Directory</h1>
      <div className="grid gap-4">
        {services?.map((s) => (
          <Link 
            key={s.id} 
            href={`/services/${s.id}`}
            className="p-4 border rounded-xl hover:bg-blue-50 transition-colors"
          >
            {s.keyword} in {s.suburb} →
          </Link>
        ))}
      </div>
    </main>
  );
}