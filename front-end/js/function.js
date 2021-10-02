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

//Convertir les centimes en euros
function conversionEuros(data){
    const priceEuros = data / 100;
    price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceEuros);
}
