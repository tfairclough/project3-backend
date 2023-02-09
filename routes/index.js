// Require necessary NPM Packages
const express = require('express')

// Instantiate a Router (mini app that only handles routes)
const router = express.Router()

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /
 * Description:   Get the Root Route
 */

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Social Media' })
});



// Export the router so we can use it in the `server.js` file
module.exports = router;