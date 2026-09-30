let etapeActuelle = 0;
let compteurNon = 0;

const activites = [
    { titre: "Balade", image: "balade.png", emoji: "🌅" },
    { titre: "Manger", image: "restaurant.png", emoji: "🍜" },
    { titre: "Scooter", image: "scooter.png", emoji: "🛵" },
    { titre: "Cinéma", image: "cinema.png", emoji: "🎬" },
    { titre: "Musée", image: "musee.png", emoji: "🏛️" },
    { titre: "Maison", image: "maison.png", emoji: "🏠" },
    { titre: "Picnic", image: "picnic.png", emoji: "🧺" }
];

function ouvrirEnveloppe() {
    const musique = document.getElementById("background-music");
    musique.play().catch(error => console.log("Lecture audio bloquée :", error));

    const lettre = document.getElementById("lettre-amour");
    lettre.style.transform = "translateY(-130px) scale(1.05)";
    lettre.style.opacity = "1";

    setTimeout(() => {
        document.getElementById("enveloppe-section").style.display = "none";
        afficherActivite();
    }, 1200);
}

function afficherActivite() {
    const section = document.getElementById("activite-section");
    section.style.display = "flex";

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
        section.style.display = "none";
        document.getElementById("question-section").style.display = "flex";
        document.getElementById("container-image-question").innerHTML = `<img src="photo5.png" alt="Aperçu" class="image-activite">`;
    }
}

function etapeSuivante() {
    etapeActuelle++;
    afficherActivite();
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
    
    document.getElementById("container-image-validation").innerHTML = `<img src="photo1.png" alt="Validé" class="image-activite">`;
}
