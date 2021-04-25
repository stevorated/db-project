FROM node:14
WORKDIR /usr/app
COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080

CMD [ "yarn", "dev" ]
