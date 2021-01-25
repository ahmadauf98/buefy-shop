const admin = require('firebase-admin')
const functions = require('firebase-functions')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const remoteTrackingmoreScrappers = require('./web_scrappers/trackingmore')

exports.website_scrappers = functions
  .runWith({ memory: '512MB', timeoutSeconds: '120' })
  .pubsub.schedule('*/5 * * * *')
  .onRun(async () => {
    console.log('Fetching new Remote Jobs...')
    await remoteTrackingmoreScrappers.run_trackingmore()
  })
