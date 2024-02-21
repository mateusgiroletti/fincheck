FROM node:18-alpine

WORKDIR /usr/fincheck-backend

COPY package*.json ./

RUN npm ci

COPY . .