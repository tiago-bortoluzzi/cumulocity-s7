"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const Agent = require('./src/agent/agent.class');
const log = require('./src/util/log');
const settings = require('./src/settings/settings');

// Instantiate agent
let AgentInstance = new Agent();

// Application endpoints
const routes = require("./src/api/routes");
routes(app, AgentInstance);

// Server listening
const appName = settings.appName || settings.appNameStandalone;
app.use(express.json());
app.listen(settings.appPort);
log('API', `${appName} started on port ${settings.appPort}`);

// Start agent
AgentInstance.init();