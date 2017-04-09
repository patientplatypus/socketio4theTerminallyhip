
module.exports = function(app,io){

    var messageconn = require('../db/messageconnect'), 
        message_model = messageconn.model('messageSchema');

    app.get('/chat', function (req, res) {
        console.log("Homepage");
        res.sendFile(__dirname + '/index.html');
    });

    app.post('/chat', function(req,res){

        var newmsg = new message_model({
            usr: req.body.usr,
            msg: req.body.msg
        })

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

        return message_model.find({}, function(err,posts){
            io.sockets.emit('posts', posts);
        });
    });
};