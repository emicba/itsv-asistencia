FROM node:12.18-alpine as build
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent --production
COPY . ./
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

FROM nginx:1.19.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
