import { NextRequest, NextResponse } from "next/server";

const DISCORD_API = "https://discord.com/api/v10";
const LOGO_URL = "https://koushikranjit.in/images/discord-bot/profdeal-logo.jpg";

export async function POST(req: NextRequest) {
  let body: { password?: string; buyPrice?: string; sellPrice?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { password, buyPrice, sellPrice } = body;

  const expectedPassword = process.env.MARKET_UPDATE_PASSWORD;
  if (!expectedPassword || password !== expectedPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!buyPrice || !sellPrice) {
    return NextResponse.json({ error: "Buy and sell price are required" }, { status: 400 });
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_MARKET_CHANNEL_ID;
  if (!botToken || !channelId) {
    return NextResponse.json(
      { error: "Bot is not configured (missing DISCORD_BOT_TOKEN or DISCORD_MARKET_CHANNEL_ID)" },
      { status: 500 }
    );
  }

  const embed = {
    title: "📈 USDT Market Price Update",
    description: "**Professor Network** has updated the real-time P2P exchange rates.",
    color: 0x5865f2,
    fields: [
      { name: "🟢 BUY PRICE", value: `\`₹ ${buyPrice}\``, inline: true },
      { name: "🔴 SELL PRICE", value: `\`₹ ${sellPrice}\``, inline: true },
    ],
    footer: {
      text: "Professor Network - Market Sync",
      icon_url: LOGO_URL,
    },
    timestamp: new Date().toISOString(),
  };

  const discordRes = await fetch(`${DISCORD_API}/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "@everyone",
      embeds: [embed],
      allowed_mentions: { parse: ["everyone"] },
    }),
  });

  if (!discordRes.ok) {
    const errText = await discordRes.text();
    return NextResponse.json({ error: `Discord API error: ${errText}` }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
