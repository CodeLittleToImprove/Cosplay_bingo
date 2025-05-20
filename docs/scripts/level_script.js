// Hover animations
const $left = $('.left');
const $right = $('.right');
const $container = $('.container');

$left
    .on('mouseenter', () => $container.addClass('left-is-hovered'))
    .on('mouseleave', () => $container.removeClass('left-is-hovered'));

$right
    .on('mouseenter', () => $container.addClass('right-is-hovered'))
    .on('mouseleave', () => $container.removeClass('right-is-hovered'));

// Handle pagehide cleanup
window.addEventListener('pagehide', () => {
    localStorage.clear();
    sessionStorage.clear();
    console.log('Page is hiding, storage cleared.');
});

// Main logic
document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language || navigator.userLanguage;
    const isGerman = userLang.startsWith("de");

    // Language switch
    const enSection = document.getElementById("en");
    const deSection = document.getElementById("de");
    if (isGerman) {
        deSection.style.display = "block";
    } else {
        enSection.style.display = "block";
    }
    document.body.style.visibility = "visible";

    // Link transitions
    document.querySelectorAll('.full-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.dataset.href;
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });

    // Secret area placement
    const secretArea = document.getElementById('secret-area');
    const headline = document.querySelector('.page-headline');
    if (headline && secretArea) {
        const rect = headline.getBoundingClientRect();
        secretArea.style.top = rect.top + window.scrollY + "px";
        secretArea.style.left = rect.left + window.scrollX + "px";
        secretArea.style.width = rect.width + "px";
        secretArea.style.height = rect.height + "px";
    }

    // Secret area logic
    const secretUrl = isGerman ? "dein-geheimes-seite.html" : "your-secret-page.html";
    let pressTimer;

    function startPressTimer() {
        pressTimer = setTimeout(() => {
            window.location.href = secretUrl;
        }, 2000);
    }

    function cancelPressTimer() {
        clearTimeout(pressTimer);
    }

    secretArea.addEventListener('touchstart', startPressTimer);
    secretArea.addEventListener('touchend', cancelPressTimer);
    secretArea.addEventListener('touchcancel', cancelPressTimer);
    secretArea.addEventListener('mousedown', startPressTimer);
    secretArea.addEventListener('mouseup', cancelPressTimer);
    secretArea.addEventListener('mouseleave', cancelPressTimer);
});
