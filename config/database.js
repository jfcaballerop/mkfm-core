const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_DB = process.env.MONGO_DB || "mkfwcoredb";
const AUTH_DB = process.env.AUTH_DB || "mkfwcoredb";
const MONGO_USER = process.env.MONGO_USER || 'mkfwcore'
const MONGO_PWD = process.env.MONGO_PWD || 'admin'

module.exports = {
    url: `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=${AUTH_DB}` // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};