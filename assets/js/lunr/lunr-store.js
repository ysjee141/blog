---
layout: null
---

var store = [
  {%- for c in site.collections -%}
    {%- if forloop.last -%}
      {%- assign l = true -%}
    {%- endif -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}
      {%- if doc.header.teaser -%}
        {%- capture teaser -%}{{ doc.header.teaser | absolute_url }}{%- endcapture -%}
      {%- else -%}

        {%- if doc.content contains "<img" -%}
          {%- assign images = doc.content | split: '<img'  -%}
          {%- for image in images -%}
            {%- assign teaser = image | split: ' src="' | last | split:'"' | first | strip -%}
            {%- if teaser contains "/post_img/" -%}
              {%- break -%}
            {%- endif -%}
          {%- endfor -%}
        {%- else -%}
          {%- assign teaser = site.teaser | absolute_url -%}
        {%- endif -%}

      {%- endif -%}
      {
        "title": {{ doc.title | jsonify }},
        "excerpt":
          {%- if site.search_full_content == true -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | jsonify }},
          {%- else -%}
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
          {%- endif -%}
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | absolute_url | jsonify }},
        "teaser": {{ teaser | jsonify }}
      }{%- unless forloop.last and l -%},{%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}]
