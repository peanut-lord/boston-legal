module.exports = (config) => {
  const actUtil = require('./act')(config);
  const redis = require('redis').createClient(config.redis);

  const createKey = (type, paragraph, section) => [type, paragraph, section].filter(item => item !== undefined).join(':');

  const storeAct = async (type, paragraph, sections) => {
    // We do a bulk insert via redis.mset
    const bulk = [createKey(type, paragraph), sections.join('\n')];

    // Store its sections
    for (const sectionText of sections) {
      const sectionNumber = actUtil.parseSectionNumberFromSectionText(sectionText);
      if (sectionNumber !== false) {
        bulk.push(createKey(type, paragraph, sectionNumber), sectionText);
      }
    }

    return await new Promise((resolve, reject) => {
      redis.mset(bulk, (error, reply) => {
        if (error) return reject(error);
        resolve(reply);
      });
    });
  };

  const retrieveAct = async (type, paragraph, section) => {
    // Section can be missing
    const key = createKey(type, paragraph, section);

    return await new Promise((resolve, reject) => {
      redis.get(key, (error, reply) => {
        if (error) return reject(error);

        return resolve(reply);
      });
    });
  };

  return {
    storeAct,
    retrieveAct
  };
};
