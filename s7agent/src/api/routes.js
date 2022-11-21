"use strict";

const Agent = require('../agent/agent.class');
const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = function(app, AgentInstance) {
    // API
    app.route("/").get(function(req, res) {
        log('API', 'User requested /');
        res.json({ "message" : "S7 Agent API - endpoints: /health | /environment | /agentHealth | /agentRestart" });
    });

    // Health check
    app.route("/health").get(function(req, res) {
        log('API', 'User requested /health - status: UP');
        res.json({ "status" : "UP" });
    });

    // Environment variables
    app.route("/environment").get(function(req, res) {
        log('API', 'User requested /environment');
        res.json({
            "appName" : settings.appName,
            "platformUrl" : settings.platformUrl,
            "microserviceIsolation" : settings.microserviceIsolation,
            "tenant" : settings.tenant,
            "bootstrapUser" : settings.bootstrapUser,
            "bootstrapPassword" : settings.bootstrapPassword
        });
    });

    // Get agent health
    app.route("/agentHealth").get(function(req, res) {
        const status = AgentInstance ? "UP" : "DOWN";
        log('API', `User requested /agentHealth - status: ${status}`);
        res.json({ "status" : status });
    });

    // Restart agent
    app.route("/agentRestart").get(function(req, res) {
        log('AGENT', 'Agent restarted by user');
        AgentInstance = null;
        AgentInstance = new Agent();
        AgentInstance.init();
        res.json({ "status" : "success" });
    });
};