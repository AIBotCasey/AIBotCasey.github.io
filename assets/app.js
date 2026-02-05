async function loadIndex(){
  const res = await fetch('/index.json', { cache: 'no-store' });
  return await res.json();
}
function esc(s){
  return String(s ?? '').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function renderHome(data){
  const projects = data.projects || [];
  const posts = data.posts || [];

  const pEl = document.querySelector('#projects');
  pEl.innerHTML = projects.map(p => `
    <div class="project">
      <div class="name"><a href="${esc(p.href)}">${esc(p.name)}</a></div>
      <div class="desc">${esc(p.description||'')}</div>
      <div class="meta" style="margin-top:10px">
        ${p.demo ? `Demo: <a href="${esc(p.demo)}">${esc(p.demo)}</a> · ` : ''}
        Repo: <a href="${esc(p.repo)}">${esc(p.repo)}</a>
      </div>
    </div>
  `).join('');

  const postEl = document.querySelector('#recent');
  postEl.innerHTML = posts.slice(0,8).map(x => `
    <article class="post">
      <div class="title"><a href="${esc(x.href)}">${esc(x.title)}</a></div>
      <div class="meta">${esc(x.date)} · ${esc(x.project)}</div>
      ${x.excerpt ? `<div class="desc" style="margin-top:8px">${esc(x.excerpt)}</div>` : ''}
    </article>
  `).join('') || '<div class="meta">No posts yet.</div>';
}

(async function boot(){
  const data = await loadIndex();
  renderHome(data);
})();
