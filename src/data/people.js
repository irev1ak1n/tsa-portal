export const SUGGESTED_ACCOUNTS = [
    {
        id: 'maya',
        handle: 'maya.builds',
        name: 'Maya Patel',
        meta: 'Central High TSA · Video Game Design',
        mutual: 'Followed by sam.rivera',
    },
    {
        id: 'sam',
        handle: 'sam.rivera',
        name: 'Sam Rivera',
        meta: 'Central High TSA · Webmaster',
        mutual: 'In your chapter',
    },
    {
        id: 'northside',
        handle: 'northside_tsa',
        name: 'Northside TSA',
        meta: 'Chapter · 42 members',
        mutual: 'Suggested for you',
    },
    {
        id: 'jordan',
        handle: 'jordan.cad',
        name: 'Jordan Lee',
        meta: 'Lakeview TSA · CAD Engineering',
        mutual: 'Competing in your state',
    },
    {
        id: 'avery',
        handle: 'avery.films',
        name: 'Avery Chen',
        meta: 'Riverside TSA · Digital Video Production',
        mutual: 'Suggested for you',
    },
];

export function initialsOf(name) {
    return name
        .split(/[\s.]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
}