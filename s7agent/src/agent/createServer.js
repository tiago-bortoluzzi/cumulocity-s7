const log = require('../util/log');
const sendAlarm = require('../util/sendAlarm');
const settings = require('../settings/settings');

module.exports = async(c8yClient, device, serverSettings) => {
    const newServer = {
        "name": serverSettings.name,
        "type": settings.serverType,
        "c8y_IsDevice": {},
        "tags": []
    }
    try {
        const { data } = await c8yClient.inventory.childDevicesCreate(newServer, device.id);
		const server = data;
        log('AGENT', `Created server ${serverSettings.name}`);
		return server;
    } catch (error) {
        log('AGENT', `Failed creating server ${serverSettings.name}`);
        sendAlarm(c8yClient, device.id, 'CRITICAL', settings.agentType, `Failed creating server ${serverSettings.name}`);
		return undefined;
    }
}