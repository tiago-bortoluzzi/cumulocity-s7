const fs = require('fs');
const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = async() => {
    log('AGENT', 'Reading device credentials locally...');
    try {
        const rawData = await fs.readFileSync(settings.deviceCredentialsPath);
        const deviceCredentials = JSON.parse(rawData);
        log('AGENT', 'Device credentials loaded successfully');
        return deviceCredentials;
    } catch (error) {
        log('AGENT', 'No device credentials stored locally');
        return undefined;
    }
}