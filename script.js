let etapeActuelle = 0;
let compteurNon = 0;

// Playlist des 3 vidéos en boucle automatique
const playlistVideos = ["video1.mp4", "video8.mp4", "video9.mp4"];
let indexVideoActuelle = 0;

document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("bg-video");
    if (videoElement) {
        videoElement.addEventListener("ended", () => {
            indexVideoActuelle = (indexVideoActuelle + 1) % playlistVideos.length;
            videoElement.src = playlistVideos[indexVideoActuelle];
            videoElement.load();
            videoElement.play().catch(e => console.log("Lecture vidéo suivante en attente :", e));
        });
    }
});

const activites = [
    { titre: "Balade", image: "balade.png.JPG", emoji: "🌅" },
    { titre: "Manger", image: "restaurant.png.JPG", emoji: "🍜" },
    { titre: "Scooter", image: "scooter.png.JPG", emoji: "🛵" },
    { titre: "Cinéma", image: "cinema.png.JPG", emoji: "🎬" },
    { titre: "Musée", image: "musee.png.JPG", emoji: "🏛️️" },
    { titre: "Maison", image: "maison.png.JPG", emoji: "🏠" },
    { titre: "Picnic", image: "picnic.png.JPG", emoji: "🧺" }
];

// Déblocage automatique du son au premier toucher sur l'écran
document.addEventListener('click', function initAudio() {
    const musique = document.getElementById("background-music");
    if (musique.paused) {
        musique.volume = 1.0;
        musique.play().catch(e => console.log("Audio en attente :", e));
    }
}, { once: true });

function ouvrirEnveloppe() {
    const musique = document.getElementById("background-music");
    musique.volume = 1.0;
    musique.play().catch(error => console.log("Lecture audio bloquée :", error));

    const enveloppeWrapper = document.querySelector(".envelope-wrapper");
    enveloppeWrapper.classList.add("ouvert");

    setTimeout(() => {
        document.getElementById("enveloppe-section").style.display = "none";
        afficherActiviteSuivante();
    }, 1100);
}

function afficherActiviteSuivante() {
    const section = document.getElementById("activite-section");
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

function afficherToutesLesActivitesRecap() {
    const section = document.getElementById("activite-section");
    
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
    element.classList.toggle("selectionne");
}

function passerVersQuestion() {
    document.getElementById("activite-section").style.display = "none";
    document.getElementById("question-section").style.display = "flex";
    document.getElementById("container-image-question").innerHTML = `<img src="photo5.png" alt="Aperçu" class="image-activite" onerror="this.style.display='none'">`;
}

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
    
    document.getElementById("container-image-validation").innerHTML = `<img src="photo1.png" alt="Validé" class="image-activite" onerror="this.style.display='none'">`;
    document.getElementById("grille-fin").style.display = "grid";
}
