docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node