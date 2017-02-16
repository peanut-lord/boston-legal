module.exports = () => {
  const env = process.env.NODE_ENV || 'development';

  // eslint-disable-next-line import/no-dynamic-require
  return require(`${process.cwd()}/config/${env}.json`);
};
