const deviceIntegration = require('../deviceIntegration/deviceIntegration');
const loadServers = require('./loadServers');
const refreshServersSettings = require('./refreshServersSettings');
const listenToAgentUpdate = require('./listenToAgentUpdate');
const listenToServersUpdate = require('./listenToServersUpdate');
const instantiateServer = require('./instantiateServer');
const settings = require('../settings/settings');

module.exports = class Agent {
    constructor() {}

    device = {};
    servers = [];
    serverInstances = {};
    c8yClient;
    agentExternalId = settings.agentExternalId;
    agentInfo = {
        name: settings.agentName,
        type: settings.agentType,
        c8y_IsDevice: {},
        com_cumulocity_model_Agent: {},
        serversSettings: []
    }

    init = async() => {
        // Performs device integration and stores client and device managedObject
        const integration = await deviceIntegration(this.agentExternalId, this.agentInfo);
        this.c8yClient = integration.c8yClient;
        this.device = integration.device;

        // Loads all available servers (devices of type serverType - forbids the use of two or more microservices/agents in the same environment, should be improved in a upcoming version)
        this.servers = await loadServers(this.c8yClient);

        // Refreshs servers settings, deleting the ones that do not have a server device registered
        this.device = await refreshServersSettings(this.c8yClient, this.device, this.servers);

        // Listens to updates on the agent managedObject
        listenToAgentUpdate(this.c8yClient, this.device, this.serverInstances, this.init, this.servers);

        // Listens to updates on the servers managedObjects
        listenToServersUpdate(this.c8yClient, this.servers, this.serverInstances);
        
        // Finally, instantiates a class Server for each registered server device
        this.servers.forEach(server => {
            const serverSettings = this.device.serversSettings.find(serverSettings => serverSettings.name === server.name);
            instantiateServer(server, serverSettings, this.serverInstances, this.c8yClient);
        })
    }
}