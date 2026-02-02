# Inline Title Color

Un plugin Obsidian qui permet de colorer le titre inline de vos notes en utilisant une propriété YAML personnalisée.

![Obsidian](https://img.shields.io/badge/Obsidian-Plugin-purple)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Description

Ce plugin vous permet de personnaliser la couleur du titre inline (le titre affiché en haut de la note) en ajoutant simplement une propriété `inline-title-color` dans le frontmatter YAML de vos notes.

Vous pouvez activer le title inline dans Paramètres > Apparence > Interface > "Afficher le titre comme entête".

## Fonctionnalités

- Colorer le titre inline avec n'importe quelle couleur CSS valide
- Mise à jour automatique lors du changement de fichier
- Mise à jour en temps réel lors de la modification des propriétés YAML
- Validation des codes couleur pour éviter les erreurs

## Installation

### Installation manuelle

1. Téléchargez les derniers fichiers depuis la [page des releases](../../releases)
2. Créez un dossier nommé `obsidian-inline-title-color` dans votre vault Obsidian : `[Vault]/.obsidian/plugins/obsidian-inline-title-color/`
3. Copiez les fichiers `main.js` et `manifest.json` dans ce dossier
4. Redémarrez Obsidian
5. Activez le plugin dans : Paramètres → Plugins communautaires

## Utilisation

Ajoutez simplement la propriété `inline-title-color` dans le frontmatter YAML de votre note :

```yaml
---
inline-title-color: "#ff6b6b"
---
```

### Formats de couleur supportés

Le plugin accepte tous les formats de couleur CSS valides :

**Hexadécimal :**

```yaml
inline-title-color: "#ff6b6b"
inline-title-color: "#f00"
```

**RGB / RGBA :**

```yaml
inline-title-color: "rgb(255, 107, 107)"
inline-title-color: "rgba(255, 107, 107, 0.8)"
```

**Noms de couleurs CSS :**

```yaml
inline-title-color: "crimson"
inline-title-color: "dodgerblue"
inline-title-color: "forestgreen"
```

## Exemples

### Exemple 1 : Note avec titre rouge

```yaml
---
inline-title-color: "#e74c3c"
---
# Ma note importante
```

### Exemple 2 : Note avec titre bleu

```yaml
---
inline-title-color: "dodgerblue"
---
# Documentation technique
```

### Exemple 3 : Note avec titre personnalisé RGBA

```yaml
---
inline-title-color: "rgba(156, 89, 209, 0.9)"
---
# Projet créatif
```

## Développement

### Prérequis

- Node.js (v16 ou supérieur)
- npm

### Configuration de l'environnement de développement

1. Clonez le dépôt
2. Installez les dépendances :

```bash
npm install
```

3. Lancez le mode développement (compilation automatique) :

```bash
npm run dev
```

4. Pour créer une version de production :

```bash
npm run build
```

### Structure du projet

```
obsidian-inline-title-color/
├── main.ts              # Code source principal
├── manifest.json        # Métadonnées du plugin
├── package.json         # Dépendances npm
├── tsconfig.json        # Configuration TypeScript
├── esbuild.config.mjs   # Configuration de build
└── README.md            # Documentation
```

## Signaler un bug

Si vous rencontrez un problème, veuillez ouvrir une [issue](../../issues) avec :

- Une description claire du problème
- Les étapes pour le reproduire
- Votre version d'Obsidian
- La version du plugin

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Remerciements

Merci à l'équipe Obsidian pour leur excellent outil

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Note :** Ce plugin modifie uniquement l'apparence visuelle du titre inline et n'affecte pas le contenu de vos notes.
