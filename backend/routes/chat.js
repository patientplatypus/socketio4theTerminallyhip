
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
        
         io.sockets.emit('posts', {'usr':req.body.usr, 'msg':req.body.msg});
    });
};






