const createServer = require('./createServer');
const instantiateServer = require('./instantiateServer');

module.exports = (device, servers, serverInstances, c8yClient) => {
    // For each server settings
    device.serversSettings.forEach(async(serverSettings) => {
        let server = servers.find(server => server.name === serverSettings.name);
        // If server already exists, updates its settings
        if (server && serverInstances[server.name]) serverInstances[server.name].serverSettings = serverSettings;
        // Otherwise, creates device and instantiate server
        else {
            server = await createServer(c8yClient, device, serverSettings);
            servers.push(server);
            instantiateServer(server, serverSettings, serverInstances, c8yClient);
        }
    })
}