---
title: Modded Minecraft
description: Modlist for personal MC world.
---

Minecraft **1.21.1**
<br>
NeoForge **21.1.215**

<ul class="link-list">
  <li class="link-list__item">
    <a href="{{ '/assets/mc/manifest.json' | relative_url }}" target="blank">manifest.json</a>
  </li>
  <li class="link-list__item">
    <a href="{{ '/assets/mc/modlist.html' | relative_url }}" target="blank">modlist.html</a>
  </li>
  <li class="link-list__item">
    <a href="{{ '/assets/mc/neofordziuk.zip' | relative_url }}" target="blank">modpack .zip file</a>
  </li>
</ul>

<ol class="toc">
  {% for section in site.data.stuff.mc-modlist %}
    <li>
      <a href="#{{ section.title | slugify }}">{{ section.title }}</a>
    </li>
  {% endfor %}
</ol>

<hr class="divider">

{% for section in site.data.stuff.mc-modlist %}
  {% include section-tree.html node=section level=3 %}
{% endfor %}
