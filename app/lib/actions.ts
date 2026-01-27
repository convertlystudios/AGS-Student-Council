'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { revalidatePath } from 'next/cache'

export type State = {
  message: string | null
  errors: Record<string, string[]>
}

export async function createAnnouncement(
  prevState: State,
  formData: FormData
): Promise<State> {
  const title = formData.get('title')?.toString()
  const content = formData.get('content')?.toString()

  if (!title || !content) {
    return {
      message: 'Missing required fields',
      errors: {},
    }
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  const { data } = await supabase.auth.getUser()
  const user = data?.user

  const { error } = await supabase.from('announcements').insert({
    title,
    content,
    user_name: user?.user_metadata?.name || 'Anonymous',
  })

  if (error) {
    console.error('Insert failed:', error)
    return {
      message: `Failed to create announcement: ${error.message}`,
      errors: {},
    }
  }

  revalidatePath('/dashboard/announcements')

  return {
    message: null,
    errors: {},
  }
}