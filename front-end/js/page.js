// Création des cartes
let DIV = document.getElementById('items');

function createCard (item) {
  

    const CARD = document.createElement('div');
    CARD.classList.add('card', 'col-4');

    const BODY = document.createElement('div');
    BODY.classList.add('card-body');


    const TITLE = document.createElement('h5');
    TITLE.classList.add('card-title');
    TITLE.innerText = item.name;

    const IMG = document.createElement('img');
    IMG.classList.add('card-img-top', 'w-75', 'h-50', 'mx-auto',);
    IMG.setAttribute('src', item.imageUrl);

    console.log(IMG);

    const TEXTE = document.createElement('p');
    TEXTE.classList.add('card-text');
    TEXTE.innerText = item.description;

    const PRIX = document.createElement('p');
    PRIX.classList.add('card-text')
    PRIX.innerText = item.price + ' €'

    DIV.appendChild(CARD);
    CARD.appendChild(IMG);
    CARD.appendChild(BODY);
    BODY.appendChild(TITLE);
    BODY.appendChild(TEXTE);
    BODY.appendChild(PRIX);
  
    
    
}

fetch('http://localhost:3000/api/teddies')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(resJson) {
    console.log(resJson);
    console.log(typeof resJson)

    resJson.forEach(item => {
      createCard(item)
    });

   
  })
  .catch(function(err) {
    // Une erreur est survenue
  });


