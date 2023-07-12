FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .