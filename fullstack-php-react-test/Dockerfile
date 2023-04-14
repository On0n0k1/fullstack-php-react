# Use an official Node.js runtime as a parent image
FROM node:14-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in package.json
RUN npm install

# Expose the default CodeceptJS port
EXPOSE 4444

# Run the CodeceptJS test
CMD ["npm", "run", "test"]
