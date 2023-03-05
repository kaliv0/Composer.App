FROM node:18
WORKDIR /usr/app
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]
