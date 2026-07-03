// ====== CATALOGUE D'ALCOOLS PROPOSÉS ======
// L'utilisateur choisit dans cette liste OU crée son propre alcool custom.
// Le stock démarre vide, il se remplit à la demande.

const ALCOHOL_CATALOG = [
  { id: "vodka", name: "Vodka", category: "Vodka", storage: "ambient", desc: "Spiritueux neutre, base de nombreux cocktails." },
  { id: "gin", name: "Gin", category: "Gin", storage: "ambient", desc: "Spiritueux aromatisé au genièvre." },
  { id: "rhum_blanc", name: "Rhum blanc", category: "Rhum", storage: "ambient", desc: "Rhum non vieilli, idéal en cocktail." },
  { id: "rhum_ambre", name: "Rhum ambré", category: "Rhum", storage: "ambient", desc: "Rhum légèrement vieilli, bon en punch." },
  { id: "rhum_vieux", name: "Rhum vieux", category: "Rhum", storage: "ambient", desc: "Rhum vieilli en fût." },
  { id: "tequila", name: "Tequila", category: "Tequila", storage: "ambient", desc: "Distillat d'agave bleue mexicain." },
  { id: "whisky", name: "Whisky", category: "Whisky", storage: "ambient", desc: "Whisky écossais / single malt." },
  { id: "bourbon", name: "Bourbon", category: "Whisky", storage: "ambient", desc: "Whisky américain à base de maïs." },
  { id: "cognac", name: "Cognac", category: "Cognac", storage: "ambient", desc: "Eau-de-vie de vin française." },
  { id: "triple_sec", name: "Triple sec / Cointreau", category: "Liqueur", storage: "ambient", desc: "Liqueur d'oranges, essentielle." },
  { id: "curacao_bleu", name: "Curaçao bleu", category: "Liqueur", storage: "ambient", desc: "Liqueur d'orange bleue." },
  { id: "amaretto", name: "Amaretto", category: "Liqueur", storage: "ambient", desc: "Liqueur italienne aux amandes." },
  { id: "baileys", name: "Baileys", category: "Liqueur", storage: "fridge", desc: "Crème irlandaise au whisky." },
  { id: "kahlua", name: "Kahlúa", category: "Liqueur", storage: "ambient", desc: "Liqueur de café." },
  { id: "malibu", name: "Malibu", category: "Liqueur", storage: "ambient", desc: "Liqueur de rhum et coco." },
  { id: "creme_cassis", name: "Crème de cassis", category: "Liqueur", storage: "ambient", desc: "Base du Kir." },
  { id: "grenadine", name: "Grenadine", category: "Sirop/Liqueur", storage: "ambient", desc: "Sirop rouge sucré." },
  { id: "jager", name: "Jägermeister", category: "Liqueur", storage: "fridge", desc: "Liqueur allemande d'herbes, servi frais." },
  { id: "vermouth_rouge", name: "Vermouth rouge", category: "Vermouth", storage: "fridge", desc: "Base du Negroni." },
  { id: "vermouth_blanc", name: "Vermouth blanc (Dry)", category: "Vermouth", storage: "fridge", desc: "Base du Martini." },
  { id: "campari", name: "Campari", category: "Apéritif", storage: "ambient", desc: "Amer italien rouge." },
  { id: "aperol", name: "Aperol", category: "Apéritif", storage: "ambient", desc: "Star du Spritz." },
  { id: "pastis", name: "Pastis", category: "Apéritif", storage: "ambient", desc: "Anisé provençal." },
  { id: "champagne", name: "Champagne", category: "Effervescent", storage: "fridge", desc: "Vin de fête." },
  { id: "prosecco", name: "Prosecco", category: "Effervescent", storage: "fridge", desc: "Bulles italiennes." },
  { id: "vin_blanc", name: "Vin blanc sec", category: "Vin", storage: "fridge", desc: "Utile en cocktail et cuisine." },
  { id: "vin_rouge", name: "Vin rouge", category: "Vin", storage: "ambient", desc: "Base de la sangria." },
];

// ====== RECETTES ======
// type: "classic" | "punch" | "shot"

const COCKTAILS = [
  // === CLASSIQUES ===
  { name: "Mojito", type: "classic", ingredients: ["rhum_blanc"], extras: "Menthe, citron vert, sucre, eau gazeuse" },
  { name: "Margarita", type: "classic", ingredients: ["tequila", "triple_sec"], extras: "Citron vert, sel" },
  { name: "Piña Colada", type: "classic", ingredients: ["rhum_blanc", "malibu"], extras: "Ananas, crème de coco" },
  { name: "Cuba Libre", type: "classic", ingredients: ["rhum_blanc"], extras: "Coca, citron vert" },
  { name: "Gin Tonic", type: "classic", ingredients: ["gin"], extras: "Tonic, citron" },
  { name: "Negroni", type: "classic", ingredients: ["gin", "vermouth_rouge", "campari"], extras: "Zeste d'orange" },
  { name: "Moscow Mule", type: "classic", ingredients: ["vodka"], extras: "Ginger beer, citron vert" },
  { name: "Cosmopolitan", type: "classic", ingredients: ["vodka", "triple_sec"], extras: "Cranberry, citron vert" },
  { name: "Bloody Mary", type: "classic", ingredients: ["vodka"], extras: "Jus de tomate, épices, céleri" },
  { name: "Spritz Aperol", type: "classic", ingredients: ["aperol", "prosecco"], extras: "Eau gazeuse, orange" },
  { name: "Old Fashioned", type: "classic", ingredients: ["bourbon"], extras: "Sucre, angostura, zeste d'orange" },
  { name: "Whiskey Sour", type: "classic", ingredients: ["bourbon"], extras: "Citron, sucre, blanc d'œuf" },
  { name: "Tequila Sunrise", type: "classic", ingredients: ["tequila"], extras: "Jus d'orange, grenadine" },
  { name: "Kir Royal", type: "classic", ingredients: ["creme_cassis", "champagne"], extras: "—" },
  { name: "Mimosa", type: "classic", ingredients: ["champagne"], extras: "Jus d'orange" },

  // === PUNCHS ===
  { name: "Punch Planteur", type: "punch", ingredients: ["rhum_ambre"], extras: "Jus d'orange, ananas, goyave, sirop de canne, muscade" },
  { name: "Punch Coco", type: "punch", ingredients: ["rhum_blanc"], extras: "Lait de coco, lait concentré sucré, cannelle" },
  { name: "Ti' Punch", type: "punch", ingredients: ["rhum_blanc"], extras: "Citron vert, sucre de canne" },
  { name: "Punch Antillais", type: "punch", ingredients: ["rhum_ambre"], extras: "Jus d'orange, ananas, grenadine, cannelle" },
  { name: "Punch Fruits Rouges", type: "punch", ingredients: ["rhum_blanc", "creme_cassis"], extras: "Fraises, framboises, jus de cranberry" },
  { name: "Punch Tropical", type: "punch", ingredients: ["rhum_blanc", "malibu"], extras: "Jus d'ananas, mangue, fruit de la passion" },
  { name: "Sangria Rouge", type: "punch", ingredients: ["vin_rouge", "triple_sec"], extras: "Orange, citron, pomme, cannelle, sucre" },
  { name: "Sangria Blanche", type: "punch", ingredients: ["vin_blanc", "triple_sec"], extras: "Pêche, fruits blancs, menthe" },
  { name: "Punch Vodka Pastèque", type: "punch", ingredients: ["vodka"], extras: "Pastèque mixée, citron vert, menthe" },
  { name: "Punch Whisky Miel", type: "punch", ingredients: ["bourbon"], extras: "Miel, jus de citron, thé noir, orange" },

  // === SHOTS / FLASH ===
  { name: "B-52", type: "shot", ingredients: ["kahlua", "baileys", "triple_sec"], extras: "En couches, flambé optionnel" },
  { name: "Kamikaze", type: "shot", ingredients: ["vodka", "triple_sec"], extras: "Citron vert" },
  { name: "Jägerbomb", type: "shot", ingredients: ["jager"], extras: "Verre de shot lâché dans Red Bull" },
  { name: "Baby Guinness", type: "shot", ingredients: ["kahlua", "baileys"], extras: "Effet Guinness miniature" },
  { name: "Tequila Paf", type: "shot", ingredients: ["tequila"], extras: "Limonade, tape sur la table" },
  { name: "Flatliner", type: "shot", ingredients: ["tequila"], extras: "Sambuca, tabasco (3 couches)" },
  { name: "Green Mexican", type: "shot", ingredients: ["tequila", "curacao_bleu"], extras: "Jus d'orange" },
  { name: "Sex on the Beach Shot", type: "shot", ingredients: ["vodka"], extras: "Cranberry, pêche, orange" },
  { name: "Orgasm", type: "shot", ingredients: ["amaretto", "baileys", "kahlua"], extras: "Crème" },
  { name: "Cactus", type: "shot", ingredients: ["tequila", "curacao_bleu"], extras: "Citron vert" },
  { name: "Melon Ball", type: "shot", ingredients: ["vodka"], extras: "Liqueur de melon, jus d'ananas" },
  { name: "Ice Pick", type: "shot", ingredients: ["vodka"], extras: "Thé glacé, citron" },
];

const ANECDOTES = [
  "Le Negroni a été inventé en 1919 à Florence par le Comte Camillo Negroni qui demanda à son barman de renforcer son Americano avec du gin.",
  "Le mot 'cocktail' apparaîtrait pour la première fois en 1806 dans un journal américain, désignant un mélange d'alcool, sucre, eau et bitters.",
  "Le Mojito viendrait de Cuba et aurait été apprécié par Ernest Hemingway au bar La Bodeguita del Medio à La Havane.",
  "Eviter d'acheter du cidre, Olivier n'aime pas.",
  "Le Martini Dry est né à la fin du XIXe siècle, mais James Bond l'a rendu culte avec sa réplique 'shaken, not stirred'.",
  "Le nom 'Bourbon' vient du comté de Bourbon dans le Kentucky, lui-même nommé en hommage à la dynastie française.",
  "L'absinthe fut interdite en France de 1915 à 2011 à cause de la thuyone, prétendument hallucinogène.",
  "Le Spritz vient d'Autriche : les soldats trouvaient le vin italien trop fort et demandaient à le diluer ('spritzen' = éclabousser).",
  "L'alcool contient des hormones féminines, c'est pour ça qu'il est déconseiller de boire au volant.",
  "Dans alcool y a le mot cool.",
  "Le B-52 doit son nom au bombardier américain, à cause de son 'explosion' de saveurs (café, crème, orange).",
  // 👉 Ajoute ici tes anecdotes personnelles !
];
