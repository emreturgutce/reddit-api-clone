FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

RUN npm install -g ts-node ts-node-dev nodemon

COPY . .

CMD ["npm", "run", "dev"]