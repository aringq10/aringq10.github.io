(function () {
  "use strict";

  var root = document.documentElement;

  // Theme picker ----------------------------------------------------------
  // The initial theme is applied by the inline script in _includes/head.html
  // to avoid a flash; this only handles switching. Which row is checked is
  // handled in CSS, keyed off [data-theme] on <html>.
  var picker = document.querySelector(".theme-picker");

  if (picker) {
    var current = picker.querySelector(".theme-picker__current");
    var options = picker.querySelectorAll(".theme-picker__option");

    var showCurrent = function () {
      var active = root.getAttribute("data-theme");
      for (var i = 0; i < options.length; i++) {
        var isActive = options[i].getAttribute("data-theme") === active;
        options[i].setAttribute("aria-current", isActive ? "true" : "false");
        if (isActive && current) {
          current.textContent = options[i].textContent.trim();
        }
      }
    };

    var apply = function (theme) {
      root.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("theme", theme);
      } catch (e) {
        /* private mode, storage full — the theme still applies for this page */
      }
      showCurrent();
      picker.removeAttribute("open");
    };

    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener("click", function () {
        apply(this.getAttribute("data-theme"));
      });
    }

    // Clicking outside closes the list.
    document.addEventListener("click", function (event) {
      if (picker.hasAttribute("open") && !picker.contains(event.target)) {
        picker.removeAttribute("open");
      }
    });

    showCurrent();
  }

  // Mobile nav dropdown ---------------------------------------------------
  var sidebar = document.getElementById("sidebar");
  var navToggle = sidebar && sidebar.querySelector(".sidebar__toggle");

  if (sidebar && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = sidebar.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute(
        "aria-label",
        open ? "Hide navigation" : "Show navigation"
      );
    });
  }

  // Entry list filter -----------------------------------------------------
  var filter = document.querySelector("[data-filter]");
  var filterList = document.querySelector("[data-filter-list]");
  var input = filter && filter.querySelector(".filter__input");
  var rows = filterList
    ? filterList.querySelectorAll(".entry-list__item")
    : [];

  if (input && rows.length) {
    var empty = document.querySelector("[data-filter-empty]");

    var normalize = function (text) {
      return text.toLowerCase().replace(/\s+/g, " ").trim();
    };

    var haystacks = [];
    for (var r = 0; r < rows.length; r++) {
      haystacks.push(normalize(rows[r].textContent));
    }

    filter.hidden = false;

    var applyFilter = function () {
      var query = normalize(input.value);
      var shown = 0;

      for (var j = 0; j < rows.length; j++) {
        var hit = query === "" || haystacks[j].indexOf(query) !== -1;
        rows[j].hidden = !hit;
        if (hit) {
          shown++;
        }
      }

      if (empty) {
        empty.hidden = shown !== 0;
      }
    };

    input.addEventListener("input", applyFilter);

    applyFilter();
  }
})();
