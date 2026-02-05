const tools = [
  {
    name: "ChatGPT",
    description: "AI writing and coding assistant",
    link: "https://chat.openai.com"
  },
  {
    name: "Midjourney",
    description: "AI image generation tool",
    link: "https://www.midjourney.com"
  },
  {
    name: "Canva AI",
    description: "AI powered design tool",
    link: "https://www.canva.com"
  }
];

const grid = document.querySelector(".tools-grid");

tools.forEach(tool => {
  const card = document.createElement("div");
  card.className = "tool-card";
  card.innerHTML = `
    <h3>${tool.name}</h3>
    <p>${tool.description}</p>
    <a href="${tool.link}" target="_blank" class="btn">Try Tool</a>
  `;
  grid.appendChild(card);
});
