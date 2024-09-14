FROM node:22-alpine3.19

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD if [ "$NODE_ENV" = "development" ]; \
    then npm run start:dev; \
    else npm run start:prod; \
    fi