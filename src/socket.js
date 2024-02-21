const io = require('socket.io-client')
const authToken = localStorage.getItem('auth-token');

// const socket = io("http://localhost:5000", {
//     auth: {
//       token: authToken
//     }
//   });
  const socket = io("https://media-book-backend.vercel.app", {
    auth: {
      token: authToken
    }
  });


  module.exports = socket