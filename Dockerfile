FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
