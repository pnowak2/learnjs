FROM node:14

ARG DEFAULT_PORT=80

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT $DEFAULT_PORT

EXPOSE $PORT 

VOLUME ["/app/feedback"]

#  can also use this but need to rebuild image
VOLUME ["/app/node_modules"]

CMD [ "npm", "start" ]