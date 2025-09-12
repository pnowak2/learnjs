docker run -d -p 8080:80 --name feedback-app -v feedback:/app/feedback -v $(pwd):/app -v /app/node_modules feedback-node:volumes

# readonly volumes - :ro
docker run -d -p 8080:80 --name feedback-app -v feedback:/app/feedback -v $(pwd):/app:ro -v /app/node_modules -v /app/temp feedback-node:volumes