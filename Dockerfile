# Use the official Node.js image as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "start:dev"]
