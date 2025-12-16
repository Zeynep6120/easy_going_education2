const apiBase = '/api/items';

async function fetchItems() {
  const res = await fetch(apiBase);
  return res.json();
}

function renderItems(items) {
  const ul = document.getElementById('itemsList');
  ul.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<div class="item-head"><strong>${escapeHtml(item.title)}</strong>
      <button data-id="${item.id}" class="del">Sil</button></div>
      <p>${escapeHtml(item.description || '')}</p>`;
    ul.appendChild(li);
  });
  document.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      loadAndRender();
    });
  });
}

async function loadAndRender() {
  const items = await fetchItems();
  renderItems(items);
}

document.getElementById('itemForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!title) return;
  await fetch(apiBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  loadAndRender();
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

loadAndRender();
