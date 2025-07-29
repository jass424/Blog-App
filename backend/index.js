const express = require('express');
const connectDB = require('./src/db/index');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./routes/user.route');
const cookieParser = require('cookie-parser');

dotenv.config();
console.log('SECRET_KEY', process.env.SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/user', userRoute);
app.use('/images', express.static('upload/images'));
app.use('/images', express.static('upload/profileImage'));

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
        console.log('Cloudinary config:', process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);
      
    });
})
.catch((err)=> {
    console.error('Database connection error!!!:', err);
});
