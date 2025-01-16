const { io } = require('socket.io-client');

let socket;

const initializeSocket = () => {
  if(!socket)
  {

    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      socket = io("http://localhost:5000", {
        auth: {
          token: authToken
        }
      });
      // console.log("all okk")
      
    } else {
      console.error('Authentication token not found in localStorage');
    }
  }
  return socket
};

module.exports = {
  initializeSocket,

};
