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
    const headlines = document.querySelectorAll('.page-headline');
    const area = document.getElementById('secret-area');

    if (area && headlines.length > 0) {
        headlines.forEach(headline => {
            const rect = headline.getBoundingClientRect();

            area.style.top = rect.top + window.scrollY + "px";
            area.style.left = rect.left + window.scrollX + "px";
            area.style.width = rect.width + "px";
            area.style.height = rect.height + "px";
        });
    }


    const secretUrl = isGerman ? "bingo_board_level_baka_ger.html" : "bingo_board_level_baka.html";

    const secretArea = document.getElementById('secret-area');
    let tapCount = 0;
    let tapTimer;

    function registerTap() {
        tapCount++;

        if (tapCount >= 5) {
            window.location.href = secretUrl;
        }

        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => {
            tapCount = 0; // Reset tap count after 1 second of inactivity
        }, 1000);
    }

    ['click', 'touchstart'].forEach(evt =>
        secretArea.addEventListener(evt, registerTap)
    );
});
