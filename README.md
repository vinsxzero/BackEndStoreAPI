# Passos para rodar o projeto:

## Container MySQL
1. Tenha o docker instalado na máquina
2. Execute o comando: 'docker compose up db' na pasta raiz do projeto
3. Execute o comando 'docker exec -it my-mysql bash' para abrir o prompt do container
4. Utilize 'mysql -u root -proot' para acessar o usuário root do banco de dados
5. Execute os comandos listados em /src/database/init.sql dentro do banco para configurar os acessos

## Container API
6. Execute o comando 'docker compose up api' na pasta raiz
7. Caso haja algum erro de conexão, reinicie o container mysql, aguarde o banco ficar pronto para conexões e reinicie o container api. Utilize 'docker compose down {api/db}' e 'docker compose up {api/db}'

### Lista de requisições Postman pré-montadas disponível na pasta raiz