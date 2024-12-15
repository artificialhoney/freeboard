FROM node:18-alpine AS build-stage
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN npm run build
FROM nginx:latest AS production-stage
COPY --from=build-stage /usr/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
