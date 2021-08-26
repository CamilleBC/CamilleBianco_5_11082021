let id = window.location.search.substr(5);
let url = 'http://localhost:3000/api/teddies/'+ id;


fetch(url)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(resJson) {
            console.log(resJson);
            const DIV  = document.getElementById('produit') ;
            DIV.innerHTML += `
            <div class="card h-50 w-75 mx-auto">
              <h5 class="card-title text-center bg-warning p-2 mt-1 text-white">${resJson.name}</h5>
              <img class="card-img-top w-75 h-50 mx-auto" src="${resJson.imageUrl}">
              <div class="card-body d-flex flex-column">
                <p class"card-text">${resJson.description}</p>
                <div class"card-text">${resJson.price} €</div>
              <div class="card-text d-flex">
                <p class="mt-3">Quantité</p>
                <input type="number" name="quantité" value="1" class="tailleSaisie m-2">
              </div>
              <div class="card-text d-flex">
                <p class="mt-3">Couleur</p>
                <select id="color" class="tailleSelect m-2">
                </select>
              </div>
              </div>
              <button onclick="window.location.href ='./panier.html';">Ajouter au panier</button>
            </div>
            `;
            const select = document.getElementById('color');
            let tab = resJson.colors;
            for(color of tab){
               let option = document.createElement('option');
               option.innerHTML = color;
               select.appendChild(option)
            }
        
      })
      
      .catch(function(err) {
        // Une erreur est survenue
      });
