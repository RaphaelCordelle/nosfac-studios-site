# NOSFAC STUDIOS - Website Master Specification

**Version 1.0 - 13 juillet 2026**

> Source de vérité produit, design, contenu, architecture, qualité, déploiement et exploitation.


# 0. Gouvernance du document

Ce document n’est pas une maquette figée. Il définit un système durable : les principes qui ne doivent pas varier, les décisions techniques actuelles, les zones volontairement extensibles et les procédures permettant de faire évoluer le site sans dégrader sa cohérence. Toute évolution importante du site doit commencer par une mise à jour de cette spécification.

| Champ | Valeur |

| --- | --- |

| Propriétaire produit | Fondateur de Nosfac Studios |

| Statut | Source de vérité active |

| Version | 1.0 |

| Date | 13 juillet 2026 |

| Langue éditoriale initiale | Français, architecture prête pour l’anglais |

| Adresse de contact initiale | nosfac.studios@gmail.com |

| Adresse publique cible | contact@nosfacstudios.com après acquisition du domaine |

| Projets initiaux | Chain, KnowOut, jeu musical mot → chanson (nom provisoire) |

| Dépôt recommandé | C:\Dev\NosfacStudios puis GitHub privé |

| Déploiement recommandé | Vercel avec previews Git; portabilité Node/Docker obligatoire |


## 0.1 Règles de versionnage

- Version majeure : modification de l’architecture de marque, de la navigation principale, du modèle de contenu ou de la plateforme technique.

- Version mineure : ajout d’une page, d’un composant majeur, d’un type de contenu ou d’un nouveau flux opérationnel.

- Correctif : clarification, correction de texte, ajustement de token ou précision d’un critère d’acceptation.

- Chaque décision qui contredit une règle du présent document doit être inscrite dans le registre de décisions avec motif, date, impact et stratégie de retour arrière.


## 0.2 Instruction à l’IA de développement

> **Directive absolue -** Le document doit être traité comme une contrainte contractuelle. L’IA ne doit pas inventer de chiffres, de dates de sortie, d’avis, de partenaires, de récompenses, de plateformes ou de fonctionnalités non confirmées. Toute information manquante doit être matérialisée par un placeholder typé et centralisé, jamais cachée dans le JSX.

1. Lire l’intégralité de la spécification et les fichiers de configuration avant toute création de code.

2. Auditer le dépôt, documenter les hypothèses, puis proposer un plan d’implémentation par phases avec critères de sortie.

3. Implémenter les fondations (types, tokens, contenu, accessibilité, tests) avant les effets visuels.

4. Après chaque phase : lint, typecheck, tests, build de production, audit accessibilité et inspection responsive.

5. Ne jamais considérer une page terminée tant que ses états vide, chargement, erreur, indisponible, clavier, mobile et reduced-motion ne sont pas traités.


# 1. Résumé exécutif

Nosfac Studios est une identité de studio indépendante destinée à regrouper durablement des jeux vidéo, des applications et des expérimentations logicielles. Le nom est personnel : il provient du surnom du fondateur et constitue un hommage discret aux amis qui ont accompagné le début de l’aventure. Le site ne doit pas exposer cette histoire comme un argument émotionnel artificiel; il doit la traduire par une idée simple : plusieurs initiatives modestes, menées avec rigueur, peuvent devenir un ensemble cohérent et ambitieux.

Le site aura quatre fonctions simultanées : vitrine de marque, catalogue de projets, centre de confiance et outil opérationnel. Il doit convaincre un joueur en quelques secondes, permettre à un partenaire de comprendre rapidement le sérieux du studio, donner à un recruteur une lecture claire du parcours de développement, et fournir un support utile aux utilisateurs sans transformer le site en portail lourd.


## 1.1 Promesse du site

> **Promesse -** Présenter des projets honnêtes, soigneusement construits et suivis dans le temps, avec une qualité de lecture et d’interaction digne d’un studio établi, sans prétendre être plus grand que la réalité.


## 1.2 Principes non négociables

| Principe | Application concrète |

| --- | --- |

| Authenticité | Aucun faux compteur, aucune fausse équipe, aucune fausse citation, aucun faux client. |

| Clarté | Une proposition de valeur compréhensible en moins de 10 secondes; pas de jargon décoratif. |

| Qualité perçue | Typographie, rythme, images, mouvement et microcopie traités comme un système, pas comme des effets isolés. |

| Évolutivité | Ajouter un projet ne doit pas nécessiter de modifier les composants ou la navigation. |

| Performance | Le contenu principal doit rester rapide sur un téléphone moyen et une connexion mobile. |

| Accessibilité | WCAG 2.2 niveau AA comme seuil de production, avec contrôles clavier et reduced motion. |

| Portabilité | Le site peut quitter Vercel sans réécriture complète; les données restent exportables. |

| Sécurité | Aucun secret côté client, validation serveur, anti-spam et politique de rétention des pièces jointes. |

| Durabilité visuelle | Pas de tendance éphémère, pas de surdose de néon, pas de grille “template IA”. |


## 1.3 Mesures de réussite

- Un nouveau visiteur identifie le studio et au moins un projet en moins de 15 secondes.

- Un visiteur trouve le bon canal de contact en moins de trois actions.

- Un nouveau projet peut être ajouté en moins de 30 minutes à partir d’un modèle de contenu.

- Toutes les pages publiques critiques atteignent au minimum 95/100 sur les audits Lighthouse ciblés en production, hors variabilité réseau.

- Le site fonctionne sans JavaScript pour la lecture des contenus essentiels; les enrichissements interactifs se dégradent proprement.

- Aucune donnée personnelle n’est collectée sans finalité explicite, durée de conservation et base légale documentées.


# 2. Stratégie de marque et positionnement


## 2.1 Positionnement

Nosfac Studios doit se présenter comme un studio indépendant de jeux et de logiciels qui privilégie la construction patiente, la qualité d’exécution et l’apprentissage continu. Le ton n’est ni celui d’une grande entreprise qui se surestime, ni celui d’un portfolio étudiant qui s’excuse. Il est précis, calme, ambitieux et vérifiable.

| Axe | Position retenue | À éviter |

| --- | --- | --- |

| Taille | Studio indépendant, fondateur clairement identifiable si souhaité | “Notre grande équipe” ou photos de stock |

| Ambition | Construire des expériences durables et mémorables | Promesses de domination mondiale sans preuve |

| Technique | Montrer la rigueur, les systèmes et les itérations | Empiler des logos technologiques comme décoration |

| Création | Mettre les projets et les décisions au centre | Se présenter comme “créatif” sans démonstration |

| Communauté | Écouter, documenter, corriger, remercier | Forcer un discours communautaire avant d’avoir une communauté |


## 2.2 Histoire de marque

Le sens de Nosfac est traité comme une couche de profondeur. La page À propos peut mentionner que le nom vient d’un surnom donné par des amis et qu’il rappelle les personnes présentes au commencement. Une seule phrase suffit. Le site doit ensuite laisser les projets prouver la valeur du studio.

> **Formulation recommandée -** « Nosfac est un surnom devenu un nom de studio - un rappel discret des personnes qui ont accompagné les premiers projets. »


## 2.3 Voix éditoriale

| Attribut | Oui | Non |

| --- | --- | --- |

| Direct | “Découvrez Chain” | “Plongez dans un écosystème révolutionnaire” |

| Humble | “En développement” | “Le prochain phénomène mondial” |

| Concret | “Parties privées de 2 à 15 joueurs” lorsque confirmé | “Des possibilités infinies” |

| Humain | “Écrivez-nous, nous lisons chaque message” si vrai | “Notre équipe reviendra vers vous sous 24 h” sans capacité |

| Technique | Architecture, performance, changelog lorsque pertinent | Jargon non expliqué |


## 2.4 Lexique de marque

- Employer : construire, tester, améliorer, jouer, découvrir, partager, concevoir, apprendre, suivre.

- Employer avec modération : innovation, premium, expérience, univers, communauté.

- Éviter : révolutionnaire, disruptif, ultime, insane, next-gen, AAA, leader, incontournable, “powered by AI” comme argument générique.

- Nom officiel : Nosfac Studios. Ne pas alterner avec Nosfac Studio, Nosfax, Nosfac Games ou Studio Nosfac dans les titres et métadonnées.


# 3. Audiences, besoins et parcours prioritaires

| Persona | Contexte | Besoin principal | Réponse du site |

| --- | --- | --- | --- |

| Joueur curieux | Découvre un jeu via une vidéo, un ami ou un store. | Comprendre le concept, voir des images, accéder au jeu, vérifier la plateforme. | Hero projet, CTA principal, captures, FAQ courte. |

| Joueur actif | Cherche une mise à jour, une correction ou une aide. | Patch notes, statut, support, bug report, confidentialité. | Journal filtré, FAQ, formulaire prérempli. |

| Partenaire commercial | Éditeur, plateforme, marque, prestataire ou ayant droit. | Crédibilité, projets, audience réelle, contact qualifié. | À propos, press kit, business contact. |

| Créateur de contenu / presse | Prépare une vidéo, un article ou un live. | Visuels, description officielle, liens, droits d’utilisation. | Press kit téléchargeable et contact presse. |

| Recruteur / manager technique | Évalue le sérieux du fondateur et des projets. | Rôle, décisions, progression, technologies, résultats vérifiables. | Études de cas projet et page À propos. |

| Collaborateur potentiel | Designer, développeur, testeur ou ami du projet. | Vision, niveau d’exigence, façon de travailler, besoins ouverts. | Page collaboration, journal de développement. |

| Utilisateur support | Rencontre un bug ou un problème d’achat. | Être guidé sans remplir un formulaire générique. | Diagnostic progressif, champs contextualisés, confirmation. |


## 3.1 Priorité des parcours

1. Découvrir un projet puis lancer/télécharger/suivre le projet.

2. Comprendre Nosfac Studios et sa crédibilité.

3. Trouver une information de support ou signaler un problème.

4. Lire une actualité ou un journal de développement.

5. Contacter le studio pour une demande commerciale, presse ou collaboration.

6. Explorer les projets passés, expérimentaux ou archivés sans brouiller les projets actifs.


## 3.2 Règle de profondeur

Aucun contenu critique ne doit être à plus de trois interactions depuis l’accueil. Les pages projet doivent être accessibles en une interaction depuis le premier écran ou la section immédiatement suivante. Le contact doit être disponible dans l’en-tête, le pied de page et les pages projet, mais jamais sous forme de popup intrusive.


# 4. Architecture de l’information et navigation


## 4.1 Arborescence cible

```text
/
├── /projects
│   ├── /projects/chain
│   ├── /projects/knowout
│   └── /projects/music-word-game   # slug provisoire, redirection lors du naming final
├── /journal
│   └── /journal/[slug]
├── /about
├── /support
│   ├── /support/faq
│   └── /support/contact
├── /press
├── /collaborate                    # activable lorsque pertinent
├── /legal
│   ├── /legal-notice
│   ├── /privacy
│   ├── /terms
│   └── /cookies
├── /status                         # lien externe ou page légère si nécessaire
├── /sitemap.xml
├── /robots.txt
└── /manifest.webmanifest
```


## 4.2 Navigation principale

| Élément | Desktop | Mobile | Règle |

| --- | --- | --- | --- |

| Logo / mot-symbole | Gauche | Gauche | Retour accueil; zone cliquable ≥ 44 px. |

| Projets | Lien principal | Premier lien du menu | Ouvre /projects, pas de mega-menu au lancement. |

| Journal | Lien principal | Deuxième lien | Masqué seulement si aucun article publié. |

| À propos | Lien principal | Troisième lien | Raconte l’histoire et la méthode. |

| Support | Lien secondaire | Quatrième lien | FAQ + contact. |

| Nous contacter | Bouton compact | CTA pleine largeur en bas du menu | Toujours accessible, jamais sticky envahissant. |

| Langue | Option dans footer au lancement | Footer | Ne pas afficher de sélecteur inactif. |

| Thème | Automatique + commande discrète | Dans menu | Respecte prefers-color-scheme et mémorise le choix. |


## 4.3 Comportement de l’en-tête

- En haut de page : fond transparent ou fusionné avec le hero si le contraste reste conforme.

- Après 48 à 72 px de scroll : surface semi-opaque, légère bordure inférieure, backdrop blur modéré uniquement si performant.

- Scroll descendant : l’en-tête peut réduire sa hauteur de 72 à 60 px; il ne doit jamais disparaître complètement sur les pages support.

- Scroll ascendant : retour immédiat à l’état compact.

- Focus clavier : l’en-tête ne change pas de position pendant la navigation au clavier.

- Menu mobile : panneau plein écran ou quasi plein écran, focus piégé, fermeture Escape, restauration du focus sur le déclencheur.


## 4.4 Fil d’Ariane

Présent sur les pages article, projet, support et légal. Il est visuellement discret mais exposé aux technologies d’assistance avec un élément nav et un aria-label explicite. Sur mobile, il peut être réduit à un lien retour contextuel, sans supprimer la structure sémantique.


# 5. Direction artistique durable

La direction artistique doit être lumineuse sans devenir néon, premium sans devenir froide, et technologique sans reprendre les clichés du gaming. Les précédentes pistes constellation, points reliés, comète ou symboles de construction ne doivent pas être réutilisées comme motif principal. Le site adopte un langage visuel original fondé sur la notion de cadre vivant : des surfaces nettes, des coupes lumineuses fines, des transitions d’ouverture et un rythme de composition qui donne la sensation que chaque projet révèle sa propre identité à l’intérieur d’un système Nosfac cohérent.


## 5.1 Concept visuel : “Living Frames”

Le motif transversal est une ouverture ou une coupe rectangulaire subtile - jamais un logo secondaire. Les cartes, médias et sections utilisent des bords interrompus, des halos directionnels très doux et de légers changements de profondeur. Le motif évoque une fenêtre vers un projet, un passage entre idée et produit, et une structure capable d’accueillir des univers différents.

| Élément | Traitement | Limite |

| --- | --- | --- |

| Fond | Noir graphite ou blanc minéral selon thème, avec variation tonale très faible | Pas de bruit artificiel visible ni de gradient arc-en-ciel |

| Lumière | Halo local lié à un média ou à une action | Jamais plus de deux sources colorées dans un viewport |

| Cadres | Bordure 1 px, coin 16-24 px, rupture ou accent sur un angle | Pas de mosaïque uniforme de cartes |

| Couleur projet | Une couleur propre à chaque projet, dérivée de ses assets | La marque reste dominante dans la navigation et le footer |

| Illustration | Captures réelles, rendus produits, détails de prototypes | Pas d’illustrations 3D génériques générées sans direction |

| Mouvement | Révélation, glissement court, changement de profondeur | Pas de parallax fort, particules, curseur custom ou scroll hijacking |


## 5.2 Palette de base

| Token | Hex indicatif | Usage |

| --- | --- | --- |

| ink-950 | #0B0D12 | Fond sombre principal |

| ink-900 | #11141B | Surfaces sombres |

| ink-100 | #E8EAF0 | Texte clair secondaire |

| paper-50 | #F7F8FA | Fond clair principal |

| paper-100 | #EFF1F5 | Surface claire secondaire |

| text-950 | #171A21 | Texte principal clair |

| brand-500 | #2F6BFF | Action principale et focus |

| brand-300 | #79A1FF | Accent sombre |

| success-500 | #1F8F5F | Succès |

| warning-500 | #A35F00 | Avertissement |

| danger-500 | #B33A3A | Erreur |

> **Règle de contraste -** Les valeurs finales doivent être testées dans les combinaisons réelles. Aucun token décoratif ne doit être utilisé comme couleur de texte sans validation WCAG.


## 5.3 Typographie

Utiliser une police sans-serif système ou libre hautement lisible. Recommandation de départ : Geist ou Inter pour l’interface, avec une variante display limitée aux grands titres si elle améliore réellement l’identité. Les polices sont auto-hébergées via next/font, sous-ensembles latin/latin-ext, poids limités et fallback système explicite.

| Style | Desktop | Mobile | Interligne | Usage |

| --- | --- | --- | --- | --- |

| Display XL | 72-88 px | 44-56 px | 0,95-1,02 | Hero accueil uniquement |

| Display L | 52-64 px | 36-44 px | 1,0 | Titres de page |

| Heading 1 | 40-48 px | 30-36 px | 1,08 | Sections majeures |

| Heading 2 | 28-34 px | 24-28 px | 1,15 | Sous-sections |

| Body L | 18-20 px | 17-18 px | 1,55 | Introduction |

| Body | 16-18 px | 16 px | 1,55-1,65 | Texte courant |

| Label | 13-14 px | 13-14 px | 1,3 | Boutons et métadonnées |

| Caption | 12-13 px | 12-13 px | 1,4 | Légendes et aides |


## 5.4 Grille et rythme

- Largeur de contenu maximale : 1280 px; lecture éditoriale : 720-780 px.

- Gouttières : 20 px mobile, 32 px tablette, 48-64 px desktop.

- Échelle d’espacement : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.

- Chaque section doit avoir un rythme distinct; éviter la succession mécanique titre + texte + trois cartes.

- Les zones de lecture gardent 60 à 80 caractères par ligne pour le corps de texte.

- Les contenus ultrawide restent centrés; les médias peuvent dépasser la grille seulement avec une intention précise.


# 6. Système de mouvement et micro-interactions

Le mouvement donne du rythme, confirme les actions et aide à comprendre la hiérarchie. Il ne sert pas à prouver que le site est animé. Les animations sont brèves, interrompables et compatibles avec prefers-reduced-motion. Le chargement initial ne doit jamais bloquer l’accès au contenu derrière une animation de logo.


## 6.1 Tokens de mouvement

| Token | Durée | Easing | Usage |

| --- | --- | --- | --- |

| instant | 80 ms | linear | Changement d’icône, état pressé |

| fast | 140 ms | cubic-bezier(.2,.8,.2,1) | Hover, focus, couleur |

| standard | 220 ms | cubic-bezier(.2,.8,.2,1) | Panneau, carte, accordéon court |

| expressive | 360 ms | cubic-bezier(.16,1,.3,1) | Entrée de section et hero |

| slow | 520 ms max | cubic-bezier(.16,1,.3,1) | Transition de média exceptionnelle |

| stagger | 35-60 ms | n/a | Séquence de 3 à 6 éléments maximum |


## 6.2 Matrice des animations

| Composant | Comportement | Durée | Reduced motion |

| --- | --- | --- | --- |

| Lien texte | Soulignement ou décalage de 2 px | 140 ms | Aucune translation |

| Bouton primaire | Fond/ombre + press scale 0,98 | 140 ms | Couleur seule |

| Carte projet | Média zoom 1,015 + cadre lumineux local | 220 ms | Bordure/couleur seule |

| Menu mobile | Voile 160 ms puis panneau 220 ms | 220 ms | Apparition instantanée |

| Accordéon FAQ | Hauteur + opacité | 220 ms | Ouverture sans interpolation |

| Section au scroll | Y 16 px vers 0 + opacité | 360 ms | Opacité ou aucun effet |

| Hero | Titre puis preuve puis CTA, 50 ms stagger | 360-520 ms | Contenu immédiatement visible |

| Galerie | Crossfade + déplacement 8 px | 220 ms | Crossfade instantané |

| Toast | Glissement 12 px + opacité | 220 ms | Opacité seule |

| Validation formulaire | Message et icône; champ non secoué | 140 ms | Identique |

| Succès contact | Check discret + contenu | 360 ms | État final immédiat |

| Skeleton | Shimmer très faible | 1200 ms boucle | Bloc statique |

| Navigation de page | Pas de transition globale obligatoire | 0-220 ms | Aucune |

| Compteur réel | Interpolation une seule fois | 520 ms max | Valeur finale |

| Logo | Aucune rotation ou morphing permanent | n/a | n/a |


## 6.3 Interdictions

- Pas de scroll horizontal détourné, scroll hijacking, curseur personnalisé ou accélération artificielle.

- Pas d’animation infinie autour des CTA, sauf indicateur d’état réel et très discret.

- Pas de vidéo autoplay avec son. Les vidéos décoratives sont muettes, sous-titrées si informatives, suspendues hors viewport et désactivables.

- Pas de tremblement de formulaire en erreur; l’erreur doit être comprise, pas ressentie comme une punition.

- Pas de parallaxe dépassant 12-16 px sur mobile.


# 7. Spécifications UX page par page


## 7.1 Accueil

L’accueil établit la crédibilité de Nosfac Studios en quelques secondes, donne accès aux projets actifs et montre une façon de travailler. Il ne doit pas ressembler à un portfolio de cartes ni à une landing page générique de startup.

Audience prioritaire : Nouveau visiteur, joueur, partenaire, recruteur.


### Structure et ordre

1. En-tête global et skip link.

2. Hero : nom, phrase de positionnement, projet mis en avant, deux CTA maximum.

3. Preuve immédiate : capture ou vidéo réelle du projet phare, statut explicite.

4. Sélection de projets : Chain, KnowOut, futur jeu musical; hiérarchie visuelle non uniforme.

5. Bloc “Ce que nous construisons” : jeux, applications, expérimentations.

6. Bloc méthode : concevoir, tester, améliorer; trois preuves concrètes.

7. Dernières nouvelles : trois articles maximum, masqué si vide.

8. CTA contact contextuel et footer complet.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Découvrir nos projets | Scroll ancré vers la sélection ou navigation /projects selon contexte | Focus visible sur la destination |

| Voir le projet phare | Ouvre la page projet correspondante | 404 impossible si contenu non publié |

| Nous contacter | Ouvre /support/contact avec motif général | Formulaire reste utilisable sans JS |

| Carte projet | Ouvre page projet; le lien principal englobe le titre, pas tous les contrôles | État indisponible si page en brouillon |

| Article | Ouvre l’article dans le même onglet | Article dépublié retiré des listes |

| Basculer thème | Change le thème et persiste le choix | Retour au thème système possible |


### États obligatoires

- Contenu normal

- Aucun article publié

- Un seul projet publiable

- Images non chargées

- Mode hors ligne avec contenu mis en cache

- Reduced motion

- Thème clair et sombre


### SEO et partage

Title unique, description orientée studio, Organization JSON-LD, image Open Graph 1200×630, canonical racine. Aucun mot-clé générique forcé.


### Événements analytiques minimaux

- home_view

- hero_project_click

- projects_section_view

- home_contact_click

- journal_card_click

- theme_change


### Critères d’acceptation

- [ ] Le nom et la proposition de valeur sont visibles sans scroll sur 360×800 et 1440×900.

- [ ] Le CTA principal reste unique visuellement.

- [ ] Aucun compteur ou chiffre non vérifié n’est affiché.

- [ ] Le LCP mobile cible reste inférieur à 2,5 s au 75e percentile après instrumentation.

- [ ] L’ordre de tabulation suit l’ordre visuel.


## 7.2 Index des projets

L’index permet de comprendre l’ensemble du catalogue sans diluer les projets actifs. Il doit supporter un futur portefeuille de plusieurs dizaines de projets, avec filtres progressifs et archives.

Audience prioritaire : Visiteur qui veut explorer, recruteur, presse.


### Structure et ordre

1. Introduction courte et nombre réel de projets publiés calculé automatiquement.

2. Projet mis en avant si configuré.

3. Filtres : Tous, Jeux, Applications, Expérimentations; filtres de statut seulement à partir de 6 projets.

4. Grille éditoriale adaptative, pas nécessairement trois colonnes identiques.

5. Section archives séparée, repliée si vide.

6. CTA pour suivre les actualités ou contacter le studio.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Filtre de type | Met à jour l’URL via query string et la liste sans perte de focus | Message vide avec réinitialisation |

| Filtre de statut | Combine les filtres avec opérateur AND | Comptes recalculés |

| Carte projet | Ouvre /projects/[slug] | Carte non cliquable si external-only; bouton explicite |

| Effacer les filtres | Retour à l’état Tous | Focus sur le titre de résultats |

| Lien archive | Affiche la section ou ouvre /projects?status=archived | Conserve les préférences |


### États obligatoires

- Chargement statique

- Aucun projet

- Filtres sans résultat

- Projet sans image

- Projet sans date

- Projet archivé


### SEO et partage

CollectionPage + ItemList JSON-LD lorsque pertinent; métadonnées générées depuis le contenu publié; pagination ou pages statiques au-delà de 30 projets.


### Événements analytiques minimaux

- projects_view

- project_filter_change

- project_card_click

- project_empty_reset


### Critères d’acceptation

- [ ] Ajouter un projet via un fichier de contenu suffit à l’afficher.

- [ ] Les filtres sont partageables par URL et fonctionnent avec le bouton retour.

- [ ] Les statuts sont lisibles sans dépendre de la couleur.

- [ ] Les cartes ont une hauteur cohérente sans couper les titres.


## 7.3 Page projet

La page projet est l’actif central du site. Elle doit expliquer le produit, montrer son état réel, faciliter l’accès au jeu et documenter le travail sans devenir une fiche marketing vide.

Audience prioritaire : Joueur, partenaire, recruteur, créateur de contenu.


### Structure et ordre

1. Breadcrumb et statut.

2. Hero projet : logo/titre, pitch, plateformes confirmées, CTA contextualisé.

3. Média principal réel ou placeholder éditorial clairement identifié en préproduction.

4. Résumé : genre, rôle de Nosfac Studios, état, période, technologies si pertinentes.

5. Fonctionnalités principales, limitées aux éléments confirmés.

6. Galerie accessible avec légendes.

7. Histoire / défi / approche / résultat sous forme d’étude de cas facultative.

8. Roadmap publique seulement si tenue à jour; sinon “prochaines étapes” non datées.

9. Actualités liées, FAQ spécifique, support et liens officiels.

10. Projets suivants / précédents et footer.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Jouer / télécharger / rejoindre | Lien officiel avec marquage externe et plateforme | Désactivé si non disponible; CTA “Suivre le projet” |

| Voir une capture | Lightbox/dialog accessible, navigation clavier | Image seule si JS indisponible |

| Lire la roadmap | Scroll vers la section ou page dédiée si volumineuse | Date de mise à jour affichée |

| Voir les patch notes | Filtre le journal sur le projet | Message si aucun article |

| Signaler un bug | Contact prérempli avec projectId et catégorie bug | Conserve l’URL de la page comme contexte |

| Lien store/externe | Nouvel onglet uniquement si attendu; icône et texte explicites | rel approprié |


### États obligatoires

- Pré-lancement

- En développement

- Bêta

- Disponible

- En pause

- Archivé

- Sans galerie

- Sans CTA externe

- Plateforme non confirmée


### SEO et partage

SoftwareApplication ou VideoGame JSON-LD selon le type, sans reviewRating ni offers inventés. Open Graph propre au projet. Canonical stable même après renommage grâce à redirections.


### Événements analytiques minimaux

- project_view

- project_primary_cta

- project_media_open

- project_support_click

- project_external_link

- project_journal_click


### Critères d’acceptation

- [ ] Le statut et la disponibilité sont impossibles à confondre.

- [ ] Tous les liens externes sont centralisés dans le contenu, jamais codés en dur dans le composant.

- [ ] La galerie se contrôle au clavier et ferme avec Escape.

- [ ] Aucune date prévisionnelle n’est affichée sans champ confirmé.

- [ ] Le formulaire bug reçoit automatiquement le bon projet.


## 7.4 Journal / actualités

Le journal combine annonces, journaux de développement, patch notes et articles de fond. Son intérêt est de prouver la continuité du travail et de créer un historique fiable.

Audience prioritaire : Joueurs actifs, recruteurs, partenaires, communauté.


### Structure et ordre

1. Titre et introduction.

2. Article mis en avant uniquement s’il existe.

3. Filtres par type et projet.

4. Liste chronologique avec date, temps de lecture calculé, résumé, tags limités.

5. Pagination ou chargement progressif avec URL stable.

6. Flux RSS et option newsletter uniquement lorsqu’un service réel est configuré.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Filtre projet | URL mise à jour, résultats annoncés aux lecteurs d’écran | Réinitialisation disponible |

| Filtre type | Affiche annonces/devlogs/patch notes | Aucun résultat traité |

| Article | Ouvre /journal/[slug] | Brouillons exclus du build production |

| RSS | Ouvre /feed.xml | Masqué si non implémenté |

| Partager | Web Share API puis copie du lien | Toast accessible |


### États obligatoires

- Aucun article

- Un seul article

- Filtre vide

- Image manquante

- Article ancien

- Article mis à jour


### SEO et partage

Blog + CollectionPage; Article/NewsArticle JSON-LD par page; dates published/modified exactes; pages de tags indexables seulement avec contenu suffisant.


### Événements analytiques minimaux

- journal_view

- journal_filter

- article_card_click

- rss_click


### Critères d’acceptation

- [ ] Les patch notes sont distinguées des articles éditoriaux.

- [ ] La date de mise à jour ne remplace pas la date de publication.

- [ ] Les brouillons, dates futures et contenus privés ne sont pas exposés dans le bundle.

- [ ] Le flux fonctionne avec JavaScript désactivé.


## 7.5 Article / patch note

La page article privilégie la lecture, l’accessibilité et la durabilité des liens. Les patch notes doivent être scannables; les études de cas doivent rester narratives.

Audience prioritaire : Lecteur engagé, joueur cherchant une correction, recruteur.


### Structure et ordre

1. Breadcrumb, catégorie, projet associé, date et temps de lecture.

2. Titre, chapô et auteur générique “Nosfac Studios” ou auteur réel confirmé.

3. Corps MDX avec table des matières locale à partir d’une longueur seuil.

4. Images légendées, citations courtes, blocs de code si pertinent.

5. Bloc de mise à jour si l’article a été modifié de façon substantielle.

6. Partage, article précédent/suivant, contenus liés.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Table des matières | Scroll vers l’ancre et mise à jour de l’URL | Respect du focus |

| Copier le lien de section | Copie URL avec hash | Toast “Lien copié” |

| Média | Ouvre la version agrandie accessible | Téléchargement seulement si autorisé |

| Lien externe | Style distinct et icône si nouvel onglet | Vérification périodique des liens |

| Signaler une erreur | Contact prérempli avec URL article | Aucune donnée cachée inutile |


### États obligatoires

- Article standard

- Patch note

- Article long

- Sans média

- Mis à jour

- Lien cassé détecté


### SEO et partage

Article JSON-LD, breadcrumb, Open Graph article; heading structure stricte; canonical; noindex pour previews.


### Événements analytiques minimaux

- article_view

- article_toc_click

- article_share

- article_external_click

- article_report_error


### Critères d’acceptation

- [ ] Un seul H1 est présent.

- [ ] Les tableaux restent utilisables sur mobile ou se transforment avec en-têtes accessibles.

- [ ] Les images ont un texte alternatif éditorial, pas le nom de fichier.

- [ ] La largeur de lecture reste confortable sur ultrawide.


## 7.6 À propos

La page À propos donne un visage et une méthode au studio sans fabriquer une image d’entreprise surdimensionnée. Elle peut évoluer vers une page équipe lorsqu’une équipe réelle existe.

Audience prioritaire : Partenaires, recruteurs, collaborateurs, joueurs curieux.


### Structure et ordre

1. Positionnement du studio.

2. Origine concise du nom Nosfac.

3. Chronologie réelle des projets, dérivée du contenu.

4. Valeurs démontrées par exemples.

5. Méthode de développement : conception, prototypes, tests, itérations.

6. Profil fondateur optionnel, publié seulement après validation explicite des données personnelles.

7. Technologies organisées par usage, non comme nuage de logos.

8. CTA projets et contact professionnel.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Voir les projets | Ouvre /projects | Conserve la position au retour |

| Voir un jalon | Ouvre le projet/article associé | Jalon sans lien reste textuel |

| Contacter | Préremplit “opportunité professionnelle” ou “autre” selon CTA | Aucune promesse de recrutement |

| Télécharger un CV / dossier | Uniquement si fichier à jour et consenti | Masqué sinon |


### États obligatoires

- Profil fondateur masqué

- Chronologie courte

- Aucune donnée chiffrée

- Version anglaise future


### SEO et partage

AboutPage + Organization JSON-LD; informations légales distinctes de la narration de marque.


### Événements analytiques minimaux

- about_view

- about_project_click

- about_contact_click

- about_asset_download


### Critères d’acceptation

- [ ] Aucune donnée personnelle sensible n’est publiée par défaut.

- [ ] Le texte reste exact si le studio est composé d’une seule personne.

- [ ] La chronologie se met à jour depuis les fichiers projet et articles.


## 7.7 Support et FAQ

Le support résout les questions fréquentes avant d’envoyer vers un formulaire. Il doit rester utile avec peu de contenu au lancement et évoluer par projet.

Audience prioritaire : Joueurs rencontrant un problème ou cherchant une politique.


### Structure et ordre

1. Recherche locale des questions.

2. Sélecteur de projet.

3. Catégories : démarrage, compte, sauvegarde, achats, bugs, confidentialité, plateformes.

4. FAQ globale puis FAQ du projet.

5. Bloc d’escalade : “Vous n’avez pas trouvé ?” avec motifs de contact.

6. Liens vers statut, patch notes et politiques pertinentes.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Recherche FAQ | Filtre en temps réel après 2 caractères; URL optionnelle | Aucun résultat + CTA contact |

| Accordéon | Ouvre une seule ou plusieurs réponses selon préférence | aria-expanded et focus conservé |

| Choisir un projet | Reclasse les réponses pertinentes | Option “Tous les projets” |

| Contacter le support | Ouvre le bon formulaire | Projet et question source préremplis |

| Copier lien FAQ | Copie ancre stable | Toast accessible |


### États obligatoires

- Aucune FAQ

- Recherche vide

- Projet sans FAQ

- Question mise à jour

- Contenu juridique


### SEO et partage

FAQPage JSON-LD uniquement pour les questions réellement visibles et éligibles; ne pas abuser des données structurées.


### Événements analytiques minimaux

- support_view

- faq_search

- faq_open

- faq_contact_escalation

- faq_copy_link


### Critères d’acceptation

- [ ] Toutes les réponses sont accessibles sans JavaScript dans le HTML.

- [ ] La recherche n’empêche pas l’indexation du contenu.

- [ ] Les réponses juridiques renvoient vers la politique officielle plutôt que de la résumer de façon contradictoire.


## 7.8 Centre de contact

Le centre de contact qualifie la demande avant le formulaire. Le visiteur choisit un motif clair; les champs, aides et priorité s’adaptent. Toutes les demandes arrivent initialement à nosfac.studios@gmail.com, avec un objet et des métadonnées permettant le tri automatique.

Audience prioritaire : Joueur, partenaire, presse, créateur, candidat, demande juridique.


### Structure et ordre

1. Titre rassurant et délai de réponse non garanti.

2. Grille de motifs avec description courte.

3. Conseils avant envoi pour bugs et support.

4. Formulaire adaptatif.

5. Alternative e-mail visible en cas de panne du formulaire.

6. Rappel confidentialité et politique de pièces jointes.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Signaler un bug | Affiche champs projet, version, plateforme, reproduction, résultat attendu, pièces jointes | Lien FAQ bugs avant envoi |

| Suggérer une idée | Affiche contexte, proposition, bénéfice; évite la collecte de documents confidentiels | Avertissement sur absence de confidentialité implicite |

| Partenariat commercial | Affiche organisation, rôle, proposition, calendrier, budget optionnel | Priorité de tri business |

| Créateur / presse | Affiche média, audience optionnelle, échéance et besoin d’assets | Lien press kit |

| Support utilisateur | Affiche projet, compte anonymisé, plateforme et problème | Ne jamais demander de mot de passe |

| Demande juridique | Affiche identité, organisation, objet, juridiction et pièces | Route spécifique et consentement |

| Envoyer | Validation serveur, Turnstile, envoi e-mail, journalisation minimale | Erreurs de champ et erreur globale récupérable |


### États obligatoires

- Formulaire vierge

- Prérempli depuis projet

- Validation client

- Validation serveur

- Anti-bot refusé

- Envoi en cours

- Succès

- Échec fournisseur e-mail

- Pièce jointe refusée

- Hors ligne


### SEO et partage

Page noindex optionnelle si le contenu est purement fonctionnel; Organization contactPoint dans les données structurées seulement avec une adresse stable.


### Événements analytiques minimaux

- contact_view

- contact_reason_select

- contact_submit_attempt

- contact_submit_success

- contact_submit_error

- contact_attachment_add


### Critères d’acceptation

- [ ] La destination initiale est nosfac.studios@gmail.com et n’apparaît jamais dans le code client comme secret.

- [ ] Le formulaire fonctionne sans pièce jointe et indique les formats/limites avant sélection.

- [ ] Aucun mot de passe, clé API, donnée bancaire ou contenu médical n’est demandé.

- [ ] Une erreur d’envoi conserve les champs localement dans la session et propose un e-mail de secours.

- [ ] Le succès fournit un identifiant de demande non séquentiel si un stockage de tickets existe.


## 7.9 Confirmation de contact

La confirmation réduit l’incertitude et indique les prochaines étapes sans promettre un délai irréaliste.

Audience prioritaire : Toute personne ayant envoyé un formulaire.


### Structure et ordre

1. Icône de succès non animée en boucle.

2. Message principal.

3. Résumé : motif, projet, adresse de réponse masquée partiellement.

4. Conseils selon motif : conserver logs, ne pas renvoyer plusieurs fois, press kit, etc.

5. Retour au projet ou à l’accueil.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Retour au projet | Ouvre le projet source | Masqué si aucun projet |

| Envoyer une autre demande | Réinitialise le formulaire après confirmation | Protection anti-spam maintenue |

| Copier référence | Copie l’identifiant | Toast |


### États obligatoires

- Succès complet

- Succès e-mail sans ticket

- Confirmation différée

- Erreur de navigation directe


### SEO et partage

noindex, nofollow; ne jamais exposer le contenu de la demande dans l’URL.


### Événements analytiques minimaux

- contact_success_view

- contact_reference_copy

- contact_return_project


### Critères d’acceptation

- [ ] Une navigation directe vers l’URL sans état ne révèle aucune demande précédente.

- [ ] Les données du formulaire sont supprimées du navigateur après confirmation, hors préférence explicitement utile.


## 7.10 Press kit

Le press kit centralise les informations officiellement réutilisables par la presse et les créateurs. Il ne doit être publié que lorsque des assets propres existent.

Audience prioritaire : Presse, créateurs de contenu, partenaires.


### Structure et ordre

1. Présentation courte de Nosfac Studios.

2. Boilerplate officiel de 50, 100 et 250 mots.

3. Logos et règles d’utilisation.

4. Fiches de projets avec pitch, plateformes, statut et liens.

5. Captures haute résolution approuvées.

6. Coordonnées presse.

7. Archive ZIP versionnée et date de mise à jour.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Télécharger le kit complet | Télécharge un ZIP versionné | Taille indiquée |

| Télécharger un logo | Choix SVG/PNG clair/sombre | Pas de fichiers de police partagés |

| Copier le boilerplate | Copie le texte | Toast |

| Contacter la presse | Formulaire prérempli | Échéance demandée |


### États obligatoires

- Kit indisponible

- Projet sans assets

- Asset obsolète

- Téléchargement échoué


### SEO et partage

CreativeWork / Organization; fichiers nommés et indexables selon stratégie; licence d’utilisation explicite.


### Événements analytiques minimaux

- press_view

- press_asset_download

- press_boilerplate_copy

- press_contact


### Critères d’acceptation

- [ ] Chaque asset a un propriétaire, une date et une autorisation de diffusion.

- [ ] Les logos tiers ne sont pas inclus sans droit.

- [ ] Les téléchargements ont des noms de fichiers professionnels et stables.


## 7.11 Pages légales

Les pages légales sont éditorialement sobres, datées et distinctes. Le site ne doit pas inventer une forme juridique, un numéro d’immatriculation ou une adresse postale. Les champs inconnus restent bloquants avant lancement commercial.

Audience prioritaire : Tous les visiteurs, utilisateurs de formulaire, plateformes.


### Structure et ordre

1. Mentions légales.

2. Politique de confidentialité.

3. Conditions d’utilisation.

4. Politique cookies et gestion des préférences.

5. Historique des versions et date d’entrée en vigueur.

6. Contact juridique.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Sommaire | Navigation interne | Focus et URL hash |

| Gérer les cookies | Rouvre le centre de préférences | Toujours accessible |

| Contacter pour les données | Formulaire juridique prérempli | Identité vérifiée selon demande |

| Version précédente | Affiche archive si conservée | Pas d’archive publique si risque de confusion; copie interne au minimum |


### États obligatoires

- Données légales incomplètes

- Aucun cookie non essentiel

- Analytics activées avec consentement

- Changement de politique


### SEO et partage

Pages indexables; titres explicites; date updated; pas de données structurées inutiles.


### Événements analytiques minimaux

- legal_view

- cookie_preferences_open

- privacy_contact_click


### Critères d’acceptation

- [ ] Aucune page légale ne contient de placeholder en production.

- [ ] Les scripts non essentiels restent bloqués avant consentement lorsque requis.

- [ ] Le retrait du consentement est aussi simple que son acceptation.


## 7.12 Erreurs, maintenance et indisponibilité

Les erreurs doivent préserver la confiance, proposer une action et fournir un moyen de signalement. L’identité reste présente mais le message prime sur l’illustration.

Audience prioritaire : Tous les visiteurs.


### Structure et ordre

1. 404 : page introuvable, liens vers projets, accueil et recherche.

2. 500 : problème temporaire, identifiant d’erreur, réessai.

3. Hors ligne : contenus déjà visités et indication réseau.

4. Maintenance : périmètre, statut et prochaine mise à jour si connue.

5. Projet non publié : redirection ou page explicite selon contexte.


### Interactions et clics

| Déclencheur | Résultat | Retour / erreur |

| --- | --- | --- |

| Retour accueil | Ouvre / | Toujours disponible |

| Voir les projets | Ouvre /projects | Toujours disponible |

| Réessayer | Relance la requête ou rafraîchit la route | Désactivé pendant la tentative |

| Signaler | Contact avec errorId et route | Aucune stack technique exposée |


### États obligatoires

- 404

- 500

- Offline

- Maintenance planifiée

- Service tiers indisponible

- Contenu supprimé


### SEO et partage

404/500 noindex; codes HTTP corrects; pas de soft 404.


### Événements analytiques minimaux

- error_view

- error_retry

- error_contact

- offline_view


### Critères d’acceptation

- [ ] Le code HTTP correspond à la situation.

- [ ] Aucune stack trace, secret ou identifiant interne sensible n’est affiché.

- [ ] Les actions restent accessibles au clavier.


# 8. Modèle éditorial des projets initiaux

> **Règle -** Les textes ci-dessous sont des cadres de contenu, pas des affirmations finales. Le dépôt et le fondateur doivent valider chaque fait, capture, plateforme, statut et date avant publication.


## 8.1 Chain

Positionnement provisoire : jeu mobile compétitif centré sur des chaînes de mots, avec modes solo et parties entre amis. Les informations déjà structurantes pour la page publique sont l’importance du rythme, la lisibilité des règles et la possibilité de configurer des salons privés. La page ne doit pas publier de détails de règles non stabilisés.

| Champ | Valeur initiale / règle |

| --- | --- |

| slug | chain |

| type | game |

| statut | development ou private-beta selon état réel |

| pitch court | À rédiger en une phrase après validation du gameplay final |

| preuve visuelle | Captures réelles de l’interface; aucune fausse capture conceptuelle présentée comme produit |

| CTA | Suivre le projet / Voir les mises à jour tant qu’aucun store public n’existe |

| points démontrables | Modes, configuration de parties privées, direction visuelle, fiabilité multijoueur - seulement après implémentation |

| support | Formulaire bug prérempli “Chain” |


### Storytelling recommandé

- Le problème : transformer un jeu verbal simple en expérience rapide, claire et compétitive.

- Le défi produit : conserver une règle compréhensible tout en ajoutant modes, progression et parties privées.

- Le défi technique : synchronisation, validation des réponses, reconnexion et fiabilité jusqu’au nombre de joueurs supporté.

- La preuve : vidéo courte d’une manche, captures des salons et changelog de stabilité.


## 8.2 KnowOut

Positionnement provisoire : application mobile de jeu compétitif à architecture modulaire, comprenant plusieurs modes et un travail important sur le design system, l’expérience de partie et la fiabilité. Le concept public exact doit être validé depuis le cahier des charges ou le dépôt avant rédaction définitive.

| Champ | Valeur initiale / règle |

| --- | --- |

| slug | knowout |

| type | game |

| stack public facultatif | Flutter; détails Riverpod/architecture réservés à l’étude de cas technique si utile |

| modes connus | Solo, duel, battle royale, partie privée - confirmer les noms et disponibilités |

| statut | development |

| CTA | Voir le journal de développement / Suivre le projet |

| média | Captures réelles sur appareil ou émulateur, sans données de test visibles |

| étude de cas | Design system partagé, refactorings, gestion des modes et qualité visuelle |


### Storytelling recommandé

- Montrer la progression du prototype vers une application cohérente, pas seulement une liste de fonctionnalités.

- Sélectionner trois décisions difficiles et expliquer leur effet mesurable ou observable.

- Présenter les modes par bénéfice joueur, pas par architecture interne.

- Éviter tout vocabulaire de grande équipe; préciser le rôle réel du fondateur.


## 8.3 Jeu musical mot → chanson (nom provisoire)

Concept confirmé : un mot est tiré au hasard et le joueur doit proposer une chanson dans laquelle ce mot apparaît. Une réponse valide rapporte des points; une réponse incorrecte en retire. Le produit vise le solo et le multijoueur, avec un futur mode Premium permettant notamment de jouer autour d’un artiste choisi. La page publique doit être particulièrement rigoureuse sur les licences : elle ne doit jamais laisser croire que Nosfac Studios diffuse librement des morceaux ou des paroles.

| Champ | Valeur initiale / règle |

| --- | --- |

| slug temporaire | music-word-game |

| nom affiché | Nom de projet provisoire clairement marqué; redirection 301 lors du naming final |

| pitch | “Un mot. Une chanson. À vous de trouver.” - à tester et localiser |

| mécanique | Trouver une chanson contenant le mot proposé |

| validation | Base de réponses progressive + traitement des cas incertains; ne pas revendiquer une exactitude absolue |

| écoute | Liens externes vers Spotify, Deezer, Apple Music ou services disponibles; aucune diffusion directe sans accord |

| Premium | Choix d’artiste et contenus personnalisés, sans avantage compétitif pay-to-win |

| juridique | Aucune parole affichée; toute source ou licence utilisée doit être documentée avant lancement |


### Storytelling recommandé

- Accroche visuelle immédiate : mot affiché, champ de recherche de chanson, résultat de validation.

- Expliquer le plaisir de mémoire musicale et de confrontation entre amis.

- Présenter la validation comme un système en amélioration, avec contestation et modération, pas comme une IA omnisciente.

- Ne montrer les logos de plateformes musicales qu’en respectant leurs règles de marque et uniquement lorsque les intégrations sont actives.


# 9. Cahier des composants UI

Tous les composants sont accessibles, typés et documentés dans Storybook ou une galerie interne équivalente. Les composants de contenu ne connaissent pas les projets spécifiques; ils reçoivent des données validées. Aucun composant ne doit embarquer une chaîne de texte éditoriale longue en dur.

| Composant | Responsabilité | Variantes / états |

| --- | --- | --- |

| AppShell | En-tête, skip link, main, footer | default, menu-open, scrolled |

| Header | Navigation principale et CTA | top, compact, dark, light |

| MobileMenu | Navigation mobile modale | closed, opening, open, closing |

| ThemeToggle | Système/clair/sombre | system, light, dark |

| Button | Actions | primary, secondary, ghost, danger; idle/hover/focus/pressed/loading/disabled |

| Link | Navigation | internal, external, inline, standalone |

| ProjectCard | Résumé projet | featured, standard, compact, archived |

| ProjectStatus | Statut textuel | development, beta, released, paused, archived |

| MediaFrame | Image/vidéo avec ratio et légende | image, video, placeholder, error |

| Gallery | Médias projet | grid, carousel, lightbox |

| ArticleCard | Résumé article | featured, standard, compact |

| Tag | Catégorie non interactive | neutral, project-color |

| FilterChip | Filtre interactif | off, hover, on, disabled |

| Breadcrumb | Repérage | desktop, compact-mobile |

| Accordion | FAQ | closed, open, disabled |

| SearchField | Recherche locale | empty, typing, results, no-results, error |

| FormField | Label, contrôle, aide, erreur | idle, focus, valid, invalid, disabled |

| Select/Combobox | Choix projet/motif | closed, open, searching, empty |

| FileUpload | Pièces jointes | idle, drag, uploading, complete, rejected |

| Toast | Feedback non bloquant | success, info, warning, error |

| Dialog | Galerie ou confirmation | closed/open; focus trapped |

| Callout | Information éditoriale | info, success, warning, danger |

| Timeline | Jalons réels | compact, detailed |

| Stat | Chiffre vérifié | neutral, highlighted |

| CodeBlock | Extrait technique | plain, filename, copyable |

| NewsletterForm | Optionnel | idle, submitting, success, error |

| CookieBanner | Consentement | initial, preferences, hidden |

| Pagination | Navigation de listes | first, middle, last |

| EmptyState | Absence de contenu | informational, actionable |

| Skeleton | Chargement | text, card, media |

| ErrorState | Erreur récupérable | inline, section, page |

| Footer | Navigation et informations | full, compact |


## 9.1 Contrats de composants

- Props strictement typées; pas de any; unions discriminées pour les variantes.

- Les attributs ARIA sont calculés à partir de l’état réel, pas passés librement depuis le contenu.

- Les composants interactifs exposent ref, disabled, loading et aria-describedby quand pertinent.

- Les icônes décoratives sont aria-hidden; les icônes seules ont un nom accessible.

- Les composants médias exigent alt ou alt vide explicitement justifié.

- Les composants de lien distinguent navigation interne et destination externe.

- Chaque composant majeur possède tests de rendu, clavier, états et snapshots visuels ciblés.


# 10. Architecture du contact et routage e-mail


## 10.1 Destination et identité

Phase initiale : toutes les demandes sont délivrées à nosfac.studios@gmail.com. Après acquisition du domaine, le site affiche contact@nosfacstudios.com et peut créer des alias support@, business@, press@ et legal@. Ces alias peuvent rediriger vers la même boîte; le visiteur n’a pas à choisir une adresse. Le formulaire reste le point d’entrée principal car il structure les informations.

| Motif | Préfixe objet | Champs supplémentaires | Label Gmail recommandé |

| --- | --- | --- | --- |

| Bug | [BUG][{project}] | Version, plateforme, étapes, attendu, obtenu, fréquence, pièces | Support/Bugs |

| Support | [SUPPORT][{project}] | Compte anonymisé, plateforme, catégorie | Support/General |

| Idée | [IDEA][{project}] | Problème, proposition, bénéfice | Product/Ideas |

| Avis | [FEEDBACK][{project}] | Note libre, contexte | Product/Feedback |

| Business | [BUSINESS] | Organisation, rôle, proposition, calendrier, budget optionnel | Business |

| Créateur | [CREATOR] | Chaîne/média, lien, audience optionnelle, besoin, date | Press/Creators |

| Presse | [PRESS] | Média, angle, échéance, assets requis | Press |

| Juridique | [LEGAL] | Organisation, juridiction, objet, référence | Legal |

| Carrière | [CAREER] | Profil, proposition, portfolio, disponibilité | Career |

| Technique | [TECH] | Contexte, environnement, logs non sensibles | Support/Technical |

| Autre | [GENERAL] | Sujet et message | Inbox |


## 10.2 Pipeline serveur

```text
Client form
  -> validation locale (Zod schema partagé)
  -> POST /api/contact
  -> origin + CSRF strategy + rate limit
  -> Cloudflare Turnstile server verification
  -> server-side validation and normalization
  -> optional attachment upload to private object storage
  -> malware/content-type/size checks
  -> EmailProvider.send() to nosfac.studios@gmail.com
  -> minimal audit record with retention policy
  -> success response with opaque request reference
```


## 10.3 Exigences anti-abus

- Limite indicative : 3 envois par 15 minutes par combinaison IP hachée + fingerprint non invasif; ajustable après observation.

- Honeypot invisible aux humains et délai minimal de remplissage comme signaux secondaires, jamais comme seule protection.

- Turnstile vérifié côté serveur; le token client seul n’est pas une preuve.

- Taille cumulée des pièces jointes limitée; formats initiaux : PNG, JPG, WEBP, PDF, TXT/LOG nettoyé. Vidéo via lien partagé plutôt qu’upload lourd au lancement.

- Les fichiers sont privés, accessibles par URL signée courte, supprimés automatiquement après 30 jours sauf obligation légale ou suivi actif documenté.

- Aucune pièce jointe n’est exécutée, prévisualisée en HTML brut ou retransmise comme contenu actif.


## 10.4 Messages utilisateur

| Situation | Message |

| --- | --- |

| Succès | Votre message a bien été envoyé. Nous le lirons dès que possible. |

| Champs invalides | Vérifiez les champs indiqués. Votre message n’a pas été envoyé. |

| Anti-bot | La vérification de sécurité n’a pas abouti. Réessayez ou écrivez à nosfac.studios@gmail.com. |

| Fichier trop grand | Ce fichier dépasse la limite autorisée. Ajoutez un lien de partage dans votre message. |

| Type refusé | Ce format n’est pas accepté. Utilisez une image, un PDF ou un fichier texte. |

| Fournisseur indisponible | L’envoi est temporairement indisponible. Votre texte reste dans cette page; vous pouvez réessayer ou utiliser l’adresse e-mail affichée. |

| Trop de tentatives | Trop de demandes ont été envoyées récemment depuis cette connexion. Réessayez plus tard. |


# 11. Architecture technique de référence


## 11.1 Stack

| Couche | Choix | Rationale |

| --- | --- | --- |

| Framework | Next.js App Router, version stable maintenue au moment de l’implémentation | Rendu serveur/statique, routing, métadonnées, images, route handlers. |

| Langage | TypeScript strict | Contrats de contenu et composants fiables. |

| Styles | Tailwind CSS + variables CSS de design tokens | Vitesse d’implémentation sans enfermer les tokens dans des classes. |

| Composants | shadcn/ui comme source de primitives adaptées, pas comme thème final | Code possédé par le dépôt et accessible. |

| Mouvement | Motion for React (anciennement Framer Motion), usage sélectif | Micro-interactions déclaratives et reduced motion. |

| Validation | Zod | Schémas partagés contenu/formulaires/API. |

| Contenu | MDX + données TypeScript/JSON validées | Versionnable, portable, sans coût CMS. |

| Tests unitaires | Vitest + Testing Library | Rapides et adaptés aux composants/utilitaires. |

| Tests E2E | Playwright | Navigateurs, formulaires, responsive, accessibilité de parcours. |

| A11y automatisée | axe-core dans les tests + audits manuels | Détection continue, sans prétendre remplacer les tests humains. |

| Déploiement | GitHub + Vercel previews/production | Flux simple; portabilité maintenue. |

| E-mail | Interface EmailProvider; Resend recommandé après domaine vérifié | Éviter le couplage fournisseur. |

| Anti-bot | Cloudflare Turnstile | Protection sans CAPTCHA traditionnel intrusif. |

| Analytics | Option privacy-first, activée seulement après décision et consentement requis | Mesurer sans collecter inutilement. |


## 11.2 Principes d’architecture

- Server Components par défaut; Client Components uniquement pour interaction réelle.

- Contenu statique pré-rendu lorsque possible; ISR/revalidation uniquement lorsque nécessaire.

- Aucun appel à une base de données pour afficher les pages publiques de base au lancement.

- Dépendances minimales; chaque package doit avoir une justification, une licence compatible et une maintenance active.

- Séparation claire entre domaine (types), contenu, présentation, infrastructure et intégrations.

- Les services externes sont derrière des adapters testables.

- Les erreurs attendues sont des résultats typés; les exceptions inattendues sont journalisées avec identifiant corrélable.


## 11.3 Arborescence du dépôt

```text
nosfac-studios/
├── .github/
│   ├── workflows/ci.yml
│   ├── dependabot.yml
│   └── pull_request_template.md
├── docs/
│   ├── MASTER_SPECIFICATION.md
│   ├── decisions/
│   ├── runbooks/
│   └── content-guidelines.md
├── public/
│   ├── brand/
│   ├── projects/{project-slug}/
│   ├── press/
│   └── icons/
├── content/
│   ├── projects/*.mdx
│   ├── journal/*.mdx
│   ├── faq/*.json
│   ├── pages/*.mdx
│   └── redirects.json
├── src/
│   ├── app/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── content/
│   │   └── forms/
│   ├── config/
│   ├── domain/
│   ├── lib/
│   ├── services/
│   │   ├── email/
│   │   ├── analytics/
│   │   ├── storage/
│   │   └── anti-bot/
│   ├── styles/
│   └── tests/
├── scripts/
│   ├── validate-content.ts
│   ├── check-links.ts
│   └── generate-press-kit.ts
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```


## 11.4 Règles TypeScript

- strict: true; noUncheckedIndexedAccess et exactOptionalPropertyTypes activés si compatibles.

- Pas de @ts-ignore sans commentaire, ticket et date de suppression.

- Pas de type any; unknown + narrowing lorsque la donnée externe est inconnue.

- Types métier dans src/domain, schémas Zod à la frontière, mapping explicite vers les view models.

- Les dates restent ISO 8601 dans les données et deviennent des objets Date seulement à la frontière d’affichage.

- Les slugs sont stables; tout renommage ajoute une redirection permanente et conserve l’ancien slug dans les alias.


# 12. Modèle de contenu et ajout de nouveaux projets

Le site doit être facile à enrichir sans toucher aux composants. Le contenu initial est géré dans Git afin de garantir la revue, l’historique et l’absence de coût. Un CMS headless peut être ajouté plus tard sans changer le modèle métier; le site ne doit pas dépendre du format propriétaire d’un CMS.


## 12.1 Schéma projet

```typescript
export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  aliases: z.array(z.string()).default([]),
  name: z.string().min(1),
  provisionalName: z.boolean().default(false),
  type: z.enum(['game', 'application', 'experiment', 'tool']),
  status: z.enum(['concept', 'development', 'private-beta', 'public-beta', 'released', 'paused', 'archived']),
  featured: z.boolean().default(false),
  summary: z.string().max(180),
  description: z.string(),
  role: z.array(z.string()),
  platforms: z.array(PlatformSchema),
  technologies: z.array(z.string()),
  startedAt: z.string().date().optional(),
  releasedAt: z.string().date().optional(),
  updatedAt: z.string().datetime(),
  accent: AccentSchema,
  heroMedia: MediaSchema.optional(),
  gallery: z.array(MediaSchema).default([]),
  features: z.array(FeatureSchema).default([]),
  links: z.array(ProjectLinkSchema).default([]),
  faqs: z.array(z.string()).default([]),
  seo: SeoSchema,
  visibility: z.enum(['draft', 'unlisted', 'public']),
});
```


## 12.2 Procédure d’ajout d’un projet

1. Copier templates/project.template.mdx vers content/projects/{slug}.mdx.

2. Remplir les champs obligatoires sans inventer de date ni de plateforme.

3. Ajouter les médias optimisés dans public/projects/{slug}/ avec noms descriptifs.

4. Écrire les textes alternatifs selon le contenu visuel, pas selon le rôle marketing de l’image.

5. Lancer npm run content:validate et corriger tous les avertissements bloquants.

6. Lancer npm run dev et vérifier les vues mobile, tablette, desktop, clair, sombre et reduced motion.

7. Créer une branche feat/project-{slug}, ouvrir une preview Vercel, puis vérifier les métadonnées et le partage social.

8. Publier en passant visibility à public; aucune modification de composant ne doit être nécessaire.


## 12.3 Déclencheurs pour migrer vers un CMS

- Plus de deux éditeurs non techniques réguliers.

- Plus de 25 projets ou 100 articles avec besoin de recherche éditoriale avancée.

- Besoin de planification, workflow de validation ou localisation fréquente.

- Le CMS choisi doit exporter l’intégralité des contenus, fournir des webhooks signés et conserver des slugs stables.

- Les composants consomment toujours le modèle Project/Article interne via un adapter.


# 13. SEO, partage et découvrabilité


## 13.1 SEO technique

- Métadonnées générées par route : title, description, canonical, robots, Open Graph, Twitter/X Card.

- sitemap.xml généré depuis le contenu public uniquement; lastmod reflète une modification substantielle.

- robots.txt autorise les contenus publics et bloque previews, routes API et surfaces administratives.

- Images Open Graph générées ou statiques, testées à 1200×630 et avec texte lisible sur mobile.

- JSON-LD Organization, WebSite, BreadcrumbList, VideoGame/SoftwareApplication et Article selon le contenu réel.

- Pas de données structurées d’avis, prix ou disponibilité non réelles.

- Redirections 301 pour anciens slugs; pas de chaînes de redirections.

- Pages filtres canoniques vers l’index sauf lorsqu’une page éditoriale dédiée justifie l’indexation.


## 13.2 Stratégie éditoriale

Le référencement ne doit pas transformer les titres en chaînes de mots-clés. Chaque page répond à une intention précise : découvrir le studio, comprendre un projet, suivre une mise à jour, obtenir du support ou entrer en contact. Les noms des projets deviennent les requêtes de marque; les sous-titres et descriptions fournissent les termes descriptifs.


## 13.3 Accessibilité

WCAG 2.2 niveau AA constitue le seuil de production. Les audits automatiques sont nécessaires mais insuffisants; chaque version majeure inclut un parcours clavier complet, un test avec lecteur d’écran sur les pages critiques et une vérification zoom 200-400 %.

| Domaine | Exigence |

| --- | --- |

| Clavier | Tous les contrôles accessibles, focus visible, ordre logique, aucun piège hors dialogs contrôlés. |

| Structure | Landmarks, titres hiérarchiques, un H1, listes et tableaux sémantiques. |

| Contraste | Texte et contrôles conformes; focus non dépendant de la couleur seule. |

| Cibles | Taille cible minimale adaptée aux recommandations WCAG 2.2; espaces suffisants. |

| Mouvement | prefers-reduced-motion; aucune animation indispensable à la compréhension. |

| Médias | Alt utiles, sous-titres/transcriptions pour contenu informatif, pause des vidéos. |

| Formulaires | Labels persistants, instructions avant champ, erreurs reliées, résumé d’erreurs. |

| Langue | lang correct, changements de langue marqués, dates localisées. |

| Zoom | Aucune perte de contenu ou fonctionnalité à 400 % sur largeur équivalente. |

| Thème | Clair et sombre testés séparément; thème système par défaut. |


# 14. Performance, sécurité et confidentialité


## 14.1 Budgets de performance

| Métrique / ressource | Budget initial | Action en cas de dépassement |

| --- | --- | --- |

| JavaScript initial par route marketing | ≤ 120 kB compressé, objectif plus bas | Retirer librairie, déplacer en Server Component, charger à l’interaction |

| CSS critique | ≤ 35 kB compressé | Dédupliquer tokens et variantes |

| Hero image mobile | ≤ 180 kB AVIF/WebP selon qualité | Art direction et dimensions adaptées |

| LCP | < 2,5 s p75 | Auditer serveur, image, police, TTFB |

| INP | < 200 ms p75 | Réduire JS, listeners, travail main thread |

| CLS | < 0,1 p75 | Dimensions médias, polices et placeholders |

| Requêtes tierces au chargement | 0 non essentiel avant consentement | Supprimer ou différer |

| Animations | 60 FPS cible sur appareil moyen | Réduire blur, ombres, zones peintes |


## 14.2 En-têtes de sécurité

- Content-Security-Policy en mode report-only avant enforcement; nonce ou hash pour scripts nécessaires.

- Strict-Transport-Security après validation HTTPS et sous-domaines.

- X-Content-Type-Options: nosniff.

- Referrer-Policy: strict-origin-when-cross-origin.

- Permissions-Policy restrictive pour caméra, microphone, géolocalisation et autres capacités non utilisées.

- frame-ancestors via CSP; pas de dépendance à X-Frame-Options seul.

- Cookies éventuels Secure, HttpOnly, SameSite adapté, durée minimale.


## 14.3 Gestion des secrets

- Secrets uniquement dans variables d’environnement serveur; aucun préfixe NEXT_PUBLIC sauf donnée réellement publique.

- .env.example contient les noms et descriptions, jamais les valeurs.

- Environnements Development, Preview et Production séparés sur Vercel.

- Rotation documentée des clés e-mail, anti-bot, storage et monitoring.

- Scanning de secrets dans CI et protection de branche.


## 14.4 Vie privée et cookies

Au lancement, privilégier des statistiques minimales sans cookie ou aucune analytics tant que les besoins ne sont pas établis. Si des traceurs non essentiels sont ajoutés, ils restent bloqués avant consentement, les choix sont granulaires, le refus est aussi visible que l’acceptation et le centre de préférences reste accessible depuis le footer.

| Donnée | Finalité | Rétention initiale | Remarque |

| --- | --- | --- | --- |

| Message de contact | Répondre et suivre la demande | 12 mois max à réévaluer | Suppression anticipée sur demande lorsque possible |

| Pièce jointe | Diagnostic ou traitement | 30 jours par défaut | Stockage privé et suppression automatisée |

| IP brute | Ne pas stocker durablement | Mémoire/edge seulement | Hachage salé si rate limiting persistant |

| Logs serveur | Sécurité et diagnostic | 7 à 30 jours | Masquer e-mails, tokens et contenu |

| Analytics | Performance et usage agrégé | Selon outil et consentement | Éviter profils individuels |

| Préférence thème | Confort | Jusqu’à suppression locale | LocalStorage, non sensible |


# 15. Qualité, tests, CI/CD et déploiement


## 15.1 Pyramide de tests

| Niveau | Couverture attendue |

| --- | --- |

| Statique | TypeScript, ESLint, format, validation contenu, liens internes, schémas. |

| Unitaire | Formatage, filtres, mappings, validation, génération de métadonnées. |

| Composant | Boutons, accordéons, formulaires, menu, galerie, cartes et états. |

| Intégration | Route contact avec adapters simulés, contenus, redirections, sitemap. |

| E2E | Accueil → projet; FAQ → contact; formulaire succès/erreur; thème; navigation clavier. |

| Visuel | Pages critiques à largeurs de référence et thèmes; revue des diffs. |

| Manuel | Lecteur d’écran, clavier, zoom, appareils réels, liens externes, e-mail reçu. |


## 15.2 Matrice navigateurs

| Plateforme | Niveau |

| --- | --- |

| Chrome / Edge - deux dernières versions | Support complet |

| Firefox - deux dernières versions | Support complet |

| Safari macOS - deux dernières versions | Support complet |

| Safari iOS - deux dernières versions majeures | Support complet |

| Chrome Android récent | Support complet |

| Navigateurs anciens | Dégradation lisible, sans garantie d’animations |


## 15.3 Pipeline CI

```text
pull_request / push:
  1. install with locked package manager
  2. lint
  3. typecheck
  4. content validation
  5. unit + component tests
  6. production build
  7. Playwright smoke tests
  8. accessibility checks
  9. link and metadata validation
  10. preview deployment and visual review
main merge:
  -> production deployment
  -> smoke tests against production
  -> rollback automatically or manually if critical checks fail
```


## 15.4 Stratégie Git

- Branche main protégée; pas de push direct lorsque le site devient public.

- Branches courtes : feat/, fix/, content/, chore/.

- Commits orientés intention; Conventional Commits recommandé sans obsession.

- Pull request avec résumé, captures mobile/desktop, tests effectués, impact accessibilité et rollback.

- Preview Vercel par PR; aucune preview indexée par les moteurs.


## 15.5 Environnements

| Environnement | Usage | Données |

| --- | --- | --- |

| Development | Local, mocks et debug | Clés de test, e-mail vers boîte de test |

| Preview | Chaque PR | Services sandbox, noindex, protection si contenu confidentiel |

| Production | Site public | Clés production, domaine, monitoring et sauvegarde |


## 15.6 Déploiement Vercel

Le dépôt GitHub est importé dans Vercel. Chaque push de branche produit une preview; la branche main produit la version de production. Les variables d’environnement sont séparées par environnement. Le domaine peut être ajouté sans reconstruire l’architecture. Tant que le site reste personnel et non commercial, le plan Hobby peut convenir; lors d’une activité professionnelle ou commerciale, le plan et les conditions d’usage doivent être réévalués.


## 15.7 Portabilité et plan de sortie

- Build compatible Node standard et sortie standalone lorsque possible.

- Dockerfile de production maintenu et testé au moins à chaque version majeure.

- Aucune donnée essentielle stockée uniquement dans un service Vercel propriétaire.

- Adapters pour e-mail, stockage, analytics et anti-bot.

- Export complet du contenu et des médias versionné.

- Runbook de migration DNS et hébergement testé annuellement lorsque le site devient critique.


# 16. Monitoring, exploitation et maintenance longue durée


## 16.1 Observabilité

| Signal | Outil / méthode | Alerte |

| --- | --- | --- |

| Disponibilité | Uptime externe sur accueil, projets, contact | 2 échecs consécutifs |

| Erreurs client | Sentry ou équivalent, scrubbing PII | Pic ou nouvelle erreur critique |

| Erreurs serveur | Logs structurés + errorId | Taux > seuil ou contact en panne |

| Web Vitals | RUM privacy-conscious | Régression p75 |

| Formulaire | Taux succès/erreur sans contenu du message | Échec fournisseur ou spam |

| Liens externes | Vérification planifiée | Lien store/press kit cassé |

| Certificat/domaine | Alertes registrar + calendrier | 60/30/7 jours |

| Dépendances | Dependabot/Renovate + audit | Faille critique exploitable |


## 16.2 Maintenance périodique

| Fréquence | Actions |

| --- | --- |

| À chaque contenu | Validation, preview, mobile, métadonnées, liens, alt, orthographe. |

| Hebdomadaire | Vérifier formulaires, erreurs, uptime, backups et dépendances critiques. |

| Mensuelle | Audit liens, analytics utiles, vitesse, spam, pages obsolètes. |

| Trimestrielle | Audit accessibilité ciblé, contenu projet, politiques, press kit, redirections. |

| Semestrielle | Mise à jour framework planifiée, revue dépendances et design drift. |

| Annuelle | Revue complète de la marque, du domaine, de la conformité, des coûts et du plan de reprise. |


## 16.3 Incidents

1. Détecter et qualifier : impact public, données, contact, contenu ou performance.

2. Stabiliser : rollback Vercel ou désactivation de la fonctionnalité via configuration.

3. Communiquer : message sobre sur le site/status si l’incident affecte les utilisateurs.

4. Corriger : branche dédiée, tests ciblés, review et déploiement progressif.

5. Apprendre : post-mortem court, sans recherche de culpable, avec action préventive et propriétaire.


# 17. Analytics et indicateurs utiles

Les analytics doivent répondre à des décisions. Le site n’a pas besoin d’un profil comportemental complet. Les événements sont documentés, nommés de façon stable et ne contiennent ni message de contact, ni e-mail, ni titre libre saisi par l’utilisateur.

| Question | Métrique |

| --- | --- |

| Les visiteurs comprennent-ils les projets ? | Clic projet depuis accueil, profondeur vers page projet, CTA principal. |

| Le support est-il trouvable ? | Vue support, recherche FAQ, escalade contact, abandon formulaire. |

| Quels contenus sont utiles ? | Lectures d’articles, scroll qualitatif agrégé, clics liés. |

| Le site sert-il la carrière ? | Visites About/Press, téléchargements autorisés, contacts career/business. |

| Le site reste-t-il rapide ? | LCP, INP, CLS par route et appareil. |

| Les intégrations fonctionnent-elles ? | Taux de succès contact et liens externes officiels. |


## 17.1 Événements interdits

- Contenu du formulaire, adresse e-mail, nom, organisation ou pièce jointe.

- Texte de recherche libre s’il peut contenir une donnée personnelle; préférer catégorie ou hash irréversible si nécessaire.

- URL signée de pièce jointe, token Turnstile ou identifiant de session.

- Fingerprint publicitaire ou recoupement cross-site.


# 18. Roadmap d’implémentation

| Phase | Ordre de grandeur | Sortie |

| --- | --- | --- |

| Phase 0 - Fondations | 1 à 2 jours | Dépôt, Next.js, TypeScript strict, tokens, lint/test/build, contenu typé, CI minimale. |

| Phase 1 - Shell et design system | 3 à 5 jours | Header, footer, thèmes, composants, motion tokens, Storybook/galerie. |

| Phase 2 - Contenu principal | 4 à 7 jours | Accueil, index projets, pages Chain/KnowOut/musique, About. |

| Phase 3 - Journal et support | 3 à 6 jours | Journal, article, FAQ, recherche locale, erreurs. |

| Phase 4 - Contact production | 3 à 5 jours | Route serveur, fournisseur e-mail, Turnstile, rate limiting, pièces limitées, tests. |

| Phase 5 - SEO, qualité et légal | 3 à 5 jours | Metadata, JSON-LD, sitemap, privacy, cookies, accessibilité, performance. |

| Phase 6 - Déploiement | 1 à 3 jours | GitHub, Vercel previews, prod, monitoring, runbooks, backup. |

| Phase 7 - Polish final | 3 à 7 jours | Appareils réels, visuels, microcopie, animations, tests utilisateurs et corrections. |

> **Important -** Les durées sont des ordres de grandeur pour planifier le travail, pas des engagements. La qualité de sortie dépend surtout de la disponibilité des contenus et médias réels.


## 18.1 Définition de “version finale”

Une version finale n’est pas un site qui ne changera plus. C’est une base de production sans dette structurelle connue : contenu initial réel, toutes les routes critiques, contact fonctionnel, accessibilité vérifiée, performances mesurées, déploiement reproductible, monitoring actif et procédure documentée pour ajouter un projet.


# 19. Critères de recette globale


## Contenu

- [ ] Chain, KnowOut et le jeu musical provisoire existent comme entrées de contenu distinctes.

- [ ] Aucun fait, chiffre, date, plateforme, témoignage ou récompense n’est inventé.

- [ ] Toutes les images ont propriétaire, source et droit d’utilisation documentés.

- [ ] Le nom provisoire du jeu musical est marqué et remplaçable sans casser les URLs historiques.


## Navigation

- [ ] Tous les liens principaux fonctionnent au clavier, à la souris et au tactile.

- [ ] Le menu mobile piège correctement le focus et le restaure à la fermeture.

- [ ] Aucune page critique n’est à plus de trois interactions depuis l’accueil.

- [ ] Le bouton retour du navigateur conserve filtres et états pertinents.


## Formulaire

- [ ] Les demandes arrivent réellement à nosfac.studios@gmail.com en production.

- [ ] Chaque catégorie génère l’objet et les champs attendus.

- [ ] Le rate limiting, Turnstile et la validation serveur sont actifs.

- [ ] Les erreurs conservent le texte saisi et offrent une solution de secours.

- [ ] Aucun secret ou contenu de message n’apparaît dans les logs client.


## Qualité

- [ ] npm run lint, typecheck, test et build réussissent.

- [ ] Les tests Playwright critiques réussissent sur Chromium, Firefox et WebKit.

- [ ] Aucune erreur axe critique ou sérieuse non justifiée sur les pages critiques.

- [ ] Inspection visuelle mobile, tablette, desktop, clair, sombre et reduced motion effectuée.


## Performance

- [ ] Les budgets de bundle et images sont respectés ou une exception est documentée.

- [ ] Les Core Web Vitals sont instrumentés et ne montrent pas de régression majeure.

- [ ] Aucun script tiers non essentiel ne bloque le rendu.


## Production

- [ ] Preview et production sont séparées; previews noindex.

- [ ] Variables d’environnement documentées et configurées.

- [ ] Rollback testé.

- [ ] Domaine, certificat, redirections www/apex et renouvellement sont documentés lorsque le .com est acquis.

- [ ] Monitoring uptime et erreurs actif.


# 20. Bibliothèque de microcopie


## 20.1 CTA

| Contexte | Libellé recommandé | Éviter |

| --- | --- | --- |

| Accueil | Découvrir nos projets | En savoir plus |

| Projet disponible | Jouer maintenant / Télécharger | Commencer l’aventure |

| Projet en développement | Suivre le projet | Bientôt disponible !!! |

| Journal | Lire la mise à jour | Découvrir |

| Support | Trouver une réponse | Aide |

| Contact | Choisir le motif | Envoyer un message |

| Business | Proposer un partenariat | Collaborons ensemble |

| Bug | Signaler le problème | Soumettre |


## 20.2 Statuts projet

| Code | Libellé FR | Description courte |

| --- | --- | --- |

| concept | Concept | Exploration initiale; contenu susceptible d’évoluer. |

| development | En développement | Production active, aucune date implicite. |

| private-beta | Bêta privée | Accès limité sur invitation. |

| public-beta | Bêta publique | Disponible pour test; changements possibles. |

| released | Disponible | Version publique accessible. |

| paused | En pause | Développement temporairement suspendu. |

| archived | Archivé | Projet conservé pour référence, non maintenu. |


## 20.3 Messages d’erreur

| Code | Message public | Action |

| --- | --- | --- |

| FORM_REQUIRED | Ce champ est nécessaire pour traiter votre demande. | Focus sur champ |

| FORM_EMAIL | Saisissez une adresse e-mail valide. | Focus sur e-mail |

| FORM_TOO_LONG | Ce texte dépasse la longueur maximale. | Afficher compteur |

| UPLOAD_SIZE | Ce fichier est trop volumineux. | Proposer lien |

| UPLOAD_TYPE | Ce format de fichier n’est pas accepté. | Lister formats |

| RATE_LIMIT | Trop de tentatives récentes. Réessayez plus tard. | Désactiver temporairement |

| EMAIL_PROVIDER | L’envoi est momentanément indisponible. | Réessayer + e-mail secours |

| NOT_FOUND | Cette page n’existe pas ou a été déplacée. | Accueil/projets |

| OFFLINE | Vous semblez hors ligne. | Réessayer |


# 21. Variables d’environnement et runbooks


## 21.1 Variables

| Variable | Portée | Description |

| --- | --- | --- |

| SITE_URL | Server/build | URL canonique de l’environnement. |

| CONTACT_TO_EMAIL | Server | nosfac.studios@gmail.com au lancement. |

| CONTACT_FROM_EMAIL | Server | Expéditeur vérifié par le fournisseur. |

| RESEND_API_KEY | Server secret | Clé fournisseur e-mail si Resend. |

| TURNSTILE_SITE_KEY | Public | Clé publique du widget. |

| TURNSTILE_SECRET_KEY | Server secret | Vérification côté serveur. |

| STORAGE_* | Server secret | Stockage privé de pièces jointes si activé. |

| SENTRY_DSN | Public contrôlé | DSN sans secret, configuration scrubbing. |

| ANALYTICS_ENABLED | Build/runtime | Active seulement selon consentement et décision. |

| PREVIEW_AUTH_* | Server secret | Protection des previews si utilisée. |


## 21.2 Runbook - publier

1. Créer une branche et effectuer les modifications.

2. Lancer localement lint, typecheck, tests, content:validate et build.

3. Pousser la branche; ouvrir la preview Vercel.

4. Vérifier mobile/desktop, thème, reduced motion, clavier et métadonnées.

5. Faire relire les contenus publics et les faits.

6. Fusionner vers main; surveiller le déploiement et les smoke tests.

7. Vérifier la production, le formulaire et les erreurs pendant 30 minutes.

8. Documenter la version dans le changelog interne.


## 21.3 Runbook - connecter un .com

1. Acheter le domaine sur le compte du fondateur avec MFA et renouvellement automatique.

2. Ajouter le domaine au projet de production.

3. Configurer les enregistrements DNS indiqués; éviter les modifications simultanées inutiles.

4. Choisir l’URL canonique apex ou www et rediriger l’autre en permanent.

5. Mettre à jour SITE_URL, métadonnées, sitemap, Search Console et services e-mail.

6. Vérifier HTTPS, HSTS après stabilisation, redirections et sous-domaines.

7. Conserver le sous-domaine vercel.app comme secours technique mais ne pas le promouvoir.


# 22. Évolution sur plusieurs années

Le site doit accompagner la carrière du fondateur, mais rester centré sur Nosfac Studios. Il ne doit pas accumuler toutes les réalisations sur une seule page. La structure sépare les projets produits, les expérimentations et, si nécessaire, un profil de fondateur. Chaque nouvelle étape ajoute une couche sans casser les précédentes.

| Étape | Évolution |

| --- | --- |

| Aujourd’hui | Trois projets, journal léger, contact Gmail, contenu Git, Vercel. |

| Premier lancement public | Domaine .com, e-mail de marque, support par projet, privacy finalisée, press kit. |

| Premiers revenus | Hébergement commercial adapté, comptabilité/légal confirmés, monitoring renforcé. |

| Plusieurs jeux actifs | Filtres, pages support dédiées, statut, calendrier éditorial et CMS éventuel. |

| Collaboration régulière | Page équipe réelle, rôles, workflow de revue, permissions CMS. |

| Studio établi | Localisations, portail presse avancé, design ops, SLA internes, infrastructure multi-fournisseur si justifiée. |


## 22.1 Ce qui doit rester stable

- Nom Nosfac Studios, ton direct et honnête, priorité aux projets réels.

- Modèle de contenu portable et historique Git.

- Accessibilité et performance comme critères de sortie.

- Contact qualifié et confidentialité minimale.

- Absence de faux chiffres et de mise en scène d’une taille inexistante.


## 22.2 Ce qui peut évoluer

- Palette secondaire, composition éditoriale et accent des projets.

- CMS, fournisseur d’e-mail, hébergement et analytics via adapters.

- Navigation secondaire et types de contenu.

- Page équipe, carrière, status et newsletter lorsqu’ils deviennent utiles.


# 23. Blueprints de composition page par page

Cette section complète les spécifications UX par une description de composition directement exploitable par un agent de développement. Les dimensions sont des repères, pas des valeurs rigides. Le rendu doit conserver le rythme du contenu plutôt que forcer chaque page dans un gabarit identique.


## 23.1 Accueil


### Composition desktop

Hero 2 colonnes asymétriques 5/7. Texte à gauche, média projet phare à droite. La seconde section casse la grille avec un projet pleine largeur puis deux projets secondaires. Les blocs suivants alternent fond, largeur et densité.


### Composition mobile

Hero en une colonne; titre, pitch, CTA, média. Les projets sont empilés avec une variation de ratio et de hauteur. Les chiffres ou preuves ne sont affichés que s’ils sont vérifiés.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Hero | Nom du studio, proposition de valeur, CTA principal “Découvrir nos projets”, CTA secondaire “Nous contacter”, média réel du projet phare. |

| Projet phare | Statut, pitch, capture/vidéo, lien vers page projet. Pas de carousel automatique. |

| Sélection de projets | Chain, KnowOut et jeu musical provisoire avec hiérarchie éditoriale. |

| Méthode | Trois étapes concrètes : concevoir, tester, améliorer; chaque étape renvoie à une preuve. |

| Journal | Trois contenus maximum; section masquée si aucun contenu public. |

| CTA final | Invitation claire à découvrir les projets ou contacter le studio. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Eyebrow | Studio indépendant de jeux et logiciels |

| Headline | Nous construisons des expériences simples à comprendre, difficiles à oublier. |

| Body | Nosfac Studios développe des jeux et applications avec une attention particulière portée au rythme, à la clarté et à la qualité d’exécution. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.2 Index des projets


### Composition desktop

Introduction sur 7 colonnes, filtres sur une ligne séparée, projet phare pleine largeur, grille éditoriale 2-3 colonnes. Les archives sont visuellement plus calmes.


### Composition mobile

Titre et résumé, filtres horizontalement scrollables sans masquer le focus, cartes une colonne, archive en accordéon ou section simple.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Header de page | Titre, description, nombre calculé de projets publics. |

| Filtres | Type et statut, avec URL partageable. |

| Résultats | Cartes pilotées par données, états actifs et archivés. |

| État vide | Explication et bouton de réinitialisation. |

| CTA | Suivre le journal ou proposer une collaboration. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Headline | Projets |

| Body | Jeux, applications et expérimentations construits sous Nosfac Studios. |

| Empty | Aucun projet ne correspond à ces filtres. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.3 Page projet


### Composition desktop

Hero média 7 colonnes / texte 5 colonnes, puis contenu en bandes alternées : résumé, fonctionnalités, galerie, étude de cas, roadmap, journal, FAQ. La colonne texte de lecture reste limitée.


### Composition mobile

Statut, titre, pitch, CTA, média; métadonnées en liste; galerie swipe contrôlé; sections simples avec titres courts.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Hero projet | Statut, titre, pitch, plateformes confirmées, CTA, média. |

| Résumé | Genre/type, rôle, état, date mise à jour, technologies facultatives. |

| Fonctionnalités | 3 à 6 bénéfices vérifiés. |

| Galerie | Médias réels, légendes, lightbox accessible. |

| Étude de cas | Problème, contraintes, décisions, résultat; facultatif. |

| Roadmap | Étapes réalistes, date de mise à jour; aucune promesse non tenue. |

| Support | FAQ liée et bug report prérempli. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| CTA disponibilité | Jouer maintenant / Télécharger |

| CTA développement | Suivre le projet |

| Support | Un problème avec ce projet ? Signalez-le avec le contexte déjà rempli. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.4 Journal


### Composition desktop

Article phare 7/5, filtres compacts, grille de deux colonnes, pagination. Les patch notes utilisent une densité plus forte que les devlogs.


### Composition mobile

Liste une colonne, filtres scrollables, résumés courts, métadonnées visibles.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Introduction | Rôle du journal et fréquence non promise. |

| Article phare | Seulement si réellement pertinent. |

| Filtres | Type, projet, année si volume suffisant. |

| Liste | Titre, résumé, projet, date, temps de lecture. |

| Pagination | Liens stables; pas de scroll infini exclusif. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Headline | Journal |

| Body | Mises à jour, décisions de conception et notes de développement. |

| No content | Aucune publication pour le moment. Les projets restent accessibles. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.5 Article


### Composition desktop

Colonne de lecture 720-780 px; table des matières latérale sticky uniquement sur écrans larges; médias pouvant dépasser la colonne avec contrôle.


### Composition mobile

Lecture pleine largeur avec 20 px de marge; table des matières repliable; blocs de code scrollables.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Méta | Catégorie, projet, date, lecture. |

| Titre et chapô | Une promesse claire, pas de clickbait. |

| Corps | H2/H3, médias, listes, callouts, code. |

| Mise à jour | Note explicite si modification substantielle. |

| Navigation | Précédent/suivant et contenus liés. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Share | Partager |

| Copy anchor | Copier le lien de cette section |

| Updated | Mis à jour le {date} pour refléter {reason}. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.6 À propos


### Composition desktop

Intro courte sur 8 colonnes, histoire en deux colonnes, timeline horizontale ou verticale selon densité, méthode en panneaux éditoriaux, profil fondateur optionnel.


### Composition mobile

Histoire et méthode linéaires; timeline verticale; technologies sous forme de listes groupées.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Vision | Ce que construit le studio et pourquoi. |

| Origine | Une phrase sur le surnom et les amis. |

| Timeline | Jalons vérifiables liés à des projets/articles. |

| Méthode | Concevoir, construire, tester, corriger. |

| Technologies | Outils par usage; pas de mur de logos. |

| Fondateur | Module facultatif, données approuvées. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Headline | Un studio construit projet après projet. |

| Origin | Nosfac est un surnom devenu un nom de studio - un rappel discret des personnes présentes au commencement. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.7 Support / FAQ


### Composition desktop

Recherche et sélecteur projet sur une ligne, catégories en rail ou tabs, réponses dans une colonne large. CTA contact en fin de parcours.


### Composition mobile

Recherche sticky optionnelle, sélecteur, accordéons pleine largeur, CTA contact visible après résultats.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Recherche | Champ accessible, résultats annoncés. |

| Projet | Filtrage optionnel. |

| Catégories | Navigation légère. |

| FAQ | Accordéons avec liens stables. |

| Escalade | Motifs de contact adaptés. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Headline | Comment pouvons-nous vous aider ? |

| Search placeholder | Rechercher une question |

| Escalation | Vous n’avez pas trouvé la réponse ? Choisissez le bon motif de contact. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.8 Contact


### Composition desktop

Sélecteur de motif en grille 3 colonnes, puis formulaire 8 colonnes centré. Barre de progression inutile; une seule page adaptative.


### Composition mobile

Motifs en cartes compactes, formulaire une colonne, bouton d’envoi sticky uniquement si cela n’obstrue pas le clavier.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Motif | Choix explicite avec description. |

| Contexte | Projet et plateforme selon catégorie. |

| Identité de réponse | Nom, e-mail, organisation selon besoin. |

| Message structuré | Champs dédiés plutôt qu’un seul textarea pour bugs. |

| Pièces | Upload limité ou liens. |

| Consentement | Texte court + politique. |

| Envoi | État chargement, succès, erreur. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Headline | Contactez Nosfac Studios |

| Body | Choisissez le motif pour que votre message arrive avec le bon contexte. |

| Fallback | Le formulaire ne fonctionne pas ? Écrivez à nosfac.studios@gmail.com. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


## 23.9 Press kit


### Composition desktop

Résumé studio et téléchargement global en hero, assets par catégorie, fiches projets, contact presse.


### Composition mobile

Liste d’assets avec taille et format, boutons pleine largeur, aucun aperçu lourd au chargement.


### Blocs

| Bloc | Contenu attendu |

| --- | --- |

| Boilerplate | 50/100/250 mots. |

| Brand assets | Logo, symboles, règles. |

| Project assets | Captures approuvées. |

| Downloads | ZIP versionné. |

| Contact | Formulaire presse. |


### Microcopie de départ

| Élément | Texte |

| --- | --- |

| Headline | Press kit |

| Updated | Mis à jour le {date}. |

| Rights | Ces fichiers peuvent être utilisés dans un contexte éditorial lié à Nosfac Studios et ses projets. |


### Règles de finition

- Le premier viewport doit avoir une hiérarchie lisible sans animation.

- Chaque média réserve son espace avant chargement pour éviter les décalages.

- Le contenu reste compréhensible en thème clair, sombre et contraste renforcé.

- Le mode reduced motion conserve toutes les informations et actions.

- Aucun bloc n’est conservé s’il n’a pas de contenu réel; pas de sections vides décoratives.


# 24. Catalogue détaillé des interactions

Chaque interaction doit posséder un déclencheur, un état pressé/focus, un résultat, une stratégie d’erreur et un événement analytique seulement s’il répond à une question produit. Les lignes suivantes constituent la base de recette manuelle et automatisée.

| Zone | Interaction | Déclencheur | Résultat | Règle d’erreur/a11y | Événement |

| --- | --- | --- | --- | --- | --- |

| Global | Skip link | Focus clavier initial | Affiche puis déplace le focus vers main | Toujours fonctionnel | skip_link_use |

| Global | Logo header | Click/Enter | Retour accueil | Conserve historique | header_logo_click |

| Global | Lien nav | Click/Enter | Navigation interne | aria-current sur route | nav_click |

| Global | Menu mobile | Click/Enter/Escape | Ouvre/ferme panneau | Focus piégé/restauré | mobile_menu_toggle |

| Global | Thème | Click/Enter | Cycle système/clair/sombre | Persiste choix | theme_change |

| Global | Lien externe | Click/Enter | Ouvre destination officielle | Indique nouvel onglet si utilisé | external_link_click |

| Accueil | CTA projets | Click/Enter | Scroll ou /projects | Focus destination | hero_projects_click |

| Accueil | CTA contact | Click/Enter | /support/contact | Motif général | home_contact_click |

| Accueil | Projet phare | Click/Enter | Page projet | Fallback si brouillon | featured_project_click |

| Projets | Filtre type | Click/Space | Met à jour URL et résultats | Annonce résultats | project_filter_change |

| Projets | Filtre statut | Click/Space | Combine filtres | État vide | project_status_filter |

| Projets | Reset filtres | Click/Enter | Tous projets | Focus titre résultats | project_filter_reset |

| Projet | CTA store | Click/Enter | Lien officiel | Masqué si indisponible | project_store_click |

| Projet | Suivre projet | Click/Enter | Journal/newsletter réelle | Pas de faux formulaire | project_follow_click |

| Projet | Galerie thumbnail | Click/Enter | Ouvre lightbox | Image simple sans JS | gallery_open |

| Projet | Galerie next/prev | Click/Arrow | Change média | Boucle configurable | gallery_navigate |

| Projet | Fermer lightbox | Click/Escape | Ferme dialog | Restaure focus | gallery_close |

| Projet | Bug report | Click/Enter | Contact prérempli | URL et projectId inclus | project_bug_click |

| Projet | Patch notes | Click/Enter | Journal filtré | Message si vide | project_patchnotes_click |

| Journal | Filtre projet | Click/Select | URL + liste | Annonce résultats | journal_project_filter |

| Journal | Filtre type | Click/Select | URL + liste | Reset possible | journal_type_filter |

| Journal | Article card | Click/Enter | Article | Titre lien principal | article_card_click |

| Article | TOC anchor | Click/Enter | Scroll/focus heading | URL hash | article_toc_click |

| Article | Copy anchor | Click/Enter | Copie URL | Toast ou erreur | article_anchor_copy |

| Article | Share | Click/Enter | Web Share/copie | Fallback copie | article_share |

| FAQ | Search | Input | Filtre questions | Debounce léger | faq_search |

| FAQ | Accordion | Click/Enter/Space | Ouvre réponse | aria-expanded | faq_open |

| FAQ | Copy link | Click/Enter | Copie ancre | Toast | faq_copy_link |

| FAQ | Escalate | Click/Enter | Contact contexte | Question source | faq_escalate |

| Contact | Choose reason | Click/Enter | Adapte schéma | Conserve communs | contact_reason_select |

| Contact | Project select | Combobox | Associe projet | Recherche clavier | contact_project_select |

| Contact | File add | Click/Drop | Valide et charge | Refus explicite | contact_file_add |

| Contact | File remove | Click/Enter | Retire fichier | Annule upload | contact_file_remove |

| Contact | Submit | Click/Enter | Validation + envoi | Conserve données | contact_submit_attempt |

| Contact | Retry | Click/Enter | Nouvelle tentative | Rate limit respecté | contact_retry |

| Contact | Fallback email | Click/Enter | Ouvre mailto | Sujet prérempli sans PII | contact_email_fallback |

| Press | Download asset | Click/Enter | Télécharge fichier | Taille/format annoncés | press_download |

| Press | Copy boilerplate | Click/Enter | Copie texte | Toast | press_copy |

| Legal | Cookie settings | Click/Enter | Ouvre préférences | Retrait simple | cookie_settings_open |

| Error | Retry | Click/Enter | Relance action | Désactivé en cours | error_retry |

| Error | Report | Click/Enter | Contact errorId | Pas de stack | error_report |

| Footer | Social link | Click/Enter | Compte officiel | Masqué si absent | social_click |

| Footer | Legal link | Click/Enter | Page légale | Route stable | legal_link_click |

| Global | Back to top | Click/Enter | Scroll top + focus | Affiché pages longues | back_to_top |


## 24.1 États pressés et focus

- Chaque contrôle tactile affiche un état pressé immédiat de 80 ms maximum.

- Le focus clavier utilise un anneau de 2 px minimum avec contraste suffisant et offset visible.

- Le hover ne révèle jamais une information indisponible au clavier ou au tactile.

- Un contrôle loading reste nommé; le texte du bouton peut devenir “Envoi…” sans supprimer le contexte.

- Un contrôle disabled doit être évité lorsque l’utilisateur ne peut pas comprendre pourquoi; préférer un message et un contrôle actif qui explique.


# 25. Référence des contrats de composants


## 25.1 Button

| Champ | Spécification |

| --- | --- |

| Responsabilité | Action générique |

| API / props minimales | variant, size, loading, disabled, icon, asChild |

| Accessibilité | button natif par défaut; aria-busy si loading; texte accessible pour icône seule |

| Tests obligatoires | clic, clavier, loading, disabled, focus, contraste |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.2 Header

| Champ | Spécification |

| --- | --- |

| Responsabilité | Navigation globale |

| API / props minimales | theme, activeRoute, contactHref |

| Accessibilité | nav labellisé; aria-current; menu clavier |

| Tests obligatoires | scroll, mobile menu, focus restore, thèmes |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.3 MobileMenu

| Champ | Spécification |

| --- | --- |

| Responsabilité | Menu modal |

| API / props minimales | open, onOpenChange, items |

| Accessibilité | dialog ou nav contrôlé; focus trap; Escape |

| Tests obligatoires | open/close, tab loop, resize desktop |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.4 ProjectCard

| Champ | Spécification |

| --- | --- |

| Responsabilité | Résumé projet |

| API / props minimales | project view model, variant, priority |

| Accessibilité | un lien principal; statut textuel; alt média |

| Tests obligatoires | sans image, long title, archived, keyboard |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.5 ProjectStatus

| Champ | Spécification |

| --- | --- |

| Responsabilité | Badge statut |

| API / props minimales | status, compact |

| Accessibilité | texte visible; couleur secondaire |

| Tests obligatoires | tous statuts, contraste |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.6 MediaFrame

| Champ | Spécification |

| --- | --- |

| Responsabilité | Média |

| API / props minimales | src, type, alt, caption, aspect, priority |

| Accessibilité | figure/figcaption; controls vidéo; no autoplay son |

| Tests obligatoires | image error, no JS, captions |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.7 Gallery

| Champ | Spécification |

| --- | --- |

| Responsabilité | Galerie |

| API / props minimales | items, initialIndex, loop |

| Accessibilité | dialog, roving focus, arrows, Escape |

| Tests obligatoires | 0/1/n médias, keyboard, reduced motion |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.8 ArticleCard

| Champ | Spécification |

| --- | --- |

| Responsabilité | Résumé article |

| API / props minimales | article, variant |

| Accessibilité | heading cohérent; date time datetime |

| Tests obligatoires | long summary, no image, future draft excluded |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.9 FilterGroup

| Champ | Spécification |

| --- | --- |

| Responsabilité | Filtres |

| API / props minimales | options, values, onChange, mode |

| Accessibilité | fieldset/legend si nécessaire; état annoncé |

| Tests obligatoires | URL sync, back button, empty |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.10 Accordion

| Champ | Spécification |

| --- | --- |

| Responsabilité | FAQ |

| API / props minimales | items, type, defaultValue |

| Accessibilité | button header; aria-controls/expanded |

| Tests obligatoires | keyboard, deep link, reduced motion |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.11 SearchField

| Champ | Spécification |

| --- | --- |

| Responsabilité | Recherche locale |

| API / props minimales | value, onChange, resultsCount |

| Accessibilité | label; live region prudente |

| Tests obligatoires | IME, clear, no result, mobile |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.12 FormField

| Champ | Spécification |

| --- | --- |

| Responsabilité | Champ wrapper |

| API / props minimales | label, hint, error, required, counter |

| Accessibilité | for/id; aria-describedby; erreur persistante |

| Tests obligatoires | valid/invalid, zoom, autofill |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.13 Combobox

| Champ | Spécification |

| --- | --- |

| Responsabilité | Sélection recherchable |

| API / props minimales | items, value, onChange, placeholder |

| Accessibilité | pattern ARIA combobox; clavier complet |

| Tests obligatoires | 0/1000 options, async, escape |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.14 FileUpload

| Champ | Spécification |

| --- | --- |

| Responsabilité | Upload privé |

| API / props minimales | accept, maxSize, maxFiles, uploader |

| Accessibilité | instructions, progress nommé, remove clavier |

| Tests obligatoires | wrong type, too large, network, cancel |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.15 Toast

| Champ | Spécification |

| --- | --- |

| Responsabilité | Feedback |

| API / props minimales | type, title, description, action |

| Accessibilité | role status/alert selon urgence; pause hover/focus |

| Tests obligatoires | stack, timeout, screen reader |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.16 Dialog

| Champ | Spécification |

| --- | --- |

| Responsabilité | Modale |

| API / props minimales | open, title, description, onClose |

| Accessibilité | focus trap, inert background, Escape |

| Tests obligatoires | nested prohibited, mobile viewport |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.17 Timeline

| Champ | Spécification |

| --- | --- |

| Responsabilité | Jalons |

| API / props minimales | items, orientation |

| Accessibilité | ol sémantique; dates time |

| Tests obligatoires | 1/20 items, no link |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.18 Stat

| Champ | Spécification |

| --- | --- |

| Responsabilité | Chiffre réel |

| API / props minimales | value, label, source, updatedAt |

| Accessibilité | texte; animation non indispensable |

| Tests obligatoires | missing source, reduced motion |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.19 CodeBlock

| Champ | Spécification |

| --- | --- |

| Responsabilité | Code |

| API / props minimales | code, language, filename, copy |

| Accessibilité | pre/code; scroll; copy named |

| Tests obligatoires | long lines, copy fail |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.20 CookieBanner

| Champ | Spécification |

| --- | --- |

| Responsabilité | Consentement |

| API / props minimales | categories, state, onSave |

| Accessibilité | refus aussi visible; dialog prefs |

| Tests obligatoires | first visit, revisit, JS disabled |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.21 Pagination

| Champ | Spécification |

| --- | --- |

| Responsabilité | Pagination |

| API / props minimales | page, total, hrefBuilder |

| Accessibilité | nav label; aria-current |

| Tests obligatoires | first/last/large total |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.22 EmptyState

| Champ | Spécification |

| --- | --- |

| Responsabilité | État vide |

| API / props minimales | title, description, action |

| Accessibilité | heading niveau injecté |

| Tests obligatoires | with/without action |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.23 ErrorState

| Champ | Spécification |

| --- | --- |

| Responsabilité | Erreur |

| API / props minimales | code, title, retry, report |

| Accessibilité | message clair; focus sur titre si route |

| Tests obligatoires | retry fail, no report |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


## 25.24 Footer

| Champ | Spécification |

| --- | --- |

| Responsabilité | Pied de page |

| API / props minimales | groups, social, legal, copyright |

| Accessibilité | contentinfo; headings cohérents |

| Tests obligatoires | missing socials, mobile accordions |

| Règle de contenu | Aucune chaîne éditoriale spécifique à un projet dans le composant; données injectées. |

| Règle de style | Utilise uniquement tokens et variantes documentées; pas de valeur magique non justifiée. |


### Definition of Done du composant

- [ ] TypeScript strict sans any.

- [ ] État focus, hover, pressed, disabled et loading traité si applicable.

- [ ] Responsive et zoom 400 % vérifiés.

- [ ] Reduced motion traité.

- [ ] Tests automatiques et exemple de documentation présents.


# 26. Catalogue de scénarios de test

| ID | Zone | Scénario | Résultat attendu | Niveau |

| --- | --- | --- | --- | --- |

| T-001 | Navigation | Tab depuis le haut de l’accueil | Le skip link apparaît puis main reçoit le focus. | E2E |

| T-002 | Navigation | Ouvrir et fermer le menu mobile au clavier | Focus piégé, Escape ferme, focus revient au bouton. | E2E |

| T-003 | Navigation | Naviguer avec bouton retour après filtre projets | Filtres et scroll raisonnable sont restaurés. | E2E |

| T-004 | Navigation | Lien externe store | Destination correcte, indication externe accessible. | E2E |

| T-005 | Navigation | Ancien slug projet | Redirection 301 vers le slug canonique. | E2E |

| T-006 | Pages | Accueil avec un seul projet public | Aucune grille vide; composition s’adapte. | E2E |

| T-007 | Pages | Accueil sans article | Section journal absente, pas de titre orphelin. | E2E |

| T-008 | Pages | Projet sans image | Placeholder approuvé et ratio réservé. | E2E |

| T-009 | Pages | Projet en pause | Statut lisible, CTA store non inventé. | E2E |

| T-010 | Pages | Projet archivé | Support et disponibilité adaptés. | E2E |

| T-011 | Pages | Journal sans contenu | État vide utile et liens projets. | E2E |

| T-012 | Pages | Article long avec 30 headings | TOC utilisable, ancres uniques. | E2E |

| T-013 | Pages | FAQ sans résultat | Message et CTA contact. | E2E |

| T-014 | Pages | 404 route inconnue | Code 404 réel et navigation utile. | E2E |

| T-015 | Pages | 500 simulée | Aucune stack; errorId et retry. | E2E |

| T-016 | Contact | Soumettre bug valide | E-mail reçu avec préfixe, projet et champs structurés. | E2E |

| T-017 | Contact | Soumettre sans e-mail | Erreur reliée au champ, aucune requête envoyée. | E2E |

| T-018 | Contact | E-mail malformé | Validation client et serveur cohérente. | E2E |

| T-019 | Contact | Message trop long | Compteur et erreur avant envoi. | E2E |

| T-020 | Contact | Fichier PNG valide | Upload privé, lien signé dans e-mail. | E2E |

| T-021 | Contact | Fichier EXE | Refus avant upload et côté serveur. | E2E |

| T-022 | Contact | Fichier trop volumineux | Refus clair, proposition de lien. | E2E |

| T-023 | Contact | Turnstile invalide | Aucun e-mail, message de sécurité. | E2E |

| T-024 | Contact | Rate limit atteint | Réponse 429 et message stable. | E2E |

| T-025 | Contact | Fournisseur e-mail en panne | Texte conservé et fallback affiché. | E2E |

| T-026 | Contact | Double clic envoi | Une seule demande créée. | E2E |

| T-027 | Contact | Rafraîchir confirmation | Aucun contenu privé réaffiché. | E2E |

| T-028 | Contact | Logs du contact | Aucun message, e-mail ou token dans logs. | E2E |

| T-029 | Accessibilité | Zoom 400 % accueil | Aucune perte de fonction, pas de scroll horizontal hors contenu prévu. | Manual+Automated |

| T-030 | Accessibilité | VoiceOver menu | Noms et états annoncés correctement. | Manual+Automated |

| T-031 | Accessibilité | NVDA accordéon FAQ | Question bouton et état expanded annoncés. | Manual+Automated |

| T-032 | Accessibilité | Reduced motion | Animations supprimées ou réduites, contenu immédiat. | Manual+Automated |

| T-033 | Accessibilité | Thème sombre | Contrastes AA et focus visible. | Manual+Automated |

| T-034 | Accessibilité | Erreur formulaire lecteur écran | Résumé et champ relié annoncés. | Manual+Automated |

| T-035 | Accessibilité | Lightbox clavier | Flèches, Escape, focus trap. | Manual+Automated |

| T-036 | Accessibilité | Cible tactile 320 px | Contrôles espacés et activables. | Manual+Automated |

| T-037 | Performance | Chargement mobile lent accueil | Hero texte visible, média progressif, pas de layout shift. | Performance |

| T-038 | Performance | Image 4K ajoutée par erreur | Validation/build avertit ou optimisation empêche surcharge. | Performance |

| T-039 | Performance | JavaScript désactivé | Contenu, navigation et contact fallback restent lisibles. | Performance |

| T-040 | Performance | Vidéo hors viewport | Lecture suspendue et ressources différées. | Performance |

| T-041 | Performance | Fonts indisponibles | Fallback stable sans CLS majeur. | Performance |

| T-042 | SEO | Projet public | Canonical, title, description, OG, JSON-LD valides. | Integration |

| T-043 | SEO | Projet draft | Absent sitemap et build public. | Integration |

| T-044 | SEO | Preview Vercel | noindex et protection selon configuration. | Integration |

| T-045 | SEO | Sitemap | Contient uniquement routes publiques canoniques. | Integration |

| T-046 | SEO | Filtre projets | Canonical vers index sauf stratégie dédiée. | Integration |

| T-047 | SEO | Article mis à jour | published et modified distincts. | Integration |

| T-048 | Sécurité | Injection HTML dans message | Contenu échappé dans e-mail et logs. | Security |

| T-049 | Sécurité | Faux MIME fichier | Détection serveur refuse. | Security |

| T-050 | Sécurité | POST cross-origin | Requête refusée selon politique. | Security |

| T-051 | Sécurité | Secret dans bundle | Scan CI échoue. | Security |

| T-052 | Sécurité | CSP report | Violation visible dans monitoring sans casser site. | Security |

| T-053 | Sécurité | URL signée expirée | Fichier inaccessible après expiration. | Security |

| T-054 | Sécurité | Pièce jointe après 30 jours | Suppression automatique vérifiée. | Security |

| T-055 | Contenu | Projet sans summary | Validation contenu bloque build. | Content |

| T-056 | Contenu | Date invalide | Schéma bloque publication. | Content |

| T-057 | Contenu | Deux slugs identiques | Validation bloque build. | Content |

| T-058 | Contenu | Alt absent sur image informative | Validation ou lint bloque. | Content |

| T-059 | Contenu | Lien externe cassé | Script planifié remonte alerte. | Content |

| T-060 | Contenu | Naming final jeu musical | Ancien slug redirige et liens internes mis à jour. | Content |


## 26.1 Seuil de sortie

- Aucun scénario bloquant en échec.

- Les écarts mineurs ont un ticket, un propriétaire et une date de traitement.

- Les tests manuels sont datés avec navigateur/appareil et preuve de résultat.

- Le formulaire est testé contre la vraie boîte nosfac.studios@gmail.com avant chaque changement d’infrastructure.


# 27. Modèle de menaces et contrôles

Le site est principalement public et statique, mais le formulaire de contact, les uploads, les intégrations tierces et la chaîne de déploiement créent des surfaces d’attaque. Le modèle suivant doit être revu lors de toute ajout d’authentification, de paiement ou de CMS.

| Menace | Surface | Impact | Contrôles | Risque résiduel |

| --- | --- | --- | --- | --- |

| Spam automatisé | Formulaire | Coût, surcharge, boîte inutilisable | Turnstile, rate limit, honeypot, métriques sans PII | Moyen |

| Injection HTML/script | Message/contact | Contenu malveillant dans e-mail/admin | Validation, échappement, texte brut, CSP | Faible après contrôle |

| Upload malveillant | Pièces jointes | Malware, contenu actif, coût stockage | Allowlist, sniffing serveur, privé, scan, expiration | Moyen |

| Exposition de secrets | Bundle/logs/Git | Compromission services | Env serveur, scan secrets, rotation, scrubbing | Faible |

| Abus API e-mail | Route contact | Envoi massif ou usurpation | Origin checks, rate limit, tokens anti-bot, quotas | Moyen |

| Supply chain | npm/GitHub Actions | Code compromis | Lockfile, Dependabot, permissions minimales, actions pinées | Moyen |

| Défiguration contenu | Compte Git/Vercel | Atteinte marque | MFA, branch protection, audit logs, rollback | Faible |

| Détournement domaine | Registrar/DNS | Perte site/e-mail | MFA, auto-renew, registry lock si disponible, alertes | Faible |

| Fuite de données contact | E-mail/storage/logs | Atteinte privée | Minimisation, rétention, accès restreint, suppression | Moyen |

| Clickjacking | Pages/formulaire | Actions trompeuses | CSP frame-ancestors | Faible |

| XSS tiers | Analytics/widgets | Compromission client | CSP, peu de tiers, consentement, SRI si possible | Faible à moyen |

| DoS trafic | Site/API | Indisponibilité/coût | CDN/WAF, budgets, limite function, alertes | Moyen |


## 27.1 Principes de réponse

- Ne pas collecter une donnée que le site n’a pas besoin de protéger.

- Refuser côté serveur même lorsque le client valide déjà.

- Traiter chaque intégration externe comme indisponible ou compromise possible.

- Conserver un rollback simple et des sauvegardes hors fournisseur.

- Documenter tout incident contenant des données personnelles et évaluer les obligations légales avec un professionnel.


# 28. Standards de production des assets


## 28.1 Images et captures

| Usage | Format source | Format web | Dimensions / ratio | Règle |

| --- | --- | --- | --- | --- |

| Hero projet | PNG haute qualité ou source design | AVIF + WebP fallback | 16:10, 16:9 ou ratio défini | Art direction mobile/desktop |

| Carte projet | Même source recadrable | AVIF/WebP | 4:3 ou 3:2 | Focal point dans contenu |

| Galerie | PNG/JPG source | AVIF/WebP | Dimensions réelles | Pas d’upscale artificiel |

| Open Graph | PNG source | PNG/JPG | 1200×630 | Texte large, safe zones |

| Logo | SVG maître | SVG + PNG | Vectoriel | Pas de police embarquée non licenciée |

| Favicon | SVG/PNG | ICO/PNG/SVG | 16 à 512 | Test clair/sombre |


## 28.2 Vidéo

- Clips de 6 à 20 secondes pour hero, muets par défaut, poster image obligatoire.

- WebM/MP4 adaptés; pas de 4K au chargement initial.

- Controls disponibles si la vidéo contient une information; transcription ou sous-titres selon contenu.

- Autoplay uniquement muted, playsInline, après respect des préférences et sans bloquer le LCP.

- Pas de boucle agressive; pause hors viewport et lorsque l’onglet est caché.


## 28.3 Nommage et droits

```text
public/projects/chain/
  chain-hero-v1-1600x1000.avif
  chain-lobby-mobile-v2-900x1600.avif
  chain-private-match-settings-v1-1600x1000.avif
  rights.json
```

- Noms en kebab-case, projet, sujet, version, dimensions si utile.

- rights.json documente auteur, source, date, licence, autorisation et restrictions.

- Les captures masquent e-mails, identifiants, tokens, données de test sensibles et notifications personnelles.

- Aucun logo de plateforme ou partenaire sans respect de ses guidelines actuelles.


# 29. Internationalisation et localisation

Le site est lancé en français, mais l’architecture doit permettre l’anglais sans dupliquer les composants. La traduction ne doit pas être activée avec des pages vides ou automatiques non relues.

| Sujet | Décision |

| --- | --- |

| Routing | Préparer /fr et /en ou stratégie locale négociée; ne pas migrer sans plan de redirections. |

| Contenu | Un fichier ou bloc par locale, avec fallback interdit en production pour pages clés. |

| Dates/nombres | Intl.DateTimeFormat et Intl.NumberFormat. |

| Métadonnées | Title, description, OG et JSON-LD localisés. |

| hreflang | Ajouté seulement lorsque les deux versions publiques existent. |

| Texte UI | Dictionnaires typés; aucune chaîne dispersée dans les composants. |

| SEO | Canonical par locale, sitemap avec alternates. |

| QA | Expansion 30 %, mots longs, accents, apostrophes, RTL non requis mais ne pas l’empêcher structurellement. |


## 29.1 Glossaire initial

| FR | EN recommandé | Note |

| --- | --- | --- |

| Projets | Projects | Nom de navigation. |

| Journal | Journal / Updates | Choisir après test; “Journal” fonctionne en anglais mais peut sembler éditorial. |

| À propos | About | Standard. |

| Support | Support | Standard. |

| Nous contacter | Contact us | CTA. |

| En développement | In development | Pas “Coming soon” sans proximité de sortie. |

| Disponible | Available | Préciser plateforme. |

| En pause | Paused | Éviter “Cancelled” si non confirmé. |


# 30. Gouvernance éditoriale et portefeuille de carrière

Pour durer pendant toute une carrière, le site doit sélectionner et contextualiser plutôt qu’accumuler. Chaque projet publié répond à une question : que montre-t-il sur la capacité du studio, sur une compétence ou sur une expérience offerte aux joueurs ? Les petits prototypes peuvent vivre dans une section Lab; les projets obsolètes sont archivés sans être supprimés si leur valeur historique reste pertinente.


## 30.1 Cycle de vie d’un projet public

| Étape | Condition | Présentation |

| --- | --- | --- |

| Concept privé | Idée non validée | Absent du site. |

| Concept public | Prototype montrable et intention claire | Page courte marquée Concept. |

| Développement | Travail actif et média réel | Page complète progressive. |

| Bêta | Accès test réel | CTA, limites, support. |

| Disponible | Version publique | Liens stores, support, patch notes. |

| Pause | Aucune production active | Statut et date mise à jour; pas de promesse. |

| Archive | Non maintenu | Historique, apprentissages, liens désactivés si morts. |


## 30.2 Revue annuelle de carrière

- [ ] Les trois à cinq projets les plus représentatifs sont-ils visibles rapidement ?

- [ ] Les projets anciens expliquent-ils encore quelque chose d’utile ?

- [ ] Les technologies affichées correspondent-elles à une pratique réelle et récente ?

- [ ] Les captures reflètent-elles la version actuelle ?

- [ ] Les liens stores, dépôts, vidéos et press kits fonctionnent-ils ?

- [ ] Le texte À propos correspond-il au rôle actuel et à la situation réelle du studio ?

- [ ] Les coordonnées et informations légales sont-elles à jour ?

- [ ] Le design reste-t-il cohérent sans empêcher les identités propres des nouveaux jeux ?


## 30.3 Séparation studio / profil personnel

- Le site Nosfac Studios présente les projets et la marque; il peut inclure un module fondateur limité.

- Un CV ou portfolio personnel détaillé peut être une page distincte ou un autre site si le volume l’exige.

- Les expériences académiques, industrielles et embarquées ne sont ajoutées à Nosfac Studios que lorsqu’elles deviennent un projet logiciel ou une étude de cas pertinente.

- Aucune donnée personnelle (âge, adresse, numéro, emploi du temps) n’est publiée par défaut.


# 31. Références normatives et techniques

Ces références servent à vérifier l’implémentation. Les versions exactes des outils doivent être contrôlées au moment du développement; la spécification privilégie les principes stables et les documentations officielles.

| Référence | URL | Usage |

| --- | --- | --- |

| Next.js Documentation | https://nextjs.org/docs | App Router, rendu, métadonnées, images, sécurité et déploiement. |

| Vercel Git Deployments | https://vercel.com/docs/git | Previews par branche, production depuis la branche principale, rollback. |

| Vercel Environment Variables | https://vercel.com/docs/environment-variables | Séparation et gestion des secrets par environnement. |

| Vercel Pricing | https://vercel.com/pricing | Plans, limites et distinction usage personnel/commercial à vérifier. |

| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | Référence accessibilité niveau AA. |

| Google Search SEO Starter Guide | https://developers.google.com/search/docs/fundamentals/seo-starter-guide | Principes SEO et indexation. |

| Schema.org Organization | https://schema.org/Organization | Données structurées du studio. |

| Schema.org VideoGame | https://schema.org/VideoGame | Données structurées des jeux. |

| CNIL - cookies et traceurs | https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi | Consentement et traceurs en France. |

| MDN - Content Security Policy | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP | CSP et réduction des risques d’injection. |

| GitHub Actions | https://docs.github.com/en/actions | Automatisation CI/CD. |

| Cloudflare Turnstile | https://developers.cloudflare.com/turnstile/ | Protection anti-bot et vérification serveur. |

| Resend Documentation | https://resend.com/docs/introduction | API d’envoi d’e-mail via adapter. |


# Annexe A - Matrice responsive

| Zone | Mobile 320-767 | Tablette 768-1023 | Desktop 1024-1599 | Ultrawide 1600+ |

| --- | --- | --- | --- | --- |

| Header | Logo + menu; 56-64 px | Logo + menu ou liens réduits | Navigation complète 64-72 px | Contenu plafonné, pas étiré |

| Hero | 1 colonne, média après CTA | 1-2 colonnes selon contenu | 2 colonnes asymétriques | Max-width, média étendu contrôlé |

| Projets | 1 colonne, alternance visuelle | 2 colonnes | Grille éditoriale 2-3 | Pas plus de 3-4 colonnes utiles |

| Article | Gouttière 20 px | Lecture 680 px | Lecture 720-780 px | Lecture reste plafonnée |

| Formulaire | 1 colonne | 1-2 colonnes pour champs courts | 2 colonnes contrôlées | Formulaire max 800 px |

| Footer | Sections accordéon optionnelles | 2 colonnes | 4-5 colonnes | Centré dans grille |


# Annexe B - Matrice de contenus obligatoires

| Type | Obligatoire | Optionnel | Bloquant publication |

| --- | --- | --- | --- |

| Projet | Nom, slug, type, statut, résumé, description, updatedAt, visibility, SEO | Date, plateformes, galerie, technologies, FAQ | Nom, statut, résumé, média ou placeholder approuvé |

| Article | Titre, slug, date, résumé, corps, catégorie, visibilité | Projet, auteur, image, tags | Titre, corps, dates, metadata |

| FAQ | Question, réponse, catégorie, visibilité | Projet, ancre personnalisée | Réponse exacte et lien juridique si nécessaire |

| Média | src, type, alt, dimensions, source/droits | caption, focal point | Droits inconnus ou alt manquant |

| Lien projet | label, href, type, active | platform, region | Destination non vérifiée |


# Annexe C - Checklist de lancement

- [ ] Nom Nosfac Studios cohérent dans title, header, footer et données structurées.

- [ ] Logo final et favicons fournis; aucun fichier de police propriétaire livré publiquement.

- [ ] Chain, KnowOut et le projet musical possèdent des pages réelles et des statuts validés.

- [ ] Tous les placeholders légaux bloquants sont remplacés.

- [ ] Adresse nosfac.studios@gmail.com reçoit un test pour chaque catégorie de formulaire.

- [ ] Turnstile et rate limiting testés en production.

- [ ] Pièces jointes testées, supprimées automatiquement et non publiques.

- [ ] Domaine et redirections validés si acquis.

- [ ] Sitemap, robots, canonical, Open Graph et JSON-LD validés.

- [ ] Pages 404/500, offline et maintenance testées.

- [ ] Navigation clavier et lecteurs d’écran testés sur pages critiques.

- [ ] Lighthouse, Web Vitals, bundles et images dans les budgets.

- [ ] Tests et build réussissent sur un clone propre du dépôt.

- [ ] Rollback documenté et testé.

- [ ] Monitoring, alertes de domaine et MFA activés.

- [ ] Sauvegarde du contenu, médias et configuration disponible hors fournisseur.


# Annexe D - Registre initial de décisions

| ID | Décision | Motif | Révision |

| --- | --- | --- | --- |

| ADR-001 | Next.js App Router + TypeScript strict | SEO, statique/serveur, écosystème et maintenabilité | À la prochaine version majeure du framework |

| ADR-002 | Contenu Git/MDX au lancement | Coût nul, revue, portabilité, un seul éditeur | Quand les déclencheurs CMS sont atteints |

| ADR-003 | Vercel pour previews et production initiale | Simplicité Next.js et workflow Git | À la commercialisation ou si coût/conditions changent |

| ADR-004 | E-mail derrière EmailProvider | Changer de service sans réécrire le formulaire | Annuel |

| ADR-005 | Destination Gmail initiale | Adresse déjà choisie et coût nul | Après domaine + e-mail de marque |

| ADR-006 | Pas de constellation/comète comme motif principal | Direction déjà explorée et rejetée | Seulement décision de rebranding explicite |

| ADR-007 | Pas de chiffres non prouvés | Confiance et conformité | Permanent |


# Annexe E - Prompt de lancement pour Claude Code

```text
Lis intégralement docs/MASTER_SPECIFICATION.md et tous les fichiers du dossier config/.
Considère-les comme la source de vérité du site Nosfac Studios.

Objectif : produire une version de production, pas une maquette.
Commence par auditer le dépôt et rédige un plan par phases avec critères de sortie.
Implémente les fondations avant le polish visuel.

Contraintes essentielles :
- Next.js App Router, TypeScript strict, Tailwind, shadcn/ui adapté, Motion avec reduced motion.
- contenu piloté par fichiers validés; Chain, KnowOut et le jeu musical provisoire.
- aucune information inventée; placeholders centralisés et bloquants.
- formulaire serveur sécurisé vers nosfac.studios@gmail.com avec provider adapter,
  validation Zod, Turnstile, rate limiting et gestion sûre des pièces jointes.
- accessibilité WCAG 2.2 AA, responsive, SEO, performance, tests, CI et déploiement documentés.
- portabilité Node/Docker; aucune dépendance Vercel irréversible.

Après chaque phase, exécute lint, typecheck, tests et build. Corrige les erreurs.
Fournis une preview et un compte rendu exact des fichiers, tests et décisions.
Ne marque aucune tâche comme terminée sans preuve observable.
```
