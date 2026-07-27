// ============================================================
// blog-series-list.js — ব্লগ সিরিজ টেবিল (সম্পূর্ণ আলাদা)
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

// ---------- টেবিল রেন্ডার (সঠিক পজিশন) ----------
function renderBlogSeries() {
  const container = document.getElementById('blog-series-table');
  if (!container) return;

  // === ১. Cusdis কমেন্ট বক্স খুঁজে বের করা ===
  const cusdis = document.getElementById('cusdis_thread');
  
  if (cusdis && cusdis.parentNode) {
    // Cusdis-এর প্যারেন্ট বের করা (যে ডিভের ভেতরে Cusdis আছে)
    let parent = cusdis.parentNode;
    
    // যদি প্যারেন্টের ক্লাস বা আইডি কমেন্ট-রিলেটেড হয়, তাহলে তারও উপরে যাও
    // (যাতে টেবিল কমেন্ট বক্সের বাইরে থাকে)
    while (parent && parent.classList && 
           (parent.classList.contains('cusdis') || 
            parent.id === 'cusdis' || 
            parent.className.includes('comment') ||
            parent.className.includes('cusdis'))) {
      parent = parent.parentNode;
    }
    
    // প্যারেন্টের ভেতরে, Cusdis-এর আগে বসানো (কিন্তু প্যারেন্টের প্রথম সন্তান হিসেবে)
    if (parent) {
      parent.insertBefore(container, cusdis);
    } else {
      // যদি কোনো প্যারেন্ট না পাওয়া যায়, তাহলে ফুটারের আগে বসানো
      const footer = document.querySelector('footer');
      if (footer) {
        footer.parentNode.insertBefore(container, footer);
      } else {
        document.body.appendChild(container);
      }
    }
  } else {
    // Cusdis না পাওয়া গেলে ফুটারের আগে বসানো (ব্যাকআপ)
    const footer = document.querySelector('footer');
    if (footer) {
      footer.parentNode.insertBefore(container, footer);
    } else {
      document.body.appendChild(container);
    }
  }

  // === ২. কন্টেইনার স্টাইল (স্বতন্ত্র বক্স) ===
  container.style.cssText = `
    max-width: 800px;
    margin: 30px auto 25px auto;
    padding: 20px 20px 10px 20px;
    background: rgba(17,20,50,0.7);
    border-radius: 16px;
    border: 1px solid rgba(145,155,220,0.15);
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    position: relative;
    z-index: 5;
    clear: both;
  `;

  // === ৩. শিরোনাম ===
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

  // === ৪. টেবিল ===
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
    td.style.cssText = `
      padding: 10px 16px;
    `;

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

  // === ৫. লাইট মোডের জন্য CSS (গাঢ় ব্যাকগ্রাউন্ড + কন্ট্রাস্ট) ===
  const style = document.createElement('style');
  style.textContent = `
    /* ===== ডার্ক মোড ===== */
    #blog-series-table {
      background: rgba(17,20,50,0.75) !important;
      border: 1px solid rgba(145,155,220,0.15) !important;
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

    /* ===== লাইট মোড (গাঢ় ব্যাকগ্রাউন্ড + হালকা লেখা) ===== */
    body.light #blog-series-table {
      background: rgba(25,30,60,0.92) !important;
      border: 1px solid rgba(124,92,255,0.25) !important;
    }
    body.light #blog-series-table a {
      color: #c8b8ff !important;
      background: transparent !important;
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

  // === ৬. "সব পোস্ট দেখুন" বাটন (বাম পাশে) ===
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

// ---------- পেজ লোড হলে রেন্ডার ----------
document.addEventListener('DOMContentLoaded', renderBlogSeries);
