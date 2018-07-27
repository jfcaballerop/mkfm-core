module.exports = {
    apps: [
        {
            name: "dominica",
            script: "./bin/www",
            watch: true,
            env: {
                "PORT": 4000,
                "NODE_ENV": "DEV"
            },
            env_production: {
                "PORT": 3000,
                "NODE_ENV": "PRODUCTION",
            },
            env_pre: {
                "PORT": 5000,
                "NODE_ENV": "PRE",
                "MONGO_HOST": "localhost",
                "MONGO_DB": "mkfwcoredbPRE",
                "AUTH_DB": "mkfwcoredbPRE",
                "MONGO_USER": 'mkfwcorePRE',
                "MONGO_PWD": 'admin',
            }
        }
    ]
}