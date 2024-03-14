APP_NAME="risqlac"
USERNAME="fernandopaivadev"

echo "==> delete previous images"
sudo docker rmi $APP_NAME $USERNAME/$APP_NAME

echo "==> build, tag and push image"
sudo docker buildx build --platform linux/amd64,linux/arm/v7 -t $USERNAME/$APP_NAME:latest --push .
