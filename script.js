const fallbackConfig = {
  site: {
    title: 'Personal site',
    brand: 'Your Name',
    subtitle: 'building thoughtful web things',
    initials: 'YN',
    badge: 'Currently shipping',
    summary: 'Engineer and designer building lean, fast experiences with a bias for shipping.',
    location: 'Remote',
    availability: 'Open to new collaborations.',
    email: 'hello@example.com',
    primaryCta: { label: 'Email me', href: 'mailto:hello@example.com' },
    secondaryCta: { label: 'View GitHub', href: 'https://github.com' },
    resumeUrl: ''
  },
  socials: [],
  now: [],
  projects: [],
  stack: [],
  timeline: [],
  contact: { availability: '', links: [] }
};

async function loadConfig() {
  try {
    const res = await fetch('config.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load config');
    return await res.json();
  } catch (err) {
    console.warn('Using fallback config:', err);
    return fallbackConfig;
  }
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node && value) node.textContent = value;
}

function setLink(id, link) {
  const node = document.getElementById(id);
  if (!node) return;
  if (link && link.href) {
    node.href = link.href;
    node.textContent = link.label || link.href;
    node.style.display = 'inline-flex';
  } else {
    node.style.display = 'none';
  }
}

function renderList(containerId, items, renderer) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  (items || []).forEach((item) => container.appendChild(renderer(item)));
}

function renderSocials(containerId, socials) {
  renderList(containerId, socials, (social) => {
    const a = document.createElement('a');
    a.href = social.href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = social.label;
    return a;
  });
}

function renderNow(nowItems) {
  renderList('nowList', nowItems, (text) => {
    const card = document.createElement('div');
    card.className = 'timeline-item';
    const p = document.createElement('p');
    p.textContent = text;
    card.appendChild(p);
    return card;
  });
}

function renderProjects(projects) {
  renderList('projectsGrid', projects, (project) => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = project.title;
    card.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = project.description;
    card.appendChild(desc);

    if (project.tags?.length) {
      const tags = document.createElement('div');
      tags.className = 'tag-row';
      project.tags.forEach((tag) => {
        const t = document.createElement('span');
        t.className = 'tag';
        t.textContent = tag;
        tags.appendChild(t);
      });
      card.appendChild(tags);
    }

    if (project.links?.length) {
      const links = document.createElement('div');
      links.className = 'links-inline';
      project.links.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = link.label || link.href;
        links.appendChild(a);
      });
      card.appendChild(links);
    }

    return card;
  });
}

function renderStack(stack) {
  renderList('stackList', stack, (item) => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.textContent = item;
    return pill;
  });
}

function renderTimeline(items) {
  renderList('timelineList', items, (item) => {
    const wrap = document.createElement('div');
    wrap.className = 'timeline-item';

    const title = document.createElement('h4');
    title.textContent = item.title;
    wrap.appendChild(title);

    if (item.time) {
      const span = document.createElement('span');
      span.textContent = item.time;
      wrap.appendChild(span);
    }

    if (item.description) {
      const p = document.createElement('p');
      p.textContent = item.description;
      wrap.appendChild(p);
    }

    return wrap;
  });
}

function renderContact(contact, socials) {
  const links = contact?.links || [];
  renderList('contactLinks', links, (link) => {
    const a = document.createElement('a');
    a.className = 'button secondary';
    a.href = link.href;
    a.target = link.href.startsWith('http') ? '_blank' : '_self';
    a.rel = 'noopener';
    a.textContent = link.label || link.href;
    return a;
  });

  const availability = contact?.availability || contact?.status;
  setText('availabilityText', availability || 'Open for interesting projects.');

  renderSocials('contactSocials', socials || []);
}

function renderBrand(site) {
  setText('brandTitle', site.brand || 'Personal site');
  setText('brandSubtitle', site.subtitle || '');
  setText('heroTitle', `Hi, I am ${site.brand || 'someone'}.`);
  setText('heroSummary', site.summary || '');
  setText('heroBadge', site.badge || 'Currently shipping');
  setText('footerCopy', `Built by ${site.brand || 'me'}.`);

  const initials = site.initials || (site.brand ? site.brand[0] : '');
  setText('brandMark', initials);

  const meta = [];
  if (site.location) meta.push(site.location);
  if (site.availability) meta.push(site.availability);
  if (site.email) meta.push(site.email);

  const metaRow = document.getElementById('heroMeta');
  if (metaRow) {
    metaRow.innerHTML = '';
    meta.forEach((item) => {
      const span = document.createElement('span');
      span.textContent = item;
      metaRow.appendChild(span);
    });
  }

  setLink('primaryCta', site.primaryCta);
  setLink('secondaryCta', site.secondaryCta);

  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    if (site.resumeUrl) {
      resumeBtn.href = site.resumeUrl;
      resumeBtn.textContent = 'Resume';
      resumeBtn.style.display = 'inline-flex';
    } else {
      resumeBtn.style.display = 'none';
    }
  }

  if (site.title) document.title = site.title;
}

async function init() {
  const config = await loadConfig();
  const data = { ...fallbackConfig, ...config };
  renderBrand(data.site || {});
  renderSocials('socialLinks', data.socials || []);
  renderNow(data.now || []);
  renderProjects(data.projects || []);
  renderStack(data.stack || []);
  renderTimeline(data.timeline || []);
  renderContact(data.contact || {}, data.socials || []);
}

init();
