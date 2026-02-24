const tools = [
  {
    name: "ChatGPT",
    description: "AI chatbot by OpenAI",
    link: "chatgpt.html",   // ✅ INTERNAL PAGE
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

/* ✅ Modal Elements */
const modal = document.getElementById("toolModal");
const closeModal = document.getElementById("closeModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalLink = document.getElementById("modalLink");

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

  /* 🔢 Status Bar */
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
      <button class="btn details-btn">View Details</button>
    `;

    /* ✅ Modal Open */
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(tool);
    });

    grid.appendChild(card);
  });
}

/* ✅ Open Modal */
function openModal(tool) {
  if (!modal) return;

  modalIcon.src = tool.icon;
  modalTitle.textContent = tool.name;
  modalDescription.textContent = tool.description;

  modalTags.innerHTML = tool.tags
    .map(tag => `<span class="tool-tag">${tag}</span>`)
    .join("");

  modalLink.href = tool.link;

  modal.style.display = "flex";
}

/* ✅ Close Modal */
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

/* ✅ Close on Overlay Click */
if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

/* ✅ Category Filter */
categoryCards.forEach(card => {
  card.addEventListener("click", () => {
    categoryCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    activeCategory = card.dataset.category;

    renderTools(searchInput?.value || "");
  });
});

/* ✅ Search */
if (searchInput) {
  searchInput.addEventListener("input", e => {
    renderTools(e.target.value);
  });
}

/* ✅ Initial Load */
renderTools();
