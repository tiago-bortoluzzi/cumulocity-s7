const log = require('../util/log');
const deleteDeviceCredentials = require('./deleteDeviceCredentials');
const updateServersInstances = require('./updateServersInstances');

module.exports = async(c8yClient, device, serverInstances, init, servers) => {
    log('AGENT', 'Listening to agent updates...');
    try {
        // Subscribes to agent managedObject
        await c8yClient.realtime.subscribe(`/managedobjects/${device.id}`, async(event) => {
            // If agent is deleted, deletes device credentials and restarts agent
            if (event.data.realtimeAction === 'DELETE') {
                await deleteDeviceCredentials();
                serverInstances = {};
                log('AGENT', 'Agent deleted. Reinitializing...');
                init();
            }
            // If agent is updated, updates agent managedObject, restarts servers listener and updates servers instances
            if (event.data.realtimeAction === 'UPDATE') {
                const updatedDevice = event.data.data;
                if (updatedDevice.serversSettings.toString() !== device.serversSettings.toString()) {
                    device = event.data.data;
                    log('AGENT', 'Agent updated');
                    updateServersInstances(device, servers, serverInstances, c8yClient);
                }
            }
        });
    } catch (error) {
        log('AGENT', 'Failed listening to agent updates');
    }
}