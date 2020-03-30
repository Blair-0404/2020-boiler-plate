const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://<rachel458458>:<ajdajd22>@yotubeclone-project-uumxz.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MonggoDB Connected...'))
  .catch(err => console.log('MonggoDB is not Connected...'));


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));