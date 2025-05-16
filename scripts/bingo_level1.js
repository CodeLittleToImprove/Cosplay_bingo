// ========== Constants ==========
const ROWS = 5;
const COLS = 5;
const eventName = "JAPANTAG2025"

const WORDS = [
    {de: "Oldschool Anime Charakter", en: "old-school anime character"},
    {de: "Computergenerierte Stimme", en: "computer generated voice"},
    {de: "Dein Lieblingscharakter", en: "your favorite character"},
    {de: "Hintergrundcharakter", en: "background character"},
    {de: "Geschlechtertausch", en: "genderswap"},
    {de: "Gruppencosplay", en: "group cosplay "},
    {de: "Toter Charakter", en: "dead character"},
    {de: "Eltern Rip", en: "parents rip"},
    {de: "Wem ist sicher kalt", en: "someone who is definitely cold"},
    {de: "Charakter den du nicht kennst", en: "a character that you dont know"},
    {de: "Flauschig", en: "fluffy"},
    {de: "Kawaii", en: "kawaii"},
    {de: "Wem ist sicher warm", en: "someone who is definitely warm"},
    {de: "Physikalisch unmögliche Haare", en: "physical impossible hair"},
    {de: "Gender Fragezeichen", en: "What is your Gender"},
    {de: "Zeitreisender", en: "timetraveller"},
    {de: "Anime dass dich zum weinen gebracht hat", en: "anime that made you cry"},
    {de: "Dein Anime Schwarm", en: "your anime crush"},
    {de: "Cosplay Zwilling oder gleiches Shirt", en: "cosplay twin or same shirt"},
    {de: "Cosplayer mit Kontaktlinsen", en: "cosplayer with contact lenses"},
    {de: "Cyberpunk Edgerunner", en: "Cyberpunk Edgerunner"},
    {de: "Bocchi the rock", en: "Bocchi the rock"},
    {de: "Satoru Gojo", en: "Satoru Gojo"},
    {de: "Aufwendiges Cosplay", en: "High effort Cosplay"},
    {de: "Spy X Family", en: "Spy X Family"}
];

// ========== Utility Functions ==========
function detectLanguage()
{
    const lang = (navigator.languages?.[0] || navigator.language || 'en');
    return lang.startsWith('de') ? 'de' : 'en';
}

function generateUniqueIndices(count, max)
{
    const indices = new Set();
    while (indices.size < count)
    {
        indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
}

function copyToClipboard(text)
{
    if (navigator.clipboard && window.isSecureContext)
    {
        return navigator.clipboard.writeText(text).catch(console.error);
    }
    else
    {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
    }
}

function isMobileDevice()
{
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ========== State Management ==========
function saveBingoState(table)
{
    const state = Array.from(table.querySelectorAll("td")).map(cell => ({
        marked: cell.classList.contains("marked"),
        word: cell.textContent
    }));
    localStorage.setItem("bingoState", JSON.stringify(state));
}

// function loadBingoState(table)
// {
//     const state = JSON.parse(localStorage.getItem("bingoState"));
//     if (!state) return;
//     const cells = table.querySelectorAll("td");
//     state.forEach((item, i) =>
//     {
//         const cell = cells[i];
//         cell.textContent = item.word;
//         cell.classList.toggle("marked", item.marked);
//     });
// }

function loadBingoState(table) {
    const stateJSON = localStorage.getItem("bingoState");
    if (!stateJSON) return; // no saved state, just return

    let state;
    try {
        state = JSON.parse(stateJSON);
    } catch (e) {
        console.warn("Failed to parse bingoState from localStorage:", e);
        return; // corrupted data, ignore
    }

    if (!Array.isArray(state)) {
        console.warn("bingoState data invalid, resetting.");
        return;
    }

    const cells = table.querySelectorAll("td");
    state.forEach((item, i) => {
        if (cells[i]) {
            cells[i].textContent = item.word || "";
            if (item.marked) {
                cells[i].classList.add("marked");
            } else {
                cells[i].classList.remove("marked");
            }
        }
    });
}



const button2 = document.getElementById("modal-button2");

// Open button2 URL in new tab for viewing hashtag for keyword
function handleButton2Click() {
    const url = button2.dataset.url;
    if (!url) return;
    window.open(url, '_blank');
}

button2.addEventListener("click", handleButton2Click);

// ========== Modal Handling ==========
function openContextModal(title, text, button1Text, button2Text, url)
{
    const modal = document.getElementById("context_Modal");
    const button2 = document.getElementById("modal-button2");

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-text").textContent = text;
    document.getElementById("modal-button1").textContent = button1Text;

    button2.textContent = button2Text;
    button2.dataset.url = url;

    modal.style.display = "block";
}

// Close all modals on clicking close buttons or outside modal
function closeModal()
{
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
}

document.querySelectorAll('.close').forEach(closeBtn =>
    closeBtn.addEventListener('click', closeModal)
);

window.addEventListener('click', (event) =>
{
    document.querySelectorAll('.modal').forEach(modal =>
    {
        if (event.target === modal) closeModal();
    });
});

// ========== Bingo Logic ==========
function fillBingoBoard(words, indices, lang)
{
    const table = document.getElementById("bingo-board");
    let index = 0;
    for (let row of table.rows)
    {
        for (let cell of row.cells)
        {
            cell.textContent = words[indices[index++]][lang];
        }
    }
}

function setupCellEvents(cell, words, lang, table)
{
    cell.addEventListener("click", () =>
    {
        if (!isMobileDevice())
        {
            cell.classList.toggle("marked");
            saveBingoState(table);
        }
    });

    cell.addEventListener("dblclick", () => openHashtagModal(cell, words, lang));

    cell.addEventListener("touchstart", e =>
    {
        cell.dataset.startX = e.changedTouches[0].clientX;
        cell.dataset.startY = e.changedTouches[0].clientY;
    });

    cell.addEventListener("touchend", e =>
    {
        const dx = e.changedTouches[0].clientX - parseFloat(cell.dataset.startX || 0);
        const dy = e.changedTouches[0].clientY - parseFloat(cell.dataset.startY || 0);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 20)
        {
            cell.classList.toggle("marked");
            saveBingoState(table);
        }
        else if (dist < 100)
        {
            openHashtagModal(cell, words, lang);
        }
    });
}

// Open modal with hashtags, links, and copy-to-clipboard functionality
function openHashtagModal(cell, words, lang)
{
    const word = cell.textContent.trim();
    const index = words.findIndex(w => w[lang] === word);
    const hashtag = words[index]?.en || word;
    const tagPart = hashtag.replace(/\s+/g, "") + "_" + eventName;  // added underscore between hashtag and eventName
    const link = `https://www.instagram.com/explore/tags/${encodeURIComponent(tagPart)}`;

    const modalText = lang === 'de'
        ? `Verwenden Sie diesen Hashtag auf Instagram #${tagPart}`
        : `Use this Hashtag on Instagram #${tagPart}`;

    openContextModal(
        hashtag,
        modalText,
        lang === 'de' ? "Hashtags in die Zwischenablage kopieren" : "Copy hashtags to clipboard",
        lang === 'de' ? "Diesen Hashtag auf Instagram ansehen" : "View this Hashtag on Instagram",
        link,
        word
    );

    const button1 = document.getElementById("modal-button1");
    button1.onclick = () =>
    {
        const tag = `#${tagPart} #cosplaybingo${eventName.toLowerCase()}`;
        copyToClipboard(tag);
        button1.style.backgroundColor = "red";
        setTimeout(() => button1.style.backgroundColor = "", 1000);
    };
}

// ========== Tutorial Modal Logic ==========

function showTutorialModal()
{
    const tutorialModal = document.getElementById("tutorial-modal");
    tutorialModal.style.display = "block";
    
    const closeBtn = document.getElementById("tutorial-modal-close");
    if (!closeBtn.dataset.listenerAdded)
    {
        closeBtn.addEventListener("click", () =>
        {
            tutorialModal.style.display = "none";
            localStorage.setItem("tutorialModalShown", true);
        });
        closeBtn.dataset.listenerAdded = "true";
    }
}

// ========== Initialization on DOM ready ==========
window.addEventListener("DOMContentLoaded", () => {
    const lang = detectLanguage();
    const table = document.getElementById("bingo-board");

    // Setup bingo board
    const indices = generateUniqueIndices(ROWS * COLS, WORDS.length);
    fillBingoBoard(WORDS, indices, lang);
    loadBingoState(table);

    // Setup events for each cell
    for (let row of table.rows) {
        for (let cell of row.cells) {
            setupCellEvents(cell, WORDS, lang, table);
        }
    }

    // Reset button: reshuffle board and clear markings
    document.getElementById("reset-button").addEventListener("click", () => {
        const newIndices = generateUniqueIndices(ROWS * COLS, WORDS.length);
        fillBingoBoard(WORDS, newIndices, lang);
        Array.from(table.querySelectorAll("td")).forEach(td => td.classList.remove("marked"));
        saveBingoState(table);
    });

    // Show tutorial modal if not shown before
    if (!localStorage.getItem("tutorialModalShown")) {
        showTutorialModal();
    }

    // Tutorial button triggers tutorial modal
    document.getElementById("tutorial-button")?.addEventListener("click", showTutorialModal);

    // Set "View All" button link dynamically with eventName
    const viewAllButton = document.getElementById('view-all-button');
    viewAllButton.onclick = () => {
        const url = `https://www.instagram.com/explore/tags/cosplaybingo${eventName.toLowerCase()}`;
        window.open(url, '_blank');
    };
});

