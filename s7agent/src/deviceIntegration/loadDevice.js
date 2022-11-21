module.exports = async(c8yclient, deviceInternalId) => {
    try {
        const { data } = await c8yclient.inventory.detail(deviceInternalId);
        return data;
    } catch (error) {
        return undefined;
    }
}