/**
 * Module dependencies.
 */

const express = require('express');

const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
  axios({
    method: 'get',
    url: `https://cdn.contentstack.io/v3/content_types/${process.env.HOMEPAGE_CONTENT_TYPE}/entries/${process.env.HOMEPAGE_ENTRY_UID}?environment=${process.env.PUBLISH_ENVIRONMENT}`,
    headers: { api_key: process.env.APIKEY, access_token: process.env.ACCESSTOKEN, 'Content-type': 'application/json' },

  })
    .then((data) => {
      res.render('pages/home.html', { home: data.data });
    }).catch((err) => {
      console.log(err);
    });
});

module.exports = router;
