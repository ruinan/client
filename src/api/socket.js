export function receive(socket) {

}

export async function emit(socket, data) {
    const data = await socket.emit('record', {message: 'a'});
}