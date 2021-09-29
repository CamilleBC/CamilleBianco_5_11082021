console.log(localStorage)
//Reprendre les ours dans une map
const panierArray = new Map();
for (let i = 0; i < localStorage.length; i++ ) {
    if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('formulaire')){
        if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('order')){
        const teddy =JSON.parse (localStorage.getItem(localStorage.key(i)))
        panierArray.set(teddy.name +' '+ teddy.color, teddy)
        }
    }
}
console.log(panierArray)

//Mettre le total du prix des ours
let totalAdd = 0;
for ([key, value] of panierArray) {
    totalAdd = totalAdd + value.prix;
}

//Fonction permettant de stocker les éléments du formulaire dans une map
document.getElementById('total').innerHTML =`Le prix de votre commande est de <strong>${totalAdd}</strong> €.`  ;

//mise en place de l'id de la commande
//uniquId utiliser pour générer des id random.
const responseId = localStorage.getItem('order');
document.getElementById('order').innerHTML = `Votre commande numéro <strong> ${responseId} </strong> est bien prise en compte.`;

//Retirer les orders lors du retour à l'accueil
document.getElementById('button').addEventListener('click', function(e){
    localStorage.clear()
})

document.getElementById('accueil').addEventListener('click', function(e){
    localStorage.clear()
})