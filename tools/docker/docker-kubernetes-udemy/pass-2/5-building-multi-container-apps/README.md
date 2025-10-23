# Without network
mongodb
docker run --name mongodb -d --rm -p 27017:27017  mongo

rename localhost to docker.host.internal in backend

node server
docker build -t goals-node .
docker run --name goals-backend --rm -d -p 80:80 goals-node

react frontend
docker build -t goals-react .
docker run --name goals-frontend -d --rm -it -p 3000:3000 goals-react

# With network

Add networking so it does not all depend on localhost machine only
docker network ls
docker network create goals

mongodb
docker run --name mongodb -d --rm --network goals  mongo

node server
docker build -t goals-node .
docker run --name goals-backend --rm -d --network goals goals-node

docker logs goals-backend to see if connected to mongo correctly

react frontend
docker build -t goals-react .
docker run --name goals-frontend -d --rm -it --network goals -p 3000:3000 goals-react

no need to publish port as they're all in same network