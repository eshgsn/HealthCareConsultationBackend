const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { connectDB, sequelize } = require('./db'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 
app.use('/api', routes);

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
