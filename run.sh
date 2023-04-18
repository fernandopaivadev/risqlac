APP_NAME="risqlac"
PORT=3000

echo "==> build image"
podman build -t $APP_NAME .

echo "==> run image"
podman run -d --name $APP_NAME -p $PORT:3000 $APP_NAME
