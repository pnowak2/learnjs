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

# eui/mobile use case
docker run -it -p 4200:4200 --name mynode node:alpine sh
exit

docker start -ai mynode
mkdir apps/eui
cd apps/eui

npm install -g @eui/cli
eui-cli
yarn install

npm run start -- --host 0.0.0.0 --port 4200

host machine - localhost:4200