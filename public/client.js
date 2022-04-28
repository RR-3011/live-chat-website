const socket=io();

let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message-area')
let user_name;
do{
 user_name=prompt('Please enter your name:')
}
while(!user_name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg={
        user:user_name,
        message:message.trim()
    }
    //Append Message
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom()

    socket.emit('message',msg)
}


function appendMessage(msg,type){
    let mainDiv=document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message');

    let markup=`
    <h4> ${msg.user}</h4>
    <p> ${msg.message}</p>`

    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv);

}

//Receive message:

socket.on('message',(msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}