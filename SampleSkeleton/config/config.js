module.exports = {
    development: {
        port: process.env.PORT || 3100,
        dbPath: 'mongodb://localhost:27017/demo-server-db'
    },
    production: {}
};