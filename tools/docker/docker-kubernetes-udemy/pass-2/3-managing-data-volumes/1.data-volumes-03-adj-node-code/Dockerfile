FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT 80

EXPOSE $PORT 

VOLUME ["/app/feedback"]

#  can also use this but need to rebuild image
VOLUME ["/app/node_modules"]

CMD [ "npm", "start" ]