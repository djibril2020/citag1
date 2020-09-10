const { parseInt, result } = require('lodash');

exports.projets = function(request, response) {
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
         const  result = await client.db("citag").collection("projets")
                        .findOne({ id: parseInt(request.params.id) });
         const lien =  await client.db("citag").collection("projets").find();
            if (result) {
            console.log(`Found a listing in the collection with the name `);
            const results = await lien.toArray();
            console.log(results)
            response.render('page/projet', { reponse:  result, requette: results })
            } else {
            console.log(`No listings found with the name`);
            }
        };
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
   

};
