console.log(localStorage)
const panierArray = new Map();
for (let i = 0; i < localStorage.length; i++ ) {
    const teddy =JSON.parse (localStorage.getItem(localStorage.key(i)))
    panierArray.set(teddy.name +' '+ teddy.color, teddy)
}


const PANIER = document.getElementById('produitPanier')
for ([key, value] of panierArray) {
    let produitPanier = `
    <tr>
      <td class='hauteurCellule'>${value.name}</td>
      <td>${value.color}</td>
      <td>${value.quantite}</td>
      <td>${value.prix} €</td>
      <td><a id="supprimer" class="btn btn-secondary" href="./panier.html" role="button">Supprimer</a></td>
    </tr>`
    PANIER.innerHTML += produitPanier
    const SUPPRIMER = document.getElementById('supprimer');
    SUPPRIMER.addEventListener('click', function(e){
        localStorage.removeItem(key);
        delete produitPanier
    })
}

const DIV = document.getElementById('panier');
const VIDER = document.createElement('a');
VIDER.classList.add('btn', 'btn-secondary', 'w-25', 'm-auto');
VIDER.setAttribute('href', './panier.html');
VIDER.innerText = 'Vider le panier';

DIV.appendChild(VIDER)

VIDER.addEventListener('click', function(e) {
    localStorage.clear()
});

//Calculer le total de chaque éléments
console.log(panierArray)

let quantiteAdd = 0;
let sousTotalAdd = 0;
let totalAdd = 0;
for ([key, value] of panierArray) {
    quantiteAdd = quantiteAdd + value.quantite;
    sousTotalAdd = sousTotalAdd + value.prix;
    totalAdd = sousTotalAdd;
}
console.log('Quantité : ' + quantiteAdd + ' ; ' +  'Sous-total : ' + sousTotalAdd + ' ; ' + 'Total : ' + totalAdd);
//Alimenter la carte TOTAL
const quantiteTotal = document.getElementById('quantiteTotal');
const sousTotal = document.getElementById('sousTotal');
const total = document.getElementById('total');
quantiteTotal.innerText = quantiteAdd;
sousTotal.innerText = sousTotalAdd + ' €';
total.innerText = totalAdd + ' €';

