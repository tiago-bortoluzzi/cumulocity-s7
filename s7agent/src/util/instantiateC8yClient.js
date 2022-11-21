const { Client, BasicAuth } = require('@c8y/client');
const settings = require('../settings/settings');

const url = settings.platformUrl || settings.platformUrlStandalone;

module.exports = (credentials) => {
    return new Client(new BasicAuth({ tenant: credentials.tenantId, user: credentials.username, password: credentials.password }), url);
}