# Informations légales bloquantes

**Date** : 15 juillet 2026  
**Objectif** : Lister toutes les informations manquantes qui DOIVENT être fournies avant le lancement commercial

---

## ⚠️ IMPORTANT

Ce document est **interne**. Les informations listées ici ne doivent **JAMAIS** apparaître publiquement sur le site avec des mentions "à compléter" ou "[manquant]".

Les pages légales publiques sont rédigées pour fonctionner **sans ces informations** en phase pré-commerciale, mais certaines informations deviennent **obligatoires** dès qu'il y a :
- Une activité commerciale (vente, achats in-app, etc.)
- Une société enregistrée
- Une obligation légale spécifique

---

## 1. Identité légale de l'éditeur

### Si vous restez en "individual-non-professional"
✅ Aucune information supplémentaire requise pour le moment

### Si vous passez en "sole-trader" (entrepreneur individuel / micro-entrepreneur)
Vous DEVEZ fournir dans `src/config/legal.ts` :

- [ ] **`legalName`** : Votre nom complet (prénom + nom)
- [ ] **`postalAddress`** : Adresse professionnelle ou de domiciliation
- [ ] **`siren`** : Numéro SIREN (9 chiffres)
- [ ] **`siret`** : Numéro SIRET (14 chiffres)
- [ ] **`rneRegistration`** : Inscription au Registre national des entreprises (ex: "Inscrit au RNE le [date]")
- [ ] **`publicationDirector`** : Votre nom complet
- [ ] **`phone`** (optionnel sauf si requis) : Téléphone professionnel

### Si vous créez une société (SARL, SAS, etc.)
Vous DEVEZ fournir en plus :

- [ ] **`legalForm`** : Forme juridique exacte (ex: "SARL", "SAS")
- [ ] **`tradingName`** : Si différent de la raison sociale
- [ ] **`rcsRegistration`** : Inscription RCS (ex: "RCS Paris B 123 456 789")
- [ ] **`vatNumber`** : Numéro de TVA intracommunautaire (si applicable)

---

## 2. Politique de confidentialité - Chain

### Informations techniques Supabase
- [ ] **Localisation de la base de données** : Est-elle hébergée dans l'UE ou hors UE ?
- [ ] **Offre Supabase utilisée** : Gratuite, Pro, Enterprise ? (impacte la durée de rétention des logs)
- [ ] **Row Level Security** : Est-elle réellement activée et testée ?

### Fonctionnalités Chain réellement implémentées
Cocher uniquement ce qui est **actuellement fonctionnel** dans la version publique :

- [ ] Liste d'amis
- [ ] Codes de salon privés
- [ ] Liens de parrainage
- [ ] Profils publics partagés
- [ ] Abonnement Premium
- [ ] Achats intégrés (cœurs, malus, cosmétiques)
- [ ] Chat ou messages
- [ ] Signalement de joueurs
- [ ] Blocage de joueurs

### Durées de conservation
- [ ] **Durée de conservation des reçus d'achat** : 10 ans (obligation comptable) ? À confirmer avec comptable
- [ ] **Durée de conservation des données après suppression de compte** : Confirmer ce qui subsiste réellement et combien de temps

### Âge et mineurs
- [ ] **Âge minimum recommandé** : À définir selon la classification IARC et le contenu du jeu
- [ ] **Politique vis-à-vis des mineurs** : Chain est-il destiné aux enfants ? Nécessite-t-il consentement parental ? À aligner avec Play Console

---

## 3. Suppression de compte Chain

### Dans l'application
- [ ] **Vérifier si la fonction existe** : Y a-t-il un bouton "Supprimer mon compte" dans l'app Chain ?
- [ ] **Chemin dans l'app** : Si oui, quel est le chemin exact ? (ex: "Profil → Centre légal → Supprimer mon compte")
- [ ] **Mécanisme technique** : La suppression est-elle réellement immédiate et complète ?

### Via le web
- [ ] **Formulaire web** : Créer un formulaire sur `/suppression-compte` permettant de demander la suppression sans l'app

---

## 4. Conditions d'utilisation

- [ ] **Droit applicable** : Droit français ? Autre ? (généralement le droit du pays où l'éditeur est établi)
- [ ] **Juridiction compétente** : Tribunaux français ? Préciser lesquels ?

---

## 5. Transferts hors Espace Économique Européen

Pour chaque prestataire international, obtenir :

- [ ] **Resend** : Documentation sur les garanties RGPD (clauses contractuelles types, etc.)
- [ ] **Cloudflare** : Documentation sur les garanties RGPD
- [ ] **Vercel** : Documentation sur les garanties RGPD et localisation des données
- [ ] **Supabase** : Confirmer localisation et garanties RGPD
- [ ] **Google Play** : S'appuyer sur la politique Google (déjà publique)

---

## 6. Autres

### Hébergeur
- [ ] **Vérifier les coordonnées de Vercel** : Les coordonnées dans `HOSTING` sont-elles toujours exactes ? Consulter https://vercel.com/legal

### Pièces jointes formulaire contact
- [ ] **Implémentation** : Les pièces jointes sont-elles implémentées ? Si oui, où sont-elles stockées et combien de temps ?

### Analytics
- [ ] **Si analytics est activé** : Quel outil ? Quelles données ? Consentement requis ? Cookie banner à ajouter ?

---

## 📋 Checklist avant lancement commercial

Avant de lancer Chain commercialement ou d'enregistrer une entreprise :

1. ✅ Compléter `src/config/legal.ts` avec les informations d'identité légale requises
2. ✅ Définir la politique vis-à-vis des mineurs
3. ✅ Vérifier les fonctionnalités Chain réellement implémentées et mettre à jour la politique de confidentialité
4. ✅ S'assurer que le mécanisme de suppression de compte fonctionne (dans l'app et/ou via le web)
5. ✅ Obtenir les documents de conformité RGPD des prestataires
6. ✅ Mettre à jour les pages légales avec les vraies informations
7. ✅ Remplir correctement la section "Sécurité des données" dans Google Play Console
8. ✅ Exécuter `npm run legal:check` et corriger toutes les erreurs

---

## Contact

Pour toute question sur ce document : nosfac.studios@gmail.com
