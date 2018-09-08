    
$(function(){


    function sendmsg(usr, msg){
        var url = 'http://localhost:3000/chat';

        var data = {
            usr:usr,
            msg:msg
        };

        var new_message = $.ajax({
                            type:"POST",
                            url:url,
                            data
                         });

        new_message.done(function(response){
            console.log("first!");
            console.log("postmsgYATA", response);
        });
        new_message.error(function(err){
            console.log('there was some error: ', err.error)
        })
    }

    function socketfunk(){

        console.log("in socketfunk");

        var socket = io('http://localhost:8080');
        socket.on('posts', function (data) {
            console.log("socketreturndata: ", data);
            //$('body').append('<p> usr: '+data.usr+' msg: '+data.msg+'</p>')
            
            $('.msgs').html(' ');

            data.forEach(function(dot){
                $(".msgs").append('<p> usr: '+dot.usr+' msg: '+dot.msg+'</p>')
            })

        });
      
    }


    function main(){

        socketfunk();

        $('form').submit(function(e){
            e.preventDefault();
            var usr = $('form').find('input[name="usrname"]').val();
            var msg = $('textarea').val();
            console.log('usr ', usr, ' msg ', msg);
            sendmsg(usr, msg);
            
        });

    }
    main();

 });

