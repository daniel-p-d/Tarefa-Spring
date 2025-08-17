**API REST SPRING BOOT**

>**Para permitir que o Front conecte com a API**

Altere o:


``.allowedOrigins("http://127.0.0.1:5500") ``


no diretório "/BackEnd/config/WebConfig.java" para o endereço onde seu Front End está rodando;


>**Para acessar o banco de dados:**

Acesse: http://localhost:8080/h2-console/ <br>
url=jdbc:h2:mem:tarefaDB <br>
username=sa <br>
password= (deixe em branco) <br><br>
*O banco é **em memória**,os dados desaparecem ao parar a aplicação.
Caso queira que os dados permaneçam mesmo após reiniciar a aplicação, altere a configuração do Spring Boot no arquivo application.properties (BackEnd/src/main/resources/application.properties):*<br><br>

**Exemplo PostgreSQL**<br>
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tarefaDB
spring.datasource.username=usuario
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
```


>**EndPoints**


GET /tarefa <br>
POST /tarefa/criar <br>
```Json
{
  "titulo": "Teste",
  "descricao": "Testar API",
  "status": "PENDENTE"
}
```
<br>
PATCH /tarefa/atualizar/{id} <br>
DELETE /tarefa/excluir/{id}
