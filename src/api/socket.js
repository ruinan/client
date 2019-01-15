export async function receive(socket) {
    const result = await socket.on('record');
    return result;
};

export async function emit(socket, message) {
    const result = await socket.emit('record', {message: 'async test'});
    console.log('Send: ', message, " Recieve: ", result);
};