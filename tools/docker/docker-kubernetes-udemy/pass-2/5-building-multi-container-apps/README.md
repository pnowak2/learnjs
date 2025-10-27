# Without network

## mongodb
docker run --name mongodb -d --rm -p 27017:27017  mongo

rename localhost to docker.host.internal in backend

## node server
docker build -t goals-node .
docker run --name goals-backend --rm -d -p 80:80 goals-node

## react frontend
docker build -t goals-react .
docker run --name goals-frontend -d --rm -it -p 3000:3000 goals-react

# With network

Add networking so it does not all depend on localhost machine only
docker network ls
docker network create goals

## mongodb
docker run --name mongodb -d --rm --network goals  mongo

## node server
docker build -t goals-node .
docker run --name goals-backend --rm -d --network goals goals-node

docker logs goals-backend to see if connected to mongo correctly

## react frontend
docker build -t goals-react .
docker run --name goals-frontend -d --rm -it --network goals -p 3000:3000 goals-react

no need to publish port as they're all in same network
but later in the course it appeared that browser in react app needs
to have node port 80 to be exposed as it cannot use docker netowork
names directly there.

docker run --name goals-frontend -d --rm -it -p 3000:3000 goals-react

and run now backend with 80 port exposed
docker run --name goals-backend --rm -d -p 80:80 --network goals goals-node

## volumes for storing data

### mongo
docker run --name mongodb -v data:/data/db -d --rm --network goals  mongo

data will survive mongo container restarts

for security user and password env variables to be used
MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, so its not
part of the code, but set as environment variable, visible only to admin.

docker run --name mongodb -v data:/data/db -d --rm --network goals -e MONGO_INITDB_ROOT_USERNAME=pnowak -e MONGO_INITDB_ROOT_PASSWORD=secret mongo


## run backend with live source code updates

docker build -t goals-node .

docker run --name goals-backend -v $(pwd):/app -v logs:/app/logs -v /app/node_modules -d --rm -p 80:80 --network goals goals-node