FROM mysql:latest

# ENV MYSQL_ROOT_PASSWORD=root
# ENV MYSQL_DATABASE=mydb

COPY /db/init.sql /docker-entrypoint-initdb.d/
