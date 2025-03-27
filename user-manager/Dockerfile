# Step 1: Use official Node.js image for building
FROM node:18 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the project
COPY . .

# Step 5: Build the React app
RUN npm run build

# Step 6: Use Nginx for serving the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
