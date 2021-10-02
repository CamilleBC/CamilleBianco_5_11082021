let id = window.location.search.substr(5);
let url = 'http://localhost:3000/api/teddies/'+ id;

console.log(window.location.search)


fetch(url)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(resJson) {

            //Convertir les centimes en euros
            conversionEuros(resJson.price)

            //Alimenter la page avec l'item
            const DIV  = document.getElementById('produit');
            const item = `
            <div class="card h-50 w-75 mx-auto">
              <h5 id ="nom" class="card-title text-center bg-warning p-2 mt-1 text-white">${resJson.name}</h5>
              <img class="card-img-top w-75 h-50 mx-auto" src="${resJson.imageUrl}">
              <div class="card-body d-flex flex-column">
                <p class="card-text">${resJson.description}</p>
                <div class="card-text">${price}</div>
              <div class="card-text d-flex">
                <p class="mt-3">Quantité</p>
                <input id ="quantite" value="1" type="number" min="1" name="quantité" class="tailleSaisie m-2">
              </div>
              <div class="card-text d-flex">
                <p class="mt-3">Couleur</p>
                <select id="color" class="tailleSelect m-2">
                </select>
              </div>
              </div>
              <div class="d-flex">
                <div class="col text-center">
                  <a id="button" class="btn btn-secondary" href="./panier.html" role="button">Ajoutez au panier</a>
                </div>
                <div class="col text-center">
                  <a id='button' class="btn btn-secondary" href="../index.html" role="button">Revenir à l'accueil</a>
                </div>
              </div>
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
            //Préparation de la Map pour récupérer information
                const teddy = new Map()

                //Nom
                const nom = resJson.name; 
                teddy.set ('name', nom) 

                //Couleur
                const colorChoose = document.getElementById('color');
                let colorValue= colorChoose.value;
                teddy.set('color', colorValue);
                colorChoose.addEventListener('change', function(e){
                  colorValue = colorChoose.value
                  teddy.set('color', colorValue);
                });
               
                //Quantité et prix total
                const quantite = document.getElementById('quantite');
                let quantityValue = quantite.value;
                teddy.set('quantite', quantityValue);
                let priceTotal = parseFloat(price);
                teddy.set('price', priceTotal)
                quantite.addEventListener('change', function(e){
                  quantityValue = quantite.value;
                  teddy.set('quantite', quantityValue);
                  priceTotal = parseFloat(price) * quantityValue;
                  teddy.set('price', priceTotal);
                });

                //Création panier
                const panier = new Map();
                
                const button = document.getElementById('button')
                button.addEventListener('click', function(e) {
                  e.preventDefault()

                  //Reprendre les éléments de l'ours dans un objet
                  const obj = {
                    name : teddy.get('name'), 
                    color : teddy.get('color'),
                    quantite : parseFloat(teddy.get('quantite')),
                    prix : teddy.get('price'),
                    id : id
                  };

                  //Créer la clé du localStorage
                  const clé = `${resJson.name}`+ ' ' + obj.color;
                  const ours = JSON.parse(localStorage.getItem(clé));

                  //Vérifier si l'ours existe déjà
                    if (ours === null) {
                      //Si l'ours n'existe créer l'objet dans le localStorage
                      panier.set(clé, obj);
                      for ([key, value] of panier) {
                        localStorage.setItem(key, JSON.stringify(value));
                      }
                    }  
                    else {
                      //Si l'ours existe, ajouter la quantité à l'objet déjà existant
                      const quantiteExistante = parseFloat(ours.quantite);
                      const newQuantite = quantiteExistante + obj.quantite
                
                      const prixExistant = parseFloat(ours.prix)
                      const newPrix = prixExistant + obj.prix
                
                      const newObject = {
                        name : teddy.get('name'),
                        color : teddy.get('color'),
                        quantite : newQuantite,
                        prix : newPrix,
                        id : id
                      }
                      
                      localStorage.setItem(clé, JSON.stringify(newObject));
                  }
                  alert('Ce produit à bien été ajouter au panier.')
                console.log(localStorage)
            })

      })
      
      .catch(function(err) {
        console.log(err)
      });



