// ========== Constants & Global State ==========
const ROWS = 5;
const COLS = 5;
const DEFAULT_EVENT_NAME = "CONVENTIONEVENTYEAR";
let eventName = DEFAULT_EVENT_NAME;

// ========== Level Configurations (Fallbacks & Paths) ==========
const LEVEL_CONFIGS = {
    level1: {
        csvPath: "bingoboards/level1.csv",
        fallback: [
            { de: "Kreativste Cosplay Idee", en: "Most Creative Cosplay Idea" },
            { de: "Anime des Jahres", en: "Anime of the Year" },
            { de: "Wem ist sicher warm", en: "Who is definitely warm" },
            { de: "Hat geile Pose", en: "Has a cool pose" },
            { de: "Genshin oder Honkai Star Rail", en: "Genshin or Honkai Star Rail" },
            { de: "Geschlecht??", en: "Gender??" },
            { de: "Könnte Nachts schon gruselig sein", en: "Could be scary at night" },
            { de: "Best Boy 2026", en: "Best Boy 2026" },
            { de: "Cosplay Zwilling oder gleiches Shirt", en: "Cosplay twin or same shirt" },
            { de: "Oldschool Anime Charakter", en: "Oldschool Anime Character" },
            { de: "Heterochromie", en: "Heterochromia" },
            { de: "Best Girl 2026", en: "Best Girl 2026" },
            { de: "Anime dass dich zum weinen gebracht hat", en: "Anime that made you cry" },
            { de: "Flauschig <3", en: "Fluffy <3" },
            { de: "Toter Charakter", en: "Dead Character" },
            { de: "MaoMao", en: "MaoMao" },
            { de: "Aufwendiges Cosplay", en: "Elaborate Cosplay" },
            { de: "Gruppencosplay", en: "Group Cosplay" },
            { de: "Cosplay ist sicher unbequem", en: "Cosplay is definitely uncomfortable" },
            { de: "Dein Lieblingscharakter", en: "Your favorite character" },
            { de: "Wem ist sicher kalt", en: "Who is definitely cold" },
            { de: "1vs1 wäre keine gute Idee :(", en: "1vs1 wouldn't be a good idea :(" },
            { de: "Krasse Waffe", en: "Awesome Weapon" }, //
            { de: "Underated Anime 2026", en: "Underrated Anime 2026" }, //
            { de: "Physikalisch unmögliche Haare", en: "Physically impossible hair" } //
        ]
    },
    level2: {
        csvPath: "bingoboards/level2.csv",
        fallback: [
            { de: "Cosplay aus einem Hype Anime", en: "Cosplay from a Hype Anime" },
            { de: "Rüstung aus Schaumstoff (EVA Foam)", en: "Armor made of foam (EVA Foam)" },
            { de: "Mecha oder Rüstung", en: "Mecha or Armor" },
            { de: "VTuber Cosplay", en: "VTuber Cosplay" },
            { de: "Schwert online gekauft", en: "Sword bought online" },
            { de: "Ein Charakter der Brille trägt", en: "A character wearing glasses" },
            { de: "Sehr kurzes Kleid / Rock", en: "Very short dress / skirt" },
            { de: "Etwas selbst genähtes", en: "Something self-sewn" },
            { de: "Es funkelt oder leuchtet (LEDs)", en: "It sparkles or lights up (LEDs)" },
            { de: "Ein Requisit das größer ist als die Person", en: "A prop larger than the person" },
            { de: "Cosplay unkenntlich wegen Maske / Helm", en: "Cosplay unrecognizable due to mask / helmet" },
            { de: "Dunkle Hautfarbe beim Charakter", en: "Dark skin color on the character" },
            { de: "Bauchfrei", en: "Midriff baring" },
            { de: "Tattoo sichtbar (echt oder Cosplay)", en: "Tattoo visible (real or cosplay)" },
            { de: "Schuhe passen nicht zum Rest", en: "Shoes don't match the rest" },
            { de: "Cosplay aus einem Game", en: "Cosplay from a game" },
            { de: "Ganzkörperanzug (Morphsuit)", en: "Full body suit (Morphsuit)" },
            { de: "Flügel am Cosplay", en: "Wings on the cosplay" },
            { de: "Etwas Plüschiges dabei", en: "Something plushy included" },
            { de: "Sport Trikot (Kuroko / Haikyuu)", en: "Sports jersey (Kuroko / Haikyuu)" },
            { de: "Ein Tier/Maskottchen (z.b Chopper)", en: "An animal/mascot (e.g. Chopper)" },
            { de: "Cosplay von einem Meme", en: "Cosplay from a meme" },
            { de: "Crossplay (Anderes Geschlecht)", en: "Crossplay (Other gender)" },
            { de: "Hut oder Kopfbedeckung", en: "Hat or headgear" },
            { de: "Ein Charakter mit Haustier", en: "A character with a pet" }
        ]
    },
    level_baka: {
        csvPath: "bingoboards/level_baka.csv",
        fallback: [
            { de: "Videospielcharakter", en: "Videogame character" },
            { de: "Ungewöhnliche Haarfarbe", en: "Unusual haircolor" },
            { de: "Gruppencosplay", en: "Group cosplay" },
            { de: "Wem ist sicher kalt", en: "Someone who is definitely cold" },
            { de: "Charakter den du nicht kennst", en: "a character that you dont know" },
            { de: "Wem ist sicher warm", en: "Someone who is definitely warm" },
            { de: "Cosplay Zwilling oder gleiches Shirt", en: "Cosplay twin or same shirt" },
            { de: "Das ist doch der Charakter aus dem Film?", en: "Isn't that the character from the movie?" },
            { de: "Aufwendiges Cosplay", en: "High effort cosplay" },
            { de: "Cosplayer mit Kontaktlinsen", en: "Cosplayer with contact lenses" },
            { de: "Flauschig <3", en: "Fluffy <3" },
            { de: "Muss seit Stunden aufs Klo aber zu viel Aufwand", en: "Needs the bathroom but it's too much work" },
            { de: "Krasse Waffe", en: "Sick weapon" },
            { de: "Kreativste Cosplay Idee", en: "Most creative cosplay idea" },
            { de: "Süßßßßßßß", en: "Cuteeeeee" },
            { de: "Mein nächstes Cosplay", en: "My next cosplay" },
            { de: "Würde die Prügelei wahrscheinlich nicht überleben", en: "Probably wouldn't survive the fight" },
            { de: "Hat ein Maskottchen dabei", en: "Has a mascot with him" },
            { de: "Könnte Nachts schon gruselig sein", en: "Could be scary at night" },
            { de: "Ist das Pikachu?", en: "Is that Pikachu?" },
            { de: "Endboss vibes", en: "Final boss vibes" },
            { de: "Wahrscheinlich das beste Cosplay dass ich heute gesehen habe", en: "Probably best cosplay I have seen today" },
            { de: "Verdammt bist du groß!", en: "Damn you are big" },
            { de: "Nicht menschliches Cosplay", en: "Non-human cosplay" },
            { de: "Katzenohren <3", en: "Cat ears <3" }
        ]
    }
};

function getLevelFromFilename() {
    const filename = window.location.pathname.split("/").pop();
    if (filename && filename.includes("level2")) return "level2";
    if (filename && filename.includes("level_baka")) return "level_baka";
    return "level1";
}

function detectLanguage() {
    const filename = window.location.pathname.split("/").pop();
    if (filename && filename.includes("_ger.html")) return "de";
    return "en";
}

// ========== CSV Parsing Engine ==========
async function loadWordsFromCSV(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);

    const text = await response.text();

    // FIX: Split by both \r and \n, then filter out empty rows
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);

    if (lines.length === 0) {
        return { eventName: DEFAULT_EVENT_NAME, words: [] };
    }

    // Handle eventname
    let extractedEventName = DEFAULT_EVENT_NAME;
    if (lines[0].toLowerCase().startsWith("eventname,")) {
        extractedEventName = lines[0].split(",")[1].trim();
        lines.shift(); // Remove eventname line safely
    }

    // Expect headers: "de,en"
    const headers = lines.shift()?.split(",").map(h => h.trim().toLowerCase());
    if (!headers || headers.length !== 2 || headers[0] !== "de" || headers[1] !== "en") {
        throw new Error("Invalid header in CSV. Expected: 'de,en'");
    }

    // Parse word entries safely
    const words = lines.map(line => {
        const [de, en] = line.split(",").map(val => val.trim());
        return { de, en };
    });

    return { eventName: extractedEventName, words };
}

// ========== Core Bingo Board Initialization ==========
function initBingoBoard(table, words, storageKey, lang) {
    let state = JSON.parse(localStorage.getItem(storageKey));

    if (!state) {
        const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, ROWS * COLS);
        state = {
            cells: shuffled.map(w => ({
                textDe: w.de,
                textEn: w.en,
                marked: false,
                bingo: false
            }))
        };
        localStorage.setItem(storageKey, JSON.stringify(state));
    }

    const cells = table.getElementsByClassName("bingo-cell");
    for (let i = 0; i < cells.length; i++) {
        const cellData = state.cells[i];
        const cellElement = cells[i];

        cellElement.textContent = lang === "de" ? cellData.textDe : cellData.textEn;

        if (cellData.marked) cellElement.classList.add("marked");
        if (cellData.bingo) cellElement.classList.add("bingo");

        // Click Handler
        cellElement.onclick = () => {
            cellData.marked = !cellData.marked;
            cellElement.classList.toggle("marked", cellData.marked);
            checkAndMarkBingos(state.cells, cells);
            localStorage.setItem(storageKey, JSON.stringify(state));
        };

        // Double Click Handler
        cellElement.ondblclick = () => {
            const currentText = lang === "de" ? cellData.textDe : cellData.textEn;
            const cleanText = currentText.replace(/[^a-zA-Z0-9]/g, "");
            const cleanEventName = eventName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

            const title = currentText;

            // Build the two distinct hashtags
            const cardHashtag = `#${cleanText}_${cleanEventName}`;
            const generalHashtag = `#cosplaybingo${cleanEventName}`;

            const instructionText = lang === "de"
                ? `Verwenden Sie diesen Hashtag auf Instagram`
                : `Use this hashtag on Instagram`;

            const btn1Text = lang === "de" ? "Hashtags in die Zwischenablage kopieren" : "Copy Hashtags to Clipboard";
            const btn2Text = lang === "de" ? "Diesen Hashtag auf Instagram ansehen" : "View this Hashtag on Instagram";

            // Instagram targets the card-specific search stream
            const url = `https://www.instagram.com/explore/tags/${cleanText.toLowerCase()}_${cleanEventName}/`;

            openContextModal(title, instructionText, cardHashtag, generalHashtag, btn1Text, btn2Text, url);
        };
    }

    // Reset Configuration
    document.getElementById("reset-button").onclick = () => {
        localStorage.removeItem(storageKey);
        location.reload();
    };
}

// ========== Bingo Mathematical Matrix Evaluation ==========
function checkAndMarkBingos(cellDataList, cellElements) {
    cellDataList.forEach(c => c.bingo = false);

    const markedMatrix = [];
    for (let r = 0; r < ROWS; r++) {
        markedMatrix.push(cellDataList.slice(r * COLS, (r + 1) * COLS).map(c => c.marked));
    }

    const markLineAsBingo = (type, index) => {
        for (let i = 0; i < 5; i++) {
            let cellIndex = 0;
            if (type === "row") cellIndex = index * COLS + i;
            if (type === "col") cellIndex = i * COLS + index;
            if (type === "diag1") cellIndex = i * COLS + i;
            if (type === "diag2") cellIndex = i * COLS + (4 - i);
            cellDataList[cellIndex].bingo = true;
        }
    };

    for (let r = 0; r < ROWS; r++) {
        if (markedMatrix[r].every(v => v)) markLineAsBingo("row", r);
    }

    for (let c = 0; c < COLS; c++) {
        let colWin = true;
        for (let r = 0; r < ROWS; r++) {
            if (!markedMatrix[r][c]) colWin = false;
        }
        if (colWin) markLineAsBingo("col", c);
    }

    let diag1Win = true, diag2Win = true;
    for (let i = 0; i < 5; i++) {
        if (!markedMatrix[i][i]) diag1Win = false;
        if (!markedMatrix[i][4 - i]) diag2Win = false;
    }
    if (diag1Win) markLineAsBingo("diag1");
    if (diag2Win) markLineAsBingo("diag2");

    for (let i = 0; i < cellElements.length; i++) {
        cellElements[i].classList.toggle("bingo", cellDataList[i].bingo);
    }
}

// ========== Context Modal Controls ==========
function openContextModal(title, instruction, cardHashtag, generalHashtag, button1Text, button2Text, url) {
    const modal = document.getElementById("context_Modal");
    const button1 = document.getElementById("modal-button1");
    const button2 = document.getElementById("modal-button2");

    document.getElementById("modal-title").textContent = title;

    // Explicitly layout the instruction text and visual hashtag badge wrapper matching Unbenannt.JPG
    document.getElementById("modal-text").innerHTML = `${instruction} <div style="margin-top: 10px;"><span class="hashtag-badge">${cardHashtag}</span></div>`;

    // Stash data attributes directly on the copy button to ensure seamless string copying
    button1.textContent = button1Text;
    button1.dataset.copyString = `${cardHashtag} ${generalHashtag}`;

    button2.textContent = button2Text;
    button2.dataset.url = url;

    modal.style.display = "block";
}

function showTutorialModal() {
    const tutorialModal = document.getElementById("tutorial-modal");
    if (tutorialModal) tutorialModal.style.display = "block";
}

// ========== Global Layout Listeners Binder ==========
function setupModalListeners() {
    const contextModal = document.getElementById("context_Modal");
    const tutorialModal = document.getElementById("tutorial-modal");

    // Find close button inside the context modal safely
    const contextCloseBtn = contextModal?.querySelector(".close") || document.getElementById("context-modal-close") || document.getElementById("context_modal_close");
    if (contextCloseBtn) {
        contextCloseBtn.onclick = () => {
            if (contextModal) contextModal.style.display = "none";
        };
    }

    // Find close button inside the tutorial modal safely
    const tutorialCloseBtn = tutorialModal?.querySelector(".close") || document.getElementById("tutorial-modal-close") || document.getElementById("tutorial_modal_close");
    if (tutorialCloseBtn) {
        tutorialCloseBtn.onclick = () => {
            if (tutorialModal) {
                tutorialModal.style.display = "none";
                localStorage.setItem("tutorialModalShown", "true");
            }
        };
    }

    // Window backing dismissals (clicking outside modal frame closes it)
    window.onclick = (event) => {
        if (event.target === contextModal) {
            contextModal.style.display = "none";
        }
        if (event.target === tutorialModal) {
            tutorialModal.style.display = "none";
            localStorage.setItem("tutorialModalShown", "true");
        }
    };

    // Clipboard copy action handles the compound string payload + visual success flash feedback
    const copyBtn = document.getElementById("modal-button1");
    if (copyBtn) {
        copyBtn.onclick = (e) => {
            const button1 = e.currentTarget;
            const payload = button1.dataset.copyString;

            if (payload) {
                navigator.clipboard.writeText(payload);

                // Visual feedback highlight flash (sets color then clears it after 1 second)
                button1.style.backgroundColor = "#2ecc71";

                setTimeout(() => {
                    button1.style.backgroundColor = "";
                }, 1000);
            }
        };
    }

    // Direct redirection execution links
    const visitBtn = document.getElementById("modal-button2");
    if (visitBtn) {
        visitBtn.onclick = (e) => {
            const targetsUrl = e.target.dataset.url;
            if (targetsUrl) window.open(targetsUrl, '_blank');
        };
    }
}

// ========== Initialization Routine Loader ==========
window.addEventListener("DOMContentLoaded", async () => {
    setupModalListeners();

    const currentLevel = getLevelFromFilename();
    const lang = detectLanguage();
    const table = document.getElementById("bingo-board");
    const config = LEVEL_CONFIGS[currentLevel];

    let words = config.fallback;
    eventName = DEFAULT_EVENT_NAME;

    try {
        const result = await loadWordsFromCSV(config.csvPath);
        words = result.words;
        eventName = result.eventName;
    } catch (error) {
        console.error("Successfully caught error. Reverting to fallbacks.", error);
    }

    const storageKey = `bingoState_${eventName.toLowerCase()}_${currentLevel}`;
    if (table) {
        initBingoBoard(table, words, storageKey, lang);
    }

    if (!localStorage.getItem("tutorialModalShown")) {
        showTutorialModal();
    }

    document.getElementById("tutorial-button")?.addEventListener("click", showTutorialModal);

    const viewAllBtn = document.getElementById('view-all-button');
    if (viewAllBtn) {
        viewAllBtn.onclick = () => {
            const cleanEventName = eventName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            window.open(`https://www.instagram.com/explore/tags/cosplaybingo${cleanEventName}/`, '_blank');
        };
    }
});