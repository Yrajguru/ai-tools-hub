const tools = [
  {
    name: "ChatGPT",
    description: "AI chatbot by OpenAI",
    link: "https://chat.openai.com",
    category: "chatbot",
    icon: "icons/chatgpt.png",
    tags: ["AI", "Chatbot", "Productivity"]
  },
  {
    name: "Midjourney",
    description: "AI image generator",
    link: "https://midjourney.com",
    category: "image",
    icon: "icons/midjourney.png",
    tags: ["AI", "Images", "Design"]
  },
  {
    name: "Canva",
    description: "Online design tool",
    link: "https://canva.com",
    category: "marketing",
    icon: "icons/canva.png",
    tags: ["Design", "Marketing", "Social Media"]
  },
  {
    name: "Murf AI",
    description: "Create realistic AI voiceovers",
    link: "https://get.murf.ai/1glkpzlo398s",
    category: "voice",
    icon: "icons/murf.png",
    tags: ["Voice", "AI", "Audio"]
  }
];

const grid = document.querySelector(".tools-grid");
const searchInput = document.getElementById("searchInput");
const categoryCards = document.querySelectorAll(".category-card");
const toolsStatus = document.getElementById("toolsStatus");

let activeCategory = "all";

/* ✅ Create Modal Dynamically */
function createModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-box">
      <span class="modal-close">&times;</span>
      <img class="modal-icon" src="" alt="">
      <h2 class="modal-title"></h2>
      <p class="modal-desc"></p>
      <a class="btn modal-btn" target="_blank">Visit Tool</a>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  return modal;
}

const modal = createModal();

/* ✅ Open Modal */
function openModal(tool) {
  modal.style.display = "flex";

  modal.querySelector(".modal-icon").src = tool.icon;
  modal.querySelector(".modal-title").textContent = tool.name;
  modal.querySelector(".modal-desc").textContent = tool.description;
  modal.querySelector(".modal-btn").href = tool.link;
}

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

    const tagsHTML = tool.tags
      .map(tag => `<span class="tool-tag">${tag}</span>`)
      .join("");

    card.innerHTML = `
      <div class="card-top">
        <img src="${tool.icon}" alt="${tool.name}" class="tool-icon">
        <h3>${tool.name}</h3>
      </div>
      <p>${tool.description}</p>
      <div class="tool-tags">${tagsHTML}</div>
      <button class="btn try-btn">Try Tool</button>
    `;

    /* 🎯 Modal Click */
    card.querySelector(".try-btn").addEventListener("click", () => {
      openModal(tool);
    });

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
