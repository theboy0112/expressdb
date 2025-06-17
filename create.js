const runQuery = require('./connection');

module.exports = async (username, password) => {
    try {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const result = await runQuery(query, [username, password]);
        console.log('Account inserted:', result);
    } catch (error) {
        console.error('Error inserting account:', error);
    }
};
