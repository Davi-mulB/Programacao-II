# Programacao-II

## Descrição do projeto

O projeto é um Trabalho Prático de Desenvolvimento de um Microsserviço de Timestamp e tem como objetivo desenvolver uma aplicação full-stack em JavaScript que implemente um microsserviço de timestamp.

### Funcionalidades:
1. **API com Node.js e Express**:
   - **Endpoint**: `/api/{date}?fuso={fuso}`
     - **Entrada válida**: Retorna um objeto JSON com `unix` (timestamp Unix em milissegundos) e `utc` (data em formato UTC).
     - **Entrada de timestamp Unix**: Exemplo `/api/1451001600000` retorna `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`.
     - **Entrada inválida**: Retorna `{ "error": "Invalid Date" }`.
     - **Sem parâmetro de data**: Retorna o timestamp atual em `unix` e `utc`.
     - **Suporte à conversão de fusos horários**: Permite envio de query string opcional para definir um fuso horário específico.
   
2. **Endpoint adicional**: `/api/diff/{date1}/{date2}`
   - Calcula a diferença entre duas datas em dias, horas, minutos e segundos.

3. **Frontend básico**:
   - Interface para testar e visualizar os resultados da API de forma interativa.

Este projeto envolve o uso de JavaScript para backend com Node.js e Express, e a criação de uma interface frontend para interação com a API.

## Passo a Passo de Execução

**1. Clonar o Repositório:**
   Primeiro, você precisa clonar o repositório para o seu ambiente local.
   ```sh
   git clone https://github.com/Gabi-r7/Trabalho_Programacao.git
   cd Trabalho_Programacao
   ```

**2. Instalar Dependências:**
   Instale as dependências do projeto usando npm.
   ```sh
   npm install
   ```

**3. Iniciar o Servidor:**
   Inicie o servidor Node.js.
   ```sh
   npm run start
   ```
   Isso vai iniciar o servidor na porta 3000.

**4. Acessar a Aplicação:**
   Abra o navegador e acesse a URL:
   ```
   http://localhost:3000
   ```
   Isso carregará a página principal da aplicação que serve o arquivo `index.html`.

**5. Utilizar a API:**
   - **Converter Data:**
     Para converter uma data, você pode fazer uma requisição GET para a API:
     ```
     http://localhost:3000/api/{date}?fuso={fuso}
     ```
     Onde `{date}` é a data que você quer converter e `{fuso}` é o fuso horário (opcional).

   - **Calcular Diferença entre Datas:**
     Para calcular a diferença entre duas datas, você pode fazer uma requisição GET para a API:
     ```sh
     http://localhost:3000/api/diff/{date1}/{date2}
     ```
     Onde `{date1}` e `{date2}` são as datas que você quer comparar.

Seguindo estes passos, você será capaz de executar e interagir com o projeto "Trabalho_Programacao" localmente.