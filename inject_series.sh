#!/bin/bash
# ইনজেকশন রোবট — সব ব্লগ ফাইলে series-list.js ও টেবিল ডিভ যোগ করো

SCRIPT_TAG='<script src="series-list.js"><\/script>'
TABLE_DIV='<div id="blog-series-table"><\/div>'

# blog ফোল্ডারের ভেতরে সব HTML ফাইল খোঁজো
find blog -name "*.html" | while read file; do
  echo "🔧 প্রসেসিং: $file"

  # series-list.js এর script ট্যাগ আছে কিনা চেক করো
  if ! grep -q 'series-list.js' "$file"; then
    # </head> ট্যাগের আগে script ট্যাগ বসাও
    sed -i "s|</head>|    ${SCRIPT_TAG}\n</head>|" "$file"
    echo "   ✅ script ট্যাগ যোগ করা হয়েছে"
  else
    echo "   ⏭️ script ট্যাগ আগে থেকেই আছে"
  fi

  # blog-series-table div আছে কিনা চেক করো
  if ! grep -q 'blog-series-table' "$file"; then
    # </body> ট্যাগের আগে div বসাও
    sed -i "s|</body>|    ${TABLE_DIV}\n</body>|" "$file"
    echo "   ✅ টেবিল div যোগ করা হয়েছে"
  else
    echo "   ⏭️ টেবিল div আগে থেকেই আছে"
  fi
done

echo ""
echo "🎉 সব ফাইল প্রসেস করা হয়েছে! এখন git add -A && git commit -m 'ইনজেকশন রোবট: সব ব্লগে সিরিজ টেবিল যোগ' && git push origin main"
