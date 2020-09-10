let express = require('express')
let app = express()
let bodyParser = require('body-parser') //permet de parser les donner envoyer par posts
let session = require("express-session") //permet d'appeler la session
const validator = require('express-validator');
const bcrypt = require("bcryptjs")//permet de hacher le mot de passe
const saltRounds = 10;
const { body ,validationResult  } = require('express-validator');
const { response, request } = require('express');
const { toLower, isEmpty, min } = require('lodash');

//nos middelware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(session({ // le middleware de session
    secret: "aaaaweeeeeeeeeee",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}))

const { parseInt, result } = require('lodash');
exports.creer =  [
    /*
ce middelware permet de creer un compte
    */
   // verifie si le matricule est un nombre.
   body('nom').isLength({ min: 3}).withMessage('Veuilez bien saisir un nom long').trim(),
   body('identifiant').isNumeric().withMessage('Veuilez bien saisir un nombre').trim(),
   body('identifiant').isLength({ min: 5, max:5}).withMessage('Veuilez bien saisir un identifiant de 5 caractere').trim(),
   body('email').isEmail().withMessage('Veuilez bien saisir un email').trim(),
   body('motdepasse', 'Veuillez saisir un mot de passe de plus de quatre caractere').isLength({ min: 4 }).trim(),
   (request, response, next) => {

     // Extract the validation errors from a request.
     const errors = validator.validationResult(request);
     //les erreurs 
     var erreurauth = []
     var nomerreur = '';
     var matriculerreur = '';
     // Create a genre object with escaped and trimmed data
     if (!errors.isEmpty()) {
       // There are errors. Render the form again with sanitized values/error messages.
       var erreur = errors.array();
       console.log(erreur)
       response.render('admin/enregistrer', {erreur: erreur});
       
       return;
     }
     else {
      //decu
      const MongoClient = require('mongodb').MongoClient;
      const assert = require('assert');
      //url de connection
      const url = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
     
      //nom de la bdd
      const dbName = 'citag';
      //creation d'un nouveau mongoclient
      const client = new MongoClient(url ,  { useUnifiedTopology: true });
     
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
              const identifier = db.collection('authentification');
              const inscrit = db.collection('inscrit');
              var nom = request.body.nom;
              var Nom = nom.toLowerCase();
              var identifiant = parseInt(request.body.identifiant);
              var email = request.body.email;
              var motdepasse = request.body.motdepasse;
              identifier.find({"name": "authenfier"}).toArray(function (err, discut) { 
                for (let i = 0; i < discut[0]['utilisateur'].length; i++) {
                   if (discut[0]['utilisateur'][i].Nom == Nom && discut[0]['utilisateur'][i].Identifiant == parseInt(request.body.identifiant)) {
                        nomerreur = "votre nom est correcte";
                        erreurauth.push(nomerreur)
      
                   }         
                  
                }
                if (isEmpty(erreurauth)) { //si les nom ou matricule ne correspond pas on envoie une erreur de non correspondance
                  response.render('admin/enregistrer', {authentifierreur: "veuillez bien saisir les informations"});
                   
                 }else{
                  bcrypt.hash(motdepasse, 10, (err, hash) => {
                    if (err) { 
                      return
                    }
                    
                  
                  inscrit.updateOne(
                    { name: "inscrit"},
                    {
                      $push : { utilisateur : { "Nom": Nom,
                      "Identifiant": identifiant,
                      "Email": email,
                      "Motdepasse": hash,
                    }}
                    }
                  )  
                  
        
                  //stockage des informations dans les sessions
                  response.cookie('nom', Nom);
                  response.cookie('identifiant', identifiant)
                  response.cookie('email', email);
                  response.locals.nom = Nom;
                  response.locals.identifiant = identifiant;
                  response.locals.email = email;
                
                  response.redirect('/admin/acceuil');
                  
                }) }
            })
            }) 
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
  exports.verification =  [
   
    // verifie si le matricule est un nombre.
    body('identifiant').isNumeric().withMessage('Veuilez bien saisir un nombre').isLength({ min: 5, max:5}).withMessage('Veuilez bien saisir un identifiant de 6 caractere').trim(),
    body('motdepasse').isLength({ min: 4 }).withMessage('Veuillez saisir un mot de passe de plus de quatre caractere').trim(),
 
     (request, response, next) => {
   
       // Extract the validation errors from a request.
       const errors = validator.validationResult(request);
   
       // Create a genre object with escaped and trimmed data
       if (!errors.isEmpty()) {
         // There are errors. Render the form again with sanitized values/error messages.
         var erreur = errors.array();
        console.log(erreur)
         response.render('admin/index', { erreur: erreur});
         
         return;
       }else {
           
         //autre
         var erreurauth = []
         let nomerreur = '';
         // Data from form is valid.
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
                const db = client.db(dbName);
                const verifi = db.collection('inscrit');
                var monidentifiant = parseInt(request.body.identifiant);
                var motdepasse = request.body.motdepasse;
                verifi.find({"name": "inscrit"}).toArray(function (err, inscription) { 
                  for (let i = 0; i < inscription[0]['utilisateur'].length; i++) {  
                    if (inscription[0]['utilisateur'][i].Identifiant == monidentifiant ) {
                        
                         bcrypt.compare(motdepasse,  inscription[0]['utilisateur'][i].Motdepasse, function(err, isMatch) {
                          if (err) {
                            throw err
                          } else if (!isMatch) {
                            response.render('admin/index', {authentifierreur: "veuillez bien saisir les informations"})
                 
                          } else {
                            nomerreur = "votre nom est correcte";
                            erreurauth.push(nomerreur)
                            Nom = inscription[0]['utilisateur'][i].Nom
                            identifiant = monidentifiant;
                    //stockage des informations dans les sessions
                    response.cookie('nom', Nom);
                    response.cookie('identifiant', identifiant)
                    response.locals.nom = Nom;
                    response.locals.identifiant = identifiant;
                    response.render('admin/acceuil');
      
                          }
                        })
                    }  
                 }
                })
                
              })
        
           } catch (e) {
               console.error(e);
           } finally {
               await client.close();
           }
       }
       
       main().catch(console.error);
         
              }
     }
   ];
exports.lesdevis = function(request, response) {
  if (request.cookies.nom && request.cookies.identifiant) {//si le kokie existe on l'envoie a la page des cours
  const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
   async function main(){
    
    const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
    const client = new MongoClient(uri,   { useUnifiedTopology: true } );
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
        async function listDatabases(client){
            databasesList = await client.db().admin().listDatabases();
         
            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`));
         
         const lien =  await client.db("citag").collection("envoie").findOne({name: "devis"});
            const devis = await lien;
            const les = devis['commentaire'];
            console.log(devis['commentaire'])
            response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
            response.render('admin/devis', {devis: les})
            
        };
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);    
} else {//si le kokie n'existe pas on envoie a la page d'authentification
  response.render('admin/index')
  }
   
   

};
exports.message = function(request, response) {
  if (request.cookies.nom && request.cookies.identifiant) {//si le kokie existe on l'envoie a la page des cours
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
 async function main(){
  
  const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
  const client = new MongoClient(uri,   { useUnifiedTopology: true } );

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);
      async function listDatabases(client){
          databasesList = await client.db().admin().listDatabases();
       
          console.log("Databases:");
          databasesList.databases.forEach(db => console.log(` - ${db.name}`));
       
       const lien =  await client.db("citag").collection("envoie").findOne({name: "contacte"});
          const ms = await lien;
          const les = ms['commentaire'];
          console.log(ms['commentaire'])
          response.locals.nom = request.cookies.nom;
  response.locals.identifiant = request.cookies.identifiant;
  response.locals.email = request.cookies.email;
          response.render('admin/message', {message: les})
          
          
      };

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);     
} else {//si le kokie n'existe pas on envoie a la page d'authentification
  response.render('admin/index')
  }

   

};
exports.email = function(request, response) {
  if (request.cookies.nom && request.cookies.identifiant) {//si le kokie existe on l'envoie a la page des cours

  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
 async function main(){

  const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
  const client = new MongoClient(uri,   { useUnifiedTopology: true } );

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);
      async function listDatabases(client){
          databasesList = await client.db().admin().listDatabases();
       
          console.log("Databases:");
          databasesList.databases.forEach(db => console.log(` - ${db.name}`));
       
       const lien =  await client.db("citag").collection("envoie").findOne({name: "email"});
          const ms = await lien;
          const les = ms['lesmail'];
          console.log(ms['lesmail'])
          response.locals.nom = request.cookies.nom;
  response.locals.identifiant = request.cookies.identifiant;
  response.locals.email = request.cookies.email;
          response.render('admin/email',  {lesmail: les})
          
          
          
      };

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);      
} else {//si le kokie n'existe pas on envoie a la page d'authentification
    response.render('admin/index')
    }
   

};
//voir  un service avant modification
exports.servicevoir = function(request, response) {
  if (request.cookies.nom && request.cookies.identifiant) {//si le kokie existe on l'envoie a la page des cours
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
 async function main(){
  const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
  const client = new MongoClient(uri,   { useUnifiedTopology: true } );

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);
      async function listDatabases(client){
          databasesList = await client.db().admin().listDatabases();
       
          console.log("Databases:");
          databasesList.databases.forEach(db => console.log(` - ${db.name}`));
       
       const lien =  await client.db("citag").collection("service").findOne({id: parseInt(request.params.id)});
          const ms = await lien;
          response.locals.id = ms['id'];  
          response.locals.titre = ms['titre'];  
          response.locals.contenu = ms['contenu'];  
          response.locals.nom = request.cookies.nom;
  response.locals.identifiant = request.cookies.identifiant;
  response.locals.email = request.cookies.email;
         
          response.render('admin/servicemodifie')
          
          
          
      };

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);      
} else {//si le kokie n'existe pas on envoie a la page d'authentification
    response.render('admin/index')
    }

   

};
//voir  un service avant modification
exports.projetvoir = function(request, response) {
  if (request.cookies.nom && request.cookies.identifiant) {//si le kokie existe on l'envoie a la page des cours
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
 async function main(){
  
  const uri = "mongodb+srv://root1:Camara0704@cluster0.ukuyb.mongodb.net/citag?retryWrites=true&w=majority";
  const client = new MongoClient(uri,   { useUnifiedTopology: true } );

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);
      async function listDatabases(client){
          databasesList = await client.db().admin().listDatabases();
       
          console.log("Databases:");
          databasesList.databases.forEach(db => console.log(` - ${db.name}`));
       
       const lien =  await client.db("citag").collection("projets").findOne({id: parseInt(request.params.id)});
          const ms = await lien;
          response.locals.id = ms['id'];  
          response.locals.titre = ms['titre'];  
          response.locals.contenu = ms['contenu'];  
          response.locals.nom = request.cookies.nom;
          response.locals.identifiant = request.cookies.identifiant;
          response.locals.email = request.cookies.email;
          response.render('admin/projetmodifier')
          
          
          
      };

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);     
} else {//si le kokie n'existe pas on envoie a la page d'authentification
    response.render('admin/index')
    }

   

};
//mettre a jour le titre d' un service
exports.modifierservicetitre = [ //verification de l'email
// verifie si le matricule est un nombre.
body('titre', "veuillez bien saisir un titre").isEmpty( { ignore_whitespace:true }).trim(),
(request, response, next) => {

 // Extract the validation errors from a request.
const errors = validator.validationResult(request);
 // Create a genre object with escaped and trimmed data
if (errors.isEmpty()) {
    var erreur = errors.array();
    console.log('il y a une erreur')
    console.log(erreur)
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
     response.render('admin/acceuil');
  } else{
  //true 
  var erreurauth = []
  let nomerreur = '';
  // Data from form is valid.
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
          const titre = db.collection('service');
          var id = request.body.id
          var letitre = request.body.titre; 
          titre.updateOne(
              { id: parseInt(id)},
              {
                  $set : { titre : letitre}
              }
            ) 
  
      
      }
      )
      response.locals.nom = request.cookies.nom;
      response.locals.identifiant = request.cookies.identifiant;
      response.locals.email = request.cookies.email;
      response.render("admin/acceuil")
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
 
}}
]
//mettre a jour le contenu dans  service
exports.modifierservicecontenue = [ //verification de l'email
// verifie si le matricule est un nombre.
body('contenue', "veuillez bien saisir un message").isEmpty({ ignore_whitespace:true }).trim(),
(request, response, next) => {

 // Extract the validation errors from a request.
const errors = validator.validationResult(request);
 // Create a genre object with escaped and trimmed data
if (errors.isEmpty()) {
    var erreur = errors.array();
    console.log(erreur)
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
     response.render('admin/acceuil');
  } else{

    //trou
    var erreurauth = []
    let nomerreur = '';
    // Data from form is valid.
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
            const titre = db.collection('service');
            var id = request.body.id
            var contenue = request.body.contenue; 
            titre.updateOne(
                { id: parseInt(id)},
                {
                    $set : { contenu : contenue}
                }
              ) 
    
        
        }
        )
        response.locals.nom = request.cookies.nom;
        response.locals.identifiant = request.cookies.identifiant;
        response.locals.email = request.cookies.email;
        response.render("admin/acceuil")
   
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
//modifier le titre d'un projet
exports.modifierprojettitre = [ //verification de l'email
// verifie si le matricule est un nombre.
body('titre', "veuillez bien saisir un titre").isEmpty( { ignore_whitespace:true }).trim(),
(request, response, next) => {

 // Extract the validation errors from a request.
const errors = validator.validationResult(request);
 // Create a genre object with escaped and trimmed data
if (errors.isEmpty()) {
    var erreur = errors.array();
    console.log('il y a une erreur')
    console.log(erreur)
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
     response.render('admin/acceuil');
  } else{   
    
    var erreurauth = []
    let nomerreur = '';
    // Data from form is valid.
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
          const titre = db.collection('projets');
          var id = request.body.id
          var letitre = request.body.titre; 
          titre.updateOne(
              { id: parseInt(id)},
              {
                  $set : { titre : letitre}
              }
            ) 
  
      
      }
      )
      response.locals.nom = request.cookies.nom;
      response.locals.identifiant = request.cookies.identifiant;
      response.locals.email = request.cookies.email;
      response.render("admin/acceuil")
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
//mettre a jour le contenu dans  projets
exports.modifierprojetcontenue = [ //verification de l'email
// verifie si le matricule est un nombre.
body('contenue', "veuillez bien saisir un message").isEmpty({ ignore_whitespace:true }).trim(),
(request, response, next) => {

 // Extract the validation errors from a request.
const errors = validator.validationResult(request);
 // Create a genre object with escaped and trimmed data
if (errors.isEmpty()) {
    var erreur = errors.array();
    console.log(erreur)
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
     response.render('admin/acceuil');
  } else{ 
    //vddddddddd

    var erreurauth = []
    let nomerreur = '';
    // Data from form is valid.
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
          const titre = db.collection('projets');
          var id = request.body.id
          var contenue = request.body.contenue; 
          titre.updateOne(
              { id: parseInt(id)},
              {
                  $set : { contenu : contenue}
              }
            ) 
  
      
      }
      )
      response.locals.nom = request.cookies.nom;
      response.locals.identifiant = request.cookies.identifiant;
      response.locals.email = request.cookies.email;
      response.render("admin/acceuil")
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