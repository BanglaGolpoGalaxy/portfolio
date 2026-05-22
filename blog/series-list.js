// blog/series-list.js
// তোমার সব ব্লগ সিরিজ ও প্রোজেক্টের তালিকা
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
  },
  {
    title: "🕷️ সাইটম্যাপ অটোমেশন ব্লগ",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/sitemap-automation.html"
  },
  {
    title: "🔗 ব্লগে অটোমেটিক লিংক টেবিল",
    link: "https://banglagolpogalaxy.github.io/portfolio/blog/auto-series-table.html"
  }
  // 🔧 নতুন সিরিজ যোগ করতে এখানে লাইন যোগ করো
];

// ========== অটোমেটিক টেবিল রেন্ডারার ==========
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // ১. আগে থেকেই #blog-series-table থাকলে সেখানে বসাও
    let container = document.getElementById('blog-series-table');
    
    // ২. না থাকলে, ফুটারের আগে নতুন ডিভ তৈরি করো
    if (!container) {
      const footer = document.querySelector('footer');
      if (footer) {
        container = document.createElement('div');
        container.id = 'blog-series-table';
        footer.parentNode.insertBefore(container, footer);
      } else {
        // ফুটারও না থাকলে, বডির শেষে বসাও (fallback)
        container = document.createElement('div');
        container.id = 'blog-series-table';
        document.body.appendChild(container);
      }
    }

    // ৩. টেবিল তৈরি করো
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
