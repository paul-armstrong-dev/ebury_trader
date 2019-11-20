FROM node:latest

WORKDIR /app
COPY src /app
COPY public /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV NODE_PATH=/node_modules
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# start app
ENTRYPOINT   ["npm", "start"]

# This is probably not the best way to do this, but I had so many problems trying to package this with docker compose
# That I decided its good enough for now, if you've got a better working solution for React install post setup please
# Tell me how to :)

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent