# runs default command inside container node instance
docker run -it -d node:alpine

# runs custom / different command instead

docker run -it node:alpine <new command>
## example
docker run -it node:alpine npm init

# exec any command inside container
# -it for interactive, prevent exiting immediately and keep terminal responsive to prompts
docker exec -it  <container-name> npm init