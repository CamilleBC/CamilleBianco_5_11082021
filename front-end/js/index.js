fetch('http://localhost:3000/api/teddies')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(resJson) {
    resJson.forEach(item => {
        const DIV  = document.getElementById('items') ;
        DIV.innerHTML += `
        <div class="card col-5 m-auto" style="width : 20rem">
          <h5 class="card-title text-center bg-warning p-2 mt-1 text-white">${item.name}</h5>
          <img class="card-img-top w-75 h-50 mx-auto" src="${item.imageUrl}">
          <div class="card-body d-flex flex-column">
              <p class"card-text">${item.description}</p>
              <div class"card-text">${item.price} €</div>
              <a class"btn btn-primary" href="./pages/produit.html?_id=${item._id}">Voir plus</a>
          </div>
        </div>
        `;     
    });
    
  })
  
  .catch(function(err) {
    // Une erreur est survenue
  });

  