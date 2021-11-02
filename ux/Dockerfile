FROM node:12.2.0-alpine
# Create app directory
WORKDIR /ux
# Install app dependencies
COPY package*.json ./

RUN npm install --silent
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3001
CMD ["npm", "start"]
