fetch('http://localhost:3000/api/teddies')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(resJson) {
    
    //Boucle pour une itération sur tous les ours de l'API
    resJson.forEach(item => {

        //Convertir les centimes en euros
        conversionEuros(item.price);

        //Mis en place carte produit
        const DIV  = document.getElementById('items') ;
        DIV.innerHTML += `
        <div class="card col-5 m-auto mt-1 mb-1" style="width : 20rem; height : 25rem">
          <h5 class="card-title text-center bg-warning p-2 mt-1 text-white">${item.name}</h5>
          <img class="card-img-top w-75 h-50 mx-auto" src="${item.imageUrl}">
          <div class="card-body d-flex flex-column">
              <p class"card-text">${item.description}</p>
              <div class"card-text">${price}</div>
              <a class"btn btn-primary" href="./pages/produit.html?_id=${item._id}">Voir plus</a>
          </div>
        </div>
        `;     
    });
    
  })
  
  //Catch si erreur dans le fetch.
  .catch(function(err) {
    const DIV  = document.getElementById('items');
    DIV.innerHTML +=`
    <div>
      <p class="text-center">Un problème serveur est survenu, veuillez réessayer ultérieurement.</p>
    </div>
    ` 
    console.log(err)
  });

  console.log(localStorage)
  
  