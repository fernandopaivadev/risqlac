APP_NAME="risqlac"
PORT=3001

echo "==> DEPLOY START <=="

echo "==> build image"
sudo docker build -t $APP_NAME .

echo "==> run image"
sudo docker run -d --name $APP_NAME -p $PORT:3000 $APP_NAME

echo "==> DEPLOY DONE <=="
