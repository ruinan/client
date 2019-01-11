const request = require('request-promise');

const saveRecord = async (record) => {
    // const recordJSON = JSON.stringify(record);
    const option = {
        uri: 'http://localhost:4000',
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
        const message = 'Cannot put the record!'
        console.error(message);
        throw new Error(message);
    }
};

const getAllRecord = async () => {
    
}



module.exports = {
    saveRecord,

};