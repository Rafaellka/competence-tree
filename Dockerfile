FROM node:16.14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install -g http-server
CMD ["http-server", "/app/dist/competence-tree"]