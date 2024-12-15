FROM node:18-alpine
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
EXPOSE 4001
CMD [ "npm", "run", "start" ]
