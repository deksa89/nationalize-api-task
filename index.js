/**
 * Pripremio sam vam slijedeću šprancu jer još niste učili fetch.
 * Stoga vas molim nadogradite kod da radi punu funkcionalnost koristeći pripremljenu
 * funkciju prikaziNoveRezultate u koju ćete kao parameter dobiti objekt sa rezultatima
 * nakon što se dohvati(fetch-a) rezultat sa nationalize.io apija.
 *
 * Molim pokušajte i sami exploreati još neke metode DOM-a, te ih primjenjivati.
 * Konkretno mislim na to da osim appendChild, postoje i removeChild i lastElementChild
 * uz pomoć kojih možete izbaciti prethodi rezultat iz prikaza, te onda dodati novi rezultat.
 *
 * Rezultate bi bilo zgodno prikazivati u ul elementu.
 * Bilo bi zgodno i kada biste od stvorili klasu iz koje ćete instancirati objekte s kojih
 * ćete pozivom na određenu metodu izbacivati konkretni html element (Npr. cijeli ul sa svim itemima)
 * za ubacivanje u dom stablo.
 *
 * Ekstra poene biste dobili kada biste sve instancirane objekte iz klase (za svaku novu pretragu po jedan)
 * pospremili dinamički u "Prethodne pretrage:" područje u htmlu, te po uzoru na ove pripremljene dummy botune
 * automatski generirate prave klikom na koje bi se prikazao taj davno prije dohvaćeni rezultat u rezultatima.
 *
 * Ps. tko god napravi molim da link na github repo, te link na github page dijeli u našu whatsup grupu tako da
 * bude od pomoći ili barem nadahnuća kolegama koji se muče sa izradom.
 *
 * S ljubavlju,
 * vaš profesor Antun
 *
 */


document.getElementById("botunZaSlanje").addEventListener("click", dohvatiPodatke);

function dohvatiPodatke(event) {
  
  let unos = event.target.previousElementSibling.value; //uzima vrijednost s prethodnog rodaka, <input/> elementa
  fetch(`https://api.nationalize.io/?name=${unos}`)
    .then((response) => response.json())
    .then((data) => {

      // Brise prethodno dodane <li> elemente prije nove iteracije
      var listaRemove = document.querySelector(".kreirani-div");
  
      if (listaRemove !== null) {
        listaRemove.innerHTML = "";
      }
 
      prikaziNoveRezultate(data);
      prethodnePretrage(data);
      findButtonName(...[, , , , ,]);
    });
}

var rezPretrage = document.querySelector(".rezultati");
const div1 = document.createElement("div");
div1.className = "kreirani-div";
var punoIme;
var numKeys;

function prikaziNoveRezultate(data) {
  // pretvara skracenice drzava u engleska imena
    punoIme = new Intl.DisplayNames(["us"], {
    type: "region",
  });


  if (data.country.length === 0) {
    div1.innerHTML = `<hr>Tog imena nema u bazi podataka. Odaberi drugo ime.`;
    rezPretrage.appendChild(div1);
  }

  else{
    numKeys = Object.keys(data.country);
      
    for (let i=0; i < numKeys.length; i++){ // numKeys[i] vraca max 0 1 2 u pojedinim slucajevima je ime samo u jednoj drzavi (jure, juha, deana, awe ...)
      div1.innerHTML += `<li class="lista">${punoIme.of(data.country[numKeys[i]]["country_id"])} s vjerovatnoscu ${(data.country[numKeys[i]]["probability"] * 100).toFixed(2)}%</li>`;
    }
    rezPretrage.appendChild(div1);
  }
}


// Prvo slovo svakog imena je veliko
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



// Kreira novi div i u njega dodaje imena iz prethodne pretrage, najvise tri imena mogu biti u popisu i sa svakom slijedecom pretragom se brise najstarije pretrazivanje 
let numb;
var x;
var prethodnaPretraga = document.querySelector(".prethodni-rez");
var idBroj = 0;

function prethodnePretrage(data) {
  numb = 0;
  x = document.querySelector(".prethodni-rez").childElementCount; // ispisuje trenutni broj <li> elemenata u klasi ".prethodni-rez"
  numb += x;

  if(numb < 3) {
    prethodnaPretraga.innerHTML += `<button id="b${idBroj}" class="button" onclick="findButtonName(this)">${capitalizeFirstLetter(data.name)}</button>`;
    idBroj += 1;
  }

  // brise prvi dodani element nakon sto se nakupi 3 <button> elemenata u klasi ".prethodni-rez"
  else{
    prethodnaPretraga.innerHTML += `<button id="b${idBroj}" class="button" onclick="findButtonName(this)">${capitalizeFirstLetter(data.name)}</button>`;
    prethodnaPretraga.removeChild(prethodnaPretraga.firstElementChild);
    idBroj += 1;
  }


}


// klikom na <button> ispod naslova Prethodne pretrage vraca ime u konzolu
function findButtonName(obj) {
  if (obj !== undefined){
    var vraceniID = obj.id;
    var textID = document.getElementById(vraceniID).textContent;
    console.log(textID); 
    return textID;
  }

  // ovime izbjegavamo error koji izbacuje "undefined" prije klika
  else{
    console.log("")
  }

}