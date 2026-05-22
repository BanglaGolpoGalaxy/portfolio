// blog/series-list.js
// প্রধান সিরিজ (সবসময় দেখা যাবে)
const mainSeries = [
  {
    title: "🏪 Shop Manager (Termux Backend Series)",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/termux_index.html"
  },
  {
    title: "🧮 Super Calculator (All-in-One)",
    link: "https://banglagolpogalaxy.github.io/portfolio/super_calculator/super_calculator.html"
  },
  {
    title: "🌌 Bangla Golpo Galaxy",
    link: "https://banglagolpogalaxy.github.io"
  },
  {
    title: "📖 Banking Knowledge Book",
    link: "https://banglagolpogalaxy.github.io/portfolio/books/banking-knowledge/index.html"
  }
];

// ছোট ব্লগ পোস্ট (All Series বাটনে ক্লিক করলে দেখা যাবে)
const allOtherPosts = [
  {
    title: "🧑‍💻 My Coding Journey",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/coding_journey.html"
  },
  {
    title: "📋 Termux Command Cheat Sheet",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/termux_all_command.html"
  },
  {
    title: "🌙 Dark Mode Toggle Trick",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/dark-mode-trick.html"
  },
  {
    title: "🔤 Bilingual Toggle Guide",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/en_bn_toggle.html"
  },
  {
    title: "🧮 How I Built Multi Calculator",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/how_i_built_multi_calculator.html"
  }
];

// ========== টেবিল রেন্ডারার (প্রধান + All Series টগল) ==========
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // ১. ফুটারের আগে টেবিল বসাও
    const footer = document.querySelector('footer');
    let container;

    if (footer) {
      container = document.createElement('div');
      container.id = 'blog-series-table';
      footer.parentNode.insertBefore(container, footer);
    } else {
      const article = document.querySelector('article');
      const main = document.querySelector('main');
      const target = article || main || document.body;
      container = document.createElement('div');
      container.id = 'blog-series-table';
      target.appendChild(container);
    }

    // ২. টেবিল তৈরি করো
    function buildTable() {
      let html = '<h3>📚 My Other Projects & Series</h3>';
      html += '<table style="width:100%; border-collapse: collapse; margin-top: 10px;">';
      html += '<thead><tr><th style="text-align:left; padding:10px; border-bottom:1px solid var(--border);">Project</th><th style="padding:10px; border-bottom:1px solid var(--border);">Link</th></tr></thead>';
      html += '<tbody id="series-table-body">';

      // প্রধান সিরিজ
      mainSeries.forEach(item => {
        html += `<tr>
          <td style="padding:10px; border-bottom:1px solid var(--border);">${item.title}</td>
          <td style="padding:10px; border-bottom:1px solid var(--border);"><a href="${item.link}" target="_blank" style="color:var(--accent);">Visit →</a></td>
        </tr>`;
      });

      html += '</tbody>';
      html += '<tfoot id="all-series-foot" style="display:none;"></tfoot>';
      html += '</table>';

      // All Series বাটন
      html += '<button id="toggle-all-series" style="margin-top:10px; padding:6px 16px; border-radius:20px; border:1px solid var(--border); background:var(--surface); color:var(--text); cursor:pointer; font-family:inherit; font-size:0.85rem;">📂 All Series ▾</button>';

      return html;
    }

    container.innerHTML = buildTable();

    // ৩. All Series টগল
    let allSeriesVisible = false;
    document.getElementById('toggle-all-series').addEventListener('click', function() {
      const tfoot = document.getElementById('all-series-foot');
      const btn = document.getElementById('toggle-all-series');

      if (!allSeriesVisible) {
        let rows = '';
        allOtherPosts.forEach(item => {
          rows += `<tr>
            <td style="padding:10px; border-bottom:1px solid var(--border);">${item.title}</td>
            <td style="padding:10px; border-bottom:1px solid var(--border);"><a href="${item.link}" target="_blank" style="color:var(--accent);">Visit →</a></td>
          </tr>`;
        });
        tfoot.innerHTML = rows;
        tfoot.style.display = '';
        btn.textContent = '📂 All Series ▴';
        allSeriesVisible = true;
      } else {
        tfoot.innerHTML = '';
        tfoot.style.display = 'none';
        btn.textContent = '📂 All Series ▾';
        allSeriesVisible = false;
      }
    });
  });
})();
