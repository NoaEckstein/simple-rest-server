
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
var events = require('./EventsRecommended.js').events;


const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());

// app.listen(3003, () => {
//   console.log('REST API listening on port 3003!');
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Added by Avital emails array & emails REST
 let  emails = [
              { id: 1, subject: 'Vue What are Components?', body: 'Components are one of the most powerful features of Vue. They help you extend basic HTML elements to encapsulate reusable code.', 
              isRead: false},
              {id: 2, subject: 'Vue Using Components?', body: 'We’ve learned in the previous sections that we can create a new Vue instance with', 
              isRead: false}, 
              {id: 3, subject: 'Vue Composing Components', body: 'Components are meant to be used together, most commonly in parent-child relationships: component A may use component B in its own template', 
              isRead: false},
              {id: 4, subject: 'Vue Passing Data with Props', body: 'Every component instance has its own isolated scope. This means you cannot (and should not) directly reference parent data in a child component’s template. Data can be passed down to child components using props.', 
              isRead: false}
              ];

// *** REST API  for Emails***


// LIST
app.get('/email', (req, res) => {
//   setTimeout(()=>res.json(items), 2000);
  console.log('what is wrong with you????');
      res.json(emails);
})


// READ
app.get('/email/:id', (req, res) => {
  const id = +req.params.id;
  const email = emails.find(currEmail => currEmail.id === id);
  res.json(email);
})

// DELETE
app.delete('/email/:id', (req, res) => {
  const id = +req.params.id;
  emails = emails.filter(currEmail => currEmail.id !== id);
  res.json({msg: 'Deleted'});
})

// CREATE
app.post('/email', (req, res) => {
  const email =  req.body; 
  email.id = findNextId();
  emails.push(email);
  res.json({msg: 'Email was added!'});
})

// TODO: UPDATE
app.put('/email', (req, res) => {
  const email =  req.body; 
  emails = emails.map(currEmail => (currEmail.id === email.id)? email: currEmail);
  res.json({msg: 'Email was updates!'});
})

app.listen(3003, () => {
  console.log('REST API listening on port 3003!');
})

function findNextId() {
    var maxId = 0;
    emails.forEach(email => {
        if (email.id > maxId) maxId = email.id;
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

