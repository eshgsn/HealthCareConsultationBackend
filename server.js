// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const { connectDB, sequelize } = require('./config/dbconfig'); 
// const patientRoutes = require('./routes/patientroutes'); 
// const doctorRoutes = require('./routes/doctorroutes'); 
// const consultationRoutes = require('./routes/consultationroutes');
// const timeslotroutes = require('./routes/timeslotroutes');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));


// app.use('/patients', patientRoutes);
// app.use('/doctors', doctorRoutes);
// app.use('/consultations', consultationRoutes);
// app.use('/api/time-slots', timeslotroutes);



// const startServer = async () => {
//   try {
//     await connectDB(); 
//     await sequelize.sync(); 
//     console.log('Tables created...');
    
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Unable to start server:', error);
//   }
// };

// startServer();


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http'); // Required to bind with Socket.IO
const { Server } = require('socket.io'); // Import Socket.IO
const configureSocket = require('./socket/chatSocket'); // Import Socket configuration

const { connectDB, sequelize } = require('./config/dbconfig'); 
const patientRoutes = require('./routes/patientroutes'); 
const doctorRoutes = require('./routes/doctorroutes'); 
const consultationRoutes = require('./routes/consultationroutes');
const timeslotroutes = require('./routes/timeslotroutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/consultations', consultationRoutes);
app.use('/api/time-slots', timeslotroutes);

// Create HTTP server and bind Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Update with your frontend URL if needed
    methods: ["GET", "POST"],
  },
});

// Pass io to Socket.IO configuration
configureSocket(io);

// Start the server
const startServer = async () => {
  try {
    await connectDB(); 
    await sequelize.sync(); 
    console.log('Tables created...');
    
    httpServer.listen(PORT, () => { // Use httpServer instead of app
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();
