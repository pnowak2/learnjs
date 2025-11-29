# Lanuching EC2 instance

https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#Home

Instance ID i-0a70d89950a0c8888
Open an SSH client.

Locate your private key file. The key used to launch this instance is example-2.pem
Run this command, if necessary, to ensure your key is not publicly viewable.

chmod 400 ~/.ssh/example-2.pem

Connect to your instance using its Public DNS:
ec2-13-60-24-96.eu-north-1.compute.amazonaws.com

Example:
ssh -i ~/.ssh/example-2.pem ec2-user@ec2-13-60-24-96.eu-north-1.compute.amazonaws.com

# Install Docker on Virtual Machine
sudo yum update -y
sudo yum -y install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

Make sure to log out + back in after running these commands.

sudo systemctl enable docker
docker version

# Build on mac, run on remote linux with buildx
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t pnowak2/node-example-1:latest \
  --push .

docker login
docker push pnowak2/node-example-1