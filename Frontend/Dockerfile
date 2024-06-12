# FROM node:latest as build

# # Set the working directory
# WORKDIR /app

# # Add the source code to app
# COPY ./ /app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build

# #RUN ls -la /app/build

# # Stage 2: Serve app with nginx server

# # Use official nginx image as the base image
# FROM nginx:latest

# # Copy the build output to replace the default nginx contents.
# COPY --from=build /app/component/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80



# FROM node:latest as build

# # Set the working directory
# WORKDIR /app

# # Add the source code to app
# COPY ./ /app/

# # Install all the dependencies
# RUN npm install

# # Generate the build of the application
# RUN npm run build

# # Stage 2: Serve app with Node.js server

# # Expose port 3000 (or any other port you want to use)

# # Command to run the Node.js server
# CMD ["npm", "start"]


# Fetching the latest node image on alpine linux
FROM node:latest as build

# Declaring env

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package*.json /react-app

RUN npm install

# Copying all the files in our project
COPY . .

RUN npm run build

# Starting our application
CMD ["npm","start"]