const instantiateC8yClient = require('../util/instantiateC8yClient');
const timeout = require('../util/timeout');
const log = require('../util/log');
const settings = require('../settings/settings');

// Loads boostrap credentials
const bootstrapCredentials = {
    tenant: 'management',
    user: settings.bootstrapUser || settings.bootstrapUserStandalone,
    password: settings.bootstrapPassword || settings.bootstrapPasswordStandalone
}
// Sets options to make client request
const options = {
    basicAuthToken: 'Basic ' + Buffer.from(bootstrapCredentials.tenant + '/' + bootstrapCredentials.user + ':' + bootstrapCredentials.password).toString('base64'),
    basicAuth: {
        user: bootstrapCredentials.user,
        pass: bootstrapCredentials.password
    }
};
// Instantiates bootstrap client
const c8yClient = instantiateC8yClient(bootstrapCredentials);
// Controls logs so messages are not logged repeatedly
let step = 'request';

module.exports = async(deviceExternalId) => {
    if (step === 'request') log('AGENT', 'Requesting device credentials to Cumulocity...');
    let deviceCredentials;
    // Repeatedly requests device credentials until it is returned
    do {
        try {
            const { data } = await c8yClient.deviceRegistration.bootstrap(deviceExternalId, options);
            deviceCredentials = data;
            log('AGENT', 'Received device credentials from Cumulocity');
        } catch (error) {
            // If device was still not registered, keeps repeating request
            if (error.data.message.includes('There is no newDeviceRequest')) {
                if (step === 'request') log('AGENT', `Failed requesting device credentials: the device ${deviceExternalId} needs to be registered manually on Cumulocity Device Management UI.`);
                step = 'register';
                await timeout(5000);
            // If device was registered but still not accepted, keeps repeating request
            } else if (error.data.message.includes('PENDING_ACCEPTANCE')) {
                if (step != 'accept') log('AGENT', `Failed requesting device credentials: the device ${deviceExternalId} needs to be accepted manually on Cumulocity Device Management UI.`);
                step = 'accept';
                await timeout(5000);
            // Logs if some error occurs
            } else {
                log('AGENT', `Failed requesting device credentials: ${error.data.message}`);
            }
        }
    } while (!deviceCredentials);
    return deviceCredentials;
}