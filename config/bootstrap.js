/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */


module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```


  await Ranking.destroy({});

//   let data = {
//     channel: "lul"
//   }

//   Ranking.create(data).fetch().exec(function(err, streamer){
//     if(err){
//         return(err);
//     }
// })

  const csvtojson = require("csvtojson");

  csvtojson({delimiter: ","})
    .fromFile(__dirname + "/../assets/csv/twitchdata.csv")
    .then(csvData => {
      console.log(csvData[0]);
      Ranking.createEach(csvData).fetch().exec(function(err, streamer){
        console.log("Hehe");
        if(err){
          console.log(err);
            return(err);
        }
        // console.log(streamer);
      })
    })
};
