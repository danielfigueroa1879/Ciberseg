const DB_URL = 'https://recyberseg-default-rtdb.firebaseio.com';
const el = document.getElementById('visitor-count');

try {
    const res = await fetch(DB_URL + '/page_visits.json');
    const current = await res.json();
    const next = (current || 0) + 1;
    await fetch(DB_URL + '/page_visits.json', { method: 'PUT', body: JSON.stringify(next) });
    if (el) el.innerText = next.toLocaleString();
} catch (e) {
    if (el) el.innerText = '-';
}
