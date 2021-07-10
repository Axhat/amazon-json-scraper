const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

//const apiKey = '17026213291f4d854663b9a29e63179a';




app.use(express.json());

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.get('/',async (req,res) => {
    res.send('Welcome to the Amazon Scrapper API');
});

//GET product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch(error) {
        res.json(error);
    }
});

//GET reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch(error) {
        res.json(error);
    }
});

//GET search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch(error) {
        res.json(error);
    }
});

//GET offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch(error) {
        res.json(error);
    }
});



app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));