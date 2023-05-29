APP_NAME="risqlac"

echo "==> stop container"
sudo docker stop $APP_NAME

echo "==> prune container"
sudo docker rm $APP_NAME

echo "==> prune image"
sudo docker rmi $APP_NAME
