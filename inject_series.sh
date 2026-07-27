#!/bin/bash
# ============================================================
# ইনজেকশন রোবট — ব্লগ টেবিল (সিরিজ) + সাইটম্যাপ লিংক
# ============================================================

# ----- ১. ব্লগ টেবিল ইনজেক্ট (শুধু blog ফোল্ডারে) -----
SCRIPT_TAG='<script src="series-list.js"><\/script>'
TABLE_DIV='<div id="blog-series-table"><\/div>'

echo "🔧 ব্লগ টেবিল ইনজেক্ট করা হচ্ছে..."
find blog -name "*.html" | while read file; do
  echo "   প্রসেসিং: $file"

  if ! grep -q 'series-list.js' "$file"; then
    sed -i "s|</head>|    ${SCRIPT_TAG}\n</head>|" "$file"
    echo "   ✅ script ট্যাগ যোগ"
  else
    echo "   ⏭️ script ট্যাগ আগে থেকেই আছে"
  fi

  if ! grep -q 'blog-series-table' "$file"; then
    # div যোগ করা হচ্ছে (পজিশন JS ঠিক করবে)
    sed -i "s|</body>|    ${TABLE_DIV}\n</body>|" "$file"
    echo "   ✅ টেবিল div যোগ"
  else
    echo "   ⏭️ টেবিল div আগে থেকেই আছে"
  fi
done

# ----- ২. সাইটম্যাপ লিংক ইনজেক্ট (সব HTML ফাইলে) -----
SITEMAP_LINK='    <a href="https://banglagolpogalaxy.github.io/portfolio/sitemap.html" style="color:#7c5cff; text-decoration:none; margin:0 8px;">🗺️ সাইটম্যাপ</a>'

echo ""
echo "🔧 সাইটম্যাপ লিংক ইনজেক্ট করা হচ্ছে..."
find . -name "*.html" -type f | while read file; do
  if [[ "$file" == *"sitemap.html"* ]] || [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".git"* ]]; then
    continue
  fi

  if grep -q 'sitemap.html' "$file"; then
    echo "   ⏭️ $file - লিংক আগে থেকেই আছে"
    continue
  fi

  sed -i "s|</body>|    ${SITEMAP_LINK}\n</body>|" "$file"
  echo "   ✅ $file - সাইটম্যাপ লিংক যোগ"
done

echo ""
echo "🎉 সব কাজ শেষ!"
echo "এখন git add -A && git commit -m 'টেবিল আপডেট: Cusdis এর উপরে + স্বতন্ত্র বক্স' && git push"
