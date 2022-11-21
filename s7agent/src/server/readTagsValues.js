const log = require('../util/log');

module.exports = async(s7Client, server, tagsValues) => {
    server.tags.forEach(async(tag) => {
        try {
            const value = await s7Client.readDB(tag.db, [{'type': tag.type, 'start': tag.offset}]);
            tagsValues[tag.name] = value[0].value;
        } catch (error) {
            log(`SERVER ${server.name}`, `Failed reading tag ${tag.name} from S7 server`);
        }
    })
}