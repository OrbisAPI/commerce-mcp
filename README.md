# Orbis Commerce & Retail MCP 🛒

> Real product search, barcode lookup, and retail data APIs for AI agents. Pay per call with USDC on Base — no API keys, no accounts, no subscriptions.

[![MCP](https://img.shields.io/badge/MCP-StreamableHTTP-blue)](https://orbisapi.com/api/mcp/commerce)
[![x402](https://img.shields.io/badge/payment-x402%20USDC-green)](https://x402.org)

## What's Actually In Here

These are the most-called APIs in this domain on Orbis:

| API | Calls | What it does |
|-----|-------|-------------|
| [Barcode Validator API](https://orbisapi.com/marketplace/barcode-validator-api-5ec103) | 327 | Validate any barcode format and check legitimacy |
| [Retail UPC Data](https://orbisapi.com/marketplace/retail-upc-data-6f611c) | 206 | Look up full product data from a UPC code |
| [Walmart Product Search API](https://orbisapi.com/marketplace/walmart-product-search-api-87729d) | 164 | Search Walmart for products with live prices |
| [AI Product Description Generator API](https://orbisapi.com/marketplace/ai-product-description-generator-api-37c141) | 35 | Generate SEO product descriptions from specs |
| [eBay Product Search API](https://orbisapi.com/marketplace/ebay-product-search-api-238b64) | 33 | Search eBay listings with prices and availability |
| [Ecommerce Product Page Parser API](https://orbisapi.com/marketplace/ecommerce-product-page-parser-api-0e657d) | 32 | Parse any product page into structured JSON |
| [Amazon Reviews & Ratings API](https://orbisapi.com/marketplace/amazon-reviews-ratings-api-07e7f1) | 31 | Fetch Amazon reviews and rating breakdowns |
| [Barcode Data API](https://orbisapi.com/marketplace/barcode-data-api-47ded2) | 31 | Detailed product info from barcode/UPC |
| [Amazon Product Search API](https://orbisapi.com/marketplace/amazon-product-search-api-728bc5) | 29 | Search Amazon products with prices and specs |
| [UPC Product Lookup](https://orbisapi.com/marketplace/upc-product-lookup-9a9fa1) | 18 | Look up product details by UPC code |
| [Product Review Summary](https://orbisapi.com/marketplace/product-review-summary-fa85f9) | 16 | Summarize customer reviews into pros/cons |
| [Barcode Validate](https://orbisapi.com/marketplace/barcode-validate-fe07ae) | 15 | Validate barcode checksums and formats |
| [Barcode Decode](https://orbisapi.com/marketplace/barcode-decode-b1dfc6) | 14 | Decode barcode images and strings |

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

- *"Look up this barcode and tell me what product it is: 012345678905"*
- *"Search Walmart for protein powder under $40 — show me prices and ratings"*
- *"Find this product on Amazon and eBay and compare the prices: 'Sony WH-1000XM5'"*
- *"Parse this product page and give me the specs as JSON: https://..."*
- *"Summarize the customer reviews for this Amazon product into pros and cons"*
- *"Validate this UPC code and look up the product: 036000291452"*

## Direct x402 Usage (Node.js)

```javascript
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

// Walmart product search — 164 real calls on Orbis
const resp = await fetch(
  "https://orbisapi.com/api/proxy/walmart-product-search-api-87729d/search",
  { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: "running shoes", limit: 5 }) }
);
console.log(await resp.json());
```

See `example.mjs` for a full working script.

## All Orbis Domain MCPs

| Domain | URL |
|--------|-----|
| ₿ Crypto & Blockchain | `https://orbisapi.com/api/mcp/crypto` |
| 🔍 Research & Data | `https://orbisapi.com/api/mcp/research` |
| 🛒 Commerce & Retail | `https://orbisapi.com/api/mcp/commerce` |
| ✈️ Travel | `https://orbisapi.com/api/mcp/travel` |
| 🌐 All 20,000+ APIs | `https://orbisapi.com/api/mcp` |

---

Built by [Orbis](https://orbisapi.com) — the API marketplace for AI agents.
