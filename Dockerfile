# Dockerfile for COMP-3100 Course Project Node.JS App

# Created:     January 4, 2018 at 23:54
# Modified:    January 4, 2018 at 23:54
# Modified by: Jacob House

# Build the image from the Alpine flavour of Node 11
FROM node:11-alpine

# Set the working directory for the application
WORKDIR /usr/src/app

# Copy and install app dependencies
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
COPY package*.json ./
RUN npm install






# Expose the ports for our site
# This is COMP-3100 so let's use 31080 and 31443 for HTTP and HTTPS, respectively
EXPOSE 31080/tcp
EXPOSE 31443/tcp

# Specify the image's entrypoint
CMD [ "npm", "start" ]
