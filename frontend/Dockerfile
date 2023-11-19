FROM node:18-alpine

WORKDIR /usr/fincheck-app-frontend

EXPOSE 3001

COPY package*.json ./

RUN npm ci --silent

COPY . ./

CMD ["npm", "run", "dev"]
