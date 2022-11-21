const moment = require('moment');
const log = require('../util/log');
const settings = require('../settings/settings');

module.exports = async(c8yClient, server, tagsValues) => {
    let measurement = {
        "source": { "id": server.id },
        "time": moment().format('YYYY-MM-DDTHH:mm:ss.000Z'),
        "type": settings.serverType
    }
    measurement[settings.serverType] = {};

    server.tags.forEach(tag => {
        if (tagsValues[tag.name]) measurement[settings.serverType][tag.name] = { "value": tagsValues[tag.name], "unit": tag.unit };
    })

    try {
        await c8yClient.measurement.create(measurement);
    } catch (error) {
        log(`SERVER ${server.name}`, 'Failed sending measurement');
    }
}