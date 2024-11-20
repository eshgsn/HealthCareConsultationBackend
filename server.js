const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { connectDB, sequelize } = require('./config/dbconfig'); 
const patientRoutes = require('./routes/patientroutes'); 
const doctorRoutes = require('./routes/doctorroutes'); 
const consultationRoutes = require('./routes/consultationroutes');
const timeslotroutes = require('./routes/timeslotroutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/consultations', consultationRoutes);
app.use('/api/time-slots', timeslotroutes);



const startServer = async () => {
  try {
    await connectDB(); 
    await sequelize.sync(); 
    console.log('Tables created...');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();
