#!/usr/bin/env python3
import os
import datetime
import xml.etree.ElementTree as ET

BASE_URL = "https://banglagolpogalaxy.github.io/portfolio"
ROOT_DIR = "."

def get_html_files(directory):
    """সব .html ফাইল খুঁজে বের করে, sitemap নিজেকে বাদ দেয়"""
    html_files = []
    for root, _, files in os.walk(directory):
        if ".git" in root:
            continue
        for file in files:
            if not file.endswith(".html"):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, directory)
            # সাইটম্যাপ ফাইল বাদ
            if rel_path in ("sitemap.html", "sitemap_index.html"):
                continue
            # ফাইলের শেষ পরিবর্তনের তারিখ
            mtime = os.path.getmtime(full_path)
            date = datetime.datetime.fromtimestamp(mtime).strftime("%Y-%m-%d")
            html_files.append({
                "rel_path": rel_path,
                "date": date
            })
    return html_files

def generate_sitemap():
    files = get_html_files(ROOT_DIR)
    print(f"🔍 {len(files)}টি HTML ফাইল পাওয়া গেছে।")

    # নতুন → পুরনো ক্রমে সাজানো
    files.sort(key=lambda x: x["date"], reverse=True)

    # XML তৈরি
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for item in files:
        rel_path = item["rel_path"].replace(os.sep, "/")
        url = f"{BASE_URL}/{rel_path}"
        date = item["date"]
        priority = "0.9" if "blog" in rel_path else "0.8"

        url_elem = ET.SubElement(urlset, "url")
        ET.SubElement(url_elem, "loc").text = url
        ET.SubElement(url_elem, "lastmod").text = date
        ET.SubElement(url_elem, "priority").text = priority

    # ফাইল লেখা
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write("sitemap.xml", encoding="utf-8", xml_declaration=True)
    print("✅ sitemap.xml তৈরি করা হয়েছে।")

    # HTML সাইটম্যাপ (সিম্পল)
    html_content = generate_html_sitemap(files)
    with open("sitemap.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print("✅ sitemap.html তৈরি করা হয়েছে।")

def generate_html_sitemap(files):
    """সিম্পল HTML সাইটম্যাপ তৈরি"""
    now = datetime.datetime.now().strftime("%d %B %Y")
    items = ""
    for item in files:
        rel_path = item["rel_path"].replace(os.sep, "/")
        url = f"{BASE_URL}/{rel_path}"
        date = item["date"]
        title = os.path.splitext(os.path.basename(rel_path))[0].replace("-", " ").replace("_", " ").title()
        items += f"""
          <div class="item">
            <span class="date">📅 {date}</span>
            <a href="{url}" target="_blank">{title}</a>
          </div>"""

    return f"""<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>সাইটম্যাপ – Milan Biswas</title>
  <style>
    * {{ margin:0; padding:0; box-sizing:border-box; }}
    body {{
      font-family: Arial, sans-serif;
      background: #08091b;
      color: #f8f9ff;
      padding: 40px 20px;
    }}
    .container {{ max-width: 800px; margin: auto; }}
    h1 {{
      font-size: 32px;
      color: #9b83ff;
      border-bottom: 1px solid #333;
      padding-bottom: 16px;
    }}
    .item {{
      padding: 12px 0;
      border-bottom: 1px solid #222;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px 20px;
    }}
    .date {{
      color: #888;
      font-size: 13px;
      min-width: 120px;
    }}
    a {{
      color: #7c5cff;
      text-decoration: none;
      font-size: 15px;
    }}
    a:hover {{ text-decoration: underline; }}
    .footer {{
      margin-top: 30px;
      padding-top: 16px;
      border-top: 1px solid #333;
      color: #666;
      font-size: 13px;
      text-align: center;
    }}
    .footer a {{ color: #7c5cff; }}
  </style>
</head>
<body>
  <div class="container">
    <h1>🗺️ সাইটম্যাপ</h1>
    <p style="color:#aaa; margin: 12px 0 24px;">সর্বশেষ আপডেট: {now}</p>
    {items}
    <div class="footer">
      <a href="{BASE_URL}/">🏠 পোর্টফোলিও হোমপেজ</a> &nbsp;·&nbsp; © {datetime.datetime.now().year} Milan Biswas
    </div>
  </div>
</body>
</html>"""

if __name__ == "__main__":
    generate_sitemap()
