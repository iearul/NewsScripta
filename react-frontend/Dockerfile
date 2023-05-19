# Use the official Node.js image as the base image
FROM node:18.14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the project files to the container
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "dev"]
