import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

import type { RequestHandler } from '@sveltejs/kit';

type LocalsWithSupabase = {
	supabase: typeof supabase; // Use the actual Supabase client type
};

export const GET: RequestHandler = async ({ url, locals }) => {
	const { supabase } = locals as LocalsWithSupabase;
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, '/creator');
};