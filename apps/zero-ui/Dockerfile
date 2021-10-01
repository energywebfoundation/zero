FROM nginx:alpine

RUN apk add --no-cache bash

WORKDIR /usr/share/nginx/html

COPY . /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./prod-init.sh .
RUN chmod +x ./prod-init.sh

CMD ["/bin/bash", "-c", "./prod-init.sh && nginx -g \"daemon off;\""]
