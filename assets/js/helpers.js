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

const filter = (q, sel) =>
    document.querySelectorAll(sel).forEach(el =>
        el.hidden = !el.getAttribute('data-match').toLowerCase().includes(q.toLowerCase())
    );

function loadSearchbars() {
    document.querySelectorAll('.searchbar').forEach(inp => {
        inp.oninput = e => filter(e.target.value, inp.getAttribute('data-selector'))
        inp.placeholder = "Search..."
    });
}

// Run the function after DOM is ready
document.addEventListener('DOMContentLoaded', copyHandle);
document.addEventListener('DOMContentLoaded', loadSearchbars);

