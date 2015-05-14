FROM node:0.12.2

MAINTAINER Juan Kristoffer <cattails27@gmail.com>
LABEL version="0.0.4"
LABEL description="Base image for my NodeJS apps"

WORKDIR /src
EXPOSE 3000

COPY src /src
ENV npmbin=/usr/local/lib/node_modules/

RUN npm install
CMD npm start
