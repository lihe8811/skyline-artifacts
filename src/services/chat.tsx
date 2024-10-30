import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"]
});

const message = await anthropic.messages.create({
  model: "claude-3-haiku-20240307",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
});
console.log(message);