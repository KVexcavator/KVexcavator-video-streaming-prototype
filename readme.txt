This is a prototype of the social net project for video-streaming

Run docker compose:
docker compose build
docker compose up
docker compose up --build
docker compose down

настраиваем OBS
настройки - трансляция - настраиваемый
сервер rtmp://localhost/live
Ключ потока (Stream Key): livestream

back-register
http://127.0.0.1:8000
http://127.0.0.1:8000/docs

front-main
Local:   http://localhost:5173/
Network: http://172.18.0.3:5173/

если нужно отдельно запустить front-main для разработки
cd front-main
npm run dev