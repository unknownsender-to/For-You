let dejaOuvert = false;

function ouvrir() {

    if (dejaOuvert) return;
    dejaOuvert = true;
document.getElementById("musique").play().catch(() => {});
    document.querySelector(".flap").style.transform = "rotateX(180deg)";

    setTimeout(() => {

        const lettre = document.createElement("div");

        lettre.className = "letter";

        lettre.innerHTML = `
<div class="rose-left">
🌹
🌹
🌹
</div>

<div class="rose-right">
🌹
🌹
🌹
</div>

<p>
Un univers.<br><br>

Huit planètes.<br>
Cent quatre-vingt-quinze pays.<br>
Trois cent mille îles.<br>
Cinq océans.<br>
Huit milliards d'êtres humains.<br>
Trois milliards de femmes…<br><br>

Et, parmi cette infinité,<br>
j'ai eu le privilège de te rencontrer.
</p>

<br><br>

<button class="continuer">
Continuer →
</button>
`;

        document.querySelector(".container").appendChild(lettre);

        lettre.querySelector(".continuer").onclick = ouvrirActivites;
      
        setTimeout(() => {
           
            lettre.style.transform = "translateX(-50%) translateY(-120px)";
        }, 100);

    }, 700);
}
const activites = [

{
nom:"🍝 Manger",
image:"manger.jpeg"
},

{
nom:"🕹️ Salle d'arcade",
image:"arcade.jpeg"
},

{
nom:"🚲 Balade en vélo",
image:"velo.jpeg"
},

{
nom:"🌅 Balade",
image:"balade.jpeg"
},

{
nom:"🚤 Bateau-mouche",
image:"bateau.jpeg"
},

{
nom:"🧺 Pique-nique",
image:"pique.jpeg"
},

{
nom:"🎬 Cinéma",
image:"cine.jpeg"
}

];

let indexActivite = 0;

function ouvrirActivites(){

    document.querySelector(".letter").remove();

   afficherQuestion();
}

function afficherActivite(){

    const ancienne = document.querySelector(".presentation");

    if(ancienne){

        ancienne.remove();

    }

    const page = document.createElement("div");

    page.className = "presentation";

    page.innerHTML = `

<h1>Où veux-tu qu'on aille ?</h1>

<img src="${activites[indexActivite].image}" class="grande-image">

<h2>${activites[indexActivite].nom}</h2>

<button class="suivant" onclick="suivant()">

Suivant →

</button>

`;

    document.body.appendChild(page);

}function suivant(){

    indexActivite++;

    if(indexActivite < activites.length){

        afficherActivite();

    }else{

        afficherGalerie();

    }

}

function afficherGalerie(){

    const page = document.querySelector(".presentation");

    if(page){

        page.remove();

    }

    const galerie = document.createElement("div");

    galerie.className = "galerie-finale";

    galerie.innerHTML = `

<h1>Où veux-tu qu'on aille ?</h1>

<div class="polaroids">

<div class="photo" onclick="choisir('Manger')">
<img src="manger.jpeg">
<p>🍝 Manger</p>
</div>

<div class="photo" onclick="choisir('Salle d\\'arcade')">
<img src="arcade.jpeg">
<p>🕹️ Salle d'arcade</p>
</div>

<div class="photo" onclick="choisir('Balade en vélo')">
<img src="velo.jpeg">
<p>🚲 Balade en vélo</p>
</div>

<div class="photo" onclick="choisir('Balade')">
<img src="balade.jpeg">
<p>🌅 Balade</p>
</div>

<div class="photo" onclick="choisir('Bateau-mouche')">
<img src="bateau.jpeg">
<p>🚤 Bateau-mouche</p>
</div>

<div class="photo" onclick="choisir('Pique-nique')">
<img src="pique.jpeg">
<p>🧺 Pique-nique</p>
</div>

<div class="photo" onclick="choisir('Cinéma')">
<img src="cine.jpeg">
<p>🎬 Cinéma</p>
</div>

</div>

`;

    document.body.appendChild(galerie);

}

function choisir(nom){

    const activite = activites.find(a => a.nom.includes(nom));

    document.querySelector(".galerie-finale").remove();

    const page = document.createElement("div");

    page.className = "confirmation";

    page.innerHTML = `

<h1>Confirmer ce choix ?</h1>

<img src="${activite.image}" class="grande-image">

<h2>${activite.nom}</h2>

<p>Es-tu sûr(e) de vouloir choisir cette activité ?</p>

<div class="boutons">

<button onclick="retourGalerie()">Annuler</button>

<button onclick="choisirDate('${nom}')">Continuer</button>

</div>

`;

    document.body.appendChild(page);

}function retourGalerie(){

    document.querySelector(".confirmation").remove();

    afficherGalerie();

}

function choisirDate(nom){

    document.querySelector(".confirmation").remove();

    const page = document.createElement("div");

    page.className = "calendrier";

    page.innerHTML = `

        <h1>Choisis une date</h1>

        <input type="date" id="dateChoisie">

        <button onclick="choisirHeure('${nom}')">
            Continuer
        </button>

    `;

    document.body.appendChild(page);

}function choisirHeure(nom){

    const date = document.getElementById("dateChoisie").value;

    if(date === ""){
        alert("Choisis une date.");
        return;
    }

    document.querySelector(".calendrier").remove();

    const page = document.createElement("div");

    page.className = "heure";

    page.innerHTML = `

        <h1>Choisis une heure</h1>

        <input type="time" id="heureChoisie">

        <button onclick="terminer('${nom}','${date}')">
            Continuer
        </button>

    `;

    document.body.appendChild(page);

}
    

function terminer(nom, date){

    const heure = document.getElementById("heureChoisie").value;

    if(heure === ""){
        alert("Choisis une heure.");
        return;
    }

    const activite = activites.find(a => a.nom.includes(nom));

    const dateFormatee = new Date(date).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const heureFormatee = heure.replace(":", " h ");

    document.querySelector(".heure").remove();

    const page = document.createElement("div");

    page.className = "fin";

    page.innerHTML = `

        <h1>C'est noté.</h1>

        <p>J'ai hâte de partager ce moment avec toi.</p>

        <p>Il ne reste plus qu'à choisir le moment.</p>

        <img src="${activite.image}" class="grande-image">

        <h2>${activite.nom}</h2>

        <p>📅 ${dateFormatee}</p>

        <p>🕒 ${heureFormatee}</p>

        <button onclick="alert('ça marche'); finInvitation()">Confirmer</button>
    `;

    document.body.appendChild(page);

}


   const textesNon = [
    "Non",
    "T'es sûre ? 🤨",
    "Réfléchis 😂",
    "Allez...",
    "Bon... 😅"
];

let tentative = 0;

function afficherQuestion(){

    const page = document.createElement("div");

    page.className = "question";

    page.innerHTML = `
        <h1>Alors...</h1>

        <p>Accepterais-tu de partager un moment avec moi ?</p>

        <div class="choix">

            <button onclick="afficherActivite()">Oui</button>

            <button id="btnNon"
                onmouseover="deplacerNon()"
                onclick="deplacerNon()">
                Non
            </button>

        </div>
    `;

    document.body.appendChild(page);

}

function deplacerNon(){

    const btn = document.getElementById("btnNon");

    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);

    btn.style.position = "fixed";
    btn.style.left = x + "px";
    btn.style.top = y + "px";

    if(tentative < textesNon.length - 1){
        tentative++;
        btn.innerText = textesNon[tentative];
    }

}function finInvitation() {
    document.body.innerHTML = `
        <div class="merci">
            <h1>C'est noté.</h1>

            <p>Merci d'avoir pris le temps de découvrir cette invitation.</p>

            <p>J'espère que cette lettre t'aura fait sourire.</p>

            <p>J'ai hâte de partager ce moment avec toi.</p>

            <h2>À bientôt...</h2>
        </div>
    `;
}