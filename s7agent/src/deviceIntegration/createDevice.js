const log = require('../util/log');

module.exports = async(c8yClient, deviceInfo) => {
    log('AGENT', 'Creating device on Cumulocity...');
    try {
        const { data } = await c8yClient.inventory.create(deviceInfo);
        const deviceInternalId = data.id;
        log('AGENT', 'Device created successfully');
        return deviceInternalId;
    } catch (error) {
        log('AGENT', 'Failed creating device');
        return undefined;
    }
}