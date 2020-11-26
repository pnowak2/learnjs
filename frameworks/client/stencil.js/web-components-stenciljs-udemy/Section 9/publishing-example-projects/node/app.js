const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.set('view engine', 'ejs');
app.set('views', 'views');
 
app.get('/', (req, res, next) => {
  res.render('starting-page', { message: 'Hello from Node.js' });
});

app.listen(3000);
