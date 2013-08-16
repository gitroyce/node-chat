window.onload = function() {

    var messages = [];
    var socket = io.connect('http://107.21.230.220:3700');
//    var socket = io.connect('http://localhost:3700');
    var name = document.getElementById("name");
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i+=1) {
                html += '<b>';
                html += (messages[i].username ? messages[i].username : 'node server');
                html += ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem: ", data);
        }
    });

    sendButton.onclick = sendMessage = function() {
        if(name.value == ""){
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    };

    $(document).ready(function() {
        $("#field").keyup(function(e) {
            if(e.keyCode == 13)  sendMessage();
        });
    });
}