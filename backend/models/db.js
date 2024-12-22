const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
    console.error('MONGO_URI environment variable is not set.');
    process.exit(1);
}

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.error('Connection failed!', err);
    });