const config = require('config');

const origin_list = config.get('cors.origin');
export var corsOptions = {
  origin: function (origin, callback) {
    if (origin_list.indexOf(origin) !== -1) {
      console.log("allowed cors for:", origin)
      callback(null, true)
    } else {
      console.log("blocked cors for:", origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: config.get('cors.methods'),
  allowedHeaders: config.get('cors.allowedHeaders'),
}
