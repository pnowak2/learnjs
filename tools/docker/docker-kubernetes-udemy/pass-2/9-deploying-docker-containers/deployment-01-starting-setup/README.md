# Lanuching EC2 instance

https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#Home

Instance ID i-0036a1429e7f65564
Open an SSH client.

Locate your private key file. The key used to launch this instance is example-1.pem
Run this command, if necessary, to ensure your key is not publicly viewable.

chmod 400 "example-1.pem"

Connect to your instance using its Public DNS:
ec2-51-21-181-97.eu-north-1.compute.amazonaws.com

Example:
ssh -i "example-1.pem" ec2-user@ec2-51-21-181-97.eu-north-1.compute.amazonaws.com

# Install Docker on Virtual Machine
sudo yum update -y
sudo yum -y install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

Make sure to log out + back in after running these commands.

sudo systemctl enable docker
docker version