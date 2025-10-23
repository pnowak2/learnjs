mongodb
docker run --name mongodb -d --rm -p 27017:27017  mongo

rename localhost to docker.host.internal in backend

node server
docker build -t goals-node .
docker run --name goals-backend --rm -d -p 80:80 goals-node

react frontend
docker build -t goals-react .
docker run --name goals-frontend -d --rm -p 3000:3000 goals-react