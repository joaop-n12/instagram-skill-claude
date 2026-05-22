# 📸 Instagram Skill — Claude Code (MCP Server)

Skill desenvolvida para o **Desafio Técnico TiOps** que publica fotos no Instagram de forma autônoma via **Instagram Graph API**, integrada ao **Claude Code** usando o protocolo **MCP (Model Context Protocol)**.

## 🏗️ Arquitetura
Usuário → Claude Code → MCP Server (Node.js) → Instagram Graph API → Post publicado ✅

## 🚀 Como funciona

1. O Claude Code carrega a skill via protocolo MCP
2. O usuário pede ao Claude para publicar uma foto
3. O Claude invoca a ferramenta `publicar_foto` autonomamente
4. O MCP Server chama a Instagram Graph API em 3 etapas:
   - Cria o container de mídia
   - Aguarda o status `FINISHED` (polling)
   - Publica o post

## 🛠️ Tecnologias

| Tecnologia | Função |
|---|---|
| Claude Code | Interface IA que invoca a skill |
| MCP SDK Anthropic | Protocolo da skill |
| Node.js | Runtime do servidor |
| Axios | Requisições HTTP |
| Instagram Graph API v21.0 | Publicação de fotos |

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. No `index.js`, preencha suas credenciais:
```js
const ACCESS_TOKEN = "seu_token_aqui";
const IG_USER_ID   = "seu_id_aqui";
```
4. Registre no Claude Code:
```bash
claude mcp add instagram-skill node /caminho/index.js
```
5. No Claude Code, peça para publicar:
Publique uma foto no Instagram com a URL "..." e a legenda "..."

## 📋 Requisitos atendidos

- ✅ Execução 100% via API (sem browser)
- ✅ Publicação de foto com legenda
- ✅ Roda em background de forma autônoma
- ✅ App Meta em modo sandbox
- ✅ Prints de funcionamento

---
Desenvolvido por **João Pedro de Souza Nunes** — Desafio Técnico TiOps 2026
