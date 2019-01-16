export async function receive(socket) {
    const result = await socket.on('message');
    // console.log('receive socket', result);
    return result;
};

export function emit(socket, message) {
    // console.log(message);
     socket.emit('record', {message,});
    // const result = await socket.on('message');
    // console.log('receive socket', result);
};