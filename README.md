# RisQLAC - Risco Químico em Laboratórios de Análises Clínicas

O RisQLAC é um software de gerenciamento de risco químico desenvolvido pelo autor Fernando Paiva da Silva e Souza, como parte da dissertação de mestrado em Análises Clínicas da discente Erlayne Silvana Santiago Cavalcante, na Universidade Federal do Pará. O objetivo da plataforma é armazenar informações sobre produtos químicos perigosos utilizados em laboratórios de análises clínicas, de acordo com o Sistema Globalmente Harmonizado de Classificação e Rotulagem de Produtos Químicos (GHS).

Este repositório contém o código-fonte do RisQLAC, escrito em Go e Typescript, usando o MySQL como banco de dados. Além do código, a documentação do software e os termos de uso também estão disponíveis aqui. O projeto é distribuído sob a licença GPLv3.

## Como contribuir

Se você deseja contribuir com o desenvolvimento do RisQLAC, siga os seguintes passos:

1. Crie um fork deste repositório em sua conta do Github.
2. Clone o repositório para sua máquina local.
3. Crie uma nova branch para implementar suas alterações: `git checkout -b minha-branch`.
4. Implemente suas alterações.
5. Faça o commit de suas alterações: `git commit -m "Minha mensagem de commit"`.
6. Faça o push para o seu fork: `git push origin minha-branch`.
7. Abra um pull request neste repositório, explicando suas alterações.

## Requisitos

- CLI do Go
- Runtime do NodeJS
- Banco de dados MySQL

### Ou

- Podman/Docker
- Banco de dados MySQL

## Como executar com Podman

1. Clone este repositório em sua máquina local.
2. Instale o Podman.
3. Configure as variáveis de ambiente em um arquivo `.env`.
4. Execute o arquivo `run.sh` usando o comando: `chmod 700 run.sh && ./run.sh`.
5. Acesse a plataforma em seu navegador: `http://localhost:3000`.

## Como executar sem Podman

1. Clone este repositório em sua máquina local.
2. Instale o Go.
3. Instale o NodeJS.
4. Configure as variáveis de ambiente em um arquivo `.env`.
5. Entre na pasta `frontend` e execute os comandos:
    - `npm install`
    - `npm run build`
6. Volte para a pasta raiz do projeto e execute o comando `go run .`.

## Autores

Desenvolvido por Fernando Paiva da Silva e Souza ([Link para o perfil no Github](https://github.com/FernandoPaivaEC)) sob demanda da discente Erlayne Silvana Santiago Cavalcante da Universidade Federal do Pará.

## Licença

Este projeto é distribuído sob a licença GPLv3. Consulte o arquivo LICENSE para mais informações.
