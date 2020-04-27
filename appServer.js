const express = require('express');
const connectDB = require('./config/database');

const app = express();

/* Connect to Mongo Db */
connectDB();

/* Initialize Middleware */

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send("Api is running continuously"));


/* Define routes */
app.use('/api/users', require('./Routes/Api/user'));
app.use('/api/authUser', require('./Routes/Api/authUser'));
app.use('/api/profile/', require('./Routes/Api/profile'));
app.use('/api/posts', require('./Routes/Api/posts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));