FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npm install pm2 -g

COPY src ./src
COPY server.js .

EXPOSE 8080

CMD ["pm2-runtime", "server.js"]
# CMD ["npm", "start"]

