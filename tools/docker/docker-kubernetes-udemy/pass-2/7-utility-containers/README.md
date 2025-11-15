# runs default command inside container node instance
## interactive terminal and detached so i got container running in bg
docker run -it -d node:alpine

# runs custom / different command instead
docker run -it node:alpine <new command>
## example
docker run -it node:alpine npm init

# exec any command inside container
# -it for interactive, prevent exiting immediately and keep terminal responsive to prompts
docker exec -it <container-name> npm init



# Build own utility container
Create docker file, then

docker build -t node-util .
docker run -it -v $(pwd):/app node-util npm init

syncs package.json between container and host machine



# Utilizing entry point
In Dockerfile anything specified in run command will be appended after entrypoint
ENTRYPOINT [ "npm" ]

docker build -t mynpm .
docker run -it -v $(pwd):/app mynpm init
docker run -it -v $(pwd):/app mynpm install express --save

syncs package.json, node_modules on host machine

now init is appended after entrypoint, making npm init command run in container

container always shuts down after command is run

# Docker Compose
run single service from yaml file by service name and any command appended
docker-compose run npm init