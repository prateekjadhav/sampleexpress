var config = {
  // jwtTokenExpires: 2,
  // expressSessionSecure: true,
  // expressSessionHttpOnly: false,
  // db: {
  //   url: 'mongodb://twa:twa#@ds125479.mlab.com:25479/twa'
  // },
  // nexmo: {
  //   apiKey: '8a7e8063',
  //   apiSecret: 'bda5f5e1f458cd7d'
  // },
  // marital_status: ['single', 'married', 'divorcee', 'widowed'],
  apiPrefix: '/api/v1',
  mobApiPrefix: '/api/v1.0',
  // users: {
  //   admin: { password: 'password' }
  // },
  // bcryptSalt: 10,
  // jwtSecret: '09sdufa0sfusafkljsa098',
  host: 'localhost',
  port: 3005,
  enableAuth: true,
  enableCheckPermissions: true
}
// if (process.env.NODE_ENV != undefined && process.env.NODE_ENV == 'dev') {
//   config.expressSessionSecure = false;
//   config.expressSessionHttpOnly = true;
// }
module.exports = config; 
