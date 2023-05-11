// JavaScript-Code ausführen, bevor die Seite vollständig geladen ist
document.addEventListener("DOMContentLoaded", function(event) {
    var currentPage = window.location.pathname.split("/").pop();
    var targetPage = "";
    
    // Browsersprache abrufen
    var userLang = navigator.language || navigator.userLanguage;

    // HTML-Datei basierend auf der Browsersprache laden
    if (userLang === "de-DE") {
        targetPage = currentPage.replace(".html", "_german.html");
        if (targetPage === currentPage) {
            targetPage = currentPage.replace("_german.html", "") + "_german.html";
        }
    } else {
        targetPage = currentPage.replace("_german.html", ".html");
    }

    // Umleitung durchführen
    if (currentPage !== targetPage) {
        window.location.href = window.location.origin + window.location.pathname.replace(currentPage, targetPage);
    }
});

    //    // Weiterleitung zur Zielseite, falls notwendig
    //    if (currentPage !== targetPage) {
    //     window.location.href = targetPage;
    // }
