// ============================================================
// blog-series-list.js — ব্লগ সিরিজ টেবিল (মোবাইল-ফ্রেন্ডলি)
// ============================================================

// ---------- সিরিজ ডেটা (শুধু মূল পোস্ট) ----------
const blogSeries = [
  { title: "Backend on Mobile: Termux Tutorial Series", link: "termux_index.html" },
  { title: "Termux কমান্ড চিট শিট – সম্পূর্ণ গাইড", link: "termux_all_command.html" },
  { title: "Adding Bilingual Toggle to Your Website", link: "en_bn_toggle.html" },
  { title: "Dark Mode Toggle: Simple CSS + JS Trick", link: "dark-mode-trick.html" },
  { title: "How I Built a Multi-Calculator Tool", link: "how_i_built_multi_calculator.html" },
  { title: "My Web Development Journey", link: "coding_journey.html" }
];

// ---------- টেবিল রেন্ডার (৫টি দেখাবে, বাকি লুকানো) ----------
function renderBlogSeries() {
  const container = document.getElementById('blog-series-table');
  if (!container) return;

  // === ১. কন্টেইনার স্টাইল (ফুটারের আগে বসানোর জন্য) ===
  container.style.cssText = `
    max-width: 800px;
    margin: 40px auto 20px auto;
    padding: 0 16px;
  `;

  // === ২. শিরোনাম ===
  const heading = document.createElement('h3');
  heading.textContent = '📚 এই সিরিজের অন্যান্য পোস্ট';
  heading.style.cssText = `
    color: #9b83ff;
    font-size: 18px;
    margin: 0 0 16px 0;
    border-bottom: 1px solid rgba(145,155,220,0.18);
    padding-bottom: 8px;
  `;
  container.appendChild(heading);

  // === ৩. টেবিল ===
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    background: rgba(17,20,50,0.5);
    border-radius: 12px;
    overflow: hidden;
    font-size: 14px;
  `;

  // --- হেডার ---
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.style.cssText = `
    background: rgba(124,92,255,0.15);
    text-align: left;
  `;
  const th = document.createElement('th');
  th.textContent = '📖 পোস্টের শিরোনাম';
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
    // ===== লাইট মোড ফিক্স =====
    link.style.cssText = `
      color: #7c5cff;
      text-decoration: none;
      display: block;
      font-weight: 500;
      transition: color 0.2s;
      background: transparent;
      padding: 4px 0;
    `;

    // লাইট মোডে ব্যাকগ্রাউন্ড সাদা করতে
    const style = document.createElement('style');
    style.textContent = `
      body.light .blog-series-table a {
        background: #ffffff !important;
        color: #4a2fc4 !important;
        padding: 4px 8px;
        border-radius: 6px;
      }
      body.light .blog-series-table a:hover {
        background: #f0ecff !important;
      }
    `;
    document.head.appendChild(style);
    // কন্টেইনারে ক্লাস যোগ
    container.classList.add('blog-series-table');

    link.addEventListener('mouseenter', () => link.style.color = '#9b83ff');
    link.addEventListener('mouseleave', () => link.style.color = '#7c5cff');

    td.appendChild(link);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);

  // === ৪. "সব পোস্ট দেখুন" বাটন (বাম পাশে) ===
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
      background: rgba(124,92,255,0.15);
      border: 1px solid #7c5cff;
      border-radius: 40px;
      color: #9b83ff;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-block;
      font-family: inherit;
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
