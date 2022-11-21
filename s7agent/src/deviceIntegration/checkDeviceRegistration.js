const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = async(c8yclient, deviceExternalId) => {
    log('AGENT', 'Checking if device is registered on Cumulocity...');
    try {
        const { data } = await c8yclient.identity.detail({ 'type': settings.agentType, 'externalId': deviceExternalId });
        const deviceInternalId = data.managedObject.id;
        log('AGENT', 'Device is registered');
        return deviceInternalId;
    } catch (error) {
        log('AGENT', 'The device is not registered on Cumulocity');
        return undefined;
    }
}