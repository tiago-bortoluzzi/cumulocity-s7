const fs = require('fs');
const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = async(deviceCredentials) => {
    log('AGENT', 'Saving device credentials locally...');
    const data = JSON.stringify(deviceCredentials);
    try {
        await fs.writeFileSync(settings.deviceCredentialsPath, data);
        log('AGENT', 'Saved device credentials successfully');
    } catch (error) {
        log('AGENT', 'Failed saving device credentials');
    }
}