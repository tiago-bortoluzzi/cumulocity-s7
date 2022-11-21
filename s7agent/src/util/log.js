const moment = require('moment');

module.exports = (source, text) => {
    console.log(`[${moment().format('DD/MM/YYYY - HH:mm:ss')}] ${source}: ${text}`);
}