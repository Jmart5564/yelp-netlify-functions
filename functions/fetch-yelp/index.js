const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {

  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.term;

  try {
    const resp = await fetch(`https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    );
    const data = await resp.json();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};

module.exports = { handler };
