# # Stage 1
# FROM node:8 as build
# WORKDIR /app
# COPY . ./
# RUN yarn
# RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .  /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]