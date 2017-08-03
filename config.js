exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL || 'mongodb://admin:toby123@ds061506.mlab.com:61506/wallabyads'

exports.PORT = process.env.PORT || 8080;

'mongo ds061506.mlab.com:61506 / wallabyads - u admin - p toby123'
