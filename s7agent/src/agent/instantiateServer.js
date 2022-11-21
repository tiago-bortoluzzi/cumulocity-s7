const Server = require('../server/server.class');
const log = require('../util/log');

module.exports = (server, serverSettings, serverInstances, c8yClient) => {
    serverInstances[serverSettings.name] = new Server(server, serverSettings, c8yClient);
    serverInstances[serverSettings.name].init();
    log('AGENT', `Started server ${serverSettings.name}`);
}