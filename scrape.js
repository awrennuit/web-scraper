const request = require(`request`);
const cheerio = require(`cheerio`);

const urls = [`https://twitter.com/thetweetofgod`, `https://twitter.com/sosadtoday`, `https://twitter.com/TEDTalks`, `https://twitter.com/atlasobscura`];

for(let q=0; q<urls.length; q++){
  request(urls[q], (error, response, body) => {
    if(!error && response.statusCode === 200){
      const $ = cheerio.load(body);

      $(`.content`).each((i, el) => {
        const username = $(el).find(`.username`);
        const time = $(el).find(`.time` || `.timestamp`);
        const tweet = $(el).find(`.tweet-text`);
        console.log(urls[q]);
        console.log(username.text().replace(/\s\s+/g, ''));
        console.log(time.text().replace(/\s\s+/g, ''));
        console.log(tweet.text().replace(/\s\s+/g, ''));
        console.log(`------------------------------------------------------------------------------------------------------------------`);
      });
      console.log('Scraping complete...');
    }
  });
}