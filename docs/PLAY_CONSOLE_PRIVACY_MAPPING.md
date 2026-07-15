# Mapping Google Play Console - Sécurité des données

**Date** : 15 juillet 2026  
**Application** : Chain  
**Objectif** : Correspondance entre les traitements réels et les catégories de la section "Sécurité des données" de Google Play Console

---

## ⚠️ IMPORTANT

Ce document doit être mis à jour **AVANT** de remplir le formulaire "Sécurité des données" dans la Play Console.

**Règle d'or** : La politique de confidentialité, ce document et les réponses Play Console doivent être **100% cohérents**.

---

## 1. Informations personnelles

### Nom
- **Collecté ?** : ❌ Non (pas de nom réel demandé dans Chain)
- **Partagé ?** : N/A
- **Finalité** : N/A

### Adresse e-mail
- **Collecté ?** : ✅ Oui (si utilisateur lie son compte Google/Apple ou connexion email)
- **Partagé ?** : ❌ Non (stocké uniquement dans Supabase pour auth)
- **Obligatoire ou facultatif ?** : Facultatif (possibilité de jouer en invité)
- **Finalité** : 
  - Fonctionnalité de l'application (authentification)
  - Gestion du compte
- **Traitement** : Chiffré en transit
- **Suppression** : Oui, l'utilisateur peut demander la suppression du compte

### Nom d'utilisateur
- **Collecté ?** : ✅ Oui (pseudonyme choisi par le joueur)
- **Partagé ?** : ⚠️ Dépend (uniquement si profil public activé)
- **Obligatoire ou facultatif ?** : Obligatoire (pour jouer)
- **Finalité** : 
  - Fonctionnalité de l'application (identification dans le jeu)
- **Traitement** : Chiffré en transit
- **Suppression** : Oui

### Adresse
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Numéro de téléphone
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Race et origine ethnique
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Opinions politiques ou religieuses
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Orientation sexuelle
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Autres informations
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 2. Informations financières

### Historique des achats
- **Collecté ?** : ✅ Oui (reçus Google Play Billing)
- **Partagé ?** : ❌ Non
- **Obligatoire ou facultatif ?** : Facultatif (seulement si l'utilisateur effectue un achat)
- **Finalité** : 
  - Fonctionnalité de l'application (attribution du contenu acheté)
  - Prévention de la fraude, sécurité et conformité
- **Traitement** : Chiffré en transit
- **Suppression** : ⚠️ Conservé 10 ans (obligation comptable potentielle - à confirmer avec comptable)

### Informations de carte de crédit, carte de débit ou compte bancaire
- **Collecté ?** : ❌ Non (géré exclusivement par Google Play, Chain ne voit JAMAIS ces informations)
- **Partagé ?** : N/A
- **Finalité** : N/A

### Autres informations financières
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Cote de solvabilité
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 3. Localisation

### Localisation approximative
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Localisation précise
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 4. Informations personnelles d'autres utilisateurs

### Informations personnelles d'autres utilisateurs
- **Collecté ?** : ⚠️ À vérifier (si liste d'amis implémentée, peut contenir références à d'autres joueurs)
- **Partagé ?** : ❌ Non
- **Finalité** : Fonctionnalité de l'application (fonctions sociales)
- **Traitement** : Chiffré en transit
- **Suppression** : Oui

---

## 5. Messages

### E-mails
- **Collecté ?** : ❌ Non (pas de système de messagerie par email dans Chain)
- **Partagé ?** : N/A
- **Finalité** : N/A

### SMS ou MMS
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Autres messages dans l'application
- **Collecté ?** : ⚠️ À vérifier (chat existe-t-il dans Chain ?)
- **Partagé ?** : ❌ Non
- **Finalité** : Fonctionnalité de l'application
- **Traitement** : Chiffré en transit
- **Suppression** : Oui

---

## 6. Photos et vidéos

### Photos
- **Collecté ?** : ❌ Non (pas d'upload de photos dans Chain)
- **Partagé ?** : N/A
- **Finalité** : N/A

### Vidéos
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 7. Fichiers audio

### Fichiers audio ou enregistrements vocaux
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Fichiers musicaux
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Autres fichiers audio
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 8. Fichiers et documents

### Fichiers et documents
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 9. Calendrier

### Événements de calendrier
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 10. Contacts

### Contacts
- **Collecté ?** : ❌ Non (Chain ne demande JAMAIS l'accès aux contacts)
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 11. Activité dans l'application

### Interactions avec l'application
- **Collecté ?** : ✅ Oui (parties jouées, tentatives défi quotidien)
- **Partagé ?** : ❌ Non
- **Obligatoire ou facultatif ?** : Obligatoire (pour le fonctionnement du jeu)
- **Finalité** : 
  - Fonctionnalité de l'application (calcul scores, classements)
  - Analyse et personnalisation (amélioration du jeu)
  - Prévention de la fraude, sécurité et conformité (anti-triche)
- **Traitement** : Chiffré en transit
- **Suppression** : Oui

### Historique de recherche dans l'application
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

### Autres actions de l'utilisateur
- **Collecté ?** : ⚠️ À vérifier (ex: signalements, actions anti-triche)
- **Partagé ?** : ❌ Non
- **Finalité** : Prévention de la fraude, sécurité et conformité
- **Traitement** : Chiffré en transit
- **Suppression** : Conservé plus longtemps si nécessaire pour enquête fraude

---

## 12. Navigation sur le Web

### Historique de navigation sur le Web
- **Collecté ?** : ❌ Non
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 13. Informations sur l'application et performances de l'application

### Journaux d'incidents
- **Collecté ?** : ⚠️ À vérifier (Supabase logs ? Crashlytics ?)
- **Partagé ?** : ❌ Non
- **Finalité** : Analyse et personnalisation (amélioration stabilité)
- **Traitement** : Chiffré en transit
- **Suppression** : 7 jours (logs Supabase gratuit) - à confirmer

### Diagnostics
- **Collecté ?** : ⚠️ À vérifier (version app, modèle appareil dans logs ?)
- **Partagé ?** : ❌ Non
- **Finalité** : Analyse et personnalisation
- **Traitement** : Chiffré en transit
- **Suppression** : 7 jours (logs Supabase gratuit) - à confirmer

### Autres données sur les performances de l'application
- **Collecté ?** : ❌ Non (pas de SDK APM type Firebase Performance)
- **Partagé ?** : N/A
- **Finalité** : N/A

---

## 14. Identifiants de l'appareil ou autres identifiants

### Identifiants de l'appareil ou autres identifiants
- **Collecté ?** : ⚠️ À vérifier (Google Play Install Referrer collecte-t-il un identifiant ?)
- **Partagé ?** : ❌ Non
- **Finalité** : 
  - Fonctionnalité de l'application (attribution parrainage)
  - Analyse et personnalisation
- **Traitement** : Chiffré en transit
- **Suppression** : Oui

---

## 15. Pratiques de sécurité

### Les données sont-elles chiffrées en transit ?
✅ **Oui** (HTTPS pour site, TLS pour Supabase)

### Les utilisateurs peuvent-ils demander la suppression de leurs données ?
✅ **Oui** (via l'app Chain ou via formulaire web sur /suppression-compte)

---

## 📋 Actions avant de remplir Play Console

1. ✅ Vérifier quelles fonctionnalités sont **réellement implémentées** :
   - [ ] Liste d'amis
   - [ ] Chat/messages
   - [ ] Profils publics
   - [ ] Liens de parrainage
   - [ ] Signalements

2. ✅ Confirmer ce qui est loggé par Supabase :
   - [ ] Modèle appareil ?
   - [ ] Version Android ?
   - [ ] Journaux d'incidents ?
   - [ ] Durée de rétention ?

3. ✅ Vérifier Google Play Install Referrer :
   - [ ] Est-il implémenté ?
   - [ ] Quelles données collecte-t-il exactement ?

4. ✅ Confirmer la durée de conservation des reçus d'achat (obligation comptable)

5. ✅ S'assurer que le mécanisme de suppression de compte fonctionne

---

## ⚠️ IMPORTANT : Cohérence absolue requise

Les 3 sources suivantes doivent être **parfaitement cohérentes** :

1. **Réponses dans Google Play Console** (section "Sécurité des données")
2. **Politique de confidentialité** (`/legal/privacy`)
3. **Code source de Chain** (ce qui est réellement collecté)

❌ **Erreur grave** : Déclarer dans Play Console que vous ne collectez pas d'email alors que Supabase Auth le stocke  
❌ **Erreur grave** : Dire que les données sont supprimées immédiatement alors qu'elles restent 30 jours

---

## Contact

Pour toute question : nosfac.studios@gmail.com
