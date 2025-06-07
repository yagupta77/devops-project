provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "demo_instance" {
  ami           = "ami-0ded8326293d3201b" # Amazon Linux 2 AMI (Mumbai) — check current ID
  instance_type = "t2.micro"

  tags = {
    Name = "Yash-EC2-Demo"
  }
}
