 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const formsRoute = require('./routes/forms');
const responsesRoute = require('./routes/responses');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors());
app.use(express.json());

 
app.use('/api/forms', formsRoute);
app.use('/api/responses', responsesRoute);

 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
