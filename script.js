// ==========================================
// VARIABLES GLOBALES DE NAVIGATION
// ==========================================
let etapeActuelle = 0;
let compteurNon = 0;

// Liste complète des 7 activités proposées
const activites = [
    { titre: "Balade", image: "balade.png", emoji: "🌅" },
    { titre: "Manger", image: "restaurant.png", emoji: "🍜" },
    { titre: "Scooter", image: "scooter.png", emoji: "🛵" },
    { titre: "Cinéma", image: "cinema.png", emoji: "🎬" },
    { titre: "Musée", image: "musee.png", emoji: "🏛️" },
    { titre: "Maison", image: "maison.png", emoji: "🏠" },
    { titre: "Picnic", image: "picnic.png", emoji: "🧺" }
];

// ==========================================
// OUVERTURE DE L'ENVELOPPE ET MUSIQUE
// ==========================================
function ouvrirEnveloppe() {
    // Lancement de la musique audio
    const musique = document.getElementById("background-music");
    musique.play().catch(error => console.log("Lecture audio bloquée par le navigateur :", error));

    // Animation visuelle de la lettre
    const lettre = document.getElementById("lettre-amour");
    lettre.style.transform = "translateX(-50%) translateY(-110px) scale(1.03)";
    lettre.style.opacity = "1";

    // Transition vers les activités après l'animation
    setTimeout(() => {
        document.getElementById("enveloppe-section").style.display = "none";
        afficherActiviteSuivante();
    }, 1000);
}

// ==========================================
// GESTION DU DÉFILEMENT DES ACTIVITÉS
// ==========================================
function afficherActiviteSuivante() {
    const section = document.getElementById("activite-section");
    section.style.display = "flex";

    // Si on parcourt les 7 activités une par une
    if (etapeActuelle < activites.length) {
        let act = activites[etapeActuelle];
        section.innerHTML = `
            <h2 class="titre-etape">Où veux-tu qu'on aille ?</h2>
            <div class="carte-activite">
                <img src="${act.image}" alt="${act.titre}" class="image-activite">
                <p class="nom-activite">${act.emoji} ${act.titre}</p>
            </div>
            <button class="btn-suivant" onclick="etapeSuivante()">Suivant -></button>
        `;
    } else {
        // Une fois les 7 passées, affichage de la grille récapitulative
        afficherToutesLesActivitesRecap();
    }
}

function etapeSuivante() {
    etapeActuelle++;
    afficherActiviteSuivante();
}

// ==========================================
// VUE RÉCAPITULATIVE FINALE DES ACTIVITÉS
// ==========================================
function afficherToutesLesActivitesRecap() {
    const section = document.getElementById("activite-section");
    
    let htmlContent = `<h2 class="titre-etape">Choisis ce que tu veux faire !</h2>`;
    htmlContent += `<div class="grille-petits-carres">`;

    activites.forEach((act) => {
        htmlContent += `
            <div class="petit-carre-activite" onclick="selectionnerCarre(this)">
                <img src="${act.image}" alt="${act.titre}">
                <p>${act.emoji} ${act.titre}</p>
            </div>
        `;
    });

    htmlContent += `</div>`;
    htmlContent += `<button class="btn-suivant" onclick="passerVersQuestion()">Valider ce choix -></button>`;

    section.innerHTML = htmlContent;
}

function selectionnerCarre(element) {
    element.classList.toggle("selectionne");
}

function passerVersQuestion() {
    document.getElementById("activite-section").style.display = "none";
    document.getElementById("question-section").style.display = "flex";
    document.getElementById("container-image-question").innerHTML = `<img src="photo5.png" alt="Aperçu" class="image-activite">`;
}

// ==========================================
// LOGIQUE DU BOUTON "NON" PIÈGE
// ==========================================
function clicNon() {
    compteurNon++;
    const btnNon = document.getElementById("btn-non");
    const texteQ = document.getElementById("texte-question");

    if (compteurNon === 1) {
        texteQ.innerText = "Non ? Tu es sûre de toi ?";
        btnNon.innerText = "Euh... oui";
    } else if (compteurNon === 2) {
        texteQ.innerText = "Allez, dis oui, ne fais pas ça !";
        btnNon.innerText = "Bon... non";
    } else {
        texteQ.innerText = "Impossible de cliquer sur non ! Tu n'as pas le choix ❤️";
        btnNon.style.display = "none";
    }
}

function validerOui() {
    document.getElementById("question-section").style.display = "none";
    document.getElementById("date-section").style.display = "flex";
}

// ==========================================
// VALIDATION DE LA DATE ET DE L'HEURE
// ==========================================
function validerDate() {
    const dateVal = document.getElementById("date-input").value;
    if(!dateVal) {
        alert("Choisis une date s'il te plaît !");
        return;
    }
    document.getElementById("date-section").style.display = "none";
    document.getElementById("heure-section").style.display = "flex";
}

function validerHeure() {
    const heureVal = document.getElementById("heure-input").value;
    if(!heureVal) {
        alert("Choisis une heure s'il te plaît !");
        return;
    }
    document.getElementById("heure-section").style.display = "none";
    const validationSec = document.getElementById("validation-section");
    validationSec.style.display = "flex";
    
    document.getElementById("container-image-validation").innerHTML = `<img src="photo1.png" alt="Validé" class="image-activite">`;
    document.getElementById("grille-fin").style.display = "grid";
}

// ==========================================
// ENCHAÎNEMENT AUTOMATIQUE DES VIDÉOS DE FOND
// ==========================================
const listeVideosFond = ["video1.mp4", "video2.mp4", "video3.mp4"]; 
let indexVideoActuelle = 0;
const videoElement = document.getElementById("bg-video");

if (videoElement) {
    videoElement.addEventListener("ended", function() {
        indexVideoActuelle = (indexVideoActuelle + 1) % listeVideosFond.length;
        videoElement.src = listeVideosFond[indexVideoActuelle];
        videoElement.play().catch(e => console.log("Erreur de lecture de la vidéo de fond :", e));
    });

    // Lancement de la première vidéo
    videoElement.play().catch(e => console.log("Autoplay bloqué, interaction requise :", e));
}
