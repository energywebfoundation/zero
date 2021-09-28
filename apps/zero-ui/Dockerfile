FROM nginx:alpine

RUN apk add --no-cache bash

WORKDIR /usr/share/nginx/html

COPY . /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

RUN chmod +x /usr/share/nginx/html/bin/env.sh

CMD ["/bin/bash", "-c", "./bin/env.sh && nginx -g \"daemon off;\""]
