FROM node:18.12.1-alpine3.16
RUN npm install -g typescript
WORKDIR /app
COPY . /app
RUN npm install
RUN npm build
CMD [ "sh", "-c", "npm start"]