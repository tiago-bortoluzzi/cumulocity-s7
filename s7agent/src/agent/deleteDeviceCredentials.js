const fs = require('fs');
const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = async() => {
    try {
        await fs.unlinkSync(settings.deviceCredentialsPath);
    } catch (error) {
        log('AGENT', 'Failed deleting device credentials');
    }
}