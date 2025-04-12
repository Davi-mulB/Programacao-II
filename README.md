# Microsserviço de Timestamp

## Descrição do Projeto

Este projeto é um Trabalho Prático de Desenvolvimento de um Microsserviço de Timestamp. Ele consiste em uma aplicação full-stack desenvolvida em JavaScript, utilizando Node.js e Express no backend, e uma interface frontend para interação com a API.

### Funcionalidades

1. **API com Node.js e Express**:
   - **Endpoint**: `/api/:date?timezone={timezone}`
     - **Entrada válida**: Retorna um objeto JSON com:
       - `unix`: Timestamp Unix em milissegundos.
       - `utc`: Data em formato UTC.
       - `timezone`: Fuso horário aplicado (se fornecido).
     - **Entrada de timestamp Unix**: Exemplo `/api/1451001600000` retorna:
       ```json
       {
         "unix": 1451001600000,
         "utc": "Fri, 25 Dec 2015 00:00:00 GMT",
         "timezone": 0
       }
       ```
     - **Entrada inválida**: Retorna:
       ```json
       { "error": "Invalid Date" }
       ```
     - **Sem parâmetro de data**: Retorna o timestamp atual em `unix` e `utc`.
     - **Suporte à conversão de fusos horários**: Permite envio de query string opcional para definir um fuso horário específico (entre -12 e +12).

   - **Endpoint adicional**: `/api/diff/:date1/:date2`
     - Calcula a diferença entre duas datas em dias, horas, minutos e segundos.
     - Exemplo de resposta:
       ```json
       {
         "date1": "Fri, 25 Dec 2015 00:00:00 GMT",
         "date2": "Sat, 26 Dec 2015 00:00:00 GMT",
         "difference": {
           "days": 1,
           "hours": 0,
           "minutes": 0,
           "seconds": 0
         }
       }
       ```

2. **Frontend Interativo**:
   - Interface para testar e visualizar os resultados da API.
   - Funcionalidades:
     - Conversão de datas para UTC e Unix, com suporte a fusos horários.
     - Cálculo da diferença entre duas datas.

---

## Passo a Passo de Execução

### 1. Clonar o Repositório
Clone o repositório para o seu ambiente local:
```sh
git clone https://github.com/Davi-mulB/Programacao-II.git
cd Programacao-II
```

### 2. Instalar Dependências
Instale as dependências do projeto usando npm:
```sh
npm install
```

### 3. Iniciar o Servidor
Inicie o servidor Node.js:
```sh
npm run start
```
O servidor será iniciado na porta 3000.

### 4. Acessar a Aplicação
Abra o navegador e acesse a URL:
```
http://localhost:3000
```
Isso carregará a página principal da aplicação que serve o arquivo `index.html`.

---

## Exemplos de Uso da API

### Converter Data
Faça uma requisição GET para:
```
http://localhost:3000/api/:date?timezone={timezone}
```
- **Parâmetros**:
  - `:date`: Data no formato ISO ou timestamp Unix.
  - `timezone` (opcional): Fuso horário entre -12 e +12.

### Calcular Diferença entre Datas
Faça uma requisição GET para:
```
http://localhost:3000/api/diff/:date1/:date2
```
- **Parâmetros**:
  - `:date1` e `:date2`: Datas no formato ISO ou timestamp Unix.

---

## Autor

Desenvolvido por **Davi Blum**.