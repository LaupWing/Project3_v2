// window.history.pushState("", "", '/moderator'); 
const socket = io();
socket.emit('get profiles')
socket.on('send profiles', (profileArray)=>{console.log(profileArray)})