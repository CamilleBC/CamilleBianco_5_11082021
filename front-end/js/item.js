let id = window.location.search.substr(5);
let url = 'http://localhost:3000/api/teddies/'+ id;

function getColor(selectColor) {
  const valueColor = selectColor.value;  
}

function getQuantity(selectQuantity) {
  const valueQuantity = selectQuantity.value;  
}

fetch(url)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(resJson) {;
            const priceEuros = resJson.price / 100;
            const price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceEuros);
            const DIV  = document.getElementById('produit');
            const item = `
            <div class="card h-50 w-75 mx-auto">
              <h5 id ="nom" class="card-title text-center bg-warning p-2 mt-1 text-white">${resJson.name}</h5>
              <img class="card-img-top w-75 h-50 mx-auto" src="${resJson.imageUrl}">
              <div class="card-body d-flex flex-column">
                <p class"card-text">${resJson.description}</p>
                <div class"card-text">${price}</div>
              <div class="card-text d-flex">
                <p class="mt-3">Quantité</p>
                <input id ="quantite" type="number" min="1" name="quantité" class="tailleSaisie m-2">
              </div>
              <div class="card-text d-flex">
                <p class="mt-3">Couleur</p>
                <select id="color" class="tailleSelect m-2">
                </select>
              </div>
              </div>
              <a id='button' class="btn btn-secondary" href="#" role="button">Ajoutez au panier</a>
            </div>
            `;
            DIV.innerHTML += item

            //Mettre les choix de couleur
            const select = document.getElementById('color');
            let tab = resJson.colors;
            for(color of tab){
               let option = document.createElement('option');
               option.innerHTML = color;
               select.appendChild(option)
            }

            //Préparer les éléments à stocker
            const nom =resJson.name;
            console.log(nom);
            

            const colorChoose = document.getElementById('color');
            let colorValue= colorChoose.value;
            colorChoose.addEventListener('change', function(e){
              colorValue = colorChoose.value
            });

            const quantite = document.getElementById('quantite');
            let quantityValue = quantite.value;
            let priceTotal = parseFloat(price);
            quantite.addEventListener('change', function(e){
              quantityValue = quantite.value;
              priceTotal = parseFloat(price) * quantityValue;
            });
            

            //Appuyer sur le bouton stock dans le panier 
            const button = document.getElementById('button')
            button.addEventListener('click', function(e) {
              e.preventDefault();
              localStorage.setItem('nom', nom);
              localStorage.setItem('quantite', quantityValue);
              localStorage.setItem('color', colorValue);
              localStorage.setItem('price', priceTotal);
              console.log(localStorage);
              
            })
      })
      
      .catch(function(err) {
        // Une erreur est survenue
      });
      console.log(localStorage)