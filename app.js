// ====== ÉTAT ======
// Structure : { alcohols: { id: { name, category, storage, desc, quantity } }, beers: [{id, name, type, quantity}] }
let state = JSON.parse(localStorage.getItem("barState") || '{"alcohols":{},"beers":[]}');
let currentAlcoholId = null;
let currentBeerId = null;

function save() { localStorage.setItem("barState", JSON.stringify(state)); }

// ====== NAVIGATION ONGLETS ======
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ====== FERMETURE MODALES ======
document.querySelectorAll(".close").forEach(x => {
  x.addEventListener("click", () => {
    document.getElementById(x.dataset.close).classList.remove("active");
  });
});
document.querySelectorAll(".modal").forEach(m => {
  m.addEventListener("click", e => { if (e.target === m) m.classList.remove("active"); });
});

// ====== CAVE (ALCOOLS) ======
function alcoholCard(id, a) {
  return `<div class="alcohol-card" data-id="${id}">
    <div class="stock-badge ${a.quantity === 0 ? 'empty' : ''}">${a.quantity}</div>
    <h4>${a.name}</h4>
    <div class="category">${a.category}</div>
  </div>`;
}

function renderCave() {
  const ids = Object.keys(state.alcohols);
  const empty = document.getElementById("emptyCave");
  const fridgeZone = document.getElementById("fridgeZone");
  const ambientZone = document.getElementById("ambientZone");

  if (ids.length === 0) {
    empty.style.display = "block";
    fridgeZone.style.display = "none";
    ambientZone.style.display = "none";
    return;
  }
  empty.style.display = "none";

  const fridge = ids.filter(id => state.alcohols[id].storage === "fridge");
  const ambient = ids.filter(id => state.alcohols[id].storage === "ambient");

  if (fridge.length) {
    fridgeZone.style.display = "block";
    document.getElementById("fridgeList").innerHTML = fridge.map(id => alcoholCard(id, state.alcohols[id])).join("");
  } else fridgeZone.style.display = "none";

  if (ambient.length) {
    ambientZone.style.display = "block";
    document.getElementById("ambientList").innerHTML = ambient.map(id => alcoholCard(id, state.alcohols[id])).join("");
  } else ambientZone.style.display = "none";

  document.querySelectorAll("#stock .alcohol-card").forEach(card => {
    card.addEventListener("click", () => openAlcoholModal(card.dataset.id));
  });
}

// ====== MODAL DÉTAIL ALCOOL ======
function openAlcoholModal(id) {
  const a = state.alcohols[id];
  if (!a) return;
  currentAlcoholId = id;
  document.getElementById("modalTitle").textContent = a.name;
  document.getElementById("modalDescription").textContent = a.desc || a.category;
  document.getElementById("modalStock").textContent = a.quantity;

  const recipes = COCKTAILS.filter(c => c.ingredients.includes(id));
  document.getElementById("recipeList").innerHTML = recipes.length
    ? recipes.map(c => {
        const available = c.ingredients.every(x => state.alcohols[x] && state.alcohols[x].quantity > 0);
        const ings = c.ingredients.map(x => (state.alcohols[x]?.name) || ALCOHOL_CATALOG.find(y => y.id === x)?.name || x).join(", ");
        return `<div class="recipe-item">
          <h4>${c.name} ${available ? '✓' : ''}</h4>
          <div class="ings">${ings}${c.extras ? ' + ' + c.extras : ''}</div>
        </div>`;
      }).join("")
    : "<p style='color:#888'>Aucune recette référencée avec cet alcool.</p>";

  document.getElementById("alcoholModal").classList.add("active");
}

document.querySelectorAll('[data-action="inc"], [data-action="dec"]').forEach(btn => {
  btn.addEventListener("click", () => {
    if (!currentAlcoholId) return;
    const a = state.alcohols[currentAlcoholId];
    a.quantity = Math.max(0, a.quantity + (btn.dataset.action === "inc" ? 1 : -1));
    document.getElementById("modalStock").textContent = a.quantity;
    save();
    renderCave();
  });
});

document.getElementById("deleteAlcoholBtn").addEventListener("click", () => {
  if (!currentAlcoholId) return;
  if (!confirm("Retirer cet alcool de votre cave ?")) return;
  delete state.alcohols[currentAlcoholId];
  save();
  renderCave();
  document.getElementById("alcoholModal").classList.remove("active");
  currentAlcoholId = null;
});

// ====== AJOUT ALCOOL ======
function fillCatalogSelect() {
  const sel = document.getElementById("catalogSelect");
  sel.innerHTML = '<option value="">— Choisir un alcool —</option>';
  ALCOHOL_CATALOG
    .filter(a => !state.alcohols[a.id])
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(a => {
      const opt = document.createElement("option");
      opt.value = a.id;
      opt.textContent = `${a.name} (${a.category})`;
      sel.appendChild(opt);
    });
}

document.getElementById("addAlcoholBtn").addEventListener("click", () => {
  fillCatalogSelect();
  document.getElementById("catalogSelect").value = "";
  document.getElementById("customName").value = "";
  document.getElementById("customCategory").value = "";
  document.getElementById("customStorage").value = "ambient";
  document.getElementById("addModal").classList.add("active");
});

document.getElementById("confirmAddBtn").addEventListener("click", () => {
  const catId = document.getElementById("catalogSelect").value;
  const customName = document.getElementById("customName").value.trim();

  if (catId) {
    const a = ALCOHOL_CATALOG.find(x => x.id === catId);
    state.alcohols[a.id] = { name: a.name, category: a.category, storage: a.storage, desc: a.desc, quantity: 1 };
  } else if (customName) {
    const id = "custom_" + Date.now();
    state.alcohols[id] = {
      name: customName,
      category: document.getElementById("customCategory").value.trim() || "Autre",
      storage: document.getElementById("customStorage").value,
      desc: "",
      quantity: 1
    };
  } else {
    alert("Choisissez un alcool ou entrez un nom personnalisé.");
    return;
  }
  save();
  renderCave();
  document.getElementById("addModal").classList.remove("active");
});

// ====== BIÈRES ======
function beerCard(b) {
  return `<div class="alcohol-card" data-id="${b.id}">
    <div class="stock-badge ${b.quantity === 0 ? 'empty' : ''}">${b.quantity}</div>
    <h4>${b.name}</h4>
    <div class="category">${b.type || 'Bière'}</div>
  </div>`;
}

function renderBeers() {
  const empty = document.getElementById("emptyBeers");
  const list = document.getElementById("beerList");
  if (state.beers.length === 0) {
    empty.style.display = "block";
    list.innerHTML = "";
    return;
  }
  empty.style.display = "none";
  list.innerHTML = state.beers.map(beerCard).join("");
  document.querySelectorAll("#beerList .alcohol-card").forEach(card => {
    card.addEventListener("click", () => openBeerModal(card.dataset.id));
  });
}

document.getElementById("addBeerBtn").addEventListener("click", () => {
  document.getElementById("beerName").value = "";
  document.getElementById("beerType").value = "";
  document.getElementById("beerQty").value = 6;
  document.getElementById("addBeerModal").classList.add("active");
});

document.getElementById("confirmAddBeerBtn").addEventListener("click", () => {
  const name = document.getElementById("beerName").value.trim();
  if (!name) { alert("Entrez au moins un nom de bière."); return; }
  state.beers.push({
    id: "beer_" + Date.now(),
    name,
    type: document.getElementById("beerType").value.trim(),
    quantity: Math.max(0, parseInt(document.getElementById("beerQty").value) || 0)
  });
  save();
  renderBeers();
  document.getElementById("addBeerModal").classList.remove("active");
});

function openBeerModal(id) {
  const b = state.beers.find(x => x.id === id);
  if (!b) return;
  currentBeerId = id;
  document.getElementById("beerModalTitle").textContent = b.name;
  document.getElementById("beerModalType").textContent = b.type || "";
  document.getElementById("beerModalStock").textContent = b.quantity;
  document.getElementById("beerModal").classList.add("active");
}

document.querySelectorAll('[data-action="beer-inc"], [data-action="beer-dec"]').forEach(btn => {
  btn.addEventListener("click", () => {
    if (!currentBeerId) return;
    const b = state.beers.find(x => x.id === currentBeerId);
    b.quantity = Math.max(0, b.quantity + (btn.dataset.action === "beer-inc" ? 1 : -1));
    document.getElementById("beerModalStock").textContent = b.quantity;
    save();
    renderBeers();
  });
});

document.getElementById("deleteBeerBtn").addEventListener("click", () => {
  if (!currentBeerId) return;
  if (!confirm("Retirer cette bière ?")) return;
  state.beers = state.beers.filter(b => b.id !== currentBeerId);
  save();
  renderBeers();
  document.getElementById("beerModal").classList.remove("active");
  currentBeerId = null;
});

// ====== RECETTES ======
let currentCat = "all";

function cocktailCard(c) {
  const available = c.ingredients.every(id => state.alcohols[id] && state.alcohols[id].quantity > 0);
  const ingNames = c.ingredients.map(id => {
    return state.alcohols[id]?.name || ALCOHOL_CATALOG.find(x => x.id === id)?.name || id;
  }).join(", ");
  const typeLabel = { classic: "🍸", punch: "🍹", shot: "🥃" }[c.type] || "";
  return `<div class="cocktail-card ${available ? 'available' : ''}">
    <h4>${typeLabel} ${c.name}</h4>
    <div class="ingredients"><strong>Alcools :</strong> ${ingNames}</div>
    ${c.extras ? `<div class="ingredients"><strong>+</strong> ${c.extras}</div>` : ''}
  </div>`;
}

function renderCocktails() {
  const search = document.getElementById("cocktailSearch").value.toLowerCase();
  let list = COCKTAILS;
  if (currentCat !== "all") list = list.filter(c => c.type === currentCat);
  if (search) list = list.filter(c => c.name.toLowerCase().includes(search) || (c.extras && c.extras.toLowerCase().includes(search)));
  document.getElementById("cocktailList").innerHTML = list.map(cocktailCard).join("") || "<p>Aucune recette trouvée.</p>";
}

document.getElementById("cocktailSearch").addEventListener("input", renderCocktails);
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    renderCocktails();
  });
});

// ====== RECHERCHE / ANECDOTES ======
let anecdoteIndex = Math.floor(Math.random() * ANECDOTES.length);
function showAnecdote() {
  document.getElementById("anecdoteText").textContent = ANECDOTES[anecdoteIndex];
  anecdoteIndex = (anecdoteIndex + 1) % ANECDOTES.length;
}
document.getElementById("nextAnecdote").addEventListener("click", showAnecdote);

document.getElementById("globalSearch").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  if (!q) { document.getElementById("searchResults").innerHTML = ""; return; }

  const cats = ALCOHOL_CATALOG.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  const cocktails = COCKTAILS.filter(c => c.name.toLowerCase().includes(q) || (c.extras && c.extras.toLowerCase().includes(q)));

  let html = "";
  if (cats.length) {
    html += `<h3 style="color:#d4af37;margin-bottom:10px">Alcools (catalogue)</h3><div class="alcohol-grid">`;
    html += cats.map(a => `<div class="alcohol-card">
      <h4>${a.name}</h4>
      <div class="category">${a.category}</div>
    </div>`).join("");
    html += `</div>`;
  }
  if (cocktails.length) {
    html += `<h3 style="color:#d4af37;margin:20px 0 10px">Recettes</h3><div class="cocktail-grid">${cocktails.map(cocktailCard).join("")}</div>`;
  }
  if (!cats.length && !cocktails.length) html = "<p>Aucun résultat.</p>";
  document.getElementById("searchResults").innerHTML = html;
});

// ====== INIT ======
renderCave();
renderBeers();
renderCocktails();
showAnecdote();
