import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
	const cookieStore = await cookies()

	return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			}
		}
	})
}
// this will fetch from the server user session, use for SSR pages
export async function getCurrentServerSession() {
	const supabase = await createClient()
	const {
		data: { session },
		error
	} = await supabase.auth.getSession()

	if (error) throw error
	return session
}
// this will fetch from the server user, use for SSR pages
export async function getCurrentServerUser() {
	const supabase = await createClient()
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	if (error) throw error
	return user ?? null
}
