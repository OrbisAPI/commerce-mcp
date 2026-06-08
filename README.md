# Orbis Commerce & Retail MCP 🛒

> 500+ commerce and retail APIs for AI agents. Product search, price tracking, reviews — pay per call with USDC on Base.

[![MCP](https://img.shields.io/badge/MCP-StreamableHTTP-blue)](https://orbisapi.com/api/mcp/commerce)
[![Payment](https://img.shields.io/badge/payment-x402%20USDC-green)](https://x402.org)

## What's Inside

- **Product Search** — Amazon, Walmart, eBay, Google Shopping results
- **Price Tracking** — current prices, price history, deal detection
- **Product Data** — specs, reviews, ratings, inventory status
- **Barcode & UPC** — product lookup by barcode or UPC code
- **Review Analysis** — customer sentiment, review aggregation

## Quick Start

No API key needed. No account. Paste into your MCP client:

### Claude Desktop / Claude Code
```json
{
  "mcpServers": {
    "orbis-commerce": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://orbisapi.com/api/mcp/commerce"]
    }
  }
}
```
Config path: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Cursor / Windsurf / Cline
```json
{
  "mcpServers": {
    "orbis-commerce": {
      "url": "https://orbisapi.com/api/mcp/commerce"
    }
  }
}
```

### OpenAI Codex CLI
```yaml
# ~/.codex/config.yaml
mcpServers:
  orbis-commerce:
    type: url
    url: "https://orbisapi.com/api/mcp/commerce"
```

## Example Prompts

Once connected, try:

- *"Find the cheapest iPhone 15 Pro on Amazon and Walmart and compare prices"*
- *"Search Walmart for protein powder under $40 with the best reviews"*
- *"Look up this barcode: 012345678905 — what product is it?"*
- *"What are customers saying about the Sony WH-1000XM5 headphones?"*
- *"Find deals on running shoes under $100"*

## Direct x402 Usage (Node.js)

```javascript
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

// Walmart product search — ~$0.005 per call
const resp = await fetch(
  "https://orbisapi.com/api/proxy/walmart-product-search-api-87729d/search",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "running shoes", limit: 5 }),
  }
);
console.log(await resp.json());
```

See `example.mjs` for a full working script.

## MCP Details

| | |
|---|---|
| **MCP URL** | `https://orbisapi.com/api/mcp/commerce` |
| **Protocol** | StreamableHTTP + SSE |
| **Payment** | x402 USDC on Base (~$0.005–$0.02/call) |
| **Tools** | `browse_apis`, `call_api` |

## All Orbis Domain MCPs

| Domain | URL |
|--------|-----|
| ₿ Crypto & Blockchain | `https://orbisapi.com/api/mcp/crypto` |
| 🔍 Research & Data | `https://orbisapi.com/api/mcp/research` |
| 🛒 Commerce & Retail | `https://orbisapi.com/api/mcp/commerce` |
| ✈️ Travel | `https://orbisapi.com/api/mcp/travel` |
| 🌐 All 20,200+ APIs | `https://orbisapi.com/api/mcp` |

---

Built by [Orbis](https://orbisapi.com) — the API marketplace for AI agents.
