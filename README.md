# Mr. Knight Framework Core v1.0

***

## Prerrequisitos

* `npm install express --save`

* `sudo npm install express-generator -g`

* `express --ejs --view=ejs`

* `sudo npm install -g bower`

* `sudo npm install -g  gulp`

* `npm install`

ejecutar usando:

* `DEBUG=mkfw-corev1:* npm start`

ejecutar en dev:

* `npm install --save-dev nodemon`

* Modificar package.json:
    "scripts": {
        "start": "node ./bin/www",
        "devstart": "nodemon ./bin/www"
    }
* `DEBUG=mkfw-corev1:* & npm run devstart`

## Database Mongodb

* `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927`

* `echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list`

* `sudo apt-get update`

* `sudo apt-get install -y mongodb-org`

* `sudo vi /etc/systemd/system/mongodb.service`

* `sudo systemctl start mongodb`

* `sudo systemctl status mongodb`

* `sudo systemctl enable mongodb`

* `mongo --port 27017`

    * use mkfwcoredb
    * db.createUser(
        {
            user: "mkfwcore",
            pwd: "admin",
            roles: [ { role: "readWrite", db: "mkfwcoredb" },
                    { role: "dbOwner", db: "mkfwcoredb" } ]
        }
        )
* `mongo  --port 27017 -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb"`



