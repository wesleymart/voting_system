mkdir -p /opt/votacao/files/sql/
chmod -R 777 /opt/votacao/files/sql/
mkdir -p /opt/votacao/files/db14/
chmod -R 777 /opt/votacao/files/db14/

docker-compose down
docker-compose up -d

sh config.sh


docker exec -it votacao_pg14 psql -U postgres -d desafio_votacao -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO votacao;"
