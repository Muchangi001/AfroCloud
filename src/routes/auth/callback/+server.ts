import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { RequestHandler } from '@sveltejs/kit';

type LocalsWithSupabase = {
	supabase: typeof supabase;
};

export const GET: RequestHandler = async ({ url, locals }) => {
	const { supabase } = locals as LocalsWithSupabase;
	const code = url.searchParams.get('code');

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (error) {
			console.error('Error exchanging code:', error.message);
			throw redirect(303, '/login?error=auth');
		}
	}

	// 🔄 Retry logic to wait for user session (esp. for new users)
	for (let i = 0; i < 5; i++) {
		const { data: userData, error: userError } = await supabase.auth.getUser();
		if (userData?.user) {
			// ✅ User is ready
			break;
		}
		console.log('Waiting for user session...');
		await new Promise((res) => setTimeout(res, 500)); // wait 0.5s
	}

	throw redirect(303, '/creator');
};
