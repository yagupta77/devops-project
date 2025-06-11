provider "aws" {
  region = "ap-south-1"
}

resource "aws_iam_user" "jenkins_user" {
  name = "jenkins-demo-user"
}

resource "aws_iam_policy" "jenkins_policy" {
  name        = "jenkins-policy"
  description = "Custom policy for Jenkins-created user"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "s3:ListBucket",
          "ec2:Describe*"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "attach_policy" {
  user       = aws_iam_user.jenkins_user.name
  policy_arn = aws_iam_policy.jenkins_policy.arn
}
