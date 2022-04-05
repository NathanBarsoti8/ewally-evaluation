# EWALLY EVALUATION

API construída para consulta de boletos bancários e de convênio através da linha digitável


## Instruções

Clone o projeto

```bash
  git clone https://github.com/NathanBarsoti8/ewally-evaluation.git
```

Entre no diretório. Caso nunca tenha executado o projeto, rode o seguinte comando. Ele instalará todas as dependências necessárias e iniciará a API na porta 8080.

```bash
  npm run initial usage 
```

Caso já tenho instalado as dependências anteriormente, rode o seguinte comando. Ele iniciará a API na porta 8080.

```bash
  npm run start 
```

Para executar os testes rode o comando a seguir. Lembre-se que não estar rodar a API ao mesmo tempo, pois dessa forma a porta 8080 já estará em uso e os testes falharão.

```bash
  npm run test 
```

## Endpoint

O endpoint disponível é umn método GET que recebe como route params a linha digitável de um boleto bancário ou convênio.

Ao rodar a aplicação, basta acessar o swagger.

```bash
  http://localhost:8080/swagger
```

Em caso de sucesso o endpoint retornará status 200 juntamente com as informações obtidas através da linha digitável.

Em caso de erro o endpoint retornará status 400 juntamente com as informações e detalhes do erro.

Em caso de não ser enviado a linha digitável o endpoint retornará 404, por não encontrar o endereço na API.