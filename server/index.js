const express = require('express');
const multer = require('multer');
const http = require('http');
const upload = multer({ dest: 'files/' });
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
mongoose.set('strictQuery', false)
const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
app.use(express.static('files/'));
app.get("/", (req, res) => res.send('Project Back end Server'));

// import route from routers
const authRouter = require('./routers/auth.route');
const uploadRouter = require('./routers/uploadFile.route');
const getFileRouter = require('./routers/getFiles.route');


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@documentproject.nv08dal.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

        console.log('MongDB connected')
    }
    catch (err) {
        console.log(err.message)
        process.exit(1)
    }
};
connectDB();

app.use('/api/auth', authRouter);
app.use('/api/file', uploadRouter);
app.use('/api/file/show', getFileRouter);






const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));