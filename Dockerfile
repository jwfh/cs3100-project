# Dockerfile for COMP-3100 Course Project Node.JS App

# Created:     January 4, 2018 at 23:54
# Modified:    January 4, 2018 at 23:54
# Modified by: Jacob House

# Build the image from the Alpine flavour of Node 10
FROM node:10-alpine

# Install make
RUN apk update && apk add make

# Set the working directory for the application
WORKDIR /usr/src/app
#RUN chown -R node . && find . -type f | xargs chmod 644 && find . -type d | xargs chmod 755 

# Copy and install app dependencies
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
COPY package*.json ./
COPY . .
RUN make install && make -C frontend 

# Expose the ports for our site
# This is COMP-3100 so let's use port 3100
EXPOSE 3100/tcp

# Specify the image's entrypoint
CMD [ "npm", "start" ]
