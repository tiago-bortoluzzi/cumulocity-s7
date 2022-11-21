const log = require('../util/log');

module.exports = (serverInstance, updatedServer) => {
    log('AGENT', `Server ${serverInstance.server.name} restarted`);
    clearInterval(serverInstance.measurementInterval);
    serverInstance.tagsValues = {};
    serverInstance.s7Client.disconnect();
    serverInstance.server = updatedServer;
    serverInstance.init();
}