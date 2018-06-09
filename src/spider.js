const superagent = require('superagent');
const cheerio = require('cheerio');

// prettier-ignore
const url = 'https://etherscan.io/token/generic-tokenholders2?a=0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0&s=1000000000000000000000000000';

export default function fetchData() {
  return superagent.get(url).then((res) => {
    const $ = cheerio.load(res.text);
    const data = [];

    $('#maintable tbody tr').each((i, el) => {
      const address = $(el)
        .find('a')
        .text();
      const percentage = $(el)
        .find('td')
        .last()
        .text();

      if (address) data.push({ address, percentage: parseFloat(percentage) });
    });

    // prettier-ignore
    return data.filter(x => x);
  });
}

// module.exports = fetchData;
