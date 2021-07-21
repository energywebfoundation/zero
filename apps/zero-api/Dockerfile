FROM node:lts-alpine
WORKDIR /app
RUN yarn global add prisma
COPY ./package.json .
RUN yarn install
COPY . .
RUN prisma generate
# use this if you need to persist data between restarts
#CMD prisma migrate deploy && node ./main.js

# use this if you need to reset the db on every restart
CMD prisma migrate reset --skip-seed --force && node ./main.js
