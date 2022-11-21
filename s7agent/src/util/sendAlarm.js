const moment = require('moment');
const log = require('./log');

module.exports = async(c8yClient, deviceId, severity, type, text) => {
    const alarm = {
        source: { id: deviceId },
        severity: severity,
        type: type,
        text: text,
        time: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
		status: 'ACTIVE'
    };
    try {
        await c8yClient.alarm.create(alarm);
    } catch (error) {
        log('ALARM', `Failed sending alarm for device ${deviceId}: ${text}`);
    }
}