const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const axios = require("axios");

const ACCESS_TOKEN = "IGAASxuBl9nqJBZAGIyb0pGbEdVT1JUMDFiR2lUbXV4dm9Bek92b08xSTFYRXQzdFZAWd1BGMGZAGeEdRLTdYTk1QcWdsOFhoSjdhVU1RY1pxd0kxODlxNFFwWFlac0FVVlFWV0o3SGNaQU1HMDVjVE1zd05Ea0tHQzBMc0dUR3N3OAZDZD";
const IG_USER_ID = "17841437787271187";

const server = new Server(
  { name: "instagram-skill", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "publicar_foto",
        description: "Publica uma foto no Instagram com uma legenda",
        inputSchema: {
          type: "object",
          properties: {
            image_url: {
              type: "string",
              description: "URL pública da imagem a ser publicada"
            },
            caption: {
              type: "string",
              description: "Legenda da foto"
            }
          },
          required: ["image_url", "caption"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "publicar_foto") {
    const { image_url, caption } = request.params.arguments;

    try {
      // Passo 1: Criar container da mídia
      const containerRes = await axios.post(
        `https://graph.instagram.com/v21.0/${IG_USER_ID}/media`,
        {
          image_url,
          caption,
          access_token: ACCESS_TOKEN
        }
      );

      const containerId = containerRes.data.id;

      // Passo 2: Aguardar o container ficar pronto (status FINISHED)
      let statusCode = "IN_PROGRESS";
      let attempts = 0;
      while (statusCode !== "FINISHED" && attempts < 20) {
        await new Promise(r => setTimeout(r, 3000));
        const statusRes = await axios.get(
          `https://graph.instagram.com/v21.0/${containerId}`,
          { params: { fields: "status_code", access_token: ACCESS_TOKEN } }
        );
        statusCode = statusRes.data.status_code;
        if (statusCode === "ERROR") throw new Error("Falha no processamento da mídia pelo Instagram.");
        attempts++;
      }
      if (statusCode !== "FINISHED") throw new Error("Timeout: container não ficou pronto a tempo.");

      // Passo 3: Publicar o container
      const publishRes = await axios.post(
        `https://graph.instagram.com/v21.0/${IG_USER_ID}/media_publish`,
        {
          creation_id: containerId,
          access_token: ACCESS_TOKEN
        }
      );

      return {
        content: [
          {
            type: "text",
            text: `Foto publicada com sucesso! ID da publicação: ${publishRes.data.id}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Erro ao publicar: ${error.response?.data?.error?.message || error.message}`
          }
        ]
      };
    }
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Instagram Skill MCP rodando...");
}

main();

