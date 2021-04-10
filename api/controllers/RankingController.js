/**
 * RankingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  
    create: function(req, res){

        if(req.body.partnered){
            req.body.partnered = "true"
        }
        else{
            req.body.partnered = "false"
        }

        if(req.body.mature){
            req.body.mature = "true"
        }
        else{
            req.body.mature = "false"
        }
        
        let data = {
            "channel": req.body.channel, 
            "watch_time": req.body.watch_time,
            "stream_time": req.body.stream_time, 
            "peak_viewers": req.body.peak_viewers,
            "avg_viewers": req.body.avg_viewers, 
            "followers": req.body.followers,
            "followers_gained": req.body.followers_gained, 
            "views_gained": req.body.views_gained,
            "partnered": req.body.partnered, 
            "mature": req.body.mature,
            "language": req.body.language
        };

        console.log(data);

        Ranking.create(data).fetch().exec(function(err, streamer){
            if(err){
                return(err);
            }
            return res.redirect('/');
        })
    },

    show: function(req, res){
        
        let query = {"channel": {
            contains: req.param('channel'),
        }};

        if(query.channel.contains != null){
            Ranking.find(query).meta({makeLikeModifierCaseInsensitive: true}).exec(function(err, streamers){
                return res.view('pages/lol', {layout: 'layouts/layout', streamers: streamers});
            });
        }
        else{
            Ranking.find().exec(function(err, streamers){
                return res.view('pages/lol', {layout: 'layouts/layout',streamers: streamers});
            });
        }
    },

    stats: function(req, res){
        Ranking.find().exec(function(err, streamers){

            let partnered = streamers.filter( streamer => {
                return streamer.partnered === true
            });

            let percP = (Object.keys(partnered).length/Object.keys(streamers).length)*100;

            let mature = streamers.filter( streamer => {
                return streamer.mature === true
            });

            let percM = (Object.keys(mature).length/Object.keys(streamers).length)*100;

            streamers.sort(function(a, b){
                return b.followers - a.followers;
            });

            let stats = {
                partnered: [percP, Math.round((100-percP)*10)/10],
                mature: [percM, Math.round((100-percM)*10)/10],
                top3: streamers.slice(0,3),
            }

            return res.view('pages/stats', {layout: 'layouts/layout',stats: stats});
        });
    },

    delete: function(req, res){
        let query = {"id": req.param('id')};
        Ranking.destroy(query).fetch().exec(function (err, streamers){
            if(err) return(err);
            return res.redirect('/');
        })
    },

    // search: function(req, res){
    //     let query = {"channel": req.param('channel')};

    //     console.log(query);

    //     Ranking.find(query).exec(function(err, streamers){
    //         if(err) return(err);
    //         return res.view('pages/lol', {layout: 'layouts/layout', streamers: streamers});
    //     })
    // },

    update: function(req, res){
        
        console.log(req.body);

        if(req.body.partnered){
            req.body.partnered = "true"
        }
        else{
            req.body.partnered = "false"
        }

        if(req.body.mature){
            req.body.mature = "true"
        }
        else{
            req.body.mature = "false"
        }
        
        let query = {"id": req.param('id')};
        let data = {
            "channel": req.body.channel, 
            "watch_time": req.body.watch_time,
            "stream_time": req.body.stream_time, 
            "peak_viewers": req.body.peak_viewers,
            "avg_viewers": req.body.avg_viewers, 
            "followers": req.body.followers,
            "followers_gained": req.body.followers_gained, 
            "views_gained": req.body.views_gained,
            "partnered": req.body.partnered, 
            "mature": req.body.mature,
            "language": req.body.language
        };
        Ranking.update(query).set(data).fetch().exec(function (err, streamers){
            if(err) return(err);
            return res.redirect('/');
        })
    },
};

