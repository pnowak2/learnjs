docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node

host.docker.internal - points to host machine IP address

docker run mongo --name mongodb mongo
docker inspect mongodb // to get ip address of this container

// network
docker network create favorites-net

// run both on same network, giving mongodb name to reference in node app
docker run -d --name mongodb --network favorites-net mongo
docker run --name favorites --network favorites-net -d --rm -p 3000:3000 favorites-node