// ============================================================
// blog-series-list.js — ব্লগ সিরিজ টেবিল (ফুটারের আগে)
// ============================================================

// ---------- সিরিজ ডেটা ----------
const blogSeries = [
  { title: "Backend on Mobile: Termux Tutorial Series", link: "termux_index.html" },
  { title: "Termux কমান্ড চিট শিট – সম্পূর্ণ গাইড", link: "termux_all_command.html" },
  { title: "Adding Bilingual Toggle to Your Website", link: "en_bn_toggle.html" },
  { title: "Dark Mode Toggle: Simple CSS + JS Trick", link: "dark-mode-trick.html" },
  { title: "How I Built a Multi-Calculator Tool", link: "how_i_built_multi_calculator.html" },
  { title: "My Web Development Journey", link: "coding_journey.html" }
];

// ---------- টেবিল তৈরি ----------
function createBlogSeriesTable() {
  const container = document.getElementById('blog-series-table');
  if (!container) return;

  // পুরানো কন্টেন্ট ক্লিয়ার
  container.innerHTML = '';

  // === ১. শিরোনাম ===
  const heading = document.createElement('h3');
  heading.textContent = '📚 অন্যান্য ব্লগ';
  heading.style.cssText = `
    color: #9b83ff;
    font-size: 18px;
    margin: 0 0 16px 0;
    border-bottom: 1px solid rgba(145,155,220,0.18);
    padding-bottom: 10px;
    font-weight: 600;
  `;
  container.appendChild(heading);

  // === ২. টেবিল ===
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    font-size: 14px;
    background: rgba(0,0,0,0.2);
  `;

  // --- হেডার ---
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.cssText = `
    background: rgba(124,92,255,0.2);
    text-align: left;
  `;
  const th = document.createElement('th');
  th.textContent = '📖 আরো পড়ুন';
  th.style.cssText = `
    padding: 12px 16px;
    color: #f8f9ff;
    font-weight: 600;
  `;
  headerRow.appendChild(th);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // --- বডি ---
  const tbody = document.createElement('tbody');
  blogSeries.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.style.cssText = `
      border-bottom: 1px solid rgba(145,155,220,0.08);
      transition: background 0.2s;
    `;
    if (index >= 5) {
      tr.style.display = 'none';
      tr.classList.add('hidden-row');
    }

    const td = document.createElement('td');
    td.style.cssText = `padding: 10px 16px;`;

    const link = document.createElement('a');
    link.href = item.link;
    link.textContent = item.title;
    link.style.cssText = `
      color: #7c5cff;
      text-decoration: none;
      display: block;
      font-weight: 500;
      padding: 6px 10px;
      border-radius: 6px;
      transition: all 0.2s;
      background: transparent;
    `;

    link.addEventListener('mouseenter', () => {
      link.style.background = 'rgba(124,92,255,0.12)';
      link.style.color = '#9b83ff';
    });
    link.addEventListener('mouseleave', () => {
      link.style.background = 'transparent';
      link.style.color = '#7c5cff';
    });

    td.appendChild(link);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  // === ৩. লাইট মোডের CSS ===
  const style = document.createElement('style');
  style.textContent = `
    #blog-series-table {
      max-width: 800px;
      margin: 25px auto 10px auto;
      padding: 20px 20px 10px 20px;
      background: rgba(17,20,50,0.75) !important;
      border-radius: 16px;
      border: 1px solid rgba(145,155,220,0.15) !important;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      clear: both;
    }
    #blog-series-table a {
      color: #7c5cff !important;
      background: transparent !important;
    }
    #blog-series-table a:hover {
      color: #9b83ff !important;
      background: rgba(124,92,255,0.12) !important;
    }
    #blog-series-table table {
      background: rgba(0,0,0,0.25) !important;
    }
    #blog-series-table thead tr {
      background: rgba(124,92,255,0.2) !important;
    }
    #blog-series-table thead th {
      color: #f8f9ff !important;
    }
    #blog-series-table button {
      background: rgba(124,92,255,0.15) !important;
      color: #9b83ff !important;
      border-color: #7c5cff !important;
    }
    #blog-series-table button:hover {
      background: rgba(124,92,255,0.25) !important;
    }

    body.light #blog-series-table {
      background: rgba(25,30,60,0.92) !important;
      border: 1px solid rgba(124,92,255,0.25) !important;
    }
    body.light #blog-series-table a {
      color: #c8b8ff !important;
    }
    body.light #blog-series-table a:hover {
      color: #e0d6ff !important;
      background: rgba(124,92,255,0.15) !important;
    }
    body.light #blog-series-table table {
      background: rgba(0,0,0,0.15) !important;
    }
    body.light #blog-series-table thead tr {
      background: rgba(124,92,255,0.25) !important;
    }
    body.light #blog-series-table thead th {
      color: #f8f9ff !important;
    }
    body.light #blog-series-table button {
      background: rgba(124,92,255,0.2) !important;
      color: #c8b8ff !important;
      border-color: #9b83ff !important;
    }
    body.light #blog-series-table button:hover {
      background: rgba(124,92,255,0.35) !important;
    }
  `;
  document.head.appendChild(style);

  // === ৪. "সব পোস্ট দেখুন" বাটন ===
  if (blogSeries.length > 5) {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.cssText = `
      display: flex;
      justify-content: flex-start;
      margin-top: 14px;
    `;

    const button = document.createElement('button');
    button.textContent = '📖 সব পোস্ট দেখুন →';
    button.style.cssText = `
      padding: 8px 24px;
      border-radius: 40px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      border: 1px solid #7c5cff;
      background: rgba(124,92,255,0.15);
      color: #9b83ff;
    `;
    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(124,92,255,0.25)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.background = 'rgba(124,92,255,0.15)';
    });

    let isExpanded = false;
    button.addEventListener('click', () => {
      isExpanded = !isExpanded;
      const hiddenRows = document.querySelectorAll('.hidden-row');
      hiddenRows.forEach(row => {
        row.style.display = isExpanded ? '' : 'none';
      });
      button.textContent = isExpanded ? '📖 সংক্ষেপে দেখুন ←' : '📖 সব পোস্ট দেখুন →';
    });

    buttonWrapper.appendChild(button);
    container.appendChild(buttonWrapper);
  }
}

// ---------- টেবিলের পজিশন ঠিক করা (কমেন্টের নিচে, ফুটারের আগে) ----------
function positionTable() {
  const container = document.getElementById('blog-series-table');
  if (!container) return;

  // ১. Cusdis কমেন্ট বক্স খোঁজো
  const cusdis = document.getElementById('cusdis_thread');
  if (cusdis && cusdis.parentNode) {
    // Cusdis-এর পর (নিচে) বসাও
    cusdis.parentNode.insertBefore(container, cusdis.nextSibling);
    console.log('✅ টেবিল Cusdis-এর নিচে বসানো হয়েছে');
    return;
  }

  // ২. Cusdis না পেলে ফুটারের আগে বসাও
  const footer = document.querySelector('footer');
  if (footer) {
    footer.parentNode.insertBefore(container, footer);
    console.log('✅ টেবিল ফুটারের আগে বসানো হয়েছে');
    return;
  }

  // ৩. কিছুই না পেলে body-র শেষে
  document.body.appendChild(container);
  console.log('✅ টেবিল body-র শেষে বসানো হয়েছে');
}

// ---------- মূল ফাংশন ----------
function initBlogSeries() {
  // ১. টেবিল তৈরি করো
  createBlogSeriesTable();

  // ২. অবিলম্বে পজিশন ঠিক করো
  positionTable();

  // ৩. Cusdis ডাইনামিক লোড হলে আবার পজিশন ঠিক করো (max ৫ সেকেন্ড)
  let attempts = 0;
  const maxAttempts = 20; // ৫ সেকেন্ড (প্রত্যেক ২৫০ms)

  const checkInterval = setInterval(() => {
    attempts++;
    const cusdis = document.getElementById('cusdis_thread');
    if (cusdis) {
      // Cusdis এখন লোড হয়েছে, আবার পজিশন ঠিক করো
      positionTable();
      clearInterval(checkInterval);
      console.log('✅ Cusdis লোড হয়েছে, টেবিল পজিশন আপডেট করা হয়েছে');
    } else if (attempts >= maxAttempts) {
      clearInterval(checkInterval);
      console.log('⚠️ Cusdis পাওয়া যায়নি, বর্তমান পজিশনেই থাকবে');
    }
  }, 250);
}

// ---------- পেজ লোড হলে শুরু করো ----------
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initBlogSeries();
} else {
  document.addEventListener('DOMContentLoaded', initBlogSeries);
}
