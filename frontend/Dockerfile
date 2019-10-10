FROM node:12.11.1-buster-slim
MAINTAINER juca
WORKDIR /app
COPY package*.json ./
RUN npm install --silent --progress=false
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "serve" ]