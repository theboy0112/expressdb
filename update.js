const runQuery = require('./connection');

module.exports = async (users_id, password) => {
    try {
        const query = 'UPDATE users SET password = ? WHERE users_id = ?';
        const result = await runQuery(query, [password, users_id]);
        console.log('Account Updated:', result);
    } catch (error) {
        console.error('Error updating account:', error);
    }
};
