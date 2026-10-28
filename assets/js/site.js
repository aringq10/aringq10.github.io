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

  // Back to top -----------------------------------------------------------
  var toTop = document.querySelector("[data-back-to-top]");

  if (toTop) {
    // How far down the page the button starts showing.
    var showAfter = 400;
    var queued = false;

    var syncToTop = function () {
      queued = false;
      var scrolled = window.pageYOffset || root.scrollTop;
      toTop.classList.toggle("is-visible", scrolled > showAfter);
    };

    window.addEventListener(
      "scroll",
      function () {
        // One update per frame — scroll fires far more often than that.
        if (!queued) {
          queued = true;
          window.requestAnimationFrame(syncToTop);
        }
      },
      { passive: true }
    );

    toTop.addEventListener("click", function () {
      var reduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });

    syncToTop();
  }
})();
