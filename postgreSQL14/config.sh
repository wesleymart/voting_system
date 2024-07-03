
# You can CHANGE DB password here
docker exec -it votacao_pg14 psql -U postgres -c "CREATE USER votacao SUPERUSER PASSWORD 'z896ipGG012567';"
docker exec -it votacao_pg14 psql -U postgres -c "CREATE DATABASE desafio_votacao;"
docker exec -it votacao_pg14 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE desafio_votacao TO votacao;"
