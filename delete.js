const runQuery = require('./connection');

module.exports = async (users_id) => {
    try {
        const query = 'DELETE FROM accounts WHERE users_id =?';
        const result = await runQuery(query, [users_id]);
        console.log('Account deleted:', result);
    } catch (error) {
        console.error('Error deleting account:', error);
    }
};
