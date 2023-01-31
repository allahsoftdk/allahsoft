FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# update and install dependency
RUN apt update && apt upgrade -y

# copy the app, note .dockerignore
COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

# Configure host
ENV HOST 0.0.0.0

CMD [ "npm", "run", "start" ]