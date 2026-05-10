import os, datetime, xml.etree.ElementTree as ET

BASE_URL = "https://banglagolpogalaxy.github.io/portfolio"
ROOT_DIR = "."

def get_html_files(directory):
    html_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    return html_files

def generate_sitemap():
    urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for file_path in get_html_files(ROOT_DIR):
        rel_path = os.path.relpath(file_path, ROOT_DIR)
        url = f"{BASE_URL}/{rel_path.replace(os.sep, '/')}"
        lastmod = datetime.datetime.fromtimestamp(os.path.getmtime(file_path)).strftime("%Y-%m-%d")
        priority = "0.9" if "blog" in rel_path or "calculator" in rel_path else "0.8"
        url_elem = ET.SubElement(urlset, "url")
        ET.SubElement(url_elem, "loc").text = url
        ET.SubElement(url_elem, "lastmod").text = lastmod
        ET.SubElement(url_elem, "priority").text = priority
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write("sitemap.xml", encoding="utf-8", xml_declaration=True)

if __name__ == "__main__":
    generate_sitemap()
