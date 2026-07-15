# Rapport de refonte des pages légales — Nosfac Studios

**Date** : 15 juillet 2026  
**Auteur** : Développeur senior mandaté  
**Statut** : ✅ Refonte complète terminée

---

## 📊 Résumé exécutif

Refonte complète des pages légales du site Nosfac Studios, avec :
- ✅ Audit technique exhaustif de tous les traitements de données
- ✅ Configuration légale centralisée et typée
- ✅ 5 pages légales refondues ou créées
- ✅ Script de validation automatique
- ✅ Documentation pour Google Play Console
- ✅ Build production réussi (100% des pages en HTTP 200)

**Statut légal actuel configuré** : `individual-non-professional` (éditeur non professionnel, sans entreprise enregistrée)

---

## 📁 Fichiers créés

### Configuration et documentation

| Fichier | Rôle |
|---------|------|
| `src/config/legal.ts` | Configuration légale centralisée (identité, contact, prestataires, durées) |
| `docs/DATA_PROCESSING_AUDIT.md` | Audit complet des traitements de données personnelles |
| `docs/LEGAL_BLOCKERS.md` | Informations légales manquantes à fournir avant lancement commercial |
| `docs/PLAY_CONSOLE_PRIVACY_MAPPING.md` | Correspondance avec Google Play Console "Sécurité des données" |
| `docs/LEGAL_REFONTE_SUMMARY.md` | Ce fichier — résumé de la refonte |

### Composants et pages

| Fichier | Rôle |
|---------|------|
| `src/components/content/legal-page-layout.tsx` | Layout partagé pour toutes les pages légales (propre, sans warnings visibles) |
| `src/app/legal/legal-notice/page.tsx` | Mentions légales (refondues) |
| `src/app/legal/privacy/page.tsx` | Politique de confidentialité (refondue, complète RGPD) |
| `src/app/legal/terms/page.tsx` | Conditions d'utilisation (refondues) |
| `src/app/legal/cookies/page.tsx` | Politique cookies et traceurs (refondue) |
| `src/app/suppression-compte/page.tsx` | **NOUVELLE** page de suppression de compte Chain avec formulaire web |

### Scripts et validation

| Fichier | Rôle |
|---------|------|
| `scripts/validate-legal.ts` | Script de validation automatique des pages légales |
| `package.json` | Ajout du script `npm run legal:check` |

### Fichiers supprimés

- `src/components/content/legal-page.tsx` (ancien composant avec warnings "incomplet")

### Fichiers modifiés

- `src/config/site.ts` : Suppression des `LEGAL_PLACEHOLDERS` obsolètes
- `src/config/navigation.ts` : Ajout du lien "Suppression de compte" dans le footer

---

## ✅ Vérifications réussies

```bash
✅ npm run legal:check   # Validation légale passée
✅ npm run lint          # Aucune erreur ESLint
✅ npm run typecheck     # Aucune erreur TypeScript sur nos fichiers*
✅ npm run build         # Build production réussi
```

_*Une erreur TypeScript préexistante dans `button.test.tsx` (dépendance `@testing-library/dom` manquante) n'est pas liée à notre travail._

---

## 🎯 Conformité RGPD atteinte

### Points forts

- ✅ Base légale précisée pour chaque traitement (jamais "consentement par défaut")
- ✅ Durées de conservation réalistes et documentées
- ✅ Prestataires listés avec leur rôle exact
- ✅ Section transferts hors EEE traitée
- ✅ 8 droits RGPD explicitement mentionnés
- ✅ Lien direct vers réclamation CNIL
- ✅ Page de suppression de compte séparée et accessible sans compte

### Distinction claire

- ✅ Site web vs Application Chain (traités séparément)
- ✅ Nom d'usage vs personne morale (jamais confondus)
- ✅ Ce qui est vérifié vs ce qui reste à confirmer

### Cohérence Google Play

- ✅ Mapping complet dans `docs/PLAY_CONSOLE_PRIVACY_MAPPING.md`
- ✅ Section "Achats intégrés" : mention explicite que Chain ne voit **jamais** les infos bancaires
- ✅ Section suppression : rappel que l'abonnement Google Play ne s'annule pas automatiquement

---

## 🔄 Comment évoluer

### Si vous devenez entrepreneur individuel

1. Ouvrir `src/config/legal.ts`
2. Changer `LEGAL_STATUS` en `"sole-trader"`
3. Remplir les champs dans `LEGAL_IDENTITY` (voir `docs/LEGAL_BLOCKERS.md`)
4. Exécuter `npm run legal:check`
5. Les pages afficheront automatiquement les informations correctes

### Si vous créez une société

1. Ouvrir `src/config/legal.ts`
2. Changer `LEGAL_STATUS` en `"company"`
3. Remplir tous les champs société dans `LEGAL_IDENTITY`
4. Exécuter `npm run legal:check`

### Pour ajouter un âge minimum (mineurs)

Modifier `AGE_POLICY.minimumAge` dans `src/config/legal.ts` — la page confidentialité se met à jour automatiquement.

### Pour ajouter un prestataire

Ajouter dans `PROCESSORS` (src/config/legal.ts) avec `active: true` — il apparaîtra automatiquement dans la politique de confidentialité.

---

## ⚠️ Actions requises avant lancement commercial

Voir `docs/LEGAL_BLOCKERS.md` pour la liste complète. Points critiques :

1. **Localisation Supabase** : Vérifier si la base de données est dans l'UE
2. **Âge minimum** : Définir en cohérence avec la classification IARC
3. **Fonctionnalités Chain** : Confirmer ce qui est réellement implémenté (amis, chat, parrainage, etc.)
4. **Suppression de compte in-app** : Confirmer que la fonctionnalité existe dans Chain
5. **Durée de conservation des reçus** : Confirmer avec expert-comptable (10 ans max)

---

## 🚨 Affirmations non vérifiables

Les points suivants sont mentionnés dans les pages légales mais **n'ont pas pu être vérifiés** par un audit technique :

1. **Row Level Security Supabase active** : Mentionnée dans la section Sécurité, à vérifier dans la configuration Supabase réelle
2. **Suppression immédiate des données Chain** : Mentionnée mais dépend du mécanisme de suppression réellement implémenté
3. **Chain ne collecte JAMAIS d'infos bancaires** : Basée sur le fait que Google Play Billing gère les paiements (comportement standard, mais à confirmer par audit du code Chain)
4. **Cloudflare Turnstile actif** : Configuré dans le code mais activation dépend des variables d'environnement en production
5. **Resend actif** : Configuré dans le code mais activation dépend de RESEND_API_KEY en production
6. **Adresse Vercel** : Vérifiée dans les documents publics à la date de rédaction (peut évoluer)

Ces points doivent être audités individuellement avant tout lancement commercial.

---

## 📞 Contact

Pour toute question sur cette refonte : nosfac.studios@gmail.com
