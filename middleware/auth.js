// // middleware/auth
// const jwt = require('jsonwebtoken');
// const your_jwt_secret = 'esha'; 

// const verify = (req, res, next) => {
//   // console.log('Req', req.headers);
//   const token = req.headers['authorization'];

//   if (!token) return res.status(403).send({ message: 'No token provided.' });

//   const bearerToken = token.split(' ')[1];
//   // console.log('Token', bearerToken);
  
//   jwt.verify(bearerToken, your_jwt_secret, (err, decoded) => {
//     if (err) return res.status(500).send({ message: `${err}` });

//     req.userId = decoded.id;
//     req.role = decoded.role;
//     next();
//   });
// };

// module.exports = verify;


const jwt = require('jsonwebtoken');
const your_jwt_secret = 'esha';

const verify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided.' });

    const bearerToken = token.split(' ')[1];
    jwt.verify(bearerToken, your_jwt_secret, (err, decoded) => {
        if (err) return res.status(500).send({ message: `${err}` });

        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    });
};

module.exports = verify;
