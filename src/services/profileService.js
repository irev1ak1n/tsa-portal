import { supabase } from './supabase.js';

export function divisionForGrade(grade) {
  return Number(grade) <= 8 ? 'MS' : 'HS';
}

async function myUserId() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id ?? null;
}

export async function getMyProfile() {
  const id = await myUserId();
  if (!id) return null;

  const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveMyProfile(fields) {
  const id = await myUserId();
  if (!id) throw new Error('Not signed in.');

  const { data: updated, error: updateError } = await supabase
      .from('profiles')
      .update(fields)
      .eq('id', id)
      .select()
      .maybeSingle();

  if (updateError) throw updateError;
  if (updated) return updated;

  const { data: inserted, error: insertError } = await supabase
      .from('profiles')
      .insert({ id, ...fields })
      .select()
      .single();

  if (insertError) throw insertError;
  return inserted;
}

export async function isUsernameAvailable(username) {
  const clean = username.trim().toLowerCase();
  if (clean.length < 6) return false;

  const id = await myUserId();

  const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .ilike('username', clean)
      .limit(1);

  if (error) throw error;
  if (!data || data.length === 0) return true;
  return data[0].id === id;
}

export function suggestUsername(first, last) {
  const base = `${first || ''}${last || ''}`.toLowerCase().replace(/[^a-z0-9._]/g, '');
  return base.slice(0, 20) || 'student';
}