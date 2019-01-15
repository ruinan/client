import request from 'request-promise';
import openSocket from 'socket.io-client';
export const saveRecord = async (records, name) => {
    const option = {
        uri: 'http://localhost:4000/records',
        method: 'PUT',
        json: true,
        body: {
            records,
            name
        },
    }
    try {
        console.log(option);
        await request(option);
        console.log('save');
    } catch (error) {
        // logger && raven
        const message = 'Cannot put the record!'
        console.error(message);
        throw new Error(message);
    }
};

export const getAllRecords = async () => {
    const option = {
        uri: `http://localhost:4000/records`,
        method: 'GET',
        json: true,
    }
    try {
        const response = await request(option);
        // console.log(response.toJson());
        return response;
    } catch (error) {
        const message = 'Cannot put the record!'
        console.error(message);
        throw new Error(message);
    }
}

export const getOneRecord = async (id) => {
    const option = {
        uri: `http://localhost:4000/records/${id}`,
        method: 'GET',
        json: true,
    }
    try {
        const response = await request(option);
        console.log(response);
    } catch(error) {
        const message = 'Cannot put the record!'
        console.error(message);
        throw new Error(message);
    }
}

export const socketListener = () => {
    console.log('socket');
    const socket = openSocket('http://localhost:4000');
    socket.on('record', data => {
        console.log(data);
    });
    socket.emit('x', {xxx: 'a'}, (data) => {
        console.log(data);
    });
};