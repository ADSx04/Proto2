// ====== ÉTAT ======
let stock = JSON.parse(localStorage.getItem("barStock") || "{}");
let currentAlcohol = null;

// ====== NAVIGATION ======
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ====== STOCK ======
function saveStock() { localStorage.setItem("barStock", JSON.stringify(stock)); }
function getStock(id) { return stock[id] || 0; }
function setStock(id, val) {
  stock[id] = Math.max(0, val);
  saveStock();
  renderStock();
  if (currentAlcohol === id) document.getElementById("modalStock").textContent = stock[id];
}

// ====== RENDU CARTES ALCOOL ======
function alcoholCard(a) {
  const s = getStock(a.id);
  return `<div class="alcohol-card" data-id="${a.id}">
    <div class="stock-badge ${s === 0 ? 'empty' : ''}">${s}</div>
    <h4>${a.name}</h4>
    <div class="category">${a.category}</div>
  </div>`;
}

function renderStock() {
  const search = document.getElementById("stockSearch").value.toLowerCase();
  const filter = document.getElementById("stockFilter").value;

  const filtered = ALCOHOLS.filter(a => {
    if (a.tasting) return false;
    if (search && !a.name.toLowerCase().includes(search)) return false;
    if (filter !== "all" && a.category !== filter) return false;
    return true;
  });

  document.getElementById("fridgeList").innerHTML =
    filtered.filter(a => a.storage === "fridge").map(alcoholCard).join("") || "<p style='color:#666'>Aucun alcool</p>";
  document.getElementById("ambientList").innerHTML =
    filtered.filter(a => a.storage === "ambient").map(alcoholCard).join("") || "<p style='color:#666'>Aucun alcool</p>";

  attachCardListeners();
}

function renderDegustation() {
  const list = ALCOHOLS.filter(a => a.tasting);
  document.getElementById("degustationList").innerHTML = list.map(alcoholCard).join("");
  attachCardListeners();
}

function attachCardListeners() {
  document.querySelectorAll(".alcohol-card").forEach(card => {
    card.addEventListener("click", () => openAlcoholModal(card.dataset.id));
  });
}

// ====== FILTRES CATÉGORIES ======
function fillCategoryFilter() {
  const cats = [...new Set(ALCOHOLS.filter(a => !a.tasting).map(a => a.category))].sort();
  const sel = document.getElementById("stockFilter");
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    sel.appendChild(opt);
  });
}

document.getElementById("stockSearch").addEventListener("input", renderStock);
document.getElementById("stockFilter").addEventListener("change", renderStock);

// ====== COCKTAILS ======
function findCocktailsFor(alcoholId) {
  return COCKTAILS.filter(c => c.ingredients.includes(alcoholId));
}

function cocktailCard(c) {
  const available = c.ingredients.every(id => getStock(id) > 0);
  const ingNames = c.ingredients.map(id => {
    const a = ALCOHOLS.find(x => x.id === id);
    return a ? a.name : id;
  }).join(", ");
  return `<div class="cocktail-card ${available ? 'available' : ''}">
    <h4>${c.name}</h4>
    <div class="ingredients"><strong>Alcools:</strong> ${ingNames}</div>
    ${c.extras ? `<div class="ingredients"><strong>+</strong> ${c.extras}</div>` : ''}
  </div>`;
}

function renderCocktails(filterAlcohol = null) {
  const search = document.getElementById("cocktailSearch").value.toLowerCase();
  let list = COCKTAILS;
  if (filterAlcohol) list = list.filter(c => c.ingredients.includes(filterAlcohol));
  if (search) list = list.filter(c => c.name.toLowerCase().includes(search));
  document.getElementById("cocktailList").innerHTML = list.map(cocktailCard).join("") || "<p>Aucun cocktail trouvé.</p>";
}

document.getElementById("cocktailSearch").addEventListener("input", () => renderCocktails());

// ====== MODAL ALCOOL ======
function openAlcoholModal(id) {
  const a = ALCOHOLS.find(x => x.id === id);
  if (!a) return;
  currentAlcohol = id;
  document.getElementById("modalTitle").textContent = a.name;
  document.getElementById("modalDescription").textContent = a.desc;
  document.getElementById("modalStock").textContent = getStock(id);

  const recipes = findCocktailsFor(id);
  const recipeHTML = recipes.length
    ? recipes.map(c => {
        const available = c.ingredients.every(x => getStock(x) > 0);
        const ings = c.ingredients.map(x => ALCOHOLS.find(y => y.id === x)?.name || x).join(", ");
        return `<div class="recipe-item">
          <h4>${c.name} ${available ? '✓' : ''}</h4>
          <div class="ings">${ings}${c.extras ? ' + ' + c.extras : ''}</div>
        </div>`;
      }).join("")
    : "<p style='color:#888'>Aucune recette avec cet alcool (idéal en dégustation pure).</p>";
  document.getElementById("recipeList").innerHTML = recipeHTML;

  document.getElementById("alcoholModal").classList.add("active");
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("alcoholModal").classList.remove("active");
  currentAlcohol = null;
});
document.getElementById("alcoholModal").addEventListener("click", e => {
  if (e.target.id === "alcoholModal") {
    e.target.classList.remove("active");
    currentAlcohol = null;
  }
});

document.querySelectorAll(".stock-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!currentAlcohol) return;
    const cur = getStock(currentAlcohol);
    setStock(currentAlcohol, btn.dataset.action === "inc" ? cur + 1 : cur - 1);
  });
});

// ====== RECHERCHE / ANECDOTES ======
let anecdoteIndex = 0;
function showAnecdote() {
  document.getElementById("anecdoteText").textContent = ANECDOTES[anecdoteIndex];
  anecdoteIndex = (anecdoteIndex + 1) % ANECDOTES.length;
}
document.getElementById("nextAnecdote").addEventListener("click", showAnecdote);

document.getElementById("globalSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  if (!q) { document.getElementById("searchResults").innerHTML = ""; return; }

  const alcohols = ALCOHOLS.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  const cocktails = COCKTAILS.filter(c => c.name.toLowerCase().includes(q) || (c.extras && c.extras.toLowerCase().includes(q)));

  let html = "";
  if (alcohols.length) {
    html += `<h3 style="color:#d4af37;margin-bottom:10px">Alcools</h3><div class="alcohol-grid">${alcohols.map(alcoholCard).join("")}</div>`;
  }
  if (cocktails.length) {
    html += `<h3 style="color:#d4af37;margin:20px 0 10px">Cocktails</h3><div class="cocktail-grid">${cocktails.map(cocktailCard).join("")}</div>`;
  }
  if (!alcohols.length && !cocktails.length) html = "<p>Aucun résultat.</p>";
  document.getElementById("searchResults").innerHTML = html;
  attachCardListeners();
});

// ====== INIT ======
fillCategoryFilter();
renderStock();
renderDegustation();
renderCocktails();
showAnecdote();