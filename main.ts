// main.ts
/**
 * @fileoverview Plugin Obsidian pour colorer le titre inline en fonction d'un propriété YAML
 */
import { Plugin, TFile } from "obsidian";

export default class InlineTitleColorPlugin extends Plugin {
    private styleEl: HTMLStyleElement;

    /**
     * Appelé lors du chargement du pugin
     * Initialise l'élément style et enregistre les événements
     */
    async onload() {
        console.log("Chargement du plugin Inline Title Color");

        this.styleEl = document.createElement("style");
        this.styleEl.id = "inline-title-color-styles";
        document.head.appendChild(this.styleEl);

        this.registerEvent(
            this.app.workspace.on("file-open", (file) => {
                this.updateInlineTitleColor(file);
            }),
        );

        this.registerEvent(
            this.app.metadataCache.on("changed", (file) => {
                if (file === this.app.workspace.getActiveFile()) {
                    this.updateInlineTitleColor(file);
                }
            }),
        );

        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
            this.updateInlineTitleColor(activeFile);
        }
    }

    /**
     * Met à jour la couleur du titre inline en fonction de la propriété YAML
     * @param file - Le fichier actif ou null
     */
    updateInlineTitleColor(file: TFile | null) {
        if (!file) {
            this.styleEl.textContent = "";
            return;
        }

        const cache = this.app.metadataCache.getFileCache(file);
        const frontmatter = cache?.frontmatter;

        if (frontmatter && frontmatter["inline-title-color"]) {
            const color = frontmatter["inline-title-color"];

            if (this.isValidColor(color)) {
                this.styleEl.textContent = `
                    .inline-title {
                        color: ${color} !important;
                    }
                `;
            } else {
                console.warn(`Couleur invalide: ${color}`);
                this.styleEl.textContent = "";
            }
        } else {
            this.styleEl.textContent = "";
        }
    }

    /**
     * Valide si une chaîne est un code couleur CSS valide
     * Supporte les formats hex (#fff, #ffffff), rgb/rgba, et les noms de couleurs CSS.
     *
     * @param color - La chaîne de couleur à valider
     * @returns true si la couleur est valide, false sinon
     */
    isValidColor(color: string): boolean {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbPattern =
            /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;

        return (
            hexPattern.test(color) ||
            rgbPattern.test(color) ||
            CSS.supports("color", color)
        );
    }

    /**
     * Appelé lors du déchargement du plugin
     * Nettoie l'élément style injecté
     */
    onunload() {
        console.log("Déchargement du plugin Inline Title Color");

        if (this.styleEl && this.styleEl.parentNode) {
            this.styleEl.parentNode.removeChild(this.styleEl);
        }
    }
}
