FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn install --production=true

RUN yarn global add ts-node 

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
