# Cumulocity - Siemens S7 Integration

## Description

Plugin created to facilitate the integration between Siemens S7 devices and Cumulocity IoT. The plugin is composed of the agent, a microservice to interface the S7 device and the Cumulocity platform, and a customized Device Management app, which provides context components to configure the agent and the S7 server devices.

## Stack

- Node.js v16.13.2 (npm v8.1.2)
- [@c8y/client](https://www.npmjs.com/package/@c8y/client) v1014.0.196
- Angular v12.2.14

## Other libs

- [s7client](https://github.com/psi-4ward/s7client)
- express
- fs
- moment

## Settings

### Agent

If the microservice is to be hosted in Cumulocity, the application will use the settings in `./src/settings/settings.js` defined as `process.env.*`. If the microservice is to be hosted outside of Cumulocity, it will use the settings defined as `*Standalone`. `./src/settings/settings.js` should be edited accordingly.

### Device Management

In `./package.json`, the item `scripts.start` should be edited to send requests to the project URL.

## Deploy

### Agent

After setting up the application, the agent should be dockerized:
```
docker build -t s7agent .
```
If the agent is to be hosted in Cumulocity, save the app image:
```
docker save s7agent > "image.tar"
```
Then, the generated file `image.tar` must be zipped along with `cumulocity.json`. You can name the zip file `s7agent.zip`. Finally, the zip file must be uploaded to the Administration app.

### Device Management

After setting up the application, it must be built and deployed:
```
npm run build
npm run deploy
```
Follow the console prompt to deploy the application to your tenant.

## Use

After the agent microservice started running, the agent device must be registered in the Device Management app with the same ID as defined for `agentExternalId` in `settings.js`. After the registration, the device will be recognized and must be accepted. Then, the agent device will be available. Accessing the agent device context screen in Device Management, it is possible to register new servers under `S7 Agent` with name, IP address and data read period in seconds.

![This is an image](imageUrl)

After registering a new server and accessing its device context screen, it is possible to register the server tags under `S7 Server` with tag name, type, database, offset and unit. The tags registered here will immediatelly start to be read from the S7 server.

![This is an image](imageUrl)