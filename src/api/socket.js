export async function receive(socket) {
    const data = await socket.on('record');
    console.log(data);
    return data;
};

export function emit(socket, message) {
    // console.log(message);
     socket.emit('record', {message,});
     socket.on('message', (data) => {
         console.log(data);
     });
    // console.log('receive socket', result);
};