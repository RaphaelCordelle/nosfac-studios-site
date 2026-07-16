# Informations légales bloquantes

**Dernière mise à jour** : 16 juillet 2026  
**Objectif** : Lister toutes les informations manquantes ou incertaines qui DOIVENT être fournies avant le lancement commercial de chaque projet.

Ce document est **interne**. Les informations listées ici ne doivent JAMAIS apparaître publiquement sur le site avec des mentions "à compléter".

---

## Statut juridique actuel du studio (confirmé)

- Nosfac Studios est un **nom public de studio et de projet**, exploité par une **personne physique** à titre non professionnel.
- **Aucune société** n'est constituée à ce jour et **aucun SIREN/SIRET** ne doit être inventé ni affiché.
- Public de contact : `nosfac.studios@gmail.com`.
- Hébergement du site : Vercel.
- Base de données principale de Chain : Supabase, région **eu-west-1 (Irlande)**.
- Public cible retenu pour Chain, KnowOut et le jeu musical : **16 ans et plus**.
- Tranches Play Console pour Chain : **16-17 ans** et **18 ans et plus**.
- Chain n'est ni conçu ni commercialisé à destination des enfants.
- Le site est en **phase de présentation et de préparation** ; il n'est pas juridiquement prêt pour un lancement commercial.

Ce statut est reflété par `LEGAL_STATUS = "individual-non-professional"` dans `src/config/legal.ts`.

---

## A. Informations à statuer AVANT lancement commercial

### A1. Décision de structure juridique

Le lancement commercial (achats intégrés, publicité, distribution rémunérée) suppose de choisir un statut :

- [ ] **Micro-entreprise / entrepreneur individuel** → passer `LEGAL_STATUS = "sole-trader"` puis remplir dans `src/config/legal.ts` :
  - `LEGAL_IDENTITY.legalName` (nom et prénom du fondateur)
  - `LEGAL_IDENTITY.postalAddress` (adresse professionnelle — voir A2)
  - `LEGAL_IDENTITY.siren`, `LEGAL_IDENTITY.siret`
  - `LEGAL_IDENTITY.rneRegistration` (inscription RNE)
  - `LEGAL_IDENTITY.publicationDirector`
- [ ] **Société (SASU, SARL, SAS…)** → passer `LEGAL_STATUS = "company"` puis remplir en plus :
  - `LEGAL_IDENTITY.legalForm`, `LEGAL_IDENTITY.rcsRegistration`
  - `LEGAL_IDENTITY.vatNumber` si applicable

Tant que la décision n'est pas prise, la mention légale reste rédigée en mode "personne physique non professionnelle" et aucun numéro d'immatriculation n'apparaît sur le site.

### A2. Adresse postale professionnelle

- [ ] Adresse à faire figurer sur les mentions légales dès qu'un statut pro est adopté.
- **Rappel** : l'adresse personnelle du fondateur NE DOIT PAS être publiée. Utiliser au choix une adresse de domiciliation, une boîte postale professionnelle, ou l'adresse déclarée au RNE (visible publiquement).

---

## B. CHAIN

### Confirmé (à date)
- Backend Supabase, région **eu-west-1 (Irlande)**.
- Aucune publicité, aucun SDK publicitaire embarqué.
- Aucun achat intégré activé publiquement.
- Public cible : 16 ans et plus (Play Console : tranches 16-17 et 18+).
- Classification PEGI/IARC obtenue séparément via le questionnaire Play Console.

### À vérifier / finaliser avant publication
- [ ] **Offre Supabase utilisée** — Gratuite / Pro / Enterprise (impacte la rétention des logs et les engagements DPA).
- [ ] **Row Level Security** — Réellement activée et testée sur toutes les tables.
- [ ] **Fonctionnalités du build de sortie** — cocher UNIQUEMENT si présent dans le build de sortie publique :
  - [ ] Liste d'amis
  - [ ] Chat / messagerie
  - [ ] Profils publics
  - [ ] Liens de parrainage
  - [ ] Codes de salon privés
  - [ ] Signalements / modération
  - [ ] Blocages de joueurs
  - [ ] Abonnement Premium (si activé, ajouter dans `products.ts.CHAIN`)
  - [ ] Achats intégrés (si activés, `hasInAppPurchases: true`)
  - [ ] Publicité (si SDK ajouté, `hasAdvertising: true` + mapping AdMob à ajouter)
- [ ] **Suppression de compte in-app** — Existe-t-elle réellement dans la version publiée ? Si oui, chemin exact dans l'app. Mettre à jour `products.ts.CHAIN.hasInAppDeletion` + `inAppDeletionPath`.
- [ ] **Mécanisme technique de suppression** — Réellement immédiate et complète ? Quelles données subsistent (sauvegardes, logs, obligations comptables) ?
- [ ] **Google Play Install Referrer** — Confirmer si implémenté dans le build Android actuel. Si oui, ajouter à la déclaration Play Console.
- [ ] **Rétention comptable** — Confirmer avec expert-comptable la durée obligatoire des reçus d'achat (potentiellement 10 ans) une fois les IAP activés.

---

## C. KNOWOUT

Projet en développement — **rien n'est publiquement actif à ce jour**.

Public cible retenu : **16 ans et plus** (déjà consigné dans `products.ts`).

Éléments à finaliser avant la publication :
- [ ] Existence ou non d'un compte utilisateur
- [ ] Système de scores et classements
- [ ] Modes multijoueur retenus (Solo / Duel / Battle Royale / Privé)
- [ ] Serveur ou peer-to-peer pour le multijoueur
- [ ] Achats intégrés
- [ ] Publicités
- [ ] Signalements / modération
- [ ] Prestataires backend (Supabase ? Firebase ? Autre ?)

Une fois ces choix arrêtés, mettre à jour `src/config/products.ts.KNOWOUT` avec les vraies données.

---

## D. JEU MUSICAL (nom en cours)

Projet en développement — **nom définitif non choisi**.

Public cible retenu : **16 ans et plus** (déjà consigné dans `products.ts`).

À finaliser :
- [ ] Nom définitif du projet (jusque-là, garder `Jeu musical` comme nom d'affichage temporaire dans `products.ts.MUSIC_GAME.displayName`)
- [ ] Sources musicales utilisées (paroles, extraits, catalogues) — sous quelle licence ?
- [ ] API externes (Spotify Web API, Deezer, YouTube Data API, MusicBrainz…)
- [ ] Contenus soumis par l'utilisateur (mots, propositions, historique)
- [ ] Compte utilisateur
- [ ] Historique d'écoute
- [ ] Achats / abonnement
- [ ] Publicité

⚠️ **Attention licensing** : ne jamais publier de paroles, mélodies ou extraits musicaux sans licence vérifiée.

---

## E. Site Nosfac Studios

### Analytics
- [ ] **Si analytics est activé plus tard** — quel outil ? Quelles données ? Cookie banner nécessaire ?
- [ ] Documentation à ajouter dans `/legal/cookies` avant activation.

### Formulaire de contact
- [ ] **Pièces jointes** — Si implémentées, où sont-elles stockées et pour combien de temps ?

### Hébergeur
- [ ] **Coordonnées Vercel** — Vérifier annuellement sur https://vercel.com/legal.

---

## F. Google Play — Éléments à vérifier avant publication de Chain

- [ ] Politique de confidentialité **publique** et **accessible sans compte**.
- [ ] URL directe vers ancre `#chain` fonctionnelle.
- [ ] URL `/suppression-compte#chain` fonctionnelle.
- [ ] Formulaire "Sécurité des données" cohérent avec `products.ts.CHAIN`.
- [ ] Classification IARC obtenue via le questionnaire.
- [ ] Tranches d'âge cible déclarées : 16-17 ans et 18 ans et plus.
- [ ] Permissions Android déclarées.

---

## G. Apple App Store — Éléments à vérifier avant publication de Chain

- [ ] App Privacy filled cohérent avec `products.ts.CHAIN`.
- [ ] Age rating cohérent avec le public 16+.
- [ ] Account deletion : requis depuis iOS 5 juin 2022 — méthode web `/suppression-compte#chain` acceptée si l'in-app deletion n'est pas encore présente.
- [ ] EULA custom si différent de la version standard Apple.

---

## H. Transferts hors Espace économique européen

Pour chaque prestataire, obtenir et archiver le DPA :

- [ ] **Vercel** — DPA + garanties (clauses contractuelles types).
- [ ] **Supabase** — DPA + confirmation eu-west-1 + garanties.
- [ ] **Resend** — DPA (si formulaire actif).
- [ ] **Cloudflare** — DPA (si Turnstile actif).
- [ ] **Google Play** — Se référer à Google Cloud DPA.

---

## Contact

Pour toute question sur ce document : nosfac.studios@gmail.com
