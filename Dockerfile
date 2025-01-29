
FROM node:18-alpine AS build
WORKDIR /app

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/yarn.lock /app/

RUN yarn install --production

EXPOSE 5000

CMD ["yarn", "start"]
