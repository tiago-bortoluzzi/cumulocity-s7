const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = async(c8yclient, deviceInternalId, deviceExternalId) => {
    log('AGENT', 'Linking device internal and external IDs on Cumulocity...');
    const identity = {
        type: settings.agentType,
        externalId: deviceExternalId,
        managedObject: {
          id: deviceInternalId
        }
    };
    try {
        await c8yclient.identity.create(identity);
        log('AGENT', 'Linked device IDs successfully');
    } catch (error) {
        log('AGENT', 'Failed linking device IDs');
    }
}