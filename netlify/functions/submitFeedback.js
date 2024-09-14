

//Connect Airtable to Netlify

exports.handler = async function (event, context) {
  const apiKey = process.env.API_KEY;
  const baseId = process.env.BASE_ID;

  // You can now use apiKey and baseId in your function
  // ...


  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Function executed successfully' }),
  };
};


const fetch = require('node-fetch');

// Airtable API details
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Reviews`; // Use the table name "Reviews"

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    // Parse the form data from the POST request
    const { name, pictureUrl, message } = JSON.parse(event.body);

    // Structure the data to be sent to Airtable
    const data = {
      fields: {
        Name: name,
        Picture: pictureUrl ? [{ url: pictureUrl }] : [], // Optional picture field
        Comment: message,
      },
    };

    // Send the data to Airtable
    const response = await fetch(AIRTABLE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.toString()}`,
    };
  }
};

//JavaScript for Fetching Reviews and Updating the Slideshow
<script>
    document.addEventListener('DOMContentLoaded', async function () {
        const response = await fetch('/.netlify/functions/fetchReviews');
        const reviews = await response.json();

        const reviewContainer = document.getElementById('review-slides');
        reviewContainer.innerHTML = reviews.map(review => `
            <div class="slide">
                <h3>${review.name}</h3>
                <p>${review.message}</p>
                ${review.pictureUrl ? `<img src="${review.pictureUrl}" alt="User Picture">` : ''}
            </div>
        `).join('');
    });
</script>
