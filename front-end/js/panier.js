

//Reprendre le panier
let panierArray = new Map();
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

//Formulaire

//Fonction permettant de stocker les éléments du formulaire dans une map

const formulaire = new Map()

 
function onChange(id){
    let element = document.getElementById(id);
    let elementAdd = element.value;
    element.addEventListener('change', function(e){
        elementAdd = element.value;
        formulaire.set(id, elementAdd);
    })
};

onChange('email');
onChange('nom');
onChange('prenom');
onChange('adresse');
onChange('codePostale');
onChange('ville');


//Element stocker dans le localStorage sous forme d'objet
let contact = '';
let products = [];
for ([key, value] of panierArray) {
    if(value.id != undefined){
    products.push(value.id)
    }
};
console.log(products)

document.getElementById('buttonFormulaire').addEventListener('click', function(e) {
    if (panierArray.size < 1){
        e.preventDefault()
        alert('Votre panier est vide.')
    }
    else{
    contact ={
        firstName : formulaire.get('prenom'),
        lastName : formulaire.get('nom'),
        address : formulaire.get('adresse'),
        city : formulaire.get('ville'),
        email : formulaire.get('email'),
    }
    //Vérification des input
    let checkName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/ ;
    let checkAdress = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+()?/;
    let checkCity = /^[[:alpha:]]([-' ]?[[:alpha:]])*$/;
    let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (checkName.test(formulaire.get('prenom'))==false){
        e.preventDefault()
        alert(`Veuillez vérifier les informations concernant : le prénom. Les caractère spéciaux et numériques ne sont pas autorisés.`)
    }
    else if (checkName.test(formulaire.get('nom'))==false){
        e.preventDefault()
        alert(`Veuillez vérifier les informations concernant : le nom. Les caractère spéciaux et numériques ne sont pas autorisés.`)
    }
    else if(checkAdress.test(formulaire.get('adresse'))== false){
        e.preventDefault()
        alert(`Veuillez vérifier les informations concernant : l'adresse.`)
    }
    else if(checkCity.test(formulaire.get('ville'))){
        e.preventDefault()
        alert(`Veuillez vérifier les informations concernant : le ville. Les caractère spéciaux et numériques ne sont pas autorisés.`)
    }
    else if(checkMail.test(formulaire.get('email'))== false){
        e.preventDefault()
        alert(`Veuillez vérifier les informations concernant : l'E-mail.`)
    }
    else{
    localStorage.setItem('formulaire', JSON.stringify(contact))
    console.log(JSON.parse(localStorage.getItem('formulaire')))
    contact = JSON.parse(localStorage.getItem('formulaire'));


    //envoyer élément dans l'API avec POST avec fetch 
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            contact : contact,
            products :products }),
    })
    .then((response) => {
        const contenu = response.json();
        console.log(contenu)
        contenu.then((resolve) => {
            if(localStorage.getItem('order') === null){
            localStorage.setItem('order', resolve.orderId)
            }
            //redirection window.location.href
            window.location = "validation.html"
        })
        contenu.catch((error)=> {
            alert(`Problème avec le catch:${error.status}`)
        })

    })
              
        .catch(function(err) {
            return ('Un problème est apparu, veuiller réessayer ultérieurementt')
        });
    }
}
})


console.log(localStorage)
console.log(panierArray)
