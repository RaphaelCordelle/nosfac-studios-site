# Informations légales bloquantes

**Date** : 15 juillet 2026  
**Objectif** : Lister toutes les informations manquantes qui DOIVENT être fournies avant le lancement commercial de chaque projet.

Ce document est **interne**. Les informations listées ici ne doivent JAMAIS apparaître publiquement sur le site avec des mentions "à compléter".

---

## A. Informations communes au studio

Configuration à compléter dans `src/config/legal.ts` selon le statut retenu.

### Si passage en `sole-trader` (entrepreneur individuel / micro-entrepreneur)
- [ ] `LEGAL_IDENTITY.legalName` — Nom et prénom du fondateur
- [ ] `LEGAL_IDENTITY.postalAddress` — Adresse professionnelle
- [ ] `LEGAL_IDENTITY.siren` — Numéro SIREN
- [ ] `LEGAL_IDENTITY.siret` — Numéro SIRET
- [ ] `LEGAL_IDENTITY.rneRegistration` — Inscription RNE
- [ ] `LEGAL_IDENTITY.publicationDirector` — Nom du directeur de publication

### Si création de société
Tous les points ci-dessus PLUS :
- [ ] `LEGAL_IDENTITY.legalForm` — Forme juridique
- [ ] `LEGAL_IDENTITY.rcsRegistration` — Inscription RCS
- [ ] `LEGAL_IDENTITY.vatNumber` — TVA intracommunautaire si applicable

---

## B. CHAIN

### Backend / hébergement
- [ ] **Localisation Supabase** — La base de données Chain est-elle hébergée dans l&apos;UE ou hors UE ? Impact direct sur les transferts hors EEE dans la politique.
- [ ] **Offre Supabase utilisée** — Gratuite / Pro / Enterprise (impacte la rétention des logs).
- [ ] **Row Level Security** — Réellement activée et testée sur toutes les tables ?

### Fonctionnalités à confirmer dans le build de sortie
Pour chaque item ci-dessous : **cocher UNIQUEMENT si présent** dans le build de sortie publique.
- [ ] Liste d&apos;amis
- [ ] Chat / messagerie
- [ ] Profils publics
- [ ] Liens de parrainage
- [ ] Codes de salon privés
- [ ] Signalements / modération
- [ ] Blocages de joueurs
- [ ] Abonnement Premium (si activé, mettre à jour `products.ts.hasSubscription`)
- [ ] Achats intégrés (si activés, `hasInAppPurchases: true`)
- [ ] Publicité (si SDK ajouté, `hasAdvertising: true` + mapping AdMob à ajouter)

### Suppression de compte
- [ ] **Fonction in-app** — Existe-t-elle réellement ? Si oui, chemin exact dans l&apos;app. Mettre à jour `products.ts.hasInAppDeletion` + `inAppDeletionPath`.
- [ ] **Mécanisme technique** — La suppression est-elle réellement immédiate et complète ? Quelles données subsistent (sauvegardes, logs, obligations comptables) ?

### Google Play Install Referrer
- [ ] Confirmer si implémenté dans le build Android actuel
- [ ] Si oui, ajouter à la déclaration Play Console

### Rétention
- [ ] Confirmer avec expert-comptable la durée obligatoire des reçus d&apos;achat (potentiellement 10 ans)

---

## C. KNOWOUT

Projet en développement — **rien n&apos;est publiquement actif à ce jour**.

Ne pas remplir de politique de confidentialité détaillée tant que ces éléments ne sont pas décidés :

- [ ] Existence ou non d&apos;un compte utilisateur
- [ ] Système de scores et classements
- [ ] Multijoueur (Solo / Duel / Battle Royale / Privé — lesquels sont retenus ?)
- [ ] Serveur ou peer-to-peer pour le multijoueur ?
- [ ] Achats intégrés
- [ ] Publicités
- [ ] Signalements / modération
- [ ] Prestataires backend (Supabase ? Firebase ? Autre ?)

**Une fois ces choix arrêtés**, mettre à jour `src/config/products.ts.KNOWOUT` avec les vraies données.

---

## D. JEU MUSICAL (nom en cours)

Projet en développement — **nom définitif non choisi**.

### Nom
- [ ] Nom définitif du projet (jusque-là, garder `Jeu musical` comme nom d&apos;affichage temporaire dans `products.ts.MUSIC_GAME.displayName`)

### Vérifications techniques et légales
- [ ] Sources musicales utilisées (paroles, extraits, catalogues) — sous quelle licence ?
- [ ] API externes (Spotify Web API, Deezer, YouTube Data API, MusicBrainz…)
- [ ] Contenus soumis par l&apos;utilisateur (mots, propositions, historique)
- [ ] Compte utilisateur
- [ ] Historique d&apos;écoute
- [ ] Achats / abonnement
- [ ] Publicité

⚠️ **Attention licensing** : ne jamais publier de paroles, mélodies ou extraits musicaux sans licence vérifiée.

---

## E. Site Nosfac Studios

### Analytics
- [ ] **Si analytics est activé plus tard** — quel outil ? Quelles données ? Cookie banner nécessaire ?
- [ ] Documentation à ajouter dans `/legal/cookies` avant activation

### Formulaire de contact
- [ ] **Pièces jointes** — Si implémentées, où sont-elles stockées et pour combien de temps ?

### Hébergeur
- [ ] **Coordonnées Vercel** — Vérifier annuellement sur https://vercel.com/legal

---

## F. Google Play — Éléments à vérifier avant publication

- [ ] Politique de confidentialité **publique** et **accessible sans compte**
- [ ] URL directe vers ancre `#chain` fonctionnelle
- [ ] URL `/suppression-compte#chain` fonctionnelle
- [ ] Formulaire "Sécurité des données" cohérent avec `products.ts.CHAIN`
- [ ] Classification IARC compatible avec la politique mineurs
- [ ] Permissions Android déclarées

---

## G. Apple App Store — Éléments à vérifier avant publication

- [ ] App Privacy filled cohérent avec `products.ts.CHAIN`
- [ ] Age rating
- [ ] Account deletion : requis depuis iOS 5 juin 2022 — méthode web `/suppression-compte#chain` suffisante
- [ ] EULA custom si différent de la version standard Apple

---

## H. Transferts hors Espace économique européen

Pour chaque prestataire utilisé, obtenir :

- [ ] **Vercel** — DPA + garanties (clauses contractuelles types)
- [ ] **Supabase** — DPA + localisation projet + garanties
- [ ] **Resend** — DPA (si formulaire actif)
- [ ] **Cloudflare** — DPA (si Turnstile actif)
- [ ] **Google Play** — Se référer à Google Cloud DPA

---

## Contact

Pour toute question sur ce document : nosfac.studios@gmail.com
