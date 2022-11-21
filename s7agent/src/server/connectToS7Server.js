const log = require('../util/log');
const sendAlarm = require('../util/sendAlarm');
const settings = require('../settings/settings');

module.exports = async(s7Client, c8yClient, server) => {
    s7Client.on('error', console.error);
    try {
        await s7Client.connect();
        log(`SERVER ${server.name}`, 'Connected to S7 server');
        return true;
    } catch(error) {
        log(`SERVER ${server.name}`, 'Failed connecting to S7 server');
        sendAlarm(c8yClient, server.id, 'CRITICAL', settings.serverType, 'Failed connecting to S7 server');
        return false;
    }
}