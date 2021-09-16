const teddy = {
  name : 'Arnold', 
  color : 'rouge',
  quantite : 3,
  prix : 70 + 'euros'
}

function addToPanier(data){
  const array = JSON.parse(localStorage.getItem('panier'));
  if (array.lenght > 1 ) {
    const key = `${data.name}`;
    const teddy = array.get(key);
  }  
  else {
    panier.set(`${data.name}`, obj);
  }
  localStorage.setItem('panier', JSON.stringify(array));
};


addToPanier(resJson);
console.log(localStorage)

let id = window.location.search.substr(5);
let url = 'http://localhost:3000/api/teddies/'+ id;

fetch(url)
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
    .then (function(resJson) {
      addToPanier(resJson)
    })