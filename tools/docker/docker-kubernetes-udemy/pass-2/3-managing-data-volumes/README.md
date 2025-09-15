docker run -d -p 8080:80 --name feedback-app -v feedback:/app/feedback -v $(pwd):/app -v /app/node_modules feedback-node:volumes

# readonly volumes - :ro
docker run -d -p 8080:80 --name feedback-app -v feedback:/app/feedback -v $(pwd):/app:ro -v /app/node_modules -v /app/temp feedback-node:volumes

# environment variables --env PORT=1234 OR -e PORT=1234
docker run -d -p 8080:9000 --env PORT=9000 --name feedback-app -v feedback:/app/feedback -v $(pwd):/app:ro -v /app/node_modules -v /app/temp feedback-node:env

# environment file --env-file .env
docker run -d -p 8080:9000 --env-file .env --name feedback-app -v feedback:/app/feedback -v $(pwd):/app:ro -v /app/node_modules -v /app/temp feedback-node:env

# build arg, during image build only
docker build -t feedback-node:dev --build-arg DEFAULT_PORT=8000 .