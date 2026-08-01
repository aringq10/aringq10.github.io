---
title: Chip War Summary
---
[Chip War by Chris Miller](https://www.amazon.com/Chip-War-Worlds-Critical-Technology/dp/1982172002){:target="_blank" rel="noopener noreferrer"}
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
