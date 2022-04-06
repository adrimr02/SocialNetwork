const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();

const app = express();
require('./db');

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('homepage');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

//https://youtu.be/ldGl6L4Vktk?list=PLj-4DlPRT48lXaz5YLvbLC38m25W9Kmqy&t=1717

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`));