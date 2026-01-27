// app/lib/data.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
// import type { Database } from '@/types/supabase' // optional

export async function fetchAnnouncements() {
    // ✅ cookies() is async in newer Next.js
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll() {
                    // No-op in Server Components
                },
            },
        }
    )

    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false })

    if (error) {
        console.error('Failed to fetch announcements:', error)
        throw error
    }

    return data
}