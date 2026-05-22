#!/bin/bash
# লিংক ক্লিনার রোবট v2 — sed দিয়ে সরাসরি মরা লিংক মুছে ফেলো
SERIES_FILE="blog/series-list.js"
DEAD_FILE=".dead_links_temp.txt"
BACKUP_FILE="${SERIES_FILE}.bak"

echo "🔍 লিংক চেক করা হচ্ছে..."

# মরা লিংকের তালিকা তৈরি করো
> "$DEAD_FILE"
grep -oP 'link:\s*"\K[^"]+' "$SERIES_FILE" | while IFS= read -r url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url")
  if [ "$status" != "200" ]; then
    echo "$url" >> "$DEAD_FILE"
  fi
done

# যদি কোনো মরা লিংক না থাকে
if [ ! -s "$DEAD_FILE" ]; then
  echo "✅ সব লিংক ঠিক আছে! কোনো পরিবর্তনের প্রয়োজন নেই।"
  rm -f "$DEAD_FILE"
  exit 0
fi

# ডুপ্লিকেট সরাও
sort -u "$DEAD_FILE" -o "$DEAD_FILE"

echo ""
echo "⚠️ নিচের লিংকগুলো কাজ করছে না, এগুলো সরিয়ে দেওয়া হবে:"
cat "$DEAD_FILE"
echo ""

# ব্যাকআপ রাখো
cp "$SERIES_FILE" "$BACKUP_FILE"
echo "📂 আসল ফাইলের ব্যাকআপ রাখা হয়েছে: $BACKUP_FILE"

# sed দিয়ে প্রতিটা মরা লিংকের পূর্ণ লাইন মুছে ফেলো
while IFS= read -r dead_url; do
  # URL-এ থাকা স্ল্যাশ ও ডট এস্কেপ করো
  escaped=$(echo "$dead_url" | sed 's/[\/&.]/\\&/g')
  sed -i "/\"$escaped\"/d" "$SERIES_FILE"
done < "$DEAD_FILE"

# অস্থায়ী ফাইল পরিষ্কার
rm -f "$DEAD_FILE"

echo ""
echo "🎉 লিংক ক্লিনার রোবট কাজ শেষ!"
