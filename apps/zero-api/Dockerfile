FROM node:lts-alpine
ENV FILES_STORAGE=/uploaded-files
VOLUME ["/tmp", "/uploaded-files", "/root"]
WORKDIR /app
RUN yarn global add prisma
COPY ./package.json .
RUN yarn install
COPY . .
RUN prisma generate
RUN rm -rf /tmp/*

CMD node ./main.js
