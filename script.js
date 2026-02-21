const tools = [
  {
    name: "ChatGPT",
    description: "AI chatbot by OpenAI",
    link: "https://chat.openai.com",
    category: "chatbot",
    icon: "icons/chatgpt.png"
  },
  {
    name: "Midjourney",
    description: "AI image generator",
    link: "https://midjourney.com",
    category: "image",
    icon: "icons/midjourney.png"
  },
  {
    name: "Canva",
    description: "Online design tool",
    link: "https://canva.com",
    category: "marketing",
    icon: "icons/canva.png"
  },
  {
    name: "Murf AI",
    description: "Create realistic AI voiceovers",
    link: "https://get.murf.ai/1glkpzlo398s",
    category: "voice",
    icon: "icons/murf.png"
  }
];

const grid = document.querySelector(".tools-grid");
const searchInput = document.getElementById("searchInput");
const categoryCards = document.querySelectorAll(".category-card");
const toolsStatus = document.getElementById("toolsStatus");

let activeCategory = "all";

/* ✅ Render Tools */
function renderTools(filterText = "") {
  if (!grid) return;

  grid.innerHTML = "";

  const filtered = tools.filter(tool => {
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;

    const matchesSearch =
      tool.name.toLowerCase().includes(filterText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  /* 🔢 Update Counter */
  if (toolsStatus) {
    toolsStatus.textContent = `${filtered.length} Tools Found`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty-state">No tools found 😔</p>`;
    return;
  }

  filtered.forEach(tool => {
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

/* ✅ Category Click */
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    categoryCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    activeCategory = card.dataset.category;

    renderTools(searchInput?.value || "");
  });
});

/* ✅ Search Typing */
if (searchInput) {
  searchInput.addEventListener("input", e => {
    renderTools(e.target.value);
  });
}

/* ✅ Initial Load */
renderTools();
