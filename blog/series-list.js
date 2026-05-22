// blog/series-list.js
// তোমার সব ব্লগ সিরিজের তালিকা
const blogSeries = [
  {
    "title": "🧮 Super Calculator (All-in-One)",
    "link": "https://banglagolpogalaxy.github.io/portfolio/super_calculator/super_calculator.html"
  },
  {
    "title": "🌌 Bangla Golpo Galaxy",
    "link": "https://banglagolpogalaxy.github.io/"
  },
  {
    "title": "🧑‍💻 My Coding Journey",
    "link": "https://banglagolpogalaxy.github.io/portfolio/blog/coding_journey.html"
  },
  {
    "title": "📋 Termux Command Cheat Sheet",
    "link": "https://banglagolpogalaxy.github.io/portfolio/blog/termux_all_command.html"
  }
];

// ========== অটোমেটিক টেবিল রেন্ডারার (ডুপ্লিকেট চেক সহ) ==========
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // আগে থেকেই টেবিল আছে কিনা চেক করো
    const existingTable = document.getElementById('blog-series-table');
    if (existingTable && existingTable.innerHTML.trim() !== '') {
      return; // আগে থেকেই কন্টেন্ট থাকলে কিছু করবে না
    }

    // টেবিল বসানোর জায়গা খোঁজো
    const container = existingTable || (function() {
      // পেজের শেষের দিকে কোনো article বা main আছে?
      const article = document.querySelector('article');
      const main = document.querySelector('main');
      const target = article || main || document.body;
      const div = document.createElement('div');
      div.id = 'blog-series-table';
      target.appendChild(div);
      return div;
    })();

    if (container) {
      let html = '<h3>📚 My Other Projects & Series</h3>';
      html += '<table style="width:100%; border-collapse: collapse; margin-top: 10px;">';
      html += '<thead><tr><th style="text-align:left; padding:10px; border-bottom:1px solid var(--border);">Project</th><th style="padding:10px; border-bottom:1px solid var(--border);">Link</th></tr></thead>';
      html += '<tbody>';

      blogSeries.forEach(item => {
        html += `<tr>
          <td style="padding:10px; border-bottom:1px solid var(--border);">${item.title}</td>
          <td style="padding:10px; border-bottom:1px solid var(--border);"><a href="${item.link}" target="_blank" style="color:var(--accent);">Visit →</a></td>
        </tr>`;
      });

      html += '</tbody></table>';
      container.innerHTML = html;
    }
  });
})();
