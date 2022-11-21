const settings = require('../settings/settings');

module.exports = async(c8yClient) => {
    try {
        const servers = await c8yClient.inventory.list({ type: settings.serverType });
        return servers.data;
    } catch (error) {
        return undefined;
    }
}