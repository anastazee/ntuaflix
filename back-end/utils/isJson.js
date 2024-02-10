function isJSON(x) {
    try {
        JSON.stringify(x);
        return true;
    } catch (e) {
        console.error('Error parsing JSON:', e.message);
        return false;
    }
}

module.exports = { isJSON };