# eui/mobile use case
docker run -it -p 4200:4200 --name eui-mobile node:alpine sh
exit

docker start -ai eui-mobile
mkdir apps/eui
cd apps/eui

npm install -g @eui/cli
eui-cli
yarn install

## modify package.json so it starts with host 0.0.0.0
## npm run start -- --host 0.0.0.0 --port 4200
"start-serve": "eui-scripts serve-app --configuration=proxy-mock --host 0.0.0.0",

visit on host machine - localhost:4200

## open separate terminal and edit any app files
docker exec -it eui-mobile sh