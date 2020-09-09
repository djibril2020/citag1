var express = require('express');
var router = express.Router();


//les controleurs
var projetdetails = require("./controleurs/page/projets")
var servicedetailer = require("./controleurs/page/servicedet")
var envoie = require("./controleurs/page/envoie")
var voir = require("./controleurs/admin/voir")





//les routes 
router.get('/', (request, response) =>{
    response.render('page/index')
})
router.get('/service',  servicedetailer.service)
router.get('/apropos', (request, response) =>{
    response.render('page/apropos')
})
router.get('/contact', (request, response) =>{
    response.render('page/contact')
})
router.get('/servicedetails', (request, response) =>{
    response.render('page/servicedetails')
})
router.get('/projet/:id', projetdetails.projets)
router.get('/servicedetails/:id', servicedetailer.servicedetail)
router.post("/devis", envoie.devis)
router.post("/newsletters", envoie.email)
router.post("/contacter", envoie.contacte)

//les routes pour le cote administrateur 
router.get('/admin/', (request, response) =>{
    if (request.cookies.nom && request.cookies.identifiant) {//si le kokie existe on l'envoie a la page des cours
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
    response.render('admin/acceuil')       
} else {//si le kokie n'existe pas on envoie a la page d'authentification
    response.render('admin/index')
    }
    
})
router.get('/admin/enregistrer', (request, response) =>{
    response.render('admin/enregistrer')
}) 
router.post('/admin/creer', voir.creer)
router.post("/admin/acceuil", voir.verification) 
router.get("/admin/acceuil", (request, response) =>{
    
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
    response.render('admin/acceuil')
})
router.get('/admin/devis', voir.lesdevis)
router.get('/admin/message', voir.message)
router.get('/admin/email', voir.email)
router.get('/admin/service', (request, response) =>{
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
    response.render('admin/service')
})
router.get('/admin/projet', (request, response) =>{
    response.locals.nom = request.cookies.nom;
    response.locals.identifiant = request.cookies.identifiant;
    response.locals.email = request.cookies.email;
    response.render('admin/projet')
})
router.get("/admin/servicemodifie/:id", voir.servicevoir)
router.get("/admin/projetmodifie/:id", voir.projetvoir)
router.post("/admin/servicemodifietitre", voir.modifierservicetitre)
router.post("/admin/servicemodifiecontenu", voir.modifierservicecontenue)
router.post("/admin/projetmodifietitre", voir.modifierprojettitre)
router.post("/admin/projetmodifiecontenu", voir.modifierprojetcontenue)

module.exports = router;