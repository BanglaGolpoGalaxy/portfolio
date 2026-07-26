#!/usr/bin/env python3
import os
import datetime
import subprocess
import xml.etree.ElementTree as ET
from typing import List, Dict

BASE_URL = "https://banglagolpogalaxy.github.io/portfolio"
ROOT_DIR = "."


def get_git_date(file_path: str) -> str:
    """
    Git কমিট হিস্ট্রি থেকে ফাইলের শেষ পরিবর্তনের তারিখ বের করে (YYYY-MM-DD ফরম্যাটে)।
    যদি কোনো কারণে Git কমিট না পাওয়া যায়, তাহলে ফাইলের mtime ব্যবহার করে।
    """
    try:
        # ফাইলটির শেষ কমিটের তারিখ বের করা
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cd", "--date=short", "--", file_path],
            capture_output=True,
            text=True,
            cwd=os.path.dirname(file_path) or "."
        )
        if result.returncode == 0 and result.stdout.strip():
            date = result.stdout.strip()
            print(f"   📅 Git তারিখ: {date} for {file_path}")
            return date
        else:
            print(f"   ⚠️ Git তারিখ পাওয়া যায়নি, mtime ব্যবহার করা হবে: {file_path}")
    except Exception as e:
        print(f"   ❌ Git error: {e} for {file_path}")

    # Git ব্যর্থ হলে ফাইলের mtime ব্যবহার (fallback)
    try:
        mtime = datetime.datetime.fromtimestamp(os.path.getmtime(file_path)).strftime("%Y-%m-%d")
        print(f"   📅 mtime: {mtime} for {file_path}")
        return mtime
    except OSError as e:
        print(f"   ❌ mtime error: {e}")
        return datetime.datetime.now().strftime("%Y-%m-%d")


def get_html_files(directory: str) -> List[Dict]:
    """রুট ডিরেক্টরি থেকে সব .html ফাইল খুঁজে বের করে, sitemap.html বাদ দেয়।"""
    html_files = []
    print(f"🔍 {directory} ডিরেক্টরি থেকে HTML ফাইল খোঁজা হচ্ছে...")
    for root, _, files in os.walk(directory):
        # .git ফোল্ডার বাদ দিতে
        if ".git" in root:
            continue
        for file in files:
            if not file.endswith(".html"):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, directory)
            # নিজের সাইটম্যাপ ফাইল বাদ (যাতে রিকারশন না হয়)
            if rel_path in ("sitemap.html", "sitemap_index.html"):
                print(f"   ⏭️ বাদ দেওয়া হচ্ছে: {rel_path}")
                continue
            print(f"   📄 পাওয়া গেছে: {rel_path}")
            html_files.append({
                "path": full_path,
                "rel_path": rel_path,
                "date": get_git_date(full_path)
            })
    print(f"✅ মোট {len(html_files)}টি HTML ফাইল পাওয়া গেছে।")
    return html_files


def generate_sitemap():
    """সাইটম্যাপ XML ও HTML জেনারেট করে।"""
    files = get_html_files(ROOT_DIR)
    if not files:
        print("❌ কোনো HTML ফাইল পাওয়া যায়নি!")
        return

    print("\n📋 ফাইলগুলোর তারিখ ও ক্রম:")
    for f in files:
        print(f"   {f['rel_path']} -> {f['date']}")

    # === ১. নতুন → পুরনো ক্রমে সাজানো ===
    files.sort(key=lambda x: x["date"], reverse=True)
    print("\n🔄 সাজানোর পর ক্রম (নতুন → পুরনো):")
    for f in files:
        print(f"   {f['rel_path']} -> {f['date']}")

    # === ২. XML সাইটম্যাপ তৈরি ===
    print("\n📝 XML সাইটম্যাপ তৈরি করা হচ্ছে...")
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for item in files:
        rel_path = item["rel_path"].replace(os.sep, "/")
        url = f"{BASE_URL}/{rel_path}"
        date = item["date"]

        # প্রায়োরিটি সেট করা (ব্লগ ও ক্যালকুলেটরকে বেশি গুরুত্ব)
        if "blog" in rel_path or "calculator" in rel_path or "calc" in rel_path:
            priority = "0.9"
        else:
            priority = "0.8"

        url_elem = ET.SubElement(urlset, "url")
        ET.SubElement(url_elem, "loc").text = url
        ET.SubElement(url_elem, "lastmod").text = date
        ET.SubElement(url_elem, "priority").text = priority
        print(f"   ✅ যোগ করা হয়েছে: {url} ({date})")

    # XML ফাইল লেখা
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write("sitemap.xml", encoding="utf-8", xml_declaration=True)
    print("✅ sitemap.xml জেনারেট করা হয়েছে।")

    # === ৩. HTML সাইটম্যাপ তৈরি (পোর্টফোলিও থিম অনুযায়ী) ===
    print("\n📝 HTML সাইটম্যাপ তৈরি করা হচ্ছে...")
    generate_html_sitemap(files)
    print("✅ sitemap.html জেনারেট করা হয়েছে।")


def generate_html_sitemap(files: List[Dict]):
    """সুন্দর HTML সাইটম্যাপ তৈরি করে।"""
    now = datetime.datetime.now().strftime("%d %B %Y")

    # ব্লগ ও প্রোজেক্ট আলাদা করতে (প্রোজেক্টের লিংকগুলোতে 'books', 'super_calculator', ইত্যাদি আছে)
    blog_items = []
    other_items = []

    for item in files:
        rel_path = item["rel_path"]
        url = f"{BASE_URL}/{rel_path.replace(os.sep, '/')}"
        date = item["date"]
        title = os.path.splitext(os.path.basename(rel_path))[0].replace("-", " ").replace("_", " ").title()

        html_line = f"""
          <div class="sitemap-item">
            <span class="item-date">📅 {date}</span>
            <a href="{url}" target="_blank" class="item-link">{title}</a>
          </div>"""

        if "blog" in rel_path:
            blog_items.append(html_line)
        else:
            other_items.append(html_line)

    # HTML তৈরি
    html_content = f"""<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>সাইটম্যাপ – Milan Biswas</title>
  <meta name="description" content="Milan Biswas-এর পোর্টফোলিওর সকল পেজের সাইটম্যাপ।">
  <link rel="canonical" href="{BASE_URL}/sitemap.html">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: 'Inter', sans-serif;
      background: radial-gradient(circle at 75% 5%, rgba(124,92,255,0.16), transparent 30%), #08091b;
      color: #f8f9ff;
      padding: 40px 20px;
      min-height: 100vh;
    }}
    .container {{ max-width: 1100px; margin: 0 auto; }}
    
    .sitemap-header {{
      text-align: center;
      padding: 30px 0 40px;
      border-bottom: 1px solid rgba(145,155,220,0.18);
      margin-bottom: 40px;
    }}
    .sitemap-header h1 {{
      font-size: 42px;
      font-weight: 800;
      background: linear-gradient(135deg, #7c5cff, #2463ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }}
    .sitemap-header p {{ color: #aeb5cf; margin-top: 8px; font-size: 16px; }}
    .sitemap-header .badge {{
      display: inline-block;
      margin-top: 12px;
      padding: 6px 18px;
      border-radius: 40px;
      background: rgba(124,92,255,0.2);
      border: 1px solid #7c5cff;
      font-size: 12px;
      color: #9b83ff;
    }}

    .sitemap-grid {{
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
      gap: 30px;
    }}
    @media (max-width: 700px) {{
      .sitemap-grid {{ grid-template-columns: 1fr; }}
    }}

    .sitemap-card {{
      background: rgba(17,20,50,0.72);
      border: 1px solid rgba(145,155,220,0.18);
      border-radius: 20px;
      padding: 28px 30px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.25);
      backdrop-filter: blur(12px);
    }}
    .sitemap-card h2 {{
      font-size: 22px;
      font-weight: 700;
      color: #9b83ff;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid rgba(145,155,220,0.18);
      padding-bottom: 14px;
    }}
    .sitemap-card h2 span {{ font-size: 28px; }}

    .sitemap-item {{
      padding: 12px 0;
      border-bottom: 1px solid rgba(145,155,220,0.08);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 14px;
      transition: 0.2s;
    }}
    .sitemap-item:hover {{ background: rgba(124,92,255,0.05); margin: 0 -10px; padding: 12px 10px; border-radius: 10px; }}
    .sitemap-item:last-child {{ border-bottom: none; }}

    .item-date {{
      font-size: 12px;
      color: #aeb5cf;
      background: rgba(255,255,255,0.06);
      padding: 2px 10px;
      border-radius: 20px;
      white-space: nowrap;
      font-weight: 500;
    }}
    .item-link {{
      color: #f8f9ff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: 0.2s;
      flex: 1;
    }}
    .item-link:hover {{
      color: #9b83ff;
      text-decoration: underline;
    }}

    .sitemap-footer {{
      text-align: center;
      margin-top: 40px;
      padding-top: 25px;
      border-top: 1px solid rgba(145,155,220,0.18);
      color: #64748b;
      font-size: 13px;
    }}
    .sitemap-footer a {{ color: #9b83ff; text-decoration: none; }}
    .sitemap-footer a:hover {{ text-decoration: underline; }}

    @media (max-width: 480px) {{
      .sitemap-header h1 {{ font-size: 28px; }}
      .sitemap-card {{ padding: 20px; }}
      .sitemap-item {{ flex-direction: column; align-items: flex-start; gap: 4px; }}
      .item-date {{ font-size: 10px; }}
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="sitemap-header">
      <h1>🗺️ সাইটম্যাপ</h1>
      <p>Milan Biswas-এর পোর্টফোলিওর সকল পেজ</p>
      <div class="badge">📌 সর্বশেষ আপডেট: {now}</div>
    </div>

    <div class="sitemap-grid">
      <!-- ব্লগ সেকশন -->
      <div class="sitemap-card">
        <h2><span>📝</span> ব্লগ পোস্ট</h2>
        <div class="sitemap-items">
          {''.join(blog_items) if blog_items else '<p style="color:#aeb5cf; font-size:14px;">কোনো ব্লগ পোস্ট পাওয়া যায়নি।</p>'}
        </div>
      </div>

      <!-- অন্যান্য পেজ (প্রোজেক্ট, বই, ইত্যাদি) -->
      <div class="sitemap-card">
        <h2><span>📄</span> অন্যান্য পেজ</h2>
        <div class="sitemap-items">
          {''.join(other_items) if other_items else '<p style="color:#aeb5cf; font-size:14px;">কোনো পেজ পাওয়া যায়নি।</p>'}
        </div>
      </div>
    </div>

    <div class="sitemap-footer">
      <p>🏠 <a href="{BASE_URL}/">পোর্টফোলিও হোমপেজে ফিরে যান</a> &nbsp;·&nbsp; © {datetime.datetime.now().year} Milan Biswas</p>
    </div>
  </div>
</body>
</html>"""

    # HTML ফাইল লেখা
    with open("sitemap.html", "w", encoding="utf-8") as f:
        f.write(html_content)


if __name__ == "__main__":
    generate_sitemap()
