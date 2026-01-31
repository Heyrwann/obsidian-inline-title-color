// main.ts
import { Plugin, TFile } from 'obsidian';

export default class InlineTitleColorPlugin extends Plugin {
    private styleEl: HTMLStyleElement;

    async onload() {
        console.log('Chargement du plugin Inline Title Color');
        
        // Créer un élément style pour le CSS dynamique
        this.styleEl = document.createElement('style');
        this.styleEl.id = 'inline-title-color-styles';
        document.head.appendChild(this.styleEl);

        // Mettre à jour les styles quand un fichier est ouvert
        this.registerEvent(
            this.app.workspace.on('file-open', (file) => {
                this.updateInlineTitleColor(file);
            })
        );

        // Mettre à jour les styles quand les métadonnées changent
        this.registerEvent(
            this.app.metadataCache.on('changed', (file) => {
                if (file === this.app.workspace.getActiveFile()) {
                    this.updateInlineTitleColor(file);
                }
            })
        );

        // Appliquer pour le fichier actuel au chargement
        const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
            this.updateInlineTitleColor(activeFile);
        }
    }

    updateInlineTitleColor(file: TFile | null) {
        if (!file) {
            this.styleEl.textContent = '';
            return;
        }

        // Récupérer les métadonnées du fichier
        const cache = this.app.metadataCache.getFileCache(file);
        const frontmatter = cache?.frontmatter;

        if (frontmatter && frontmatter['inline-title-color']) {
            const color = frontmatter['inline-title-color'];
            
            // Vérifier que c'est un code couleur valide
            if (this.isValidColor(color)) {
                this.styleEl.textContent = `
                    .inline-title {
                        color: ${color} !important;
                    }
                `;
            } else {
                console.warn(`Couleur invalide: ${color}`);
                this.styleEl.textContent = '';
            }
        } else {
            // Pas de propriété définie, retirer les styles
            this.styleEl.textContent = '';
        }
    }

    isValidColor(color: string): boolean {
        // Validation basique pour hex, rgb, rgba, noms de couleurs
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbPattern = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)$/;
        
        return hexPattern.test(color) || rgbPattern.test(color) || CSS.supports('color', color);
    }

    onunload() {
        console.log('Déchargement du plugin Inline Title Color');
        
        // Nettoyer l'élément style
        if (this.styleEl && this.styleEl.parentNode) {
            this.styleEl.parentNode.removeChild(this.styleEl);
        }
    }
}