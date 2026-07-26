#!/usr/bin/env python3
import os
import datetime
import xml.etree.ElementTree as ET

BASE_URL = "https://banglagolpogalaxy.github.io/portfolio"
ROOT_DIR = "."

def get_html_files(directory):
    html_files = []
    for root, dirs, files in os.walk(directory):
        if ".git" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, directory)
                if rel_path in ("sitemap.html", "sitemap_index.html"):
                    continue
                html_files.append({
                    "path": full_path,
                    "rel_path": rel_path,
                    "date": datetime.datetime.fromtimestamp(
                        os.path.getmtime(full_path)
                    ).strftime("%Y-%m-%d")
                })
    return html_files

def generate_sitemap():
    files = get_html_files(ROOT_DIR)
    print(f"🔍 {len(files)}টি HTML ফাইল পাওয়া গেছে।")
    
    # নতুন → পুরনো ক্রমে সাজানো
    files.sort(key=lambda x: x["date"], reverse=True)
    
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
    
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write("sitemap.xml", encoding="utf-8", xml_declaration=True)
    print("✅ sitemap.xml তৈরি করা হয়েছে।")

if __name__ == "__main__":
    generate_sitemap()
