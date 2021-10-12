const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis=require('redis');
const { getAsync } = require('../redis/index');


let visits = 0
let added_todos=0;

const getValue=async ()=>{
  const value=await getAsync('added_todos')
  console.log('value',value);
  added_todos=value;
  return value;
};


/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/*GET statistics endpoint */
router.get('/statistics', async (req, res) => {
  getValue(); 
  res.send({
    added_todos
  });
});

module.exports = router;
