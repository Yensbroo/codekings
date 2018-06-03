module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET,
  algolia: {
    applicationId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  }
};
