/**
 * Orbis Commerce MCP — Direct x402 usage example
 *
 * Demonstrates product search and retail data via x402 USDC payments.
 *
 * Setup:
 *   npm install
 *   WALLET_PRIVATE_KEY=0x... node example.mjs
 */
import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Set WALLET_PRIVATE_KEY env var");

const account = privateKeyToAccount(PRIVATE_KEY);
const walletClient = createWalletClient({ account, chain: base, transport: http() });
const fetch = wrapFetchWithPayment(globalThis.fetch, walletClient);

console.log("Orbis Commerce MCP Demo");
console.log("Wallet:", account.address, "\n");

// Browse commerce APIs
console.log("1. Browsing commerce APIs...");
const browseResp = await fetch("https://orbisapi.com/api/mcp/commerce", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Accept": "application/json, text/event-stream" },
  body: JSON.stringify({
    jsonrpc: "2.0", id: 1,
    method: "tools/call",
    params: { name: "browse_apis", arguments: { search: "product search" } }
  }),
});

const text = await browseResp.text();
const data = text.split("\n")
  .filter(l => l.startsWith("data: "))
  .map(l => { try { return JSON.parse(l.slice(6)); } catch { return null; } })
  .find(Boolean);

if (data?.result?.content?.[0]?.text) {
  const apis = JSON.parse(data.result.content[0].text);
  console.log(\`Found \${apis.total} commerce APIs in pool\`);
  apis.apis?.slice(0, 3).forEach(a => console.log(\`  - \${a.name}\`));
}

// Walmart product search
console.log("\n2. Searching Walmart for running shoes...");
try {
  const resp = await fetch(
    "https://orbisapi.com/api/proxy/walmart-product-search-api-87729d/search",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "running shoes", limit: 3 }),
    }
  );
  if (resp.ok) console.log(JSON.stringify(await resp.json(), null, 2));
  else console.log("Status:", resp.status);
} catch (e) {
  console.log("(Demo mode — connect a funded wallet for live calls)");
}

console.log("\nSee orbisapi.com/api/mcp/commerce for the full catalogue.");
