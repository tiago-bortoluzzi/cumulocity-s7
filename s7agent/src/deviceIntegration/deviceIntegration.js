const readDeviceCredentials = require('./readDeviceCredentials');
const getDeviceCredentials = require('./getDeviceCredentials');
const writeDeviceCredentials = require('./writeDeviceCredentials');
const instantiateC8yClient = require('../util/instantiateC8yClient');
const checkDeviceRegistration = require('./checkDeviceRegistration');
const createDevice = require('./createDevice');
const linkDeviceIds = require('./linkDeviceIds');
const loadDevice = require('./loadDevice');

module.exports = async(deviceExternalId, deviceInfo) => {

    // Read device credentials stored locally if available
    let deviceCredentials = await readDeviceCredentials();

    // If credentials not available locally
    if (!deviceCredentials) {

        // Request credentials to Cumulocity
        deviceCredentials = await getDeviceCredentials(deviceExternalId);

        // Store credentials locally
        await writeDeviceCredentials(deviceCredentials);
    }

    // Instantiates the Cumulocity client
    const c8yClient = instantiateC8yClient(deviceCredentials);

    // Check device registration
    let deviceInternalId = await checkDeviceRegistration(c8yClient, deviceExternalId);

    // If device not registered
    if (!deviceInternalId) {

        // Create device
        deviceInternalId = await createDevice(c8yClient, deviceInfo);

        // Register device
        if (deviceInternalId) await linkDeviceIds(c8yClient, deviceInternalId, deviceExternalId);
    }

    // Loads device Managed Object
    let device = await loadDevice(c8yClient, deviceInternalId);

    // Returns the device Managed Object
    return { c8yClient, device };
}