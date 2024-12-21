FROM node:18-alpine
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
EXPOSE 9001
CMD [ "npm", "run", "start" ]
