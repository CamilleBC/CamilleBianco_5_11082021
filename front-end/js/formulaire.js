//Reprendre les ours dans une map
const panierArray = new Map();
for (let i = 0; i < localStorage.length; i++ ) {
    if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('formulaire')) {
    const teddy =JSON.parse (localStorage.getItem(localStorage.key(i)))
    panierArray.set(teddy.name +' '+ teddy.color, teddy)
    }
}
console.log(panierArray)

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
onChange('naissance');
onChange('adresse');
onChange('appartement');
onChange('batiment');
onChange('lieu-dit');
onChange('codePostale');
onChange('ville');
onChange('pays');
onChange('telephone');


//Element stocker dans le localStorage sous forme d'objet
document.getElementById('button').addEventListener('click', function(e) {
    const objFormulaire = {
        email : formulaire.get('email'),
        nom : formulaire.get('nom'),
        prénom : formulaire.get('prenom'),
        naissance : formulaire.get('naissance'),
        adresse : formulaire.get('adresse'),
        appartement : formulaire.get('appartement'),
        batiment : formulaire.get('batiment'),
        lieuDit : formulaire.get('lieu-dit'),
        codePostale : formulaire.get('codePostale'),
        ville : formulaire.get('ville'),
        pays : formulaire.get('pays'),
        telephone : formulaire.get('telephone'),

    }
    localStorage.setItem('formulaire', JSON.stringify(objFormulaire))
    console.log(JSON.parse(localStorage.getItem('formulaire')))
}
)

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


   



