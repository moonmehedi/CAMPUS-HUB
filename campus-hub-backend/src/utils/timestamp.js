// Utility function to get current UTC timestamp in YYYY-MM-DD HH:MM:SS format
const getCurrentTimestamp = () => {
    return new Date().toISOString()
        .replace('T', ' ')
        .slice(0, 19);
};

module.exports = { getCurrentTimestamp };