
# Projet 5 Openclassrooms : Construire un site e-commerce en javascript

**Objectif** : Créer un premier MVP (Minimum Viable Product) d'une application thématiques ne vendant qu’un seul groupe de produits : des ours en peluche.  

## Cachier des charges

### Fonctionnalités

* Une page de vue sous forme de liste, montrant tous les articles disponibles à la vente.
* Une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier.
* Une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande.
* Une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.


### Contrainte technique

* Un plan qui formalise des test unitaires de 80% de la base de code du front-end expliquant quelles lignes seront testées et quels “test cases” seront envisagés.
* Les inputs des utilisateurs sont validés à l'aide d'expressions régulières (chaînes de caractères qui décrit selon une syntaxe précise, un ensemble de chaînes de caractères possibles) avant d'être envoyés à l'API.
* La page contenant un seul article a un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation.
* Le code source devra est indenté et utiliser des commentaires. Le code utilise des fonctions globales.
* Pour l'API, les promesses sont utilisées.
* Pour les routes POST, l’objet contact envoyé au serveur contient les champs firstName, lastName, address, city et email. Le tableau des produits envoyé au
backend est un array de strings product_id.


## Langages et logiciels utilisés

### Languages

```
HTML5
CSS3 : Sass
Javascript
```

### Logiciels

```
Visual Studio Code (VSC) avec le plugins : Live server
Git et Github
Devtools
Node.Js
npm
```

## Utilisation du projet

### Prérequis

Avoir Node et npm installé sur votre ordinateur.

### Installation

1. Clonez le repository.
2. A l'intérieur du dossier backend, utilisez la commande `npm install`. 
3. Pour lancer le serveur, depuis le dossier backend utilisez la commande `node server`. Le serveur devrait tourner sur un localhost avec le port par défaut 3000. 
Si le serveur se lance sur un autres port, celui-ci s'affiche sur la console sous la forme suivante : ` Listening on port 3001`.
5. Pour VSC utilisez le plugin Live server depuis le fichier index.html dans le dossier frontend.
