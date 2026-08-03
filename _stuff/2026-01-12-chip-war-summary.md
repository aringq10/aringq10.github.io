---
title: Chip War Summary
description: Chapter summary of Chip War by Chris Miller.
---
[Chip War by Chris Miller](https://www.amazon.com/Chip-War-Worlds-Critical-Technology/dp/1982172002)
<br>
<br>
{% for ch in site.data.stuff.chip-war-summary %}
  {% capture chapter_points %}
    <ul>
      {% for point in ch.points %}
        <li>{{ point }}</li>
      {% endfor %}
    </ul>
  {% endcapture %}
  {% include dropdown.html
     summary=ch.title
     body=chapter_points
  %}
  {% unless forloop.last %}
  <hr class="divider">
  {% endunless %}
{% endfor %}
