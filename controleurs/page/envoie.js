let express = require('express')
let app = express()
let bodyParser = require('body-parser') //permet de parser les donner envoyer par posts
let session = require("express-session") //permet d'appeler la session
const validator = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;
const { body ,validationResult  } = require('express-validator');
const { response, request } = require('express');
const { toLower, isEmpty } = require('lodash');

//nos middelware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({ // le middleware de session
    secret: "aaaaweeeeeeeeeee",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))

exports.devis = [ //verification de l'email
// verifie si le matricule est un nombre.
body('nom', "veuillez bien saisir un nom").isLength({min: 1}).trim(),
body('sujet', "veuillez bien saisir un prenom").isLength({min: 1}).trim(),
body('telephone').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
body('telephone').matches(/^6[2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numero valide').trim(),
body('message', "veuillez bien saisir un message").isLength({min: 1}).trim(),
body('email', "veuillez saisir un email valide").isEmail().normalizeEmail(),
(request, response, next) => {

 // Extract the validation errors from a request.
const errors = validator.validationResult(request);
 // Create a genre object with escaped and trimmed data
if (!errors.isEmpty()) {
    var erreur = errors.array();
    console.log("pppf f")
     response.render('page/index', { erreur: erreur});
  } else{

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    //url de connection
   // const url = "mongodb://localhost:27017/ecole";
    //nom de la bdd
    const dbName = 'citag';
    //creation d'un nouveau mongoclient
    //const client = new MongoClient(url ,  { useUnifiedTopology: true });
    //utilisation de la methode connect pour la connection au serveur
    async function main(){

      
      const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
      const client = new MongoClient(uri,   { useUnifiedTopology: true } );
   
      try {
          // Connect to the MongoDB cluster
          client.connect( function (err, client) {
            assert.equal(null, err);
            //console.log('connecter corectement');
            const db = client.db(dbName);
            const email = db.collection('envoie');
            var mail = request.body.email; 
            var nom = request.body.nom; 
            var tele = request.body.telephone; 
            var sujet = request.body.sujet;
            var message = request.body.message; 
            email.updateOne(
                { name: "devis"},
                {
                    $push : { commentaire :  { "nom": nom,
                    "telephone": tele,
                    "email": mail,
                    "sujet": sujet,
                    "message": message
                  }}
                }
              ) 
        
        }
        )
        response.redirect('/')
   
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
  }
  
  main().catch(console.error);

   

    
  }
 
}
]
exports.email = [ //verification de l'email
  // verifie si le matricule est un nombre.

  body('email').isEmail().withMessage('Veuilez un email valide ').trim(),
  (request, response, next) => {

   // Extract the validation errors from a request.
  const errors = validator.validationResult(request);
   //les erreurs 
   var erreurauth = []
   var nomerreur = '';
   var matriculerreur = '';
   // Create a genre object with escaped and trimmed data
  if (!errors.isEmpty()) {
    } else{
      
        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');
        //url de connection
        //const url = "mongodb://localhost:27017/ecole";
        //nom de la bdd
        const dbName = 'citag';
        //creation d'un nouveau mongoclient
       // const client = new MongoClient(url ,  { useUnifiedTopology: true });
        //utilisation de la methode connect pour la connection au serveur
        async function main(){
    
          const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
          const client = new MongoClient(uri,   { useUnifiedTopology: true } );
       
          try {
              // Connect to the MongoDB cluster
              
              client.connect( function (err, client) {
                assert.equal(null, err);
                //console.log('connecter corectement');
                const db = client.db(dbName);
                const email = db.collection('envoie');
                var mail = request.body.email; 
                email.updateOne(
                    { name: "email"},
                    {
                      $push : { lesmail : mail}
                    }
                  ) 
       
            
            }
            )
            response.redirect('/')
       
          } catch (e) {
              console.error(e);
          } finally {
              await client.close();
          }
      }
      
      main().catch(console.error);
    
    
             
    }
   
 }
]
exports.contacte = [ //verification de l'email
// verifie si le matricule est un nombre.
body('nom', "veuillez bien saisir un nom").isLength({min: 1}).trim(),
body('prenom', "veuillez bien saisir un prenom").isLength({min: 1}).trim(),
body('telephone').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
body('telephone').matches(/^6[2,5,6]{1}[0-9]{7}$/).withMessage('Veuilez bien saisir un numero valide').trim(),
body('message', "veuillez bien saisir un message").isLength({min: 1}).trim(),
body('email', "veuillez saisir un email valide").isEmail().normalizeEmail(),
(request, response, next) => {

 // Extract the validation errors from a request.
const errors = validator.validationResult(request);
 // Create a genre object with escaped and trimmed data
if (!errors.isEmpty()) {
    var erreur = errors.array();
    console.log(erreur)
     response.render('page/contact', { erreur: erreur});
  } else{
    
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    //url de connection
   // const url = "mongodb://localhost:27017/ecole";
    //nom de la bdd
    const dbName = 'citag';
    //creation d'un nouveau mongoclient
    //const client = new MongoClient(url ,  { useUnifiedTopology: true });
    //utilisation de la methode connect pour la connection au serveur
    async function main(){

      
      
      const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
      const client = new MongoClient(uri,   { useUnifiedTopology: true } );
   
      try {
        client.connect( function (err, client) {
          assert.equal(null, err);
          //console.log('connecter corectement');
          const db = client.db(dbName);
          const email = db.collection('envoie');
          var mail = request.body.email; 
          var nom = request.body.nom; 
          var tele = request.body.telephone; 
          var prenom = request.body.prenom;
          var message = request.body.message; 
          email.updateOne(
              { name: "contacte"},
              {
                  $push : { commentaire :  { "nom": nom,
                  "prenom": prenom,
                  "telephone": tele,
                  "email": mail,
                  "message": message
                }}
              }
            ) 
  
      
      }
      )
      response.redirect('/')
   
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
  }
  
  main().catch(console.error);

   
    
  }
 
}
]
