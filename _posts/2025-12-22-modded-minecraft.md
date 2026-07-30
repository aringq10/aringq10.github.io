---
excerpt: Modlist for personal MC world.
---

Minecraft **1.21.1**
<br>
NeoForge **21.1.215**
<br>
<br>

<div id="modpack-links">
  <a href="{{ '/assets/mc/manifest.json' | relative_url }}" target="blank">
    manifest.json
  </a>
  <br>
  <a href="{{ '/assets/mc/modlist.html' | relative_url }}" target="blank">
    modlist.html
  </a>
  <br>
  <a href="{{ '/assets/mc/neofordziuk.zip' | relative_url }}" target="blank">
    modpack .zip file
  </a>
</div>

<br>

<ol>
  {% for section in site.data.posts.mc-modlist %}
    <li>
      <a href="#{{ section.title | slugify }}">{{ section.title }}</a>
    </li>
  {% endfor %}
</ol>

<br>
<br>

{% for section in site.data.posts.mc-modlist %}
  {% include section-tree.html node=section level=3 %}
{% endfor %}
