//Reprendre les ours dans une map
const panierArray = new Map();
getBasket()

//Créer la liste des produit dans le récapitulatif
const listeProduit = document.getElementById('listeProduit');

for ([key, value] of panierArray) {
    let produit =`
    <tr>
      <td class='hauteurCellule'>${value.name} ${value.color} : ${value.quantite}</td>
    </tr>
    `
    listeProduit.innerHTML += produit
}

//Mettre le total du prix des ours
let totalAdd = 0;
for ([key, value] of panierArray) {
    totalAdd = totalAdd + value.prix;
}

//Fonction permettant de stocker les éléments du formulaire dans une map
document.getElementById('total').innerText = 'Total : ' + totalAdd + ' €' ;
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

document.getElementById('button').addEventListener('click', function(e) {
    contact ={
        firstName : formulaire.get('prenom'),
        lastName : formulaire.get('nom'),
        address : formulaire.get('adresse'),
        city : formulaire.get('ville'),
        email : formulaire.get('email'),
    }
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
})


//Indiquer quand le mail de confirmation n'est pas le même

document.getElementById("confirmationEmail").onchange = function() {emailFonction()};
document.getElementById("email").onchange = function() {emailFonction()};

function emailFonction() {
    let email = document.getElementById('email');
    let confirmationEmail = document.getElementById("confirmationEmail");
    if (email.value !== confirmationEmail.value){
        email.classList.add('border-danger');
        confirmationEmail.classList.add('border-danger');
        document.getElementById('erreurEmail').innerText = 'Les E-mails indiqués ne sont pas identiques';
        document.getElementById('erreurEmail').classList.add('text-danger');
    }
    else {
        document.getElementById('erreurEmail').classList.add('d-none');
        email.classList.remove('border-danger');
        confirmationEmail.classList.remove('border-danger');
    }
}

console.log(localStorage)
console.log(panierArray)
