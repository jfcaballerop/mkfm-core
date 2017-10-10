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
* `mongo localhost:27017/mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb"`
## APP Install

* Es necesario crear un usuario de instalacion, para lo cual, se debe crear la coleccion en mongo de:
    * `db.createCollection('users')`
    * db.getCollection('users').insertOne(    {
    "login" : "admin",
    "password" : "unapasswdqueteacuerdes",
    "nombre" : "Admin",
    "apellido1" : "Admin",
    "apellido2" : "Admin",
    "admin" : true,
    "activo" : false,
    })
    * El solo se encarga de encriptar la pass y activar el usuario. Este usuario no se podrá usar más desde el método de instalacion.

## IMPORT/EXPORT Documents
* `mongoimport <path doc> -c <collection> --host localhost --port 27017 --db mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb"`
* `mongoimport /home/jfcp/Documentos/Workspace/domininesv3/public/uploads/9dcb96df8a82ebf47856a0f4ca679743.1 -c roads --host localhost --port 27017 --db mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb" --jsonArray`
* ` mongoexport --db mkfwcoredb -c roads --out roads.json --host localhost --port 27017 --db mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb"` 

## DUMP/RESTORE Database
* `mongodump --db mkfwcoredb --out /tmp/dump20171010.json --host localhost --port 27017 --db mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb"`

* `mongorestore --drop --host localhost --port 27017 --db mkfwcoredb -u "mkfwcore" -p "admin" --authenticationDatabase "mkfwcoredb" dump20171010/mkfwcoredb`