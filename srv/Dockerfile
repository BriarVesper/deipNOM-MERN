# Use a lighter version of Node as a parent image
FROM node:12.2.0-alpine

# Create app directory
WORKDIR /srv

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]