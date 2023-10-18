APP_NAME="risqlac"
USERNAME="fernandopaivadev"

echo "==> delete previous images"
sudo docker rmi $APP_NAME $USERNAME/$APP_NAME

echo "==> build image"
sudo docker build -t $APP_NAME .

echo "==> tag image"
sudo docker tag $APP_NAME $USERNAME/$APP_NAME:latest

echo "==> push image"
sudo docker push $USERNAME/$APP_NAME
