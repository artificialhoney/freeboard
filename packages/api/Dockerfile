FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
ARG FREEBOARD_MONGO_URL
ENV FREEBOARD_MONGO_URL=$FREEBOARD_MONGO_URL
EXPOSE 4001
CMD [ "npm", "run", "docker:dev" ]
