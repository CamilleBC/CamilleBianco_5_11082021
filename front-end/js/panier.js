console.log(localStorage)
const panierArray = new Map();
console.log(localStorage.length)
getBasket()

console.log(panierArray)

const PANIER = document.getElementById('produitPanier')

if(localStorage.length < 1){
    let divVide = document.createElement('tr')
    divVide.innerText = 'Le panier est vide'
    PANIER.appendChild(divVide)
    VIDER.classList.add('d-none')
}
else{
for ([key, value] of panierArray) {
    let produitPanier = `
    <tr class='${key}'>
      <td class='hauteurCellule'>${value.name}</td>
      <td>${value.color}</td>
      <td>${value.quantite}</td>
      <td>${value.prix} €</td>
      <td><a class="btn btn-secondary btn-supprimer" href="./panier.html" role="button">Supprimer</a></td>
    </tr>`
    PANIER.innerHTML += produitPanier
}
}
let supp = document.querySelectorAll('.btn-supprimer');
console.log(supp)

const DIV = document.getElementById('panier');
const VIDER = document.createElement('a');
VIDER.classList.add('btn', 'btn-secondary', 'w-25', 'm-auto');
VIDER.setAttribute('href', './panier.html');
VIDER.innerText = 'Vider le panier';

DIV.appendChild(VIDER)


VIDER.addEventListener('click', function(e) {
    localStorage.clear()
});

for (let i = 0; i < supp.length; i++){
    supp[i].addEventListener('click', function(e){
        let suppLocalStorage =  JSON.parse(localStorage.getItem(localStorage.key(i)));
        localStorage.removeItem(suppLocalStorage.name + ' ' + suppLocalStorage.color);
    })
}

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

document.getElementById('button').addEventListener('click', function(e){
    for([key, value] of panierArray){
        localStorage.setItem(key, JSON.stringify(value))
    }
})

//si panier vide ne pas aller sur formulaire.
//Quand panier vide rajouter élément vide
