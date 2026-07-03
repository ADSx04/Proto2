// ====== BASE DE DONNÉES ======
// Emplacement: "fridge" (frigo) ou "ambient" (température ambiante)
// tasting: true = à déguster pur uniquement

const ALCOHOLS = [
  // SPIRITUEUX BLANCS - ambiants
  { id: "vodka", name: "Vodka", category: "Vodka", storage: "ambient", desc: "Spiritueux neutre, base de nombreux cocktails." },
  { id: "gin", name: "Gin", category: "Gin", storage: "ambient", desc: "Spiritueux aromatisé au genièvre." },
  { id: "rhum_blanc", name: "Rhum blanc", category: "Rhum", storage: "ambient", desc: "Rhum non vieilli, idéal en cocktail." },
  { id: "tequila", name: "Tequila blanco", category: "Tequila", storage: "ambient", desc: "Distillat d'agave bleue mexicain." },
  { id: "mezcal", name: "Mezcal", category: "Tequila", storage: "ambient", desc: "Cousin fumé de la tequila." },
  { id: "cachaca", name: "Cachaça", category: "Rhum", storage: "ambient", desc: "Eau-de-vie brésilienne de canne à sucre." },

  // SPIRITUEUX BRUNS
  { id: "whisky", name: "Whisky écossais", category: "Whisky", storage: "ambient", tasting: true, desc: "Single malt à déguster pur." },
  { id: "bourbon", name: "Bourbon", category: "Whisky", storage: "ambient", desc: "Whisky américain à base de maïs." },
  { id: "rye", name: "Rye Whiskey", category: "Whisky", storage: "ambient", desc: "Whisky de seigle, épicé." },
  { id: "rhum_ambre", name: "Rhum ambré", category: "Rhum", storage: "ambient", desc: "Rhum légèrement vieilli." },
  { id: "rhum_vieux", name: "Rhum vieux", category: "Rhum", storage: "ambient", tasting: true, desc: "Rhum vieilli en fût, à savourer." },
  { id: "cognac", name: "Cognac", category: "Cognac/Armagnac", storage: "ambient", tasting: true, desc: "Eau-de-vie de vin, région de Cognac." },
  { id: "armagnac", name: "Armagnac", category: "Cognac/Armagnac", storage: "ambient", tasting: true, desc: "Plus ancienne eau-de-vie de France." },
  { id: "calvados", name: "Calvados", category: "Eaux-de-vie", storage: "ambient", tasting: true, desc: "Eau-de-vie de pommes normande." },

  // LIQUEURS
  { id: "triple_sec", name: "Triple sec / Cointreau", category: "Liqueur", storage: "ambient", desc: "Liqueur d'oranges, essentielle." },
  { id: "curacao_bleu", name: "Curaçao bleu", category: "Liqueur", storage: "ambient", desc: "Liqueur d'orange colorée en bleu." },
  { id: "amaretto", name: "Amaretto", category: "Liqueur", storage: "ambient", desc: "Liqueur italienne aux amandes." },
  { id: "baileys", name: "Baileys", category: "Liqueur", storage: "fridge", desc: "Crème irlandaise au whisky. Conservation au frais." },
  { id: "kahlua", name: "Kahlúa", category: "Liqueur", storage: "ambient", desc: "Liqueur de café mexicaine." },
  { id: "malibu", name: "Malibu", category: "Liqueur", storage: "ambient", desc: "Liqueur de rhum et coco." },
  { id: "chartreuse", name: "Chartreuse verte", category: "Liqueur", storage: "ambient", tasting: true, desc: "Liqueur de plantes des moines chartreux." },
  { id: "limoncello", name: "Limoncello", category: "Liqueur", storage: "fridge", desc: "Liqueur de citron italienne, servie glacée." },
  { id: "creme_cassis", name: "Crème de cassis", category: "Liqueur", storage: "ambient", desc: "Base du Kir." },
  { id: "creme_menthe", name: "Crème de menthe", category: "Liqueur", storage: "ambient", desc: "Liqueur mentholée verte." },
  { id: "sambuca", name: "Sambuca", category: "Liqueur", storage: "ambient", desc: "Liqueur italienne à l'anis." },
  { id: "grand_marnier", name: "Grand Marnier", category: "Liqueur", storage: "ambient", desc: "Cognac et oranges amères." },

  // VERMOUTHS & APÉRITIFS
  { id: "vermouth_rouge", name: "Vermouth rouge", category: "Vermouth", storage: "fridge", desc: "Base du Manhattan et Negroni." },
  { id: "vermouth_blanc", name: "Vermouth blanc (Dry)", category: "Vermouth", storage: "fridge", desc: "Base du Martini Dry." },
  { id: "campari", name: "Campari", category: "Apéritif", storage: "ambient", desc: "Amer italien rouge." },
  { id: "aperol", name: "Aperol", category: "Apéritif", storage: "ambient", desc: "Star du Spritz." },
  { id: "pastis", name: "Pastis", category: "Apéritif", storage: "ambient", desc: "Anisé provençal." },
  { id: "lillet", name: "Lillet Blanc", category: "Apéritif", storage: "fridge", desc: "Apéritif à base de vin de Bordeaux." },
  { id: "sherry", name: "Sherry (Xérès)", category: "Vins fortifiés", storage: "fridge", desc: "Vin fortifié espagnol." },
  { id: "porto", name: "Porto", category: "Vins fortifiés", storage: "fridge", desc: "Vin fortifié portugais." },

  // VINS & BULLES
  { id: "champagne", name: "Champagne", category: "Vins effervescents", storage: "fridge", desc: "Vin de fête par excellence." },
  { id: "prosecco", name: "Prosecco", category: "Vins effervescents", storage: "fridge", desc: "Bulles italiennes légères." },
  { id: "cremant", name: "Crémant", category: "Vins effervescents", storage: "fridge", desc: "Bulles françaises hors Champagne." },
  { id: "vin_blanc", name: "Vin blanc sec", category: "Vin", storage: "fridge", desc: "Utile en cuisine et cocktails." },

  // BIÈRES
  { id: "biere_blonde", name: "Bière blonde", category: "Bière", storage: "fridge", desc: "Rafraîchissante et légère." },
  { id: "biere_ipa", name: "IPA", category: "Bière", storage: "fridge", desc: "Bière houblonnée et amère." },
  { id: "biere_stout", name: "Stout", category: "Bière", storage: "fridge", tasting: true, desc: "Bière noire riche (Guinness)." },

  // EAUX-DE-VIE / DÉGUSTATION
  { id: "absinthe", name: "Absinthe", category: "Eaux-de-vie", storage: "ambient", desc: "La fée verte, avec cérémonie." },
  { id: "grappa", name: "Grappa", category: "Eaux-de-vie", storage: "ambient", tasting: true, desc: "Marc italien après-repas." },
  { id: "eau_vie_poire", name: "Eau-de-vie de poire", category: "Eaux-de-vie", storage: "ambient", tasting: true, desc: "Fine bouche fruitée." },
  { id: "kirsch", name: "Kirsch", category: "Eaux-de-vie", storage: "ambient", desc: "Eau-de-vie de cerise." },

  // SAKÉ
  { id: "sake", name: "Saké", category: "Saké", storage: "fridge", tasting: true, desc: "Alcool de riz japonais, servi frais." },
];

const COCKTAILS = [
  { name: "Mojito", ingredients: ["rhum_blanc"], extras: "Menthe, citron vert, sucre, eau gazeuse" },
  { name: "Caipirinha", ingredients: ["cachaca"], extras: "Citron vert, sucre" },
  { name: "Daïquiri", ingredients: ["rhum_blanc"], extras: "Citron vert, sirop de sucre" },
  { name: "Piña Colada", ingredients: ["rhum_blanc", "malibu"], extras: "Ananas, crème de coco" },
  { name: "Cuba Libre", ingredients: ["rhum_blanc"], extras: "Coca, citron vert" },
  { name: "Ti' Punch", ingredients: ["rhum_blanc"], extras: "Citron vert, sucre de canne" },

  { name: "Gin Tonic", ingredients: ["gin"], extras: "Tonic, citron" },
  { name: "Negroni", ingredients: ["gin", "vermouth_rouge", "campari"], extras: "Zeste d'orange" },
  { name: "Martini Dry", ingredients: ["gin", "vermouth_blanc"], extras: "Olive ou zeste de citron" },
  { name: "Tom Collins", ingredients: ["gin"], extras: "Citron, sucre, eau gazeuse" },
  { name: "French 75", ingredients: ["gin", "champagne"], extras: "Citron, sucre" },
  { name: "Bramble", ingredients: ["gin", "creme_cassis"], extras: "Citron, sucre" },

  { name: "Moscow Mule", ingredients: ["vodka"], extras: "Ginger beer, citron vert" },
  { name: "Bloody Mary", ingredients: ["vodka"], extras: "Jus de tomate, épices, céleri" },
  { name: "Cosmopolitan", ingredients: ["vodka", "triple_sec"], extras: "Cranberry, citron vert" },
  { name: "Espresso Martini", ingredients: ["vodka", "kahlua"], extras: "Espresso, sirop de sucre" },
  { name: "Sea Breeze", ingredients: ["vodka"], extras: "Cranberry, pamplemousse" },
  { name: "White Russian", ingredients: ["vodka", "kahlua"], extras: "Crème" },

  { name: "Margarita", ingredients: ["tequila", "triple_sec"], extras: "Citron vert, sel" },
  { name: "Tequila Sunrise", ingredients: ["tequila"], extras: "Jus d'orange, grenadine" },
  { name: "Paloma", ingredients: ["tequila"], extras: "Pamplemousse, citron vert" },
  { name: "Mezcal Mule", ingredients: ["mezcal"], extras: "Ginger beer, citron vert" },

  { name: "Old Fashioned", ingredients: ["bourbon"], extras: "Sucre, angostura, zeste d'orange" },
  { name: "Manhattan", ingredients: ["rye", "vermouth_rouge"], extras: "Angostura, cerise" },
  { name: "Whiskey Sour", ingredients: ["bourbon"], extras: "Citron, sucre, blanc d'œuf" },
  { name: "Mint Julep", ingredients: ["bourbon"], extras: "Menthe, sucre" },
  { name: "Boulevardier", ingredients: ["bourbon", "vermouth_rouge", "campari"], extras: "Zeste d'orange" },
  { name: "Penicillin", ingredients: ["whisky"], extras: "Miel, gingembre, citron" },

  { name: "Spritz Aperol", ingredients: ["aperol", "prosecco"], extras: "Eau gazeuse, orange" },
  { name: "Spritz Campari", ingredients: ["campari", "prosecco"], extras: "Eau gazeuse, orange" },
  { name: "Americano", ingredients: ["campari", "vermouth_rouge"], extras: "Eau gazeuse" },
  { name: "Kir Royal", ingredients: ["creme_cassis", "champagne"], extras: "" },
  { name: "Kir", ingredients: ["creme_cassis", "vin_blanc"], extras: "" },
  { name: "Mimosa", ingredients: ["champagne"], extras: "Jus d'orange" },
  { name: "Bellini", ingredients: ["prosecco"], extras: "Purée de pêche" },

  { name: "Sidecar", ingredients: ["cognac", "triple_sec"], extras: "Citron" },
  { name: "French Connection", ingredients: ["cognac", "amaretto"], extras: "" },
  { name: "Sazerac", ingredients: ["cognac", "absinthe"], extras: "Sucre, Peychaud's" },

  { name: "B-52", ingredients: ["kahlua", "baileys", "grand_marnier"], extras: "En couches" },
  { name: "Mudslide", ingredients: ["vodka", "kahlua", "baileys"], extras: "Crème" },
  { name: "Grasshopper", ingredients: ["creme_menthe", "baileys"], extras: "Crème" },
  { name: "Limoncello Spritz", ingredients: ["limoncello", "prosecco"], extras: "Eau gazeuse, menthe" },

  { name: "Sangria blanche", ingredients: ["vin_blanc", "triple_sec"], extras: "Fruits frais" },
  { name: "Porto Tonic", ingredients: ["porto"], extras: "Tonic, citron" },
  { name: "Sherry Cobbler", ingredients: ["sherry"], extras: "Sucre, fruits, glace pilée" },
];

const ANECDOTES = [
  "Le Negroni a été inventé en 1919 à Florence par le Comte Camillo Negroni qui demanda à son barman de renforcer son Americano avec du gin.",
  "Le mot 'cocktail' apparaîtrait pour la première fois en 1806 dans un journal américain, désignant un mélange d'alcool, sucre, eau et bitters.",
  "La Chartreuse verte est fabriquée par des moines depuis 1737 selon une recette secrète connue seulement par deux frères à la fois.",
  "Le Mojito viendrait de Cuba et aurait été apprécié par Ernest Hemingway au bar La Bodeguita del Medio à La Havane.",
  "Le Martini Dry est né à la fin du XIXe siècle, mais James Bond l'a rendu culte avec sa réplique 'shaken, not stirred'.",
  "Le nom 'Bourbon' vient du comté de Bourbon dans le Kentucky, lui-même nommé en hommage à la dynastie française.",
  "L'absinthe fut interdite en France de 1915 à 2011 à cause de la thuyone, prétendument hallucinogène.",
  "Le Spritz vient d'Autriche : les soldats trouvaient le vin italien trop fort et demandaient à le diluer ('spritzen' = éclabousser en allemand).",
  // 👉 Ajoute ici tes anecdotes personnelles !
];