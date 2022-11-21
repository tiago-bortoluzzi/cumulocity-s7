const log = require('../util/log');

module.exports = async(c8yClient, device, servers) => {
    const serversNames = servers.map(({ name }) => name);
    const refreshedServersSettings = device.serversSettings.filter(serverSettings => {
        return serversNames.includes(serverSettings.name);
    })
    device.serversSettings = refreshedServersSettings;
    try {
        const updatedDevice = await c8yClient.inventory.update(device);
        log('AGENT', 'Refreshed servers settings successfully');
        return updatedDevice.data;
    } catch (error) {
        log('AGENT', 'Failed refreshing servers settings');
        return undefined;
    }
}