const log = require('../util/log');
const readTagsValues = require('./readTagsValues');
const sendMeasurement = require('./sendMeasurement');

module.exports = (s7Client, c8yClient, server, serverSettings, tagsValues) => {
    log(`SERVER ${server.name}`, 'Started sending measurements');
    return setInterval(async() => {
        if (server.tags.length > 0) {
            await readTagsValues(s7Client, server, tagsValues);
            await sendMeasurement(c8yClient, server, tagsValues);
        }
    }, Number(serverSettings.dataReadPeriod) * 1000)
}