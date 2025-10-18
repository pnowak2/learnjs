docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node

host.docker.internal - points to host machine IP address

docker run mongo --name mongodb mongo
docker inspect mongodb // to get ip address of this container