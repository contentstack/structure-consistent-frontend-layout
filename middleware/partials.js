/**
 * Module dependencies.
 */

const async = require('async');
const axios = require('axios');

module.exports = function (req, res, next) {
  async.parallel([
    function (callback) {
      axios({
        method: 'get',
        url: `https://cdn.contentstack.io/v3/content_types/${process.env.HEADER_CONTENT_TYPE}/entries/${process.env.HEADER_ENTRY_UID}?environment=${process.env.PUBLISH_ENVIRONMENT}`,
        headers: { api_key: process.env.APIKEY, access_token: process.env.ACCESSTOKEN, 'Content-Type': 'application/json' },

      })
        .then((data) => {
          callback(null, data.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    function (callback) {
      axios({
        method: 'get',
        url: `https://cdn.contentstack.io/v3/content_types/${process.env.FOOTER_CONTENT_TYPE}/entries/${process.env.FOOTER_ENTRY_UID}?environment=${process.env.PUBLISH_ENVIRONMENT}`,
        headers: { api_key: process.env.APIKEY, access_token: process.env.ACCESSTOKEN, 'Content-type': 'application/json' },

      })
        .then((data) => {
          callback(null, data.data);
        }).catch((err) => {
          console.log(err);
        });
    }], (error, success) => {
    if (error) return next(error);
    res.locals.header = success[0];
    res.locals.footer = success[1];
    next();
  });
};
