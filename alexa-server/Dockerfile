# FROM ubuntu:latest


# COPY config /config
# # Replace shell with bash so we can source files
# RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# RUN apt update && \
#   apt install -y curl && \ 
#   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash 

# WORKDIR /usr/share/ros-orchestrator/

# CMD bash /config/init.sh && bash
# # CMD ["npm", "start"] 


# Stage 1: Build the application
FROM node:18-alpine as builder

# Set the base directory as an environment variable
ENV BASE_DIR /usr/share/alexa-server/

# Set the working directory
WORKDIR $BASE_DIR

# Copy only package.json for npm install
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

##################################################
# Stage 2: Create a smaller production-ready image
FROM node:18-alpine

ARG USER=node

# Set the base directory as an environment variable
ENV BASE_DIR /usr/share/alexa-server/

# Set the working directory
WORKDIR $BASE_DIR

# Copy only the built artifacts from the builder stage
COPY --from=builder --chown=$USER:$USER $BASE_DIR $BASE_DIR

# Set the user as specified by the ARG
USER $USER

# Start the application
CMD ["npm", "start"]
