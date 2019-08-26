var socket = io();
document.querySelector('#btn').addEventListener('click', e => {
    e.preventDefault();
    socket.emit('chat message', 'hello');
    return false;

    socket.on('chat message', msg => {
        alert(msg);
    })
});