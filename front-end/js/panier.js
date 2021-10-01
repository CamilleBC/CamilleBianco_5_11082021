console.log(localStorage)
//Reprendre le panier
const panierArray = new Map();
getBasket();
console.log(panierArray);

//Initialisation pour mettre les ours dans le tableau récapitulatif
const PANIER = document.getElementById('produitPanier')
const VIDER = document.createElement('a');

//Si le panier est vide
if(panierArray.size < 1){
    let divVide = document.createElement('tr')
    divVide.innerText = 'Le panier est vide'
    PANIER.appendChild(divVide)
    VIDER.classList.add('d-none')
}
//Si le panier est rempli d'au moins un ours
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

//Mis en place du bouton supprimer pour chaque élément du tableau
let supp = document.querySelectorAll('.btn-supprimer');
for (let i = 0; i < supp.length; i++){
    supp[i].addEventListener('click', function(e){
        let suppLocalStorage =  JSON.parse(localStorage.getItem(localStorage.key(i)));
        localStorage.removeItem(suppLocalStorage.name + ' ' + suppLocalStorage.color);
    })
}

//Ajout du bouton vider complètement le panier
const DIV = document.getElementById('panier');
VIDER.classList.add('btn', 'btn-secondary', 'w-25', 'm-auto');
VIDER.setAttribute('href', './panier.html');
VIDER.innerText = 'Vider le panier';
DIV.appendChild(VIDER)

VIDER.addEventListener('click', function(e) {
    localStorage.clear()
});

//Calculer le total de chaque éléments
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
        if(panierArray.size >= 1){
            for([key, value] of panierArray){
                localStorage.setItem(key, JSON.stringify(value))
           }
        }
        else{
            e.preventDefault()
            alert('Votre panier est vide.')
        }
    })


