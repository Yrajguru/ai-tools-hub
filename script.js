const tools = [
  {
    name: "ChatGPT",
    description: "AI chatbot by OpenAI",
    link: "https://chat.openai.com",
    icon: "icons/chatgpt.png",
    category: "chatbot"
  },
  {
    name: "Midjourney",
    description: "AI image generator",
    link: "https://midjourney.com",
    icon: "icons/midjourney.png",
    category: "image"
  },
  {
    name: "Canva",
    description: "Online design tool",
    link: "https://canva.com",
    icon: "icons/canva.png",
    category: "image"
  },
  {
    name: "Murf AI",
    description: "Create realistic AI voiceovers",
    link: "https://get.murf.ai/1glkpzlo398s",
    icon: "icons/murf.png",
    category: "voice"
  }
];

const grid = document.querySelector(".tools-grid");
const categoryButtons = document.querySelectorAll(".category-card");

/* ✅ Render Function */
function renderTools(filter) {
  if (!grid) return;

  grid.innerHTML = "";

  const filteredTools =
    filter === "all"
      ? tools
      : tools.filter(tool => tool.category === filter);

  filteredTools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "tool-card";

    card.innerHTML = `
      <div class="card-top">
        <img src="${tool.icon}" alt="${tool.name}" class="tool-icon">
        <h3>${tool.name}</h3>
      </div>

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

/* ✅ Initial Load */
renderTools("all");

/* ✅ Category Click Logic */
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-category");
    renderTools(category);
  });
});
