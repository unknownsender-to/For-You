// 1. Défilement automatique des 12 vidéos en fond
document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("bg-video");

    const videos = [
        "video1.mp4",
        "video2.mp4",
        "video3.mp4",
        "video4.mp4",
        "video5.mp4",
        "video6.mp4",
        "video7.mp4",
        "video8.mp4",
        "video10.mp4",
        "video11.mp4"
    ];

    let currentIndex = 0;

    function playNextVideo() {
        currentIndex = (currentIndex + 1) % videos.length;
        videoElement.src = videos[currentIndex];
        videoElement.load();
        videoElement.play();
    }

    videoElement.addEventListener("ended", playNextVideo);
});

// 2. Gestion des étapes de navigation
function ouvrir() {
    // Lancer la musique
    const musique = document.getElementById("musique");
    if (musique) musique.play().catch(e => console.log("Audio bloqué par le navigateur"));

    // Masquer l'enveloppe et afficher la confirmation
    document.getElementById("section-enveloppe").style.display = "none";
    document.getElementById("section-confirmation").style.display = "block";
}

// Bouton Oui -> Aller au calendrier
document.getElementById("btn-oui").addEventListener("click", () => {
    document.getElementById("section-confirmation").style.display = "none";
    document.getElementById("section-calendrier").style.display = "block";
});

// Bouton Non (fait bouger ou refuse gentiment)
document.getElementById("btn-non").addEventListener("click", () => {
    alert("Oups, mauvais choix, essaie encore !");
});

// Valider la date -> Aller à l'heure
document.getElementById("valider-date").addEventListener("click", () => {
    const dateInput = document.getElementById("input-date").value;
    if (!dateInput) {
        alert("Choisis une date s'il te plaît !");
        return;
    }
    document.getElementById("section-calendrier").style.display = "none";
    document.getElementById("section-heure").style.display = "block";
});

// Valider l'heure -> Aller à la fin
document.getElementById("valider-heure").addEventListener("click", () => {
    const heureInput = document.getElementById("input-heure").value;
    if (!heureInput) {
        alert("Choisis une heure s'il te plaît !");
        return;
    }
    document.getElementById("section-heure").style.display = "none";
    document.getElementById("section-fin").style.display = "block";

    // Passer au merci après 4 secondes
    setTimeout(() => {
        document.getElementById("section-fin").style.display = "none";
        document.getElementById("section-merci").style.display = "block";
    }, 4000);
});
