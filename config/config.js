module.exports = {
    CLIENT_NAME: "INES",
    APP_NAME: 'mkfwcorev1',
    TOKEN_SECRET: process.env.TOKEN_SECRET || "mkfwcorev1_20170815",
    MAPS_API_KEY: 'AIzaSyA9u-Lw4kqLsjaKaZCfFEtxVbeXZJpW67c',
    SESSION_TTL: 7200, //sec
    PROTO_API: 'http://',
    PROTO_WEB: 'http://',
    HOST_API: 'localhost',
    HOST_WEB: 'localhost',
    PORT_API: 3000,
    PORT_WEB: 3000,
    PATH_API: '/auth/API',
    PATH_WEB: '/auth/WEB',
    URL_BASE_API: 'http://localhost:3000/auth/API',
    URL_BASE_WEB: 'http://localhost:3000/auth/WEB',
    MAXDISTANCE: 100, // PRECISION in meters
    QUERYMAXDISTANCE: 0 // PRECISION in meters

};