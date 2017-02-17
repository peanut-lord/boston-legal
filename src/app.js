const config = require('./config.js')();
const app = require('express')();
const actUtil = require('./util/act.js')(config);
const cacheUtil = require('./util/cache')(config);
const cacheMiddleware = require('./middleware/cache')(cacheUtil);

const routes = ['/:type/:paragraph', '/:type/:paragraph/:section'];
app.get(routes, cacheMiddleware, async (req, res) => {
  const sections = await actUtil.fetchAndParseActHTML(req.params.type, req.params.paragraph);
  cacheUtil.storeAct(req.params.type, req.params.paragraph, sections);

  // Check if we searched for a section
  let answer;
  if (req.params.section !== undefined) {
    // eslint-disable-next-line eqeqeq
    answer = sections.find(item => actUtil.parseSectionNumberFromSectionText(item) == req.params.section);
    if (!answer) {
      console.log(`Found nothing with URL ${req.url}`);
      return res.send('Unknown section');
    }
  } else {
    answer = sections.join('\n');
  }

  res.send(answer);
});

const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
