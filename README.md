# Nosfac Studios — site officiel

Site vitrine et catalogue de projets de Nosfac Studios. Next.js (App Router) + TypeScript strict +
Tailwind CSS + shadcn/ui (primitives Radix) + Motion. Contenu piloté par fichiers dans `content/`.

> La source de vérité produit, design et technique est [`docs/MASTER_SPECIFICATION.md`](docs/MASTER_SPECIFICATION.md).
> Toute évolution importante doit commencer par une mise à jour de ce document.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Copier `.env.example` vers `.env.local` pour activer les intégrations optionnelles (e-mail réel,
Turnstile). Sans ces variables, le site fonctionne en local avec un adaptateur e-mail qui journalise
les messages au lieu de les envoyer (voir `src/services/email`).

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript strict, aucune émission |
| `npm run content:validate` | Valide tous les fichiers de `content/` contre les schémas Zod |
| `npm test` | Tests unitaires et de composants (Vitest) |
| `npm run e2e` | Tests end-to-end et accessibilité (Playwright) |
| `npm run verify` | Enchaîne lint, typecheck, contenu, tests et build |

## Ajouter un projet

Voir `docs/MASTER_SPECIFICATION.md` section 12.2 : copier `templates/project.template.mdx` vers
`content/projects/{slug}.mdx`, remplir les champs sans inventer de fait, puis
`npm run content:validate`. Aucune modification de composant n'est nécessaire.

## Déploiement

GitHub + Vercel (previews par branche, production depuis `main`). Le build reste compatible Node
standard (`next build && next start`) pour rester portable hors Vercel.
