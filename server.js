
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var events = require('./EventsRecommended.js').events;


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

// *** REST API FOR EVENTS***

// LIST
app.get('/event', (req, res) => {
  //   setTimeout(()=>res.json(items), 2000);
  res.json(events);
})

// READ
app.get('/event/:id', (req, res) => {
  const id = req.params.id;
  const event = events.find(currEvent => currEvent.id === id);
  res.json(event)
})

// DELETE
app.delete('/event/:id', (req, res) => {
  const id = req.params.id;
  events = events.filter(currEvent => currEvent.id !== id);
  res.json({ msg: 'Deleted' });
})

// CREATE
app.post('/event', (req, res) => {
  const event = req.body;
  event.id = findNextIdEvent();
  events.push(event);
  res.json({ msg: 'Event was added!' });
})

// UPDATE
app.put('/event', (req, res) => {
  const event = req.body;
  events = events.map(currEvent => (currEvent.id === event.id) ? event : currEvent);
  res.json({ msg: 'Event was updated!' });
})

function findNextIdEvent() {
  var maxId = 0;
  events.forEach(event => {
    if (event.id > maxId) maxId = event.id;
  });
  return maxId + 1;
}
