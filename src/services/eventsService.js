import { supabase } from './supabase.js';

function parseThemeLinks(raw) {
    if (!raw) return [];
    return raw
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
            const i = part.indexOf('|');
            if (i === -1) return { label: 'Document', url: part };
            return { label: part.slice(0, i).trim(), url: part.slice(i + 1).trim() };
        })
        .filter((l) => l.url);
}

function fromRow(r) {
    return {
        id: r.id,
        division: r.division,
        name: r.name,
        category: r.category || '',

        eligibility: r.eligibility_text
            ? {
                text: r.eligibility_text,
                teamSize: r.team_size || null,
                per: r.eligibility_per || null,
                individualOk: r.individual_ok === true,
            }
            : null,

        season: r.season || '',
        overview: r.overview || '',
        theme: r.theme || '',
        themeLinks: parseThemeLinks(r.theme_url),
    };
}

export async function fetchEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('division', { ascending: true })
        .order('name', { ascending: true });

    if (error) throw error;
    return (data || []).map(fromRow);
}