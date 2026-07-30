---
---
[Chip War by Chris Miller](https://www.amazon.com/Chip-War-Worlds-Critical-Technology/dp/1982172002){:target="_blank" rel="noopener noreferrer"}
<br>
<br>
{% for ch in site.data.posts.chip-war-summary %}
  {% include dropdown.html
     summary=ch.title
     items=ch.points
  %}
  {% unless forloop.last %}
  <hr>
  {% endunless %}
{% endfor %}
