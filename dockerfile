# Base image
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source including CSS, HTML, and JSON
COPY . .

# Expose the port React app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
