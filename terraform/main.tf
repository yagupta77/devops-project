# Use AWS provider
provider "aws" {
  region = "ap-south-1" # Mumbai (you can change this if needed)
}

# Create a private S3 bucket
resource "aws_s3_bucket" "example" {
  bucket = "yagupta77-terraform-bucket-${random_id.suffix.hex}"
  acl    = "private"

  tags = {
    Name        = "Terraform S3 Bucket"
    Environment = "Dev"
  }
}

# Random ID to make bucket name unique
resource "random_id" "suffix" {
  byte_length = 4
}
