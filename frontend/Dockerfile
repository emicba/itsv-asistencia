FROM node:12.18-alpine as build
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
RUN npm install react-scripts -g --silent
COPY . ./
RUN npm run build

FROM nginx:1.19.0-alpine
COPY --from=build /app/build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]