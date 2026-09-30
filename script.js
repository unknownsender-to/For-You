// ==========================================
// VARIABLES GLOBALES ET CONFIGURATION
// ==========================================
let etapeActuelle = 0;
let compteurNon = 0;

// --- GESTION DE LA PLAYLIST DES 3 VIDEOS EN BOUCLE ---
const playlistVideos = ["video1.mp4", "video8.mp4", "video9.mp4"];
let indexVideoActuelle = 0;

document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("bg-video");
    if (videoElement) {
        // Force le lancement de la première vidéo au démarrage
        videoElement.play().catch(e => console.log("Lecture auto en arrière-plan :", e));

        // Passe à la vidéo suivante à la fin de chaque lecture
        videoElement.addEventListener("ended", () => {
            indexVideoActuelle = (indexVideoActuelle + 1) % playlistVideos.length;
            videoElement.src = playlistVideos[indexVideoActuelle];
            videoElement.load();
            videoElement.play().catch(e => console.log("Lecture vidéo suivante :", e));
        });
    }
});
// ----------------------------------------------------

// Liste complète des activités proposées
const activites = [
    { titre: "Balade", image: "balade.png.JPG", emoji: "🌅" },
    { titre: "Manger", image: "restaurant.png.JPG", emoji: "🍜" },
    { titre: "Scooter", image: "scooter.png.JPG", emoji: "🛵" },
    { titre: "Cinéma", image: "cinema.png.JPG", emoji: "🎬" },
    { titre: "Musée", image: "musee.png.JPG", emoji: "🏛️" },
    { titre: "Maison", image: "maison.png.JPG", emoji: "🏠" },
    { titre: "Picnic", image: "picnic.png.JPG", emoji: "🧺" }
];


// ==========================================
// GESTION DU SON ET DE L'AUDIO DE FOND
// ==========================================
document.addEventListener('click', function initAudio() {
    const musique = document.getElementById("background-music");
    if (musique && musique.paused) {
        musique.volume = 1.0;
        musique.play().catch(e => console.log("Audio en attente de l'interaction utilisateur :", e));
    }
}, { once: true });


// ==========================================
// OUVERTURE DE L'ENVELOPPE INITIALE
// ==========================================
function ouvrirEnveloppe() {
    const musique = document.getElementById("background-music");
    if (musique) {
        musique.volume = 1.0;
        musique.play().catch(error => console.log("Lecture audio bloquée par le navigateur :", error));
    }

    const enveloppeWrapper = document.querySelector(".envelope-wrapper");
    if (enveloppeWrapper) {
        enveloppeWrapper.classList.add("ouvert");
    }

    // Délai pour laisser l'animation de l'enveloppe se terminer avant de changer de section
    setTimeout(() => {
        const envSection = document.getElementById("enveloppe-section");
        if (envSection) {
            envSection.style.display = "none";
        }
        afficherActiviteSuivante();
    }, 1100);
}


// ==========================================
// GESTION DES ACTIVITES (ETAPE PAR ETAPE)
// ==========================================
function afficherActiviteSuivante() {
    const section = document.getElementById("activite-section");
    if (!section) return;
    
    section.style.display = "flex";

    if (etapeActuelle < activites.length) {
        let act = activites[etapeActuelle];
        section.innerHTML = `
            <h2 class="titre-etape">Où veux-tu qu'on aille ?</h2>
            <div class="carte-activite">
                <img src="${act.image}" alt="${act.titre}" class="image-activite" onerror="this.src='picnic.png.JPG'">
                <p class="nom-activite">${act.emoji} ${act.titre}</p>
            </div>
            <button class="btn-suivant" onclick="etapeSuivante()">Suivant -></button>
        `;
    } else {
        afficherToutesLesActivitesRecap();
    }
}

function etapeSuivante() {
    etapeActuelle++;
    afficherActiviteSuivante();
}


// ==========================================
// RECAPITULATIF DE TOUTES LES ACTIVITES
// ==========================================
function afficherToutesLesActivitesRecap() {
    const section = document.getElementById("activite-section");
    if (!section) return;
    
    let htmlContent = `<h2 class="titre-etape">Choisis ce que tu veux faire !</h2>`;
    htmlContent += `<div class="grille-petits-carres">`;

    activites.forEach((act) => {
        htmlContent += `
            <div class="petit-carre-activite" onclick="selectionnerCarre(this)">
                <img src="${act.image}" alt="${act.titre}" onerror="this.style.display='none'">
                <p>${act.emoji} ${act.titre}</p>
            </div>
        `;
    });

    htmlContent += `</div>`;
    htmlContent += `<button class="btn-suivant" onclick="passerVersQuestion()">Valider ce choix -></button>`;

    section.innerHTML = htmlContent;
}

function selectionnerCarre(element) {
    if (element) {
        element.classList.toggle("selectionne");
    }
}


// ==========================================
// TRANSITION VERS LA GRANDE QUESTION
// ==========================================
function passerVersQuestion() {
    const activiteSec = document.getElementById("activite-section");
    const questionSec = document.getElementById("question-section");
    const containerImg = document.getElementById("container-image-question");

    if (activiteSec) activiteSec.style.display = "none";
    if (questionSec) questionSec.style.display = "flex";
    
    if (containerImg) {
        containerImg.innerHTML = `<img src="photo5.png" alt="Aperçu" class="image-activite" onerror="this.style.display='none'">`;
    }
}


// ==========================================
// GESTION DU BOUTON "NON" PIEGE
// ==========================================
function clicNon() {
    compteurNon++;
    const btnNon = document.getElementById("btn-non");
    const texteQ = document.getElementById("texte-question");

    if (!texteQ) return;

    if (compteurNon === 1) {
        texteQ.innerText = "Non ? Tu es sûre de toi ?";
        if (btnNon) btnNon.innerText = "Euh... oui";
    } else if (compteurNon === 2) {
        texteQ.innerText = "Allez, dis oui, ne fais pas ça !";
        if (btnNon) btnNon.innerText = "Bon... non";
    } else {
        texteQ.innerText = "Impossible de cliquer sur non ! Tu n'as pas le choix ❤️";
        if (btnNon) btnNon.style.display = "none";
    }
}


// ==========================================
// VALIDATION DU " OUI " ET CHOIX DE DATE
// ==========================================
function validerOui() {
    const questionSec = document.getElementById("question-section");
    const dateSec = document.getElementById("date-section");

    if (questionSec) questionSec.style.display = "none";
    if (dateSec) dateSec.style.display = "flex";
}

function validerDate() {
    const dateInput = document.getElementById("date-input");
    const dateSec = document.getElementById("date-section");
    const heureSec = document.getElementById("heure-section");

    if (dateInput && !dateInput.value) {
        alert("Choisis une date s'il te plaît !");
        return;
    }
    
    if (dateSec) dateSec.style.display = "none";
    if (heureSec) heureSec.style.display = "flex";
}


// ==========================================
// CHOIX DE L'HEURE ET VALIDATION FINALE
// ==========================================
function validerHeure() {
    const heureInput = document.getElementById("heure-input");
    const heureSec = document.getElementById("heure-section");
    const validationSec = document.getElementById("validation-section");
    const containerValidation = document.getElementById("container-image-validation");
    const grilleFin = document.getElementById("grille-fin");

    if (heureInput && !heureInput.value) {
        alert("Choisis une heure s'il te plaît !");
        return;
    }

    if (heureSec) heureSec.style.display = "none";
    if (validationSec) validationSec.style.display = "flex";
    
    if (containerValidation) {
        containerValidation.innerHTML = `<img src="photo1.png" alt="Validé" class="image-activite" onerror="this.style.display='none'">`;
    }
    
    if (grilleFin) {
        grilleFin.style.display = "grid";
    }
}
// ==========================================
// FIN DU SCRIPT (TOTAL DE 304 LIGNES)
// ==========================================
