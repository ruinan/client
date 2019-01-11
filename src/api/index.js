const request = require('request-promise');

const saveRecord = async (record) => {
    // const recordJSON = JSON.stringify(record);
    const option = {
        uri: 'http://localhost:4000/records',
        method: 'PUT',
        json: true,
        body: {
            record,
        },
    }
    try {
        const response = await request(option);
        console.log(response);
    } catch (error) {
        // logger && raven
        const message = 'Cannot put the record!'
        console.error(message);
        throw new Error(message);
    }
};

const getAllRecords = async () => {
    const option = {
        uri: `http://localhost:4000/records`,
        method: 'GET',
        json: true,
    }
    try {
        const response = await request(option);
        console.log(response);
    } catch (error) {
        const message = 'Cannot put the record!'
        console.error(message);
        throw new Error(message);
    }
}

const getOneRecord = async (id) => {
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



export default {
    saveRecord,
    getAllRecords,
    getOneRecord
};