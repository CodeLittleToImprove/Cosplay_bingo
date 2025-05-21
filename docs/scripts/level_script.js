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
window.addEventListener('pagehide', () =>
{
    localStorage.clear();
    sessionStorage.clear();
    console.log('Page is hiding, storage cleared.');
});

// Main logic
document.addEventListener("DOMContentLoaded", () =>
{
    const userLang = navigator.language;
    const isGerman = userLang.startsWith("de");

    // Language switch
    const enSection = document.getElementById("en");
    const deSection = document.getElementById("de");
    if (isGerman)
    {
        deSection.style.display = "block";
    }
    else
    {
        enSection.style.display = "block";
    }
    document.body.style.visibility = "visible";

    // Link transitions
    document.querySelectorAll('.full-link').forEach(link =>
    {
        link.addEventListener('click', function (e)
        {
            e.preventDefault();
            const href = this.dataset.href;
            document.body.classList.add('page-exit');
            setTimeout(() =>
            {
                window.location.href = href;
            }, 800);
        });
    });

    // // Secret area placement
    // const headlines = document.querySelectorAll('.page-headline');
    // const area = document.getElementById('secret-area');
    //
    // if (area && headlines.length > 0) {
    //     headlines.forEach(headline => {
    //         const rect = headline.getBoundingClientRect();
    //
    //         area.style.top = rect.top + window.scrollY + "px";
    //         area.style.left = rect.left + window.scrollX + "px";
    //         area.style.width = rect.width + "px";
    //         area.style.height = rect.height + "px";
    //     });
    // }

    const visibleHeadline = document.querySelector('.language-section.container[style*="block"] .page-headline');
    const secretArea = document.getElementById('secret-area');
    console.log("Looking for visible headline...");
    if (!visibleHeadline)
    {
        console.warn("No visible .page-headline found in currently shown language section.");
    }

    if (!secretArea)
    {
        console.warn("Secret area (#secret-area) not found.");
    }
    if (secretArea && visibleHeadline)
    {
        console.log("Found visible headline:", visibleHeadline.textContent);
        const rect = visibleHeadline.getBoundingClientRect();
        console.log("Headline rect:", rect);
        secretArea.style.top = rect.top + window.scrollY + "px";
        secretArea.style.left = rect.left + window.scrollX + "px";
        secretArea.style.width = rect.width + "px";
        secretArea.style.height = rect.height + "px";
        console.log("Secret area positioned:", {
            top: secretArea.style.top,
            left: secretArea.style.left,
            width: secretArea.style.width,
            height: secretArea.style.height
        });
    }


    const secretUrl = isGerman ? "bingo_board_level_baka_ger.html" : "bingo_board_level_baka.html";


    let tapCount = 0;
    let tapTimer;

    function registerTap()
    {
        tapCount++;

        if (tapCount >= 5)
        {
            window.location.href = secretUrl;
        }

        clearTimeout(tapTimer);
        tapTimer = setTimeout(() =>
        {
            tapCount = 0; // Reset tap count after 1 second of inactivity
        }, 1000);
    }

    ['click', 'touchstart'].forEach(evt =>
        secretArea.addEventListener(evt, registerTap)
    );
});
