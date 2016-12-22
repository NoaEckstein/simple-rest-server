
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var events = require('./EventsRecommended.js');


const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());

app.listen(3003, () => {
  console.log('REST API listening on port 3003!');
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let items = [
  { id: 1, name: 'Carmos', price: 98982, isSelected: false },
  { id: 2, name: 'Carting', price: 1232, isSelected: false },
  { id: 3, name: 'Carmupo', price: 4232, isSelected: false },
  { id: 4, name: 'Carmuk', price: 387, isSelected: false }
];

// *** REST API ***

// LIST
app.get('/item', (req, res) => {
  //   setTimeout(()=>res.json(items), 2000);
  res.json(items);
})


// READ
app.get('/item/:id', (req, res) => {
  const id = +req.params.id;
  const item = items.find(currItem => currItem.id === id);
  res.json(item)
})

// DELETE
app.delete('/item/:id', (req, res) => {
  const id = +req.params.id;
  items = items.filter(currItem => currItem.id !== id);
  res.json({ msg: 'Deleted' });
})

// CREATE
app.post('/item', (req, res) => {
  const item = req.body;
  item.id = findNextId();
  items.push(item);
  res.json({ msg: 'Item was added!' });
})

// TODO: UPDATE
app.put('/item', (req, res) => {
  const item = req.body;
  items = items.map(currItem => (currItem.id === item.id) ? item : currItem);
  res.json({ msg: 'Item was updates!' });
})


function findNextId() {
  var maxId = 0;
  items.forEach(item => {
    if (item.id > maxId) maxId = item.id;
  });
  return maxId + 1;
}



