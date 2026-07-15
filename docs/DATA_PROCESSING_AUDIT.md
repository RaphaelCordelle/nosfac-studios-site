# Audit des traitements de données personnelles

**Date de l'audit** : 15 juillet 2026  
**Périmètre** : Site Nosfac Studios + application Chain  
**Auditeur** : Développeur senior mandaté

---

## Méthodologie

Cet audit a été réalisé par inspection directe du code source :
- Dépendances (`package.json`)
- Variables d'environnement (`.env.example`)
- Routes API (`/app/src/app/api/`)
- Services (`/app/src/services/`)
- Composants React (`/app/src/components/`)
- Stockage local (recherche de `localStorage`, `sessionStorage`, `cookie`)
- Intégrations tierces

---

## 1. Site web Nosfac Studios

### 1.1 Formulaire de contact

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Nom | Champ formulaire | Répondre à la demande | Mesures précontractuelles / Intérêt légitime | Resend (envoi email) | 12 mois max | Oui (Resend US) | ✅ Vérifié |
| Adresse e-mail | Champ formulaire | Répondre à la demande | Mesures précontractuelles / Intérêt légitime | Resend (envoi email) | 12 mois max | Oui (Resend US) | ✅ Vérifié |
| Message et champs contextuels | Champ formulaire | Traiter la demande (bug, business, etc.) | Mesures précontractuelles / Intérêt légitime | Resend (envoi email) | 12 mois max | Oui (Resend US) | ✅ Vérifié |
| Adresse IP | Header HTTP `x-forwarded-for` | Limitation anti-spam (rate limiting) | Intérêt légitime (sécurité) | Aucun (hachée en mémoire) | Conservée hachée en mémoire pendant 15 min max | Non | ✅ Vérifié |
| Token Turnstile | Cloudflare Turnstile (client) | Vérification anti-bot | Intérêt légitime (sécurité) | Cloudflare | Non stocké (vérifié immédiatement) | Oui (Cloudflare) | ✅ Vérifié |
| Timestamp début formulaire | JavaScript côté client | Détection remplissage trop rapide (bot) | Intérêt légitime (sécurité) | Aucun | Non stocké durablement | Non | ✅ Vérifié |
| Honeypot | Champ caché formulaire | Détection bots | Intérêt légitime (sécurité) | Aucun | Non stocké | Non | ✅ Vérifié |
| Brouillon formulaire | `sessionStorage` navigateur | Confort utilisateur (récupération après erreur) | Consentement implicite (local) | Aucun (stocké localement) | Jusqu'à fermeture onglet | Non | ✅ Vérifié |
| Référence demande | `sessionStorage` navigateur | Affichage confirmation | Consentement implicite (local) | Aucun (stocké localement) | Jusqu'à affichage page succès | Non | ✅ Vérifié |

**Notes importantes** :
- Les pièces jointes ne sont **pas encore implémentées** dans le formulaire actuel
- L'IP n'est **jamais stockée** durablement : elle est uniquement hachée en mémoire pour le rate limiting
- Le système Resend est optionnel : en développement, l'adaptateur console journalise les messages sans les envoyer

---

### 1.2 Préférence de thème

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Préférence thème (clair/sombre/système) | `localStorage` (`nosfac-theme`) | Confort de lecture | Consentement implicite / Intérêt légitime (UX) | Aucun (stocké localement) | Jusqu'à suppression par l'utilisateur | Non | ✅ Vérifié |

**Note** : Cette préférence est stockée **uniquement dans le navigateur** de l'utilisateur, elle n'est **jamais transmise au serveur**.

---

### 1.3 Analytics et cookies

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Aucun analytics actif | N/A | N/A | N/A | N/A | N/A | N/A | ✅ Vérifié (ANALYTICS_ENABLED=false) |

**État actuel** : Aucun cookie non essentiel, aucun outil d'analytics, aucun pixel de tracking.

---

### 1.4 Hébergement et logs techniques

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Logs d'accès serveur | Vercel (hébergement) | Diagnostic, sécurité, disponibilité | Intérêt légitime | Vercel Inc. (US) | Selon offre Vercel | Oui (US) | ⚠️ À confirmer selon offre |
| Logs d'erreurs Next.js | Console serveur Vercel | Diagnostic | Intérêt légitime | Vercel Inc. (US) | Selon offre Vercel | Oui (US) | ⚠️ À confirmer selon offre |

---

## 2. Application Chain (Android)

### 2.1 Compte utilisateur

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Identifiant compte interne | Supabase Auth | Identification unique | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement selon config Supabase) | ⚠️ À vérifier localisation DB |
| Adresse e-mail | Connexion Google/Apple/Email | Authentification, récupération compte | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Fournisseur de connexion | Supabase Auth | Gestion authentification | Exécution du contrat | Supabase + Google/Apple | Tant que compte existe | Oui | ⚠️ À vérifier |
| Mot de passe (si connexion email) | Supabase Auth | Authentification | Exécution du contrat | Supabase (hashé, inaccessible en clair) | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Date création compte | Base de données | Suivi, statistiques internes | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Date dernière connexion | Base de données | Sécurité, détection comptes inactifs | Intérêt légitime | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |

---

### 2.2 Profil et progression

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Pseudonyme | Choisi par utilisateur | Affichage dans le jeu, classements | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Avatar | Choisi par utilisateur | Personnalisation | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Niveau, progression, statistiques | Gameplay | Fonctionnement du jeu | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Records personnels | Gameplay | Affichage records, classements | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Paramètres jeu | Choix utilisateur | Préférences joueur | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |

---

### 2.3 Gameplay et anti-triche

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Résultats de parties | Gameplay | Calcul scores, classements | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier |
| Historique parties récentes | Gameplay | Affichage historique | Exécution du contrat | Supabase | Selon rétention définie | Oui (possiblement) | ⚠️ À vérifier |
| Tentatives défi quotidien | Gameplay | Limitation quotidienne, anti-triche | Exécution du contrat + Intérêt légitime | Supabase | 24h puis archivage | Oui (possiblement) | ⚠️ À vérifier |
| Signalements et événements suspects | Détection anti-triche | Prévention fraude | Intérêt légitime | Supabase | Selon nécessité enquête | Oui (possiblement) | ⚠️ À vérifier |

---

### 2.4 Fonctionnalités sociales

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Liste d'amis | Ajout par utilisateur | Fonctions sociales | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier fonctionnalité existante |
| Codes de salon privés | Génération automatique | Parties entre amis | Exécution du contrat | Supabase | Durée de validité du code | Oui (possiblement) | ⚠️ À vérifier fonctionnalité existante |
| Liens de parrainage | Génération automatique | Attribution installation | Exécution du contrat | Supabase + Google Play Install Referrer | Tant que compte existe | Oui | ⚠️ À vérifier fonctionnalité existante |
| Profils publics | Choix utilisateur | Partage résultats | Consentement | Supabase | Tant que activé | Oui (possiblement) | ⚠️ À vérifier fonctionnalité existante |

---

### 2.5 Achats intégrés

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Informations bancaires | Saisie utilisateur | Paiement | Exécution du contrat | **Google Play uniquement** (jamais Chain) | Selon Google | Oui (Google) | ✅ Vérifié (Chain ne reçoit JAMAIS les infos bancaires) |
| Reçu / token achat | Google Play Billing | Vérification achat, attribution contenu | Exécution du contrat | Google Play + Supabase (stockage reçu) | 10 ans (obligation comptable France) | Oui | ⚠️ À vérifier durée exacte |
| Historique achats | Google Play Billing | Suivi achats, support | Exécution du contrat + Obligation légale | Supabase | 10 ans (obligation comptable France) | Oui (possiblement) | ⚠️ À vérifier |
| Statut abonnement Premium | Google Play Billing | Attribution avantages | Exécution du contrat | Supabase | Tant que compte existe | Oui (possiblement) | ⚠️ À vérifier fonctionnalité |

---

### 2.6 Attribution d'installation

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Install Referrer | Google Play Install Referrer API | Mesure origine installation (parrainage) | Intérêt légitime | Google Play + Supabase | Tant que nécessaire à attribution | Oui (Google) | ⚠️ À vérifier implémentation |

---

### 2.7 Diagnostics et performances

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| Logs Supabase | Supabase (backend) | Diagnostic, sécurité | Intérêt légitime | Supabase | 7 jours (offre gratuite) | Oui (possiblement) | ⚠️ À vérifier offre actuelle |
| Crashlytics / Sentry | SDK de monitoring | Détection erreurs | Intérêt légitime | N/A | N/A | N/A | ❌ Non implémenté actuellement |
| Modèle appareil, version Android | Métadonnées app | Compatibilité, support | Intérêt légitime | Supabase (si loggé) | Selon logs | Oui (possiblement) | ⚠️ À vérifier ce qui est loggé |

---

### 2.8 Publicité

| Donnée | Source | Finalité | Base légale proposée | Prestataire | Durée | Transfert hors EEE | Statut |
|--------|--------|----------|---------------------|-------------|-------|-------------------|--------|
| AdMob / publicités | N/A | N/A | N/A | N/A | N/A | N/A | ❌ Non implémenté actuellement |

**Note** : Aucun SDK publicitaire n'est détecté actuellement. Si AdMob est ajouté, cette section devra être complétée avec les données collectées par AdMob.

---

## 3. Autres projets

### KnowOut et jeu musical (nom provisoire)

| Statut | Note |
|--------|------|
| ❌ Pas de collecte active | Projets en développement, aucun service public avec compte joueur actuellement |

---

## 4. Synthèse des prestataires

| Prestataire | Rôle | Données traitées | Localisation | Garanties transfert hors EEE |
|-------------|------|------------------|--------------|------------------------------|
| **Resend** | Envoi email formulaire contact | Nom, email, message | États-Unis | Clauses contractuelles types (à vérifier doc Resend) |
| **Cloudflare** | Turnstile anti-bot | Token temporaire, IP | Mondial | Clauses contractuelles types (à vérifier doc Cloudflare) |
| **Vercel** | Hébergement site | Logs accès, erreurs | États-Unis principalement | Clauses contractuelles types (à vérifier doc Vercel) |
| **Supabase** | Backend Chain (auth + BDD) | Toutes données Chain | À vérifier selon config projet | À vérifier selon config (peut être EU) |
| **Google Play** | Distribution, achats Chain | Achats, install referrer | États-Unis / mondial | Politique Google |

---

## 5. Blocages et actions requises

### Blocages critiques (empêchent lancement commercial)

1. ❌ **Localisation exacte des données Supabase** : Vérifier si la base de données Chain est hébergée dans l'UE ou hors UE
2. ❌ **Âge minimum** : Définir la politique vis-à-vis des mineurs, cohérente avec la classification IARC de Chain
3. ❌ **Durée exacte de conservation des reçus d'achat** : Vérifier obligation comptable française applicable
4. ❌ **Fonctionnalités Chain** : Vérifier quelles fonctionnalités sont réellement implémentées (amis, parrainage, profils publics, abonnement Premium)
5. ❌ **Mécanisme de suppression de compte dans l'app Chain** : Vérifier s'il existe ou s'il faut créer uniquement la méthode web

### Actions recommandées

1. ⚠️ **Documentation des transferts hors EEE** : Obtenir les documents de conformité RGPD de Resend, Cloudflare, Vercel, Supabase
2. ⚠️ **Test de la suppression de compte** : Vérifier que la suppression est réellement immédiate et complète
3. ⚠️ **Audit des logs** : Vérifier exactement ce qui est loggé par Supabase et Vercel, et pour combien de temps

---

## 6. Conclusion

**État global** : Site web propre et minimaliste en termes de collecte. Chain nécessite des vérifications techniques sur Supabase et les fonctionnalités réellement déployées.

**Prochaines étapes** :
1. Répondre aux blocages critiques listés ci-dessus
2. Vérifier les fonctionnalités Chain réellement implémentées
3. Obtenir les informations manquantes sur Supabase (localisation, durées de logs)
4. Créer le mapping Google Play Console
