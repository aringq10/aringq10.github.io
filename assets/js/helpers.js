function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern browsers
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers / mobile
        const textarea = document.createElement("textarea");
        textarea.value = text;
        // Avoid scrolling to bottom
        textarea.style.position = "fixed";
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.opacity = 0;
        
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            document.execCommand("copy");
            document.body.removeChild(textarea);
            return Promise.resolve();
        } catch (err) {
            document.body.removeChild(textarea);
            return Promise.reject(err);
        }
    }
}
function copyHandle() {
    document.querySelectorAll(".click-copy").forEach(el => {
        const handler = (e) => {
            e.preventDefault();

            let target = el.querySelector(".copy-target");
            if (!target) {
                target = el;
            }

            const original = target.dataset.original || target.innerText;
            if (!target.dataset.original) target.dataset.original = original;

            copyTextToClipboard(original).then(() => {
                // temporary feedback
                target.innerText = "Copied To Clipboard";
                setTimeout(() => {
                    target.innerText = target.dataset.original;
                }, 1000);
            }).catch(err => {
                // temporary feedback
                target.innerText = "Copy Failed";
                setTimeout(() => {
                    target.innerText = target.dataset.original;
                }, 1000);
                console.error("Copy failed:", err);
            });
        };

        el.addEventListener("click", handler);
    });
};

// Function to import all SVGs
function importSVGs() {
    const elements = document.querySelectorAll('.svg-import');
    const pathPrefix = "/assets/svg/";

    elements.forEach(el => {
        let path = el.getAttribute('data-file');
        if (!path) return;
        path = pathPrefix + path;

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${path}`);
                return response.text();
            })
            .then(svgText => {
                el.insertAdjacentHTML('afterend', svgText);

                // Optional: copy SVG attributes like width/height from parent div
                const svgEl = el.nextElementSibling;
                if (svgEl) {
                    svgEl.setAttribute('id', el.getAttribute('svg-id') || '');
                }
                el.remove();
            })
            .catch(err => console.error(err));
    });
}

// Run the function after DOM is ready
document.addEventListener('DOMContentLoaded', importSVGs);
document.addEventListener('DOMContentLoaded', copyHandle);
document.addEventListener('DOMContentLoaded', function() {

    const slider = document.getElementById("font-slider");
    const root = document.documentElement;

    slider.value = parseFloat(root.style.fontSize.trim());

    // Update on slider input
    slider.addEventListener("input", () => {
        const newSize = slider.value;
        root.style.fontSize = newSize + "px";
        localStorage.setItem("base-font", newSize);
    });
});
