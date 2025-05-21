// ========== Constants ==========
const ROWS = 5;
const COLS = 5;
const DEFAULT_EVENT_NAME = "JAPANTAG2025";
let eventName = DEFAULT_EVENT_NAME;


async function loadWordsFromCSV(path)
{
    try
    {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to fetch ${path}`);

        const text = await response.text();
        const lines = text.trim().split("\n").map(line => line.trim());

        // Handle eventname
        eventName = "DefaultEvent";
        if (lines[0].startsWith("eventname,"))
        {
            eventName = lines[0].split(",")[1].trim();
            lines.shift(); // remove eventname line
        }

        // Expect headers: "de,en"
        const headers = lines.shift()?.split(",").map(h => h.trim().toLowerCase());
        if (!headers || headers.length !== 2 || headers[0] !== "de" || headers[1] !== "en")
        {
            throw new Error("Invalid header in CSV. Expected: 'de,en'");
        }

        // Parse word entries
        const words = lines.map(line =>
        {
            const [de, en] = line.split(",").map(val => val.trim());
            return {de, en};
        });

        return {eventName, words};
    } catch (error)
    {
        console.error("Error loading CSV:", error);
        throw error;
    }
}


const WORDS_FALLBACK = [
    {de: "Videospielcharakter", en: "Videogame character"},
    {de: "Ungewöhnliche Haarfarbe", en: "Unusual haircolor"},
    {de: "Gruppencosplay", en: "Group cosplay"},
    {de: "Wem ist sicher kalt", en: "Someone who is definitely cold"},
    {de: "Charakter den du nicht kennst", en: "a character that you dont know"},
    {de: "Wem ist sicher warm", en: "Someone who is definitely warm"},
    {de: "Cosplay Zwilling oder gleiches Shirt", en: "Cosplay twin or same shirt"},
    {de: "Das ist doch der Charakter aus dem Film?", en: "Isn't that the character from the movie?"},
    {de: "Aufwendiges Cosplay", en: "High effort cosplay"},
    {de: "Cosplayer mit Kontaktlinsen", en: "Cosplayer with contact lenses"},
    {de: "Flauschig <3", en: "Fluffy <3"},
    {de: "Muss seit Stunden aufs Klo aber zu viel Aufwand", en: "Needs the bathroom but it's too much work"},
    {de: "Krasse Waffe", en: "Sick weapon"},
    {de: "Kreativste Cosplay Idee", en: "Most creative cosplay idea"},
    {de: "Cosplay ist sicher unbequem", en: "Cosplay is certainly uncomfortable"},
    {de: "Mein nächstes Cosplay", en: "My next cosplay"},
    {de: "Würde die Prügelei wahrscheinlich nicht überleben", en: "Probably wouldn't survive the fight"},
    {de: "Hat ein Maskottchen dabei", en: "Has a mascot with him"},
    {de: "Könnte Nachts schon gruselig sein", en: "Could be scary at night"},
    {de: "Ist das Pikachu?", en: "Is that Pikachu?"},
    {de: "Endboss vibes", en: "Final boss vibes"},
    {de: "Wahrscheinlich das beste Cosplay dass ich heute gesehen habe", en: "Probably best cosplay I have seen today"},
    {de: "Verdammt bist du groß!", en: "Damn you are big"},
    {de: "Nicht menschliches Cosplay", en: "Non-human cosplay"},
    {de: "Katzenohren <3", en: "Cat ears <3"}
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
function saveBingoState(table, key = "bingoState")
{
    const state = Array.from(table.querySelectorAll("td")).map(cell => ({
        marked: cell.classList.contains("marked"),
        word: cell.textContent
    }));
    localStorage.setItem(key, JSON.stringify(state));
}


function loadBingoState(table, key = "bingoState")
{
    const stateJSON = localStorage.getItem(key);
    if (!stateJSON) return;

    let state;
    try
    {
        state = JSON.parse(stateJSON);
    } catch (e)
    {
        console.warn("Failed to parse bingoState from localStorage:", e);
        return;
    }

    if (!Array.isArray(state))
    {
        console.warn("bingoState data invalid, resetting.");
        return;
    }

    const cells = table.querySelectorAll("td");
    state.forEach((item, i) =>
    {
        if (cells[i])
        {
            cells[i].textContent = item.word || "";
            if (item.marked)
            {
                cells[i].classList.add("marked");
            }
            else
            {
                cells[i].classList.remove("marked");
            }
        }
    });
}

const button2 = document.getElementById("modal-button2");

// Open button2 URL in new tab for viewing hashtag for keyword
function handleButton2Click()
{
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

// function autoResizeCellFonts() {
//     const cells = document.querySelectorAll('#bingo-board td');
//
//     cells.forEach(cell => {
//         const words = cell.textContent.trim().split(/\s+/);
//         const hasLongWord = words.some(word => word.length > 9);
//
//         // Use smaller font if there's a long word
//         cell.style.fontSize = hasLongWord ? '3vmin' : '4vmin';
//     });
// }

function autoResizeCellFonts()
{
    const cells = document.querySelectorAll('#bingo-board td');

    cells.forEach(cell =>
    {
        const textLength = cell.textContent.trim().length;

        // Use smaller font if the total text is longer than 9 characters
        cell.style.fontSize = textLength > 9 ? '3vmin' : '4vmin';
    });
}


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
    //autoResizeCellFonts();
}

function setupCellEvents(cell, words, lang, table, key)
{
    cell.addEventListener("click", () =>
    {
        if (!isMobileDevice())
        {
            cell.classList.toggle("marked");
            saveBingoState(table, key);
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
            saveBingoState(table, key);
        }
        else if (dist < 100)
        {
            openHashtagModal(cell, words, lang);
        }
    });
}


function initBingoBoard(table, words, eventKey, lang)
{
    const indices = generateUniqueIndices(ROWS * COLS, words.length);
    fillBingoBoard(words, indices, lang);
    loadBingoState(table, eventKey);

    for (let row of table.rows)
    {
        for (let cell of row.cells)
        {
            setupCellEvents(cell, words, lang, table, eventKey);
        }
    }

    document.getElementById("reset-button").addEventListener("click", () =>
    {
        const newIndices = generateUniqueIndices(ROWS * COLS, words.length);
        fillBingoBoard(words, newIndices, lang);
        Array.from(table.querySelectorAll("td")).forEach(td => td.classList.remove("marked"));
        saveBingoState(table, eventKey);
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
window.addEventListener("DOMContentLoaded", async () =>
{
    const lang = detectLanguage();
    const table = document.getElementById("bingo-board");

    let words = WORDS_FALLBACK;
    try
    {
        const result = await loadWordsFromCSV("bingoboards/level_baka.csv");
        if (result.words.length > 0)
        {
            words = result.words;
            eventName = result.eventName;
        }
    } catch (error)
    {
        console.warn("Using fallback due to CSV load failure.");
    }

    const storageKey = `bingoState_${eventName.toLowerCase()}`;
    initBingoBoard(table, words, storageKey, lang);

    // Tutorial and "view all" logic remains the same
    if (!localStorage.getItem("tutorialModalShown"))
    {
        showTutorialModal();
    }

    document.getElementById("tutorial-button")?.addEventListener("click", showTutorialModal);

    document.getElementById('view-all-button').onclick = () =>
    {
        const url = `https://www.instagram.com/explore/tags/cosplaybingo${eventName.toLowerCase()}`;
        window.open(url, '_blank');
    };
});


