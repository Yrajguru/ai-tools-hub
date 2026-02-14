const tools = [
  {
    name: "ChatGPT",
    description: "AI chatbot by OpenAI",
    link: "https://chat.openai.com"
  },
  {
    name: "Midjourney",
    description: "AI image generator",
    link: "https://midjourney.com"
  },
  {
    name: "Canva",
    description: "Online design tool",
    link: "https://canva.com"
  },
  {
    name: "Murf AI",
    description: "Create realistic AI voiceovers",
    link: "https://get.murf.ai/1glkpzlo398s"
  }
];

const grid = document.querySelector(".tools-grid");

/* ✅ SAFETY CHECK */
if (grid) {
  tools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "tool-card";

    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <a href="${tool.link}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="btn">
        Try Tool
      </a>
    `;

    grid.appendChild(card);
  });
}
