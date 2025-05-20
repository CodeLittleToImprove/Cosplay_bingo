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
    const userLang = navigator.language;
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
    const area = document.getElementById('secret-area');
    const headline = document.querySelector('.page-headline');

    if (headline && area) {
        const rect = headline.getBoundingClientRect();

        area.style.top = rect.top + window.scrollY + "px";
        area.style.left = rect.left + window.scrollX + "px";
        area.style.width = rect.width + "px";
        area.style.height = rect.height + "px";
    }

    const secretUrl = isGerman ? "bingo_board_level_baka_ger.html" : "bingo_board_level_baka.html";

    let pressTimer;

    function startPressTimer() {
        pressTimer = setTimeout(() => {
            window.location.href = secretUrl;
        }, 2000);
    }

    function cancelPressTimer() {
        clearTimeout(pressTimer);
    }

    // Add event listeners
    area.addEventListener('touchstart', startPressTimer);
    area.addEventListener('touchend', cancelPressTimer);
    area.addEventListener('touchcancel', cancelPressTimer);
    area.addEventListener('mousedown', startPressTimer);
    area.addEventListener('mouseup', cancelPressTimer);
    area.addEventListener('mouseleave', cancelPressTimer);

    // Prevent context menu from opening
    area.addEventListener('contextmenu', e => e.preventDefault());
});
