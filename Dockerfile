FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc

EXPOSE 8082

CMD ["node", "build/index.js"]