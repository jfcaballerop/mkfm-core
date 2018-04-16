# Dockerfile for the Node.js app
# It simply inherits a Node.js 8 image and installs the application inside it
# See the docker-compose.yml to see how the Mongodb is linked


FROM node:8
# create an 'app' user to avoid using root in the container
RUN useradd --user-group --create-home --shell /bin/false app
# tune down npm noise
ENV NPM_CONFIG_LOGLEVEL warn
# where in the container the application will be installed
ENV APP_DIR=/app
# Copy package.json and lockfile into container
COPY package.json $APP_DIR/
COPY package-lock.json $APP_DIR/
RUN chown -R app:app $APP_DIR/
USER app
WORKDIR $APP_DIR
RUN npm install
USER root
COPY . $APP_DIR/
RUN chown -R app:app $APP_DIR/*
USER app

EXPOSE 3000

CMD ["npm", "run", "devstart"]