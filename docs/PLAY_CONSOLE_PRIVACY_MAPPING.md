# Mapping Google Play / App Store — Sécurité des données

**Date** : 18 juillet 2026
**Statut** : Document interne — préparation des fiches Play Console et App Store

---

## ⚠️ Règle absolue

Les 3 sources suivantes doivent être **parfaitement cohérentes** :

1. **Réponses "Sécurité des données"** dans Google Play Console / App Store Connect
2. **Politique de confidentialité** publique (`/legal/privacy`)
3. **Code source réel** de chaque application

Chaque application (Chain, KnowOut, jeu musical) a **son propre formulaire** à remplir dans les stores. La politique de confidentialité est unique, mais les réponses aux stores sont différentes.

---

## 1. CHAIN

### État de collecte

| Catégorie Play Console | Collecté ? | Partagé ? | Obligatoire ? | Chiffré en transit ? | Suppression demandable ? |
|---|---|---|---|---|---|
| **Nom** | ❌ Non | — | — | — | — |
| **Adresse e-mail** | ✅ Oui | ❌ Non | Facultatif (jouer en invité possible) | ✅ Oui | ✅ Oui |
| **Nom d'utilisateur (pseudonyme)** | ✅ Oui | ⚠️ Uniquement si profil public activé | Obligatoire | ✅ Oui | ✅ Oui |
| **Numéro de téléphone** | ❌ Non | — | — | — | — |
| **Adresse postale** | ❌ Non | — | — | — | — |
| **Race/origine ethnique** | ❌ Non | — | — | — | — |
| **Orientation sexuelle / opinions religieuses ou politiques** | ❌ Non | — | — | — | — |
| **Historique achats** | ⚠️ À vérifier (Google Play Billing pas encore activé publiquement) | ❌ Non | — | — | — |
| **Informations bancaires** | ❌ Non — géré exclusivement par Google Play | — | — | — | — |
| **Localisation** | ❌ Non | — | — | — | — |
| **E-mails / SMS** | ❌ Non | — | — | — | — |
| **Photos / vidéos / audio** | ❌ Non | — | — | — | — |
| **Fichiers et documents** | ❌ Non | — | — | — | — |
| **Contacts** | ❌ Non | — | — | — | — |
| **Interactions app (parties, scores)** | ✅ Oui | ❌ Non | Obligatoire | ✅ Oui | ✅ Oui |
| **Historique recherche in-app** | ❌ Non | — | — | — | — |
| **Journaux d'incidents** | ⚠️ Via Supabase logs uniquement | ❌ Non | — | ✅ Oui | Effacement automatique après 7 jours (offre gratuite) |
| **Diagnostics** | ⚠️ Via Supabase logs uniquement | ❌ Non | — | ✅ Oui | Idem |
| **Identifiants de l'appareil** | ⚠️ À vérifier si Install Referrer est implémenté | ❌ Non | — | — | — |
| **Publicités** | ❌ Non (aucun SDK publicitaire) | — | — | — | — |

### Fonctionnalités déclarables

- Compte utilisateur : ✅ Oui (Supabase Auth)
- Chat / messagerie : ❌ Non
- Fonctions sociales publiques (amis, profils publics) : ⚠️ À vérifier avant sortie
- Achats intégrés : ⚠️ Pas encore actifs
- Abonnement : ❌ Non
- Publicité : ❌ Non

### Actions à vérifier avant remplissage Play Console

- [ ] Confirmer si `Install Referrer` est intégré dans le build actuel
- [ ] Vérifier si des permissions Android sont demandées (INTERNET seulement ?)
- [ ] Confirmer la durée exacte de rétention des logs Supabase (offre utilisée)
- [ ] Statuer sur la présence/absence des fonctions sociales dans le build de sortie

---

## 2. KNOWOUT

### État actuel

**Aucun service public actif. Aucune donnée collectée à ce jour.**

Ne remplir le formulaire Play Console qu&apos;au moment de la publication effective. La politique de confidentialité indique explicitement que ce projet est en développement et que les traitements seront précisés avant mise à disposition.

### Éléments à auditer avant publication

- [ ] Existence ou non d&apos;un compte utilisateur
- [ ] Système de scores / classements
- [ ] Multijoueur (données transitent-elles par un serveur ?)
- [ ] Signalements / modération
- [ ] Achats intégrés
- [ ] Publicités
- [ ] Diagnostics

**Ne pas copier les réponses de Chain pour KnowOut**. Les backends peuvent être différents.

---

## 3. JEU MUSICAL (nom en cours de définition)

### État actuel

**Aucun service public actif. Aucune donnée collectée à ce jour.**

Points à auditer avant publication :

- [ ] Requêtes vers des APIs musicales tierces (Spotify, Deezer, YouTube) ?
- [ ] Historique d&apos;écoute ?
- [ ] Compte utilisateur ?
- [ ] Contenus soumis par le joueur (mots, propositions, réponses) ?
- [ ] Achats intégrés ?
- [ ] Publicité ?

**Attention légale** : Ne jamais déclarer que Nosfac Studios accède à l&apos;historique Spotify/Deezer/YouTube si ce n&apos;est pas techniquement le cas. Ne jamais suggérer un accès à des paroles/extraits musicaux sans licence vérifiée.

---

## 4. Pratiques de sécurité communes

Pour les trois applications :

- **Chiffrement en transit** : ✅ Oui (HTTPS, TLS)
- **Suppression du compte demandable** : ✅ Oui (via `/suppression-compte#chain`)
- **Suppression de certaines ou de toutes les données sans suppression du compte** : ✅ Oui (même page, choix des catégories à effacer)
- **Audit sécurité indépendant** : Non (studio indépendant)

### Réponse Play Console — suppression indépendante du compte

Pour Chain, répondre **Oui** à la question facultative « moyen de demander la suppression d’une
partie ou de la totalité des données sans supprimer le compte ». Utiliser l’URL publique suivante
une fois la version déployée :

`https://nosfacstudios.com/suppression-compte#chain`

La page permet de sélectionner l’historique de parties, les statistiques et records, les données
sociales, les préférences de personnalisation ou les données d’usage facultatives. Le compte reste
actif lorsque cette option est choisie.

---

## 5. Cohérence Politique ↔ Play Console

À chaque publication d&apos;une application, vérifier :

- [ ] Section correspondante de `/legal/privacy` est à jour
- [ ] Ancres `#chain`, `#knowout`, `#jeu-musical` fonctionnent
- [ ] Lien direct depuis la fiche du store pointe sur la bonne ancre
- [ ] `src/config/products.ts` reflète l&apos;état réel du build
- [ ] `verificationDate` du produit est récente (< 90 jours)

---

## Contact interne

Pour toute question sur ce document : nosfac.studios@gmail.com
