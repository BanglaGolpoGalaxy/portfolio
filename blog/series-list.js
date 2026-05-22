// blog/series-list.js
const blogSeries = [
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
    title: "🧑‍💻 My Coding Journey",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/coding_journey.html"
  },
  {
    title: "📋 Termux Command Cheat Sheet",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/termux_all_command.html"
  },
  {
    title: "📖 Banking Knowledge Book",
    link: "https://banglagolpogalaxy.github.io/portfolio/books/banking-knowledge/index.html"
  }
  // 🔧 নতুন সিরিজ যোগ করতে এখানে লাইন যোগ করো
];

// ========== টেবিল ঠিক জায়গায় বসানোর রোবট ==========
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // ১. footer খোঁজো
    const footer = document.querySelector('footer');
    let container;

    if (footer) {
      // ফুটারের আগে নতুন div বানাও
      container = document.createElement('div');
      container.id = 'blog-series-table';
      footer.parentNode.insertBefore(container, footer);
    } else {
      // ফুটার না থাকলে article বা main-এর শেষে বসাও
      const article = document.querySelector('article');
      const main = document.querySelector('main');
      const target = article || main || document.body;
      container = document.createElement('div');
      container.id = 'blog-series-table';
      target.appendChild(container);
    }

    // ২. টেবিল তৈরি করো
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
  });
})();
