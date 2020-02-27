FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update

RUN npm install

COPY . .

EXPOSE 5000 8080

CMD ["npm", "run", "start_local"]