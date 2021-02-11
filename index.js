const MongoClient = require('mongodb').MongoClient;

const mongourl = 'mongodb://127.0.0.1:27017/'
const collection_name = 'movies';

MongoClient.connect(mongourl,{ useUnifiedTopology: true },(err,client) => {
    if(err) throw err;
    db = client.db('mymovies')
    var myobj = [
        { name: 'marvel', genre: 'Sci-fi', rating:10, language: 'English'},
        { name: 'Peterpan', genre: 'fantasy', rating:8, language: 'Hindi'},
        { name: 'batman', genre: 'Action', rating:9, language: 'English'},
        { name: 'superman', genre: 'Thriller', rating:5, language: 'Korean'},
        { name: 'xmen', genre: 'Action', rating:7, language: 'English'}
      ];

    //   add 5 movies to the collection
    
      db.collection("movies").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        
      })

    // query that returns all the movies

      db.collection("movies").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      });

    // query to find anyone movie name using findOne method

      db.collection("movies").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result);
      });

    // query that returns the three highest rated movies

    var mysort = { rating: -1 };
    db.collection("movies").find().sort(mysort).limit(3).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });

    // Add a keycalled achievements in any two documents

    var myquery = { name :"batman" };
    var newvalues = { $set: {achievements: "Super hit" } };
    db.collection("movies").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    
    // Using Save 

    var myquery = { name :"marvel" };
    db.collection("movies").findOne(myquery, function(err, result) {
            if (err) throw err;
            // console.log(result);
            result.achievements="Super Duper Hit"
            db.collection("movies").save(result)
          });
    
    // query that returns all the movies that have boththe ‘Super hit’ and the ‘SuperDuperhit’

    db.collection('movies').find({ $or: [ { achievements: "Super hit" }, { achievements: "Super Duper Hit"} ] }).toArray(function(err,result){
        console.log(result);
      })

    //   query that returns only those movies that haveachievements

    db.collection('movies').find({ achievements: {$exists:true} }).toArray(function(err,result){
        console.log(result);
      })
    



    //   Remove all movies
    //   db.collection("movies").remove({})
})