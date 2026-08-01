# soft boiled egg club

Application Vue 3 + TypeScript + Vite pour rechercher un restaurant, commerce de bouche ou
bar/café à Paris. Données statiques (pas de backend), déployée sur GitHub Pages.

## Développement

```bash
npm install
npm run dev      # serveur de dev
npm run build    # vérifie les types (vue-tsc) puis build de prod dans dist/
npm run test     # tests Vitest
npm run lint     # ESLint
```

## Pipeline de données

Les fiches affichées par le site (`src/data/restaurants.json`) sont générées à partir d'un
CSV édité à la main, puis les photos sont converties en vignettes optimisées. Les deux étapes
sont pilotées par [main.py](main.py) (nécessite `uv sync` ou `pip install -e .` pour installer
les dépendances Python listées dans [pyproject.toml](pyproject.toml)).

1. **CSV → JSON** : lit un export CSV (colonnes `id, lat, long, name, city, craving, tags, addresse`),
   géocode les adresses sans coordonnées via Nominatim (OpenStreetMap), et écrit
   `src/data/restaurants.json` + `src/api/processed-data.csv`.

   ```bash
   python main.py csv-to-json --csv "src/api/egg-database - 01-08-2026.csv"
   ```

2. **Photos → vignettes** : à partir d'un dossier de photos sources (non versionné dans le repo,
   nommées `{id}.jpg`), génère pour chaque adresse deux tailles (400px, 800px) en JPEG et WebP
   dans `public/restaurant_pictures/`.

   ```bash
   python main.py images --input-folder "chemin/vers/les/photos"
   ```

   Le script affiche en fin d'exécution les identifiants d'adresses sans photo correspondante.

## Déploiement

Le site est buildé statiquement (`npm run build`) et publié sur GitHub Pages (domaine personnalisé
défini dans [CNAME](CNAME)). [public/404.html](public/404.html) redirige vers `index.html` pour que
le routage côté client (`vue-router`) fonctionne malgré l'absence de serveur applicatif.
