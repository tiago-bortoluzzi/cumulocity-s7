const { S7Client } = require('s7client');
const connectToS7Server = require('./connectToS7Server');
const startSendingMeasurements = require('./startSendingMeasurements');

module.exports = class Server {
    constructor(server, serverSettings, c8yClient) {
        this.server = server;
        this.serverSettings = serverSettings;
        this.c8yClient = c8yClient;
        this.plcSettings = {
            name: this.serverSettings.name,
            host: this.serverSettings.ip,
            port: 102,
            rack: 0,
            slot: 1
          };
        this.s7Client = new S7Client();
        this.tagsValues = {};
        this.measurementInterval;
    }

    init = async() => {
        const connected = await connectToS7Server(this.s7Client, this.c8yClient, this.server);
        if (connected && this.server.tags.length > 0) {
            this.measurementInterval = startSendingMeasurements(this.s7Client, this.c8yClient, this.server, this.serverSettings, this.tagsValues);
        }
    }
}