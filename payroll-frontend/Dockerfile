# payroll-frontend/Dockerfile
FROM node:16

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build"]
