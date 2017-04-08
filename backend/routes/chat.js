
module.exports = function(app,io){

    var messageconn = require('../db/messageconnect'), 
        message_model = messageconn.model('messageSchema');

    app.get('/chat', function (req, res) {
        console.log("Homepage");
        res.sendFile(__dirname + '/index.html');
    });

    app.post('/chat', function(req,res){
        console.log('got to chatpost');
        console.log('whatsreq.body.usr', req.body.usr, ' whatsreq.body.msg', req.body.msg);

        var newmsg = new message_model({
            usr: req.body.usr,
            msg: req.body.msg
        });

        newmsg.save(function(err, post){
            if(err){
              res.status(500).send({
                status: "ErrorYOLO", 
                error: err
              });
            }else{
              res.status(200).json({
                status: "ok",
                post: post
              }); 
            }
        });


        var returndata=[];

        var promise = new Promise(function(resolve){
            var loopcounter = 0
            message_model.find({}, function(err,posts){
                posts.forEach(function(post){
                    loopcounter+=1;   
                    console.log("POST ", post);
                    console.log("ERR", err);
                    returndata.push({'usr': post.usr, 'msg':post.msg});
                    if (loopcounter === posts.length){
                        resolve(true);
                    }
                });
            });
        });

        promise.then(function(resolve){
            if (resolve) {
                console.log('returndata ', returndata);
                io.sockets.emit('posts', returndata);
            }
        });





//         io.sockets.emit('posts', {'usr':req.body.usr, 'msg':req.body.msg});
    });
};






