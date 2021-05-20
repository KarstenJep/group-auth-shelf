const { runSaga } = require('@redux-saga/core');
const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  pool
  .query(`SELECT * FROM "item" WHERE user_id=$1;`, [req.user.id])
  .then((results) => {
    res.send(results.rows);
  }).catch(err => {
    res.sendStatus(500);
    console.log('Error in GET /shelf', err);
    
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const user = req.user.id;
  console.log(user);
  console.log(req.body);
  const queryText = `INSERT INTO "item" (description, image_url, user_id)
  VALUES ($1, $2, $3)`
  pool
    .query(queryText, [req.body.description, req.body.image_url, user])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('Post Failed:', err);
      res.sendStatus(500);
    })
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
