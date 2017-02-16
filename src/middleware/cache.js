module.exports = (cacheUtil) => {
  return async (req, res, next) => {
    const cachedAct = await cacheUtil.retrieveAct(req.params.type, req.params.paragraph, req.params.section);
    if (cachedAct) {
      console.log('Serving act from redis cache');
      return res.send(cachedAct);
    }

    console.log('Can’t serve from redis cache, continue beyond this middleware');
    next();
  };
};
