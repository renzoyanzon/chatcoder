const socket = io();

messages=[];

function sendNewMessage() {
    const message = document.querySelector('#message').value;
    const username = document.querySelector('#username').value;
    if(!message || !username){
        alert('Favor de conmpletar con todos los datos');
        return
    }
    const messageObj = {
        username,
        message
    }
    socket.emit('NEW_MESSAGE_TO_SERVER',messageObj)
    document.querySelector('#message').value = '';
}

function updateMessage(data) {
    let messagesToHtml = '';
    data.forEach(el => {
        messagesToHtml = messagesToHtml + `<li>  ${el.username} - ${el.message}</li>`
    });
    document.querySelector("#messageList").innerHTML = messagesToHtml
    
}

socket.on('UPDATE_DATA',data=>{
    messages = data
    updateMessage(data)
})

socket.on('NEW_MESSAGE_FROM_SERVER', data=>{
    messages.push(data);
    updateMessage(messages)
})
