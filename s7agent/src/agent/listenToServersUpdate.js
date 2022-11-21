const restartServer = require('./restartServer');
const log = require('../util/log');

module.exports = async(c8yClient, servers, serverInstances) => {
    log('AGENT', 'Listening to servers updates...');
    try {
        // Subscribes to managedObjects
        await c8yClient.realtime.subscribe('/managedobjects/*', async(event) => {
            // Processes only the servers
            const serversIds = servers.map(({ id }) => id);
            const deviceId = typeof event.data.data === 'string' ? event.data.data : event.data.data.id;
            if (serversIds.includes(deviceId)) {
                const server = servers.find(server => server.id === deviceId);
                // If server is deleted, deletes server instance
                if (event.data.realtimeAction === 'DELETE') {
                    log('AGENT', `Server ${server.name} was deleted`);
                    delete serverInstances[server.name];
                }
                // If server is updated, restarts server instance with updates
                if (event.data.realtimeAction === 'UPDATE') {
                    const updatedServer = event.data.data;
                    if (updatedServer.tags.toString() !== server.tags.toString()) {
                        log('AGENT', `Server ${server.name} was updated`);
                        restartServer(serverInstances[server.name], event.data.data);
                    }
                }
            }
        });
    } catch (error) {
        log('AGENT', 'Failed listening to servers updates');
    }
}