docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node

// point to host machine
host.docker.internal - points to host machine IP address

// pulls from dockerhub mongo and runs it
docker run mongo --name mongodb mongo
docker inspect mongodb // to get ip address of this container

// network create before running containers in same network
docker network create favorites-net

// run both on same network, giving mongodb name to reference in node app
docker run -d --name mongodb --network favorites-net mongo
docker run --name favorites --network favorites-net -d --rm -p 3000:3000 favorites-node

// note that mongo container does not need to expose its port, as container to container communication does not require that. only when host/outside of container wants to reach container then need to expose ports.
