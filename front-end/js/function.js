//Convertir les centimes en euros
function conversionEuros(data){
    const priceEuros = data / 100;
    price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceEuros);
}

//Prendre éléments produit et set dans une map récupérable
function setProduct(product, res) {
    //Nom
    const nom = res.name; 
    product.set ('name', nom) 

     //Couleur
     const colorChoose = document.getElementById('color');
     let colorValue= colorChoose.value;
     product.set('color', colorValue);
     colorChoose.addEventListener('change', function(e){
       colorValue = colorChoose.value
       product.set('color', colorValue);
       console.log(product)
     });

      //Quantité et prix total
      const quantite = document.getElementById('quantite');
      let quantityValue = quantite.value;
      product.set('quantite', quantityValue);
      let priceTotal = parseFloat(price);
      product.set('price', priceTotal)
      quantite.addEventListener('change', function(e){
        quantityValue = quantite.value;
        product.set('quantite', quantityValue);
        priceTotal = parseFloat(price) * quantityValue;
        product.set('price', priceTotal);
        console.log(product)
      });
  }


//Appeler le panier
function getBasket(){
    for (let i = 0; i < localStorage.length; i++ ) {
        if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('formulaire')){
            if (localStorage.getItem(localStorage.key(i)) !== localStorage.getItem('order')){
            const teddy =JSON.parse (localStorage.getItem(localStorage.key(i)))
            panierArray.set(teddy.name +' '+ teddy.color, teddy)
            }
        }
    }
};



