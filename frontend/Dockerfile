FROM node:12.1.0-alpine
MAINTAINER juca
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install --silent --progress=false
COPY . /app
EXPOSE 8080
CMD [ "npm", "run", "serve" ]