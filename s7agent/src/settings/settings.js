// Application settings. If microservice not hosted in Cumulocity, it will use the 'Standalone' settings
module.exports = {
    appName: process.env.APPLICATION_NAME,
    appPort: 80,
    platformUrl: process.env.C8Y_BASEURL,
    microserviceIsolation: process.env.C8Y_MICROSERVICE_ISOLATION,
    tenant: process.env.C8Y_BOOTSTRAP_TENANT,
    bootstrapUser: process.env.C8Y_BOOTSTRAP_USER,
    bootstrapPassword: process.env.C8Y_BOOTSTRAP_PASSWORD,
    agentExternalId: 's7agent',
    agentName: 'Siemens S7 Agent',
    agentType: 'c8y_S7Agent',
    serverType: 'c8y_S7Server',
    deviceCredentialsPath: './deviceCredentials/deviceCredentials.json',
    appNameStandalone: 's7agent',
    platformUrlStandalone: 'https://mycumulocity.cumulocity.com',
    tenantStandalone: 'myTenantId',
    bootstrapUserStandalone: 'devicebootstrap',
    bootstrapPasswordStandalone: 'Fhdt1bb1f'
}