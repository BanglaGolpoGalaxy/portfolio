// ============================================================
// blog-series-list.js — ব্লগ সিরিজ টেবিল (সংক্ষিপ্ত)
// ============================================================

// ---------- সিরিজ ডেটা (শুধু সিরিজ ইনডেক্স + গুরুত্বপূর্ণ পোস্ট) ----------
const blogSeries = [
  { title: "📚 Termux Tutorial Series (সূচীপত্র)", link: "termux_index.html" },
  { title: "Termux কমান্ড চিট শিট – সম্পূর্ণ গাইড", link: "termux_all_command.html" },
  { title: "Adding Bilingual Toggle to Your Website", link: "en_bn_toggle.html" },
  { title: "Dark Mode Toggle: Simple CSS + JS Trick", link: "dark-mode-trick.html" },
  { title: "How I Built a Multi-Calculator Tool", link: "how_i_built_multi_calculator.html" },
  { title: "My Web Development Journey", link: "coding_journey.html" }
];

// ---------- টেবিল রেন্ডার (শুধু ৫টি লিংক + See All) ----------
function renderBlogSeries() {
  const container = document.getElementById('blog-series-table');
  if (!container) return;

  // শিরোনাম
  const heading = document.createElement('h3');
  heading.textContent = '📚 সম্পর্কিত পোস্টসমূহ';
  heading.style.cssText = `
    color: #9b83ff;
    font-size: 18px;
    margin: 24px 0 16px 0;
    border-bottom: 1px solid rgba(145,155,220,0.18);
    padding-bottom: 8px;
  `;
  container.appendChild(heading);

  // টেবিল
  const table = document.createElement('table');
  table.style.cssText = `
    width: 100%;
    border-collapse: collapse;
    background: rgba(17,20,50,0.5);
    border-radius: 12px;
    overflow: hidden;
    font-size: 14px;
  `;

  // হেডার
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

  // বডি (শুধু প্রথম ৫টি)
  const tbody = document.createElement('tbody');
  const visibleItems = blogSeries.slice(0, 5);
  const hiddenItems = blogSeries.slice(5);

  visibleItems.forEach((item) => {
    const tr = createRow(item);
    tbody.appendChild(tr);
  });

  // See All বাটনের জন্য একটি রো
  if (hiddenItems.length > 0) {
    const seeAllRow = document.createElement('tr');
    seeAllRow.style.cssText = `
      border-top: 1px solid rgba(145,155,220,0.15);
    `;
    const td = document.createElement('td');
    td.style.cssText = `
      padding: 10px 16px;
      text-align: center;
    `;
    const seeAllBtn = document.createElement('button');
    seeAllBtn.textContent = `📂 দেখুন সব (${hiddenItems.length}টি বেশি)`;
    seeAllBtn.style.cssText = `
      background: rgba(124,92,255,0.15);
      color: #9b83ff;
      border: 1px solid #7c5cff;
      border-radius: 8px;
      padding: 8px 20px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      transition: 0.2s;
    `;
    seeAllBtn.addEventListener('mouseenter', () => {
      seeAllBtn.style.background = '#7c5cff';
      seeAllBtn.style.color = '#fff';
    });
    seeAllBtn.addEventListener('mouseleave', () => {
      seeAllBtn.style.background = 'rgba(124,92,255,0.15)';
      seeAllBtn.style.color = '#9b83ff';
    });

    let isExpanded = false;
    seeAllBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      if (isExpanded) {
        // বাকি আইটেম যোগ করো
        hiddenItems.forEach((item) => {
          const row = createRow(item);
          tbody.insertBefore(row, seeAllRow);
        });
        seeAllBtn.textContent = '🔽 সংক্ষেপে দেখান';
      } else {
        // বাকি আইটেম সরাও
        const rows = tbody.querySelectorAll('tr');
        for (let i = rows.length - 1; i >= 0; i--) {
          if (rows[i] !== seeAllRow && !visibleItems.some(v => v.link === rows[i].dataset.link)) {
            rows[i].remove();
          }
        }
        seeAllBtn.textContent = `📂 দেখুন সব (${hiddenItems.length}টি বেশি)`;
      }
    });

    td.appendChild(seeAllBtn);
    seeAllRow.appendChild(td);
    tbody.appendChild(seeAllRow);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

// ---------- হেল্পার: একটি রো তৈরি ----------
function createRow(item) {
  const tr = document.createElement('tr');
  tr.dataset.link = item.link;
  tr.style.cssText = `
    border-bottom: 1px solid rgba(145,155,220,0.08);
    transition: background 0.2s;
  `;
  tr.addEventListener('mouseenter', () => tr.style.background = 'rgba(124,92,255,0.05)');
  tr.addEventListener('mouseleave', () => tr.style.background = 'transparent');

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
    transition: color 0.2s;
  `;
  link.addEventListener('mouseenter', () => link.style.color = '#9b83ff');
  link.addEventListener('mouseleave', () => link.style.color = '#7c5cff');

  td.appendChild(link);
  tr.appendChild(td);
  return tr;
}

// ---------- পেজ লোড হলে রেন্ডার ----------
document.addEventListener('DOMContentLoaded', renderBlogSeries);
