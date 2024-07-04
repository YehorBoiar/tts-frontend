# Use the official Node.js 16 image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

RUN npm run build
# Expose the port the app runs on
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
