#!/usr/bin/env python3
import glob
import html
import json
import re
from html.parser import HTMLParser


def clean(value):
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def clean_rich(value):
    return re.sub(r"\s+", " ", value).strip()


class PostParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.section_depth = 0
        self.blocks = []
        self.capture = None
        self.buffer = []
        self.rich_buffer = []
        self.list_block = None
        self.in_list_item = False
        self.figure = None

    @property
    def active(self):
        return self.section_depth > 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "section" and attributes.get("data-hook") == "post-description":
            self.section_depth = 1
            return
        if not self.active:
            return
        if tag == "section":
            self.section_depth += 1
        if self.capture and tag in {"strong", "b", "em", "i", "u", "a"}:
            semantic_tag = {"b": "strong", "i": "em"}.get(tag, tag)
            if semantic_tag == "a":
                href = html.escape(attributes.get("href", ""), quote=True)
                self.rich_buffer.append(f'<a href="{href}">')
            else:
                self.rich_buffer.append(f"<{semantic_tag}>")
            return
        if tag == "li" and self.list_block is not None:
            self.capture = "li"
            self.in_list_item = True
            self.buffer = []
            self.rich_buffer = []
        elif tag in {"h2", "h3", "h4", "h5", "h6", "p", "blockquote", "figcaption"} and not self.in_list_item:
            self.capture = tag
            self.buffer = []
            self.rich_buffer = []
        elif tag in {"ul", "ol"} and self.list_block is None:
            self.list_block = {"type": "list", "ordered": tag == "ol", "items": []}
        elif tag == "figure":
            self.figure = {"type": "image", "src": "", "alt": "", "caption": ""}
        elif tag == "img" and self.figure is not None:
            source = attributes.get("data-pin-media") or attributes.get("src", "")
            match = re.search(r"https://static\.wixstatic\.com/media/([^/?]+)", source)
            self.figure["src"] = f"https://static.wixstatic.com/media/{match.group(1)}" if match else source
            self.figure["alt"] = clean(attributes.get("alt", ""))
        elif tag == "br" and self.capture:
            self.buffer.append("\n")
            self.rich_buffer.append("<br>")

    def handle_endtag(self, tag):
        if not self.active:
            return
        if self.capture and tag in {"strong", "b", "em", "i", "u", "a"}:
            semantic_tag = {"b": "strong", "i": "em"}.get(tag, tag)
            self.rich_buffer.append(f"</{semantic_tag}>")
            return
        if tag == "li" and self.in_list_item:
            value = clean("".join(self.buffer))
            if value and self.list_block is not None:
                self.list_block["items"].append(value)
                self.list_block.setdefault("itemHtml", []).append(clean_rich("".join(self.rich_buffer)))
            self.capture = None
            self.in_list_item = False
            self.buffer = []
            self.rich_buffer = []
        elif tag == self.capture:
            value = clean("".join(self.buffer))
            if tag == "figcaption":
                if self.figure is not None:
                    self.figure["caption"] = value
            elif value:
                block_type = "heading" if tag.startswith("h") else ("quote" if tag == "blockquote" else "paragraph")
                block = {"type": block_type, "text": value, "html": clean_rich("".join(self.rich_buffer))}
                if block_type == "heading":
                    block["level"] = int(tag[1])
                self.blocks.append(block)
            self.capture = None
            self.buffer = []
            self.rich_buffer = []
        elif tag in {"ul", "ol"} and self.list_block is not None:
            if self.list_block["items"]:
                self.blocks.append(self.list_block)
            self.list_block = None
        elif tag == "figure" and self.figure is not None:
            if self.figure["src"]:
                if not self.figure["alt"]:
                    self.figure["alt"] = self.figure["caption"] or "Project image"
                self.blocks.append(self.figure)
            self.figure = None
        if tag == "section":
            self.section_depth -= 1

    def handle_data(self, data):
        if self.active and self.capture:
            self.buffer.append(data)
            self.rich_buffer.append(html.escape(data))


posts = []
for path in sorted(glob.glob("/tmp/aczel-all-post-*.html")):
    parser = PostParser()
    with open(path, encoding="utf-8") as source:
        parser.feed(source.read())
    number = int(re.search(r"(\d+)\.html$", path).group(1))
    posts.append({"index": number, "blocks": parser.blocks})

print(json.dumps(posts, ensure_ascii=False))
