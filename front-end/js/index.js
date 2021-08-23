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
        <div class="card col-6 border-3 bg-brown">
          <h5 class="card-title text-center">${item.name}</h5>
          <img class="card-img-top w-75 h-50 mx-auto" src="${item.imageUrl}">
          <div class="card-body">
              <p class"card-text">${item.description}</p>
              <p class"card-text">${item.price} €</p>
          </div>
        </div>
        `;     
    });
    
  })
  
  .catch(function(err) {
    // Une erreur est survenue
  });

  