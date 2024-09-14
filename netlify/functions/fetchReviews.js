const fetch = require('node-fetch');

// Airtable API URL for fetching the reviews
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Reviews?sort[0][field]=Created&sort[0][direction]=desc&maxRecords=10`;

exports.handler = async () => {
  try {
    // Fetch the reviews from Airtable
    const response = await fetch(AIRTABLE_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

    const result = await response.json();

    // Extract relevant fields: Name, Picture, Comment
    const reviews = result.records.map((record) => ({
      name: record.fields.Name,
      pictureUrl: record.fields.Picture ? record.fields.Picture[0].url : null, // Use the picture if it exists
      message: record.fields.Comment,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(reviews),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.toString()}`,
    };
  }
};
