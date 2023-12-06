FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npx mikro-orm migration:up

COPY . .

CMD [ "npm", "start" ]