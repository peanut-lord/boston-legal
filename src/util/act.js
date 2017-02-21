const jsdom = require('jsdom').jsdom;
const htmlCleaner = require('sanitize-html');

module.exports = (config) => {
  const fetchAndParseActHTML = async (type, paragraph) => {
    const executor = (resolve, reject) => {
      jsdom.env(
          `${config.sourceUrl}/${type.toLowerCase()}/__${paragraph}.html`,
          [],
          (error, window) => {
            if (error) return reject(error);

            const items = [];
            for (const section of window.document.getElementsByClassName('jurAbsatz')) {
              const cleaned = htmlCleaner(section.innerHTML, {
                allowedTags: [],
                allowedAttributes: []
              });
              
              items.push(cleaned);
            }

            resolve(items);
          }
      );
    };

    return await new Promise(executor);
  };

  const parseSectionNumberFromSectionText = (sectionText) => {
    if (sectionText[0] !== '(') {
      return false;
    }

    const closingBracketPosition = sectionText.indexOf(')');
    return sectionText.slice(1, closingBracketPosition);
  };

  return {
    fetchAndParseActHTML,
    parseSectionNumberFromSectionText
  };
};
