import React, { useState, useRef } from 'react';
import {
  User, Briefcase, Mail, ChevronDown, Download,
  GraduationCap, History, FileText, TrendingUp, ShoppingCart,
  Megaphone, Smartphone, Rocket, ArrowRight, CheckCircle2,
  Camera, MapPin, ChevronLeft, ChevronRight, Target, Star,
  Layers, Presentation, Building2, Globe, X,
  Info, ArrowLeft, Image as ImageIcon
} from 'lucide-react';

const NAVIGATION = [
  {
    id: 'qui-suis-je',
    title: 'Qui suis-je ?',
    icon: <User size={18} />,
    items: [
      { id: 'formation', label: 'Ma formation', icon: <GraduationCap size={16} /> },
      { id: 'parcours', label: 'Mon parcours', icon: <History size={16} /> },
      { id: 'curriculum', label: 'Mon curriculum vitae', icon: <FileText size={16} />, isDownload: true },
    ],
  },
  {
    id: 'compétences',
    title: 'Compétences',
    icon: <Briefcase size={18} />,
    items: [
      { id: 'marketing', label: 'Strategie Marketing', icon: <TrendingUp size={16} /> },
      { id: 'vente', label: 'Développement commercial', icon: <ShoppingCart size={16} /> },
      { id: 'communication', label: 'Communication', icon: <Megaphone size={16} /> },
      { id: 'mkt-digital', label: 'Marketing digital', icon: <Smartphone size={16} /> },
      { id: 'ebusiness', label: 'E-business et entrepreneuriat', icon: <Rocket size={16} /> },
    ],
  },
  {
    id: 'projets',
    title: 'Projets',
    icon: <Layers size={18} />,
    items: [
      { id: 'sae', label: 'SAE', icon: <Presentation size={16} /> },
      { id: 'stages', label: 'Stages', icon: <Building2 size={16} /> },
      { id: 'projet-transverse', label: 'Projet transverse', icon: <Target size={16} /> },
      { id: 'ppp', label: 'PPP', icon: <Star size={16} /> },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: <Mail size={18} />,
    items: null,
  },
];

const COMPETENCES = {
  marketing: {
    title: 'Stratégie Marketing',
    acs: [
      { text: "AC21.01 - Diagnostiquer l'environnement en appréhendant les enjeux sociaux et écologiques", status: 'acquis' },
      { text: "AC21.02 - Mettre en oeuvre une étude de marché dans un environnement complexe", status: 'en-cours' },
      { text: "AC21.03 - Mettre en place une stratégie marketing dans un environnement complexe", status: 'acquis' },
      { text: "AC21.04 - Concevoir un mix marketing étendu pour une offre complexe", status: 'non-acquis' },
    ],
  },
  vente: {
    title: 'Développement commercial',
    acs: [
      { text: "AC22.01 - Convaincre en exprimant avec empathie l'offre en termes d'avantages personnalisés", status: 'en-cours' },
      { text: "AC22.02 - Négocier le prix : défendre et valoriser l'offre en percevant les stratégies d'achat", status: 'non-acquis' },
      { text: "AC22.03 - Maîtriser les éléments juridiques et comptables de l'offre", status: 'non-acquis' },
      { text: "AC22.04 - Utiliser les outils d'aide à la vente (OAV) à bon escient pour convaincre", status: 'acquis' },
      { text: "AC22.05 - Organiser le suivi de ses résultats pour gagner en performance au sein de l'équipe commerciale", status: 'non-acquis' },
      { text: "AC22.06 - Prendre en compte les enjeux de la fonction achat pour la performance économique de l'entreprise", status: 'en-cours' },
    ],
  },
  communication: {
    title: 'Communication',
    acs: [
      { text: "AC23.01 - Élaborer une stratégie de communication adaptée au brief agence", status: 'acquis' },
      { text: "AC23.02 - Établir une stratégie de moyens en utilisant les indicateurs de choix des supports", status: 'en-cours' },
      { text: "AC23.03 - Proposer un plan de communication 360 en élaborant les supports et en veillant à leur efficacité", status: 'acquis' },
      { text: "AC23.04 - Mettre en oeuvre une stratégie digitale (blog, réseaux sociaux, influenceurs) en mesurant les performances et en veillant à l'e-réputation", status: 'acquis' },
    ],
  },
  'mkt-digital': {
    title: 'Marketing Digital',
    acs: [
      { text: "AC24.01 - Mobiliser des indicateurs de performance en fonction du volume et de la variété des données", status: 'en-cours' },
      { text: "AC24.02 - Identifier les spécificités du marketing digital", status: 'en-cours' },
      { text: "AC24.03 - Utiliser un cahier des charges e-business", status: 'acquis' },
      { text: "AC24.04 - Intégrer les spécificités du e-commerce", status: 'non-acquis' },
      { text: "AC24.05 - Respecter le processus logistique", status: 'en-cours' },
    ],
  },
  ebusiness: {
    title: 'E-business et entrepreneuriat',
    acs: [
      { text: "AC25.01 - Concevoir un modèle d'affaires simplifié", status: 'acquis' },
      { text: "AC25.02 - Analyser de façon pertinente la situation marché-entreprise grâce aux outils de diagnostic stratégique", status: 'en-cours' },
      { text: "AC25.03 - Analyser la situation financière d'une entreprise à partir des éléments de la comptabilité générale", status: 'non-acquis' },
      { text: "AC25.04 - Identifier les éléments pertinents nécessaires à la réalisation du projet", status: 'acquis' },
      { text: "AC25.05 - Utiliser les techniques de créativité individuelle et collective", status: 'en-cours' },
      { text: "AC25.06 - Contribuer à l'enrichissement d'un projet collectif", status: 'acquis' },
    ],
  },
};
const GalleryModal = ({ src, desc, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
    onClick={onClose}>
    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
      onClick={e => e.stopPropagation()}>
      <img src={src} alt="Photo galerie" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
      <div className="p-6 space-y-3">
        <p className="text-base leading-relaxed" style={{ color: '#1A202C' }}>{desc}</p>
        <button onClick={onClose} className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Fermer</button>
      </div>
    </div>
  </div>
);
const ModalSkill = ({ skill, onClose }) => {
  const [view, setView] = useState('info');
  if (!skill) return null;

  if (skill === 'BUT_DEFINITION') return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl border p-8 space-y-6"
        style={{ borderColor: '#FFF9C4' }}>
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Définition</span>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <h3 className="text-2xl font-serif font-bold" style={{ color: '#1A202C' }}>BUT Techniques de Commercialisation</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.75 }}>
          Le BUT Techniques de Commercialisation (TC) est un diplôme national universitaire qui mène au grade de Licence (Bac+3). Le programme comporte des cours magistraux (CM), des travaux dirigés (TD), des travaux pratiques (TP), des travaux de groupes encadrés et en autonomie, ainsi que plusieurs stages et situations d'apprentissage et d'évaluations (SAE).
        </p>
        <a href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-techniques-de-commercialisation-parcours-marketing-et-management-du-point-de-vente"
          target="_blank" rel="noopener noreferrer"
          className="inline-block text-xs font-bold underline transition-opacity hover:opacity-70"
          style={{ color: '#FF69B4' }}>
          Source : Onisep →
        </a>
      </div>
    </div >
  );
  if (skill === 'GALLERY_0') return <GalleryModal src="/une.png" desc="En 2024, je suis devenue cadet de la gendarmerie d'Eure et Loir. À cette occasion, j'ai pu défiler au 14 juillet auprès des forces de l'ordre à Chartres (28)." onClose={onClose} />;
  if (skill === 'GALLERY_1') return <GalleryModal src="/deux.png" desc="Le jeudi 7 novembre 2025, dans le cadre du projet transverse, nous avons célébré l'ouverture des Jeunes Pousses organisée par la Maison de l'Entrepreneuriat de Rouen. De gauche à droite : Douaa Chihhane, Nafissatou Gueye, Lalia Soumaré, Nina Caliskan, Laura Fermigier, Chanez Megherat et moi-même. Photographe : Marie Pioche" onClose={onClose} />;
  if (skill === 'GALLERY_2') return <GalleryModal src="/trois.jpg" desc="Au semestre 4, nous avons réalisé un flipbook pour promouvoir le BUT TC et voici l'image de fin de notre passage. De gauche à droite : Douaa Chihhane, Lalia Soumaré et moi. Ressources : Création d'une campagne publicitaire" onClose={onClose} />;
  if (skill === 'GALLERY_3') return <GalleryModal src="/quatre.png" desc="Mise en scène d'un journal télévisé — le lundi 30 mars 2026, dans le cadre d'un exercice, j'ai tenu le rôle d'une intervenante lors d'une simulation de journal télévisé sur l'intelligence artificielle et l'avenir de l'emploi. À gauche de l'image, Victorine Gomis incarnait la présentatrice. Ressources : ECC — Enseignante : Madame Boukoum — Photographe : Mathilde Jaconot" onClose={onClose} />;
  if (skill === 'GALLERY_4') return <GalleryModal src="/cinq.png" desc="Sky, le chien pédagogique pour le compte de Wallis et Futuna la 1ère — le jeudi 30 avril 2026, lors de mon stage, nous avons donné vie à Sky, un chien pédagogique irrésistible, pour enrichir le contenu du compte de Wallis et Futuna la 1ère. Caméraman : Jean-François Puakavase — Journaliste : Mirna Kilama — Mettre du chien : Xavier — Photographe : Olivia Garrett Alaïs" onClose={onClose} />;
  if (skill === 'GALLERY_5') return <GalleryModal src="/six.png" desc="Le lundi 11 mai 2026, dans le cadre de mon stage, j'ai pu assister à un journal télévisé sur le plateau. Photographe : Stéphanie Seilala Vili" onClose={onClose} />;
  const AC_EXPLANATIONS = {
    "AC21.01 - Diagnostiquer l'environnement en appréhendant les enjeux sociaux et écologiques": "J'ai développé cette compétence à travers plusieurs travaux individuels et en groupe, ainsi que la participation à une conférence du NIMEC lors de la Journée Ébroïcienne de Recherche sur les Transitions (JERT). Ces expériences m'ont permis de mieux comprendre les enjeux sociaux et écologiques et d'acquérir des capacités d'analyse de l'environnement.",
    "AC21.02 - Mettre en oeuvre une étude de marché dans un environnement complexe": "J'ai été initiée à cette compétence au cours de plusieurs travaux cette année. Lors d'une SAE en création d'entreprise, j'ai participé au jeu de simulation de marché Créasim, où nous avons réalisé une étude de marché approfondie pour maximiser notre part de marché. J'ai aussi mené une étude qualitative complète sur le cashback et participé au projet transverse « Jeunes pousses » où il a aussi fallu étudier notre marché pour suivre la meilleur stratégie. Je poursuis mon apprentissage de ces méthodes et souhaite les approfondir, car je ne me sens pas encore totalement à l'aise avec tous les aspects.",
    "AC21.03 - Mettre en place une stratégie marketing dans un environnement complexe": "J'ai développé cette compétence au cours de plusieurs travaux cette année, notamment lors de SAE et d'exercices pédagogiques, où j'ai élaboré et adapté des stratégies marketing pour des contextes variés. Ces expériences m'ont permis d'apprendre à choisir des actions pertinentes en fonction de l'environnement, des objectifs et des contraintes opérationnelles. ",
    "AC21.04 - Concevoir un mix marketing étendu pour une offre complexe": "Je ne considère pas cette compétence comme acquise : je n'ai pas encore conçu de mix marketing étendu de manière autonome. J'ai toutefois été initiée aux bases du mix (produit, prix, distribution, communication) via des exercices et exposés, et je prévois d'approfondir ce point durant ma prochaine année de formation.",
    "AC22.01 - Convaincre en exprimant avec empathie l'offre en termes d'avantages personnalisés": "Tout au long de l'année, j'ai été initiée aux techniques de vente et j'ai appris à identifier les besoins clients. Je ne maîtrise pas encore complètement la capacité à convaincre avec empathie en présentant l'offre par ses avantages personnalisés, mais je continue de progresser et je prévois de m'entraîner davantage l'année prochaine.",
    "AC22.02 - Négocier le prix : défendre et valoriser l'offre en percevant les stratégies d'achat": "Je ne maîtrise pas encore la négociation : je suis consciente de son importance et souhaite développer cette compétence l'année prochaine pour mener des entretiens commerciaux convaincants et structurés.",
    "AC22.03 - Maîtriser les éléments juridiques et comptables de l'offre": "Je ne maîtrise pas encore cet aspect car je ne m'en suis pas suffisamment investie cette année ; je suis consciente de son importance et je prévois d'étudier des cas réels l'année prochaine pour combler cette lacune.",
    "AC22.04 - Utiliser les outils d'aide à la vente (OAV) à bon escient pour convaincre": "Depuis l'année dernière, nous apprenons à construire des outils d'aide à la vente efficaces, et c'est un exercice que j'apprécie particulièrement. Cette année, j'ai pu mobiliser cette compétence lors de la SAE pilotage de projet avec le jeu de simulation Défimax, en proposant des OAV pertinents pour une entreprise de VTT. J'ai également participé à plusieurs pitchs, notamment dans la SAE création d'entreprise avec le jeu de simulation Créasim autour d'ateliers de cuisine, où j'ai su utiliser ces outils pour appuyer mon argumentation et convaincre.",
    "AC22.05 - Organiser le suivi de ses résultats pour gagner en performance au sein de l'équipe commerciale": "Je commence à peine à explorer les aspects du suivi de la performance commerciale et je rencontre encore des difficultés pour analyser et exploiter les résultats de manière efficace. Cependant, je suis consciente que ce pilotage est essentiel pour optimiser la performance de l'équipe et affiner nos prises de décision.",
    "AC22.06 - Prendre en compte les enjeux de la fonction achat pour la performance économique de l'entreprise": "Initiée à cette compétence lors de mes cours cette année, j'ai pu l'appliquer lors de SAE en analysant l'impact des décisions d'achat sur la rentabilité de l'entreprise. Si je commence à saisir les enjeux de la fonction achat pour la performance économique, je souhaite approfondir cette maîtrise l'année prochaine à travers de nouveaux projets pratiques et l'étude de cas plus complexes.",
    "AC23.01 - Élaborer une stratégie de communication adaptée au brief agence": "J'ai consolidé cette compétence cette année à travers plusieurs projets concrets, notamment la création de buyer personas détaillés et la production intégrale d'un journal papier et 'télévisé' en équipe. Ces exercices m'ont permis de maîtriser l'élaboration d'une stratégie de communication sur-mesure, parfaitement adaptée aux exigences d'un brief agence et aux cibles identifiées.",
    "AC23.02 - Établir une stratégie de moyens en utilisant les indicateurs de choix des supports": "Pour l'instant, je commence à comprendre les indicateurs de performance qui aident à choisir les bons supports de communication. J'ai les bases théoriques sur le ciblage et le coût des médias, mais il me manque encore de la pratique sur des données concrètes pour pouvoir monter une vraie stratégie de A à Z.",
    "AC23.03 - Proposer un plan de communication 360 en élaborant les supports et en veillant à leur efficacité": "J'ai appris à construire un plan de communication 360°, en coordonnant différents supports pour qu'ils s'inscrivent dans un message cohérent. Par exemple, en réalisant un journal fictif sur la GenZ et un flipbook pour le BUT TC, j'ai pu créer des contenus adaptés à plusieurs canaux (comme la presse ou l'événementiel), tout en veillant à leur impact global pour bien toucher ma cible. Et mon stage à Wallis et Futuna la 1ère m'aide à consolider tout ça.",
    "AC23.04 - Mettre en oeuvre une stratégie digitale (blog, réseaux sociaux, influenceurs) en mesurant les performances et en veillant à l'e-réputation": "J'ai vraiment appris à manier les stratégies digitales en apprenant à créer des sites web et en décortiquant les façons de communiquer en ligne. Aujourd'hui, en stage à la station radio, télé et numérique de Wallis-et-Futuna la 1ère, je mets tout ça en pratique au quotidien. Je suis dans le concret : je participe à la gestion de l'e-réputation et je surveille comment nos contenus performent sur les différents canaux numériques de l'archipel.",
    "AC24.01 - Mobiliser des indicateurs de performance en fonction du volume et de la variété des données": "Je commence à comprendre l'utilisation des indicateurs de performance sur différents types de données. En analysant les activités digitales de Carrefour et en comparant les réseaux sociaux de Vertbaudet avec ceux de Made in Bébé, j'ai appris à repérer et interpréter des indicateurs importants comme le taux d'engagement et autres...",
    "AC24.02 - Identifier les spécificités du marketing digital": "Je commence à vraiment comprendre les rouages du marketing digital, surtout grâce à ce que j'ai pu voir sur Made in Bébé, avec l'analyse d'influenceurs et le projet d'innovation Tempill. Ces expériences m'ont permis de saisir à quel point le référencement, la création de contenu et l'e-réputation sont cruciaux. Mais pour progresser, il me reste encore à apprendre comment combiner ces leviers de façon cohérente sur des projets vraiment complexes.",
    "AC24.03 - Utiliser un cahier des charges e-business": "J'ai acquis la capacité de rédiger et de mettre en œuvre des cahiers des charges e-business, comme je l'ai démontré lors du projet Sweety Cake ou encore pour le site du CARE Organisationnel. Cette compétence s'est aussi concrétisée par la création de mon portfolio personnel que j'ai vraiment aimé faire et l'utilisation du cahier des charges m'a servi jusqu'au bout. ",
    "AC24.04 - Intégrer les spécificités du e-commerce": "Bien que je n'aie pas encore monté ma propre boutique en ligne, j'ai étudié les mécaniques du e-commerce à travers l'analyse de Carrefour et Made in Bébé. Cependant, je dois encore approfondir ma compréhension du tunnel de conversion, de l'expérience utilisateur et de la logistique digitale pour pouvoir les appliquer concrètement à la conception d'un site marchand.",
    "AC24.05 - Respecter le processus logistique": "Mon job étudiant en tant que caissière chez Intermarché m'a permis de comprendre les flux physiques de base et l'importance de la gestion des stocks en magasin. J'ai également étudié les enjeux du e-commerce à travers l'analyse de grands acteurs comme Carrefour. Cependant, je n'ai jamais géré une chaîne logistique.",
    "AC25.01 - Concevoir un modèle d'affaires simplifié": "J'ai acquis la capacité de concevoir des modèle d'affaires simplifié efficace, par la réalisation de plusieurs Business Model cette année, dans le cadre de différent projet. Je sais à présent par où commencer si je souhaite créer mon entreprise.",
    "AC25.02 - Analyser de façon pertinente la situation marché-entreprise grâce aux outils de diagnostic stratégique": "Je suis en train de me former aux outils de diagnostic stratégique comme le SWOT, le PESTEL et les forces de Porter. J'ai déjà eu l'occasion de les appliquer concrètement en analysant Carrefour ou Made in Bébé. Je vois bien à quoi ils servent pour comprendre un environnement concurrentiel, mais j'ai encore besoin de pratique pour les utiliser toute seule et être capable de proposer des recommandations stratégiques qui tiennent vraiment compte de situations complexes.",
    "AC25.03 - Analyser la situation financière d'une entreprise à partir des éléments de la comptabilité générale": "Cet apprentissage n'est pas encore acquis, car je n'ai pas suivi de formation en comptabilité générale et j'ai des difficultés avec l'analyse chiffrée. Cependant, j'ai pu m'initier à la lecture d'indicateurs financiers à travers la construction de tableaux de bord commerciaux ou avec la conférence de l'URSSAF, ainsi que des travaux en SAE où nous avons pu analysé la situation financière d'entreprises.",
    "AC25.04 - Identifier les éléments pertinents nécessaires à la réalisation du projet": "J'ai acquis la capacité à identifier les éléments clés nécessaires à la réalisation d'un projet. Lors du projet CARE Organisationnel, il était nécessaire de cadrer un projet digital destiné à des chercheurs en définissant les besoins, contraintes, ressources et livrables. J'ai également appliqué cette démarche pour mon portfolio et le projet transverse.",
    "AC25.05 - Utiliser les techniques de créativité individuelle et collective": "Je suis en cours d'acquisition des techniques de créativité individuelle et collective, telles que le brainstorming et le mind mapping. J'ai pu utilisé ces outils lors du projet transverse pour notre projet, Sweety Cake.",
    "AC25.06 - Contribuer à l'enrichissement d'un projet collectif": "J'ai contribué activement à plusieurs projets collectifs en apportant des idées, en coordonnant les actions et en participant aux décisions. Cela inclut plusieurs projet cette année et d'ailleurs je constate que par rapport à l'année dernière, mon comportement en groupe à vraiment évolué.",
  };
  const AC_PROOFS = {
    "AC21.01 - Diagnostiquer l'environnement en appréhendant les enjeux sociaux et écologiques": [
      { titre: "Dossier IKEA", legende: "Analyse de l'environnement sociétal et écologique d'IKEA", fichier: "/preuves/ac21.01/dossier-ikea.pdf" },
      { titre: "Diapo IKEA", legende: "Support de présentation de l'analyse IKEA", fichier: "/preuves/ac21.01/diapo-ikea.pdf" },
      { titre: "Article géopolitique", legende: "Article sur les enjeux géopolitiques et économiques", fichier: "/preuves/ac21.01/article-geopo.pdf" },
      { titre: "Journal de consommation", legende: "Observation et analyse de mes comportements de consommation", fichier: "/preuves/ac21.01/journal-conso.pdf" },
      { titre: "Post LinkedIn - Conférence NIMEC", legende: "Participation à la Journée Ébroïcienne de Recherche sur les Transitions", lien: "https://www.linkedin.com/posts/benjamin-berton-evreux_un-grand-merci-aux-coll%C3%A8gues-du-nimec-normandie-ugcPost-7437963584636338176-_DiP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAGdztdwBoVMFs-WHmakGmR1ZRiM15yiE2qc" },
    ],
    "AC21.02 - Mettre en oeuvre une étude de marché dans un environnement complexe": [
      { titre: "Diapo Créasim - Ateliers de Cuisine", legende: "Simulation de marché - Ateliers de Cuisine (Créasim)", fichier: "/preuves/ac21.02/diapo-créasim-ateliersdecuisine.pdf" },
      { titre: "Diapo SAE - Fusion Food", legende: "Support de présentation SAE - Fusion Food", fichier: "/preuves/ac21.02/diapo-sae-fusionfood.pdf" },
      { titre: "Dossier SAE - Fusion Food", legende: "Dossier complet SAE - étude de marché Fusion Food", fichier: "/preuves/ac21.02/dossier-sae-fusionfood.pdf" },
      { titre: "Étude qualitative Cashback", legende: "Étude qualitative sur le cashback", fichier: "/preuves/ac21.02/etude-qual-cashback.pdf" },
      { titre: "Retranscription", legende: "Retranscription des entretiens qualitatifs", fichier: "/preuves/ac21.02/retranscription.pdf" },
      { titre: "Créasim - Outil de simulation", legende: "Outil de simulation de marché utilisé en SAE", lien: "https://www.antikera.com/produits/creasim/" },
    ],
    "AC21.03 - Mettre en place une stratégie marketing dans un environnement complexe": [
      { titre: "Diapo Barbie", legende: "Analyse et stratégie marketing autour du film Barbie", fichier: "/preuves/ac21.03/diapo-barbie.pdf" },
      { titre: "Journal de consommation", legende: "Journal de consommation - analyse comportementale", fichier: "/preuves/ac21.03/journal-conso.pdf" },
      { titre: "Diapo SAE Défimax VTT", legende: "Stratégie marketing SAE - Entreprise VTT (Défimax)", fichier: "/preuves/ac21.03/diapo-sae-défimax-vtt.pdf" },
      { titre: "Défimax - Outil de simulation", legende: "Outil de simulation stratégique utilisé en SAE", lien: "https://www.antikera.com/produits/defimax/" },
    ],
    "AC21.04 - Concevoir un mix marketing étendu pour une offre complexe": [
      { titre: "Diapo Barbie", legende: "Initiation au mix marketing avec la marque Barbie", fichier: "/preuves/ac21.04/diapo-barbie.pdf" },
      { titre: "Matrice BCG", legende: "Exercice d'analyse de portefeuille via la matrice BCG", fichier: "/preuves/ac21.04/matrice-bcg.pdf" },
    ],
  };
  const getSkillStatus = () => {
    for (const comp of Object.values(COMPETENCES)) {
      const ac = comp.acs.find(a => a.text === skill);
      if (ac) return ac.status;
    }
    return null;
  };
  const status = getSkillStatus();
  const handleClose = () => { setView('info'); onClose(); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl border flex flex-col"
        style={{ borderColor: '#FFF9C4', animation: 'scaleIn .25s ease', maxHeight: '75vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header fixe */}
        <div className="p-8 pb-4 flex justify-between items-start flex-shrink-0">
          <div className="p-3 rounded-2xl" style={{ background: '#FFF9C4', color: '#FF69B4' }}>
            {view === 'info' ? <Info size={24} /> : <ImageIcon size={24} />}
          </div>
          <button onClick={handleClose} className="p-2 rounded-full transition-colors hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {view === 'info' ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
                    Détails de l'apprentissage
                  </span>
                  {status && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ color: 'white', background: status === 'acquis' ? '#FF69B4' : status === 'en-cours' ? '#ffdb63ff' : '#9CA3AF' }}>
                      {status === 'acquis' ? 'Acquis' : status === 'en-cours' ? 'En cours' : 'Non acquis'}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-serif font-bold leading-snug" style={{ color: '#1A202C' }}>{skill}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.65 }}>
                  {AC_EXPLANATIONS[skill]}
                </p>
              </div>
              <button onClick={() => setView('realisations')}
                className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: '#FF69B4' }}>
                Mes réalisations <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
                  Portfolio de compétence
                </span>
                <h3 className="text-2xl font-serif font-bold leading-snug" style={{ color: '#1A202C' }}>Mes réalisations</h3>
                <div className="space-y-2 pt-1">
                  {(AC_PROOFS[skill] || []).length > 0 ? (
                    AC_PROOFS[skill].map((preuve, i) => (
                      <a key={i} href={preuve.lien || preuve.fichier} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5"
                        style={{ background: '#FFF9C4', color: '#1A202C', textDecoration: 'none' }}>
                        <div className="p-2 rounded-lg" style={{ background: '#FF69B4' }}>
                          {preuve.lien ? <Globe size={14} style={{ color: 'white' }} /> : <FileText size={14} style={{ color: 'white' }} />}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{preuve.titre}</span>
                          {preuve.legende && <p className="text-xs italic opacity-60 mt-0.5">{preuve.legende}</p>}
                        </div>
                        <ArrowRight size={14} style={{ color: '#FF69B4', marginLeft: 'auto' }} />
                      </a>
                    ))
                  ) : (
                    <p className="text-xs italic text-center" style={{ color: '#1A202C', opacity: 0.45 }}>
                      Preuves à venir...
                    </p>
                  )}
                </div>
              </div>
              <button onClick={() => setView('info')}
                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-colors hover:bg-gray-50"
                style={{ color: '#1A202C', borderColor: '#e5e7eb' }}>
                <ArrowLeft size={18} /> Retour aux détails
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PageAccueil = ({ setActivePage, scrollContainerRef, scrollGallery, setSelectedSkill }) => (
  <div className="space-y-20">
    <section className="relative py-8 overflow-hidden">
      <style>{`
    @keyframes twinkle {
      0%, 100% { opacity: 0; transform: scale(0.5); }
      50% { opacity: 0.8; transform: scale(1.2); }
    }
  `}</style>

      {/* Étoiles */}
      {[...Array(8)].map((_, i) => (
        <span key={i} style={{
          position: 'absolute',
          top: `${[10, 20, 60, 80, 15, 70, 40, 90][i]}%`,
          left: `${[5, 85, 90, 10, 60, 75, 45, 30][i]}%`,
          fontSize: `${[16, 20, 14, 18, 12, 22, 16, 14][i]}px`,
          animation: `twinkle ${[2, 3, 2.5, 4, 1.8, 3.2, 2.8, 3.5][i]}s infinite`,
          color: '#FF69B4',
          zIndex: 0,
        }}>✦</span>
      ))}

      {/* PORTFOLIO en grand */}
      <div className="relative" style={{ zIndex: 1 }}>
        <h1 className="font-serif text-center leading-none select-none" style={{
          fontSize: 'clamp(70px, 12vw, 150px)',
          color: '#1A202C',
          fontWeight: '300',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          PORTFOLIO
        </h1>

        {/* Photo + texte */}
        <div className="flex flex-col items-center">
          <div className="flex items-start justify-center w-full gap-8" style={{ marginTop: '-125px' }}>
            <img
              src="/image.png"
              alt="June Spotbeen"
              style={{ height: '330px', objectFit: 'contain', zIndex: 2, position: 'relative', alignSelf: 'flex-start', marginTop: '20px' }}
            />
            <div className="flex flex-col items-center space-y-4 pb-4 mt-30" style={{ zIndex: 1, maxWidth: '500px' }}>
              <h2 className="text-3xl md:text-4xl font-serif leading-tight text-center" style={{ color: '#1A202C' }}>
                Bienvenue dans mon <br />
                <em style={{ color: '#FF69B4' }}>univers professionnel</em>
              </h2>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-serif" style={{ color: '#1A202C' }}>June Spotbeen</h3>
                <p className="text-base leading-relaxed" style={{ color: '#1A202C', opacity: 0.88 }}>
                  Étudiante en{' '}
                  <strong
                    className="border-b-2 cursor-pointer transition-opacity"
                    style={{ borderColor: '#FF69B4', animation: 'gentlePulse 2.5s ease-in-out infinite' }}
                    onClick={() => setSelectedSkill('BUT_DEFINITION')}
                  >BUT Techniques de commercialisation</strong>
                  , orientée vers le Marketing digital, l'e-business et l'entrepreneuriat à l'IUT d'Evreux,
                  Université de Rouen Normandie.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <button onClick={() => document.getElementById('qui-suis-je')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="px-8 py-4 text-white rounded-full flex items-center gap-2 font-medium tracking-wide transition-all hover:shadow-xl hover:scale-105"
              style={{ background: '#FF69B4' }}>
              Explorer mon profil <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
    <section id="qui-suis-je" className="rounded-3xl p-8" style={{ background: '#FFF9C4' }}>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-serif italic" style={{ color: '#1A202C' }}>Qui suis-je ?</h3>
        <div className="flex-1 h-px" style={{ background: '#FF69B4', opacity: 0.3 }}></div>
      </div>
      <div className="flex items-start gap-8">
        <div className="space-y-4 text-base leading-relaxed flex-1" style={{ color: '#1A202C', opacity: 0.8 }}>
          <p>
            Intéressée par l'entrepreneuriat et le marketing digital depuis le lycée, c'est naturellement que je me suis dirigée vers le BUT Techniques de Commercialisation en septembre 2024. Je ne regrette absolument pas ce choix car cette formation est aussi bien polyvalente que professionnalisante.
          </p>
          <p>
            Depuis ma première expérience professionnelle en 2023 à aujourd'hui, j'ai eu la chance de pouvoir toucher à tout : la vente, les finances publiques, la gendarmerie, la logistique, et même le journalisme. On pourrait penser que je me disperse, mais en réalité, j'avais besoin d'explorer pour mieux me connaître.
          </p>
          <p>
            Aujourd'hui je ne sais toujours pas ce que je veux faire plus tard, mais en tout cas je sais ce que je ne veux pas. J'ai quand même des axes qui m'intéressent : l'indépendance, la flexibilité, et des environnements stimulants. Ce qui me passionne ? Le digital, la communication et l'intelligence artificielle, un sujet que j'avais déjà choisi pour mon grand oral au lycée, convaincue qu'il allait transformer nos façons de travailler.
          </p>
        </div>
        <div className="flex-shrink-0" style={{ transform: 'rotate(3deg)' }}>
          <div className="p-3 bg-white shadow-lg rounded-sm">
            <img
              src="/photomoi.jpg"
              alt="June Spotbeen"
              style={{ width: '350px', height: '300px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera style={{ color: '#FF69B4' }} />
          <h3 className="text-2xl font-serif italic" style={{ color: '#1A202C' }}>Ma galerie</h3>
        </div>
        <div className="flex gap-2">
          {['left', 'right'].map((dir) => (
            <button key={dir} onClick={() => scrollGallery(dir)}
              className="p-2 rounded-full border transition-colors hover:bg-[#FFF9C4]"
              style={{ borderColor: '#FFF9C4', color: '#1A202C' }}>
              {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          ))}
        </div>
      </div>
      <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-6 snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {[
          { src: '/une.png', desc: "En 2024, je suis devenue cadet de la gendarmerie d'Eure et Loir. À cette occasion, j'ai pu défiler au 14 juillet auprès des forces de l'ordre à Chartres (28)." },
          { src: '/deux.png', desc: "Le jeudi 7 novembre 2025, dans le cadre du projet transverse, nous avons célébré l'ouverture des Jeunes Pousses organisée par la Maison de l'Entrepreneuriat de Rouen. De gauche à droite : Douaa Chihhane, Nafissatou Gueye, Lalia Soumaré, Nina Caliskan, Laura Fermigier, Chanez Megherat et moi-même. Photographe : Marie Pioche" },
          { src: '/trois.jpg', desc: "Au semestre 4, nous avons réalisé un flipbook pour promouvoir le BUT TC et voici l'image de fin de notre passage. De gauche à droite : Douaa Chihhane, Lalia Soumaré et moi. Ressources : Création d'une campagne publicitaire" },
          { src: '/quatre.png', desc: "Mise en scène d'un journal télévisé — le lundi 30 mars 2026, dans le cadre d'un exercice, j'ai tenu le rôle d'une intervenante lors d'une simulation de journal télévisé sur l'intelligence artificielle et l'avenir de l'emploi. À gauche de l'image, Victorine Gomis incarnait la présentatrice. Ressources : ECC — Enseignante : Madame Boukoum — Photographe : Mathilde Jaconot" },
          { src: '/cinq.png', desc: "Sky, le chien pédagogique pour le compte de Wallis et Futuna la 1ère — le jeudi 30 avril 2026, lors de mon stage, nous avons donné vie à Sky, un chien pédagogique irrésistible, pour enrichir le contenu du compte de Wallis et Futuna la 1ère. Caméraman : Jean-François Puakavase — Journaliste : Mirna Kilama — Mettre du chien : Xavier — Photographe : Olivia Garrett Alaïs" },
          { src: '/six.png', desc: "Le lundi 11 mai 2026, dans le cadre de mon stage, j'ai pu assister à un journal télévisé sur le plateau. Photographe : Stéphanie Seilala Vili" },
          null,
        ].map((item, i) => (
          <div key={i} className="flex-none w-[320px] aspect-video rounded-2xl overflow-hidden relative shadow-sm border border-white snap-start cursor-pointer group transition-all duration-500"
            style={{ background: '#FFF9C4' }}
            onClick={() => item && setSelectedSkill('GALLERY_' + i)}>
            {item ? (
              <img src={item.src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: i === 0 ? 'center 30%' : 'center' }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="italic text-xs uppercase tracking-tighter" style={{ color: '#827717', opacity: 0.45 }}>À venir</span>
              </div>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(255,105,180,0.08)' }} />
          </div>
        ))}
      </div>
    </section>
  </div>
);

const PageFormation = () => (
  <div className="space-y-8">
    <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>
      Ma Formation
    </h2>
    <div className="grid gap-6">

      <div className="bg-white p-10 rounded-[40px] border-l-[12px] relative overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: '#FF69B4' }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16" style={{ background: 'rgba(255,249,196,0.3)' }} />
        <div className="flex justify-between items-start flex-wrap gap-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>2024 - 2026</span>
            <h3 className="text-2xl font-bold mt-1" style={{ color: '#1A202C' }}>BUT Techniques de Commercialisation</h3>
            <p className="text-lg italic flex items-center gap-2 mt-1" style={{ color: '#1A202C', opacity: 0.65 }}>
              <MapPin size={16} /> IUT d'Evreux, Université de Rouen Normandie
            </p>
          </div>
          <GraduationCap size={40} style={{ color: '#FF69B4' }} />
        </div>
        <div className="mt-6 space-y-3 relative z-10">
          <p className="text-sm font-semibold" style={{ color: '#1A202C' }}>Parcours :</p>
          <div className="flex flex-wrap gap-3">
            {["1ère année générale", "2ème année en Marketing digital, e-business et entrepreneuriat"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 text-xs font-medium rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border-l-[12px] relative overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: '#FFF9C4' }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16" style={{ background: 'rgba(255,249,196,0.3)' }} />
        <div className="flex justify-between items-start flex-wrap gap-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>2021 - 2024</span>
            <h3 className="text-2xl font-bold mt-1" style={{ color: '#1A202C' }}>Baccalauréat Général (Mention Assez Bien)</h3>
            <p className="text-lg italic flex items-center gap-2 mt-1" style={{ color: '#1A202C', opacity: 0.65 }}>
              <MapPin size={16} /> Lycée Fulbert, Chartres
            </p>
          </div>
          <GraduationCap size={40} style={{ color: '#FF69B4' }} />
        </div>
        <div className="mt-6 space-y-3 relative z-10">
          <p className="text-sm font-semibold" style={{ color: '#1A202C' }}>Spécialités :</p>
          <div className="flex flex-wrap gap-3">
            {["Sciences économiques et sociales", "Anglais monde contemporain"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 text-xs font-medium rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border-l-[12px] relative overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: '#FFF9C4' }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16" style={{ background: 'rgba(255,249,196,0.3)' }} />
        <div className="flex justify-between items-start flex-wrap gap-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>2017 - 2021</span>
            <h3 className="text-2xl font-bold mt-1" style={{ color: '#1A202C' }}>Brevet des Collèges (Mention Assez Bien)</h3>
            <p className="text-lg italic flex items-center gap-2 mt-1" style={{ color: '#1A202C', opacity: 0.65 }}>
              <MapPin size={16} /> Collège Delfeuille, Nogent le Rotrou
            </p>
          </div>
          <GraduationCap size={40} style={{ color: '#FF69B4' }} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FF69B4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Certifications officielles</span>
          <ul className="mt-4 space-y-2">
            {["Anglais B1 Cambridge Certificate", "PSC1 (Premiers secours)", "PIX (Compétences numériques)"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#1A202C' }}>
                <span style={{ color: '#FF69B4' }}>•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Engagements civiques</span>
          <ul className="mt-4 space-y-2">
            {["SNU - Service National Universel", "Cadet de la Gendarmerie d'Eure-et-Loir"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#1A202C' }}>
                <span style={{ color: '#FF69B4' }}>•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Mobilité</span>
          <ul className="mt-4 space-y-2">
            {["Permis B"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#1A202C' }}>
                <span style={{ color: '#FF69B4' }}>•</span> {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  </div>
);

const PageParcours = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mon Parcours</h2>
      </div>
      <div className="grid gap-6">

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FF69B4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Avril - Mai 2026 • 2 mois</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Stage Community Manager</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>France Télévisions Wallis et Futuna - La 1ère Outre Mer</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Création de contenu", "Rédaction d'articles web", "Déplacements", "Veille numérique"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Janvier - Mars 2026 • 3 mois</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>CDD Caissière</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>Intermarché Senonches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Caisse", "Facing"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Aout 2025 • 1 mois</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Saisonnière Vente Rayon Chaussures</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>Intersport Guichainville</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Vente", "Réassort", "Facing", "Etiquetage", "Implantation"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Juillet 2025 • 5 semaines</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Conditionnement</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>GT Logistic - Artus Interim, Nogent le Phaye</p>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Janvier 2025 • 1 mois</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Stage Vente Rayon Chaussures</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>Intersport Guichainville</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Vente", "Réassort", "Facing", "Etiquetage", "Implantation"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Juillet 2023 • 1 mois</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Vacataire Service Gestion Comptable</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>Nogent le Rotrou</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Classement", "Courriers", "Chèques"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Année scolaire 2023-2024</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Cadet de la Gendarmerie d'Eure-et-Loir</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>Association</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Cérémonies mémoriales", "Découverte des métiers", "Visite d'entreprises"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[30px] border-l-[8px]" style={{ borderColor: '#FFF9C4' }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Avril 2021 • 1 semaine</span>
          <h3 className="text-xl font-bold mt-1" style={{ color: '#1A202C' }}>Stage de 3ème</h3>
          <p className="text-base italic" style={{ color: '#1A202C', opacity: 0.6 }}>Boulangerie Champrond en Gatine</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Mise en rayon", "Vente", "Ménage"].map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full" style={{ background: '#FFF9C4', color: '#827717' }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const PageCompétences = ({ title, acs, onSkillClick, setActivePage, nextPage }) => {
  const getIcon = (status) => {
    if (status === 'acquis') return <CheckCircle2 size={18} style={{ color: '#FF69B4' }} />;
    if (status === 'en-cours') return <span style={{ fontSize: '18px', color: '#FF69B4', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px' }}>~</span>;
    if (status === 'non-acquis') return <X size={18} style={{ color: '#FF69B4' }} />;
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>{title}</h2>
        <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>
          Acquis d'apprentissage dans le cadre de mon cursus, auto-évalués selon mon ressenti. (Cliquez pour plus d'infos)
        </p>
        <div className="flex gap-6 text-xs pt-1" style={{ color: '#1A202C', opacity: 0.7 }}>
          <span className="flex items-center gap-1"><CheckCircle2 size={14} style={{ color: '#FF69B4' }} /> Acquis</span>
          <span className="flex items-center gap-1"><span style={{ color: '#FF69B4', fontWeight: 'bold', fontSize: '18px' }}>~</span> En cours</span>
          <span className="flex items-center gap-1"><X size={14} style={{ color: '#FF69B4' }} /> Non acquis</span>
        </div>
      </div>
      <div className="grid gap-4">
        {acs.map((ac, i) => (
          <button key={i} onClick={() => onSkillClick(ac.text)}
            className="flex items-start p-6 bg-white rounded-2xl border text-left group w-full transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ borderColor: '#FFF9C4' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF69B4')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#FFF9C4')}>
            <div className="mr-5 mt-1 p-2 rounded-lg flex-shrink-0" style={{ background: '#FFF9C4' }}>
              {getIcon(ac.status)}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#1A202C', opacity: 0.38 }}>Compétence Technique</span>
              <p className="text-base font-medium leading-relaxed" style={{ color: '#1A202C' }}>{ac.text}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button onClick={() => setActivePage('competences-overview')}
          className="px-6 py-3 rounded-full border font-medium text-sm transition-all hover:shadow-md"
          style={{ borderColor: '#FF69B4', color: '#FF69B4' }}>
          Retour aux compétences
        </button>
        {nextPage && (
          <button onClick={() => setActivePage(nextPage)}
            className="px-6 py-3 rounded-full text-white font-medium text-sm transition-all hover:shadow-md hover:scale-105 flex items-center gap-2"
            style={{ background: '#FF69B4' }}>
            Compétence suivante <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
const PageCompetencesOverview = ({ setActivePage }) => (
  <div className="space-y-8">
    <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mes Compétences</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { id: 'marketing', title: 'Stratégie Marketing', icon: <TrendingUp size={32} />, desc: '4 apprentissages critiques' },
        { id: 'vente', title: 'Développement commercial', icon: <ShoppingCart size={32} />, desc: '6 apprentissages critiques' },
        { id: 'communication', title: 'Communication', icon: <Megaphone size={32} />, desc: '4 apprentissages critiques' },
      ].map((comp) => (
        <div key={comp.id} onClick={() => setActivePage(comp.id)}
          className="cursor-pointer bg-white rounded-[30px] p-8 border transition-all hover:shadow-xl hover:-translate-y-1 space-y-4"
          style={{ borderColor: '#FFF9C4' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF69B4')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#FFF9C4')}>
          <div className="p-4 rounded-2xl inline-block" style={{ background: '#FFF9C4' }}>
            <span style={{ color: '#FF69B4' }}>{comp.icon}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold" style={{ color: '#1A202C' }}>{comp.title}</h3>
            <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>{comp.desc}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
            Voir les AC <ArrowRight size={14} />
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      {[
        { id: 'mkt-digital', title: 'Marketing Digital', icon: <Smartphone size={32} />, desc: '5 apprentissages critiques' },
        { id: 'ebusiness', title: 'E-business et entrepreneuriat', icon: <Rocket size={32} />, desc: '6 apprentissages critiques' },
      ].map((comp) => (
        <div key={comp.id} onClick={() => setActivePage(comp.id)}
          className="cursor-pointer bg-white rounded-[30px] p-8 border transition-all hover:shadow-xl hover:-translate-y-1 space-y-4"
          style={{ borderColor: '#FFF9C4' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF69B4')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#FFF9C4')}>
          <div className="p-4 rounded-2xl inline-block" style={{ background: '#FFF9C4' }}>
            <span style={{ color: '#FF69B4' }}>{comp.icon}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold" style={{ color: '#1A202C' }}>{comp.title}</h3>
            <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>{comp.desc}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
            Voir les AC <ArrowRight size={14} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
const PageProjets = ({ setActivePage }) => (
  <div className="space-y-12">

    {/* Header */}
    <div className="space-y-2">
      <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mes Projets</h2>
      <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>SAE, stages, projet transverse, PPP — quatre dimensions d'un même parcours.</p>
    </div>

    {/* Cartes détaillées */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* SAE */}
      <div className="bg-white rounded-[30px] border overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        style={{ borderColor: '#FFF9C4' }}
        onClick={() => setActivePage('sae')}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
        <div className="p-6 flex items-center gap-4" style={{ background: '#FFF9C4' }}>
          <div className="p-3 rounded-2xl bg-white">
            <Presentation size={28} style={{ color: '#FF69B4' }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>S3 & S4</p>
            <h3 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>SAE</h3>
          </div>
        </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>
            Quatre situations d'apprentissage qui m'ont plongée dans des cas professionnels réels — de la création d'entreprise à la création d'un site web.
          </p>
          <div className="space-y-2 flex-1">
            {[
              { sem: 'S3', titre: 'Création d\'entreprise' },
              { sem: 'S3', titre: 'Analyse d\'une activité digitale' },
              { sem: 'S4', titre: 'Pilotage commercial d\'une organisation' },
              { sem: 'S4', titre: 'Création d\'un site web' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: '#FFB6C1', color: '#1A202C' }}>{s.sem}</span>
                <p className="text-xs" style={{ color: '#1A202C', opacity: 0.7 }}>{s.titre}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2" style={{ color: '#FF69B4' }}>
            Découvrir <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {/* Stages */}
      <div className="bg-white rounded-[30px] border overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        style={{ borderColor: '#FFF9C4' }}
        onClick={() => setActivePage('stages')}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
        <div className="p-6 flex items-center gap-4" style={{ background: '#FFB6C1' }}>
          <div className="p-3 rounded-2xl bg-white">
            <Building2 size={28} style={{ color: '#FF69B4' }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>TC1 & TC2</p>
            <h3 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Stages</h3>
          </div>
        </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>
            Deux immersions professionnelles — une en vente en Normandie, une dans l'audiovisuel à l'autre bout du monde.
          </p>
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: '#FFF9C4' }}>
              <span className="text-xl">🌺</span>
              <div>
                <p className="text-xs font-bold" style={{ color: '#1A202C' }}>Wallis et Futuna — La 1ère</p>
                <p className="text-xs" style={{ color: '#1A202C', opacity: 0.6 }}>TC2 · Audiovisuel · Pacifique Sud</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: '#FFF9C4' }}>
              <span className="text-xl">🏃</span>
              <div>
                <p className="text-xs font-bold" style={{ color: '#1A202C' }}>Intersport — Guichainville</p>
                <p className="text-xs" style={{ color: '#1A202C', opacity: 0.6 }}>TC1 · Vente · Relation client</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2" style={{ color: '#FF69B4' }}>
            Découvrir <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {/* Projet Transverse */}
      <div className="bg-white rounded-[30px] border overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        style={{ borderColor: '#FFF9C4' }}
        onClick={() => setActivePage('projet-transverse')}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
        <div className="p-6 flex items-center gap-4" style={{ background: '#FFF9C4' }}>
          <div className="p-3 rounded-2xl bg-white">
            <Target size={28} style={{ color: '#FF69B4' }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Jeunes Pousses · 2025–2026</p>
            <h3 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Projet Transverse</h3>
          </div>
        </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>
            Création de A à Z d'une entreprise fictive mais opérationnelle en équipe de 4 : <strong>Sweety Cake</strong>, un coffee shop artisanal sans sucre raffiné.
          </p>
          <div className="flex flex-wrap gap-2 flex-1 content-start">
            {['SARL', 'Coffee shop', 'Sans sucre raffiné', 'Distributeurs auto.', 'Haute-Normandie', 'Production & Finitions'].map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFB6C1', color: '#1A202C' }}>{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2" style={{ color: '#FF69B4' }}>
            Découvrir <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {/* PPP */}
      <div className="bg-white rounded-[30px] border overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        style={{ borderColor: '#FFF9C4' }}
        onClick={() => setActivePage('ppp')}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
        <div className="p-6 flex items-center gap-4" style={{ background: '#FFB6C1' }}>
          <div className="p-3 rounded-2xl bg-white">
            <Star size={28} style={{ color: '#FF69B4' }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>S3 & S4</p>
            <h3 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>PPP</h3>
          </div>
        </div>
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>
            Projet Personnel et Professionnel — une réflexion sur moi-même, mes ambitions et la construction de mon avenir professionnel.
          </p>
          <div className="space-y-2 flex-1">
            {[
              { emoji: '🧠', texte: 'Profil INTJ — Architecte' },
              { emoji: '🎯', texte: 'Ambitions : e-commerce, freelance, entrepreneuriat' },
              { emoji: '📄', texte: 'Dossiers PPP S3 & S4' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span>{item.emoji}</span>
                <p className="text-xs" style={{ color: '#1A202C', opacity: 0.7 }}>{item.texte}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2" style={{ color: '#FF69B4' }}>
            Découvrir <ArrowRight size={13} />
          </div>
        </div>
      </div>

    </div>
  </div>
);
const PagePPP = () => (
  <div className="space-y-12">
    <div className="space-y-2">
      <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mon PPP</h2>
      <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Projet Personnel et Professionnel — de la connaissance de soi à la construction de mon avenir.</p>
    </div>

    {/* Intro */}
    <div className="bg-white rounded-[30px] p-8 border" style={{ borderColor: '#FFF9C4' }}>
      <p className="text-base leading-relaxed" style={{ color: '#1A202C', opacity: 0.8 }}>
        Depuis plusieurs années, j'ai une conviction : je veux travailler pour moi, à ma façon. J'ai besoin d'autonomie, de liberté et de pouvoir changer de voie à tout moment. Mon BUT TC m'a permis d'explorer sans me spécialiser — vente, communication digitale, marketing, entrepreneuriat — pour construire tous les bagages dont j'aurai besoin.
      </p>
      <p className="text-base leading-relaxed mt-4" style={{ color: '#1A202C', opacity: 0.8 }}>
        À court terme : terminer mon BUT en développant des expériences variées. À moyen terme : me lancer dans l'auto-entrepreneuriat ou la gestion d'un projet e-commerce.
      </p>
    </div>

    {/* Personnalité */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Ma personnalité</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { emoji: '🧠', titre: 'INTJ — Architecte', desc: 'Penseuse imaginative et stratégique, avec un plan pour tout. 79% introvertie, organisée, analytique.' },
          { emoji: '💡', titre: 'Points forts', desc: 'Esprit innovant · Travailleuse autonome · Pensée conceptuelle · Jugement objectif · Performances fiables' },
          { emoji: '🎯', titre: 'En développement', desc: 'Leadership · Networking · Délégation · Aisance à l\'oral · Prise de décision rapide' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 border space-y-3" style={{ borderColor: '#FFF9C4' }}>
            <div className="text-3xl">{item.emoji}</div>
            <h4 className="font-bold text-sm" style={{ color: '#FF69B4' }}>{item.titre}</h4>
            <p className="text-xs leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Ambitions */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Mes ambitions professionnelles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { titre: 'E-commerce', desc: 'Gérer un site e-commerce en auto-entreprise dans un domaine qui me passionne.' },
          { titre: 'Consultante digitale', desc: 'Accompagner des entreprises en stratégie digitale, idéalement en freelance.' },
          { titre: 'Entrepreneuriat', desc: 'Être gérante d\'entreprise — peu importe le type, l\'indépendance prime.' },
        ].map((item, i) => (
          <div key={i} className="rounded-[24px] p-6 space-y-2" style={{ background: '#FFF9C4' }}>
            <h4 className="font-bold" style={{ color: '#1A202C' }}>{item.titre}</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Vision Board */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Mon Vision Board 2026</h3>
      <div className="rounded-[30px] overflow-hidden shadow-xl border-4" style={{ borderColor: '#FFB6C1' }}>
        <img src="/preuves/ppp/vision-board.png" alt="Vision Board 2026" style={{ width: '100%', objectFit: 'cover' }} />
      </div>
    </div>

    {/* Dossiers */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Mes dossiers PPP</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/preuves/ppp/dossier-ppps3.pdf" target="_blank" rel="noopener noreferrer"
          className="bg-white rounded-[30px] p-8 border transition-all hover:shadow-xl hover:-translate-y-1 space-y-4 block"
          style={{ borderColor: '#FFF9C4', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
          <div className="p-4 rounded-2xl inline-block" style={{ background: '#FFF9C4' }}>
            <FileText size={32} style={{ color: '#FF69B4' }} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold" style={{ color: '#1A202C' }}>Dossier PPP — Semestre 3</h4>
            <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Introspection · Test de personnalité · Bilan de compétences · Métiers envisagés</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
            Consulter le dossier <ArrowRight size={14} />
          </div>
        </a>

        <a href="/preuves/ppp/dossier-ppps4.pdf" target="_blank" rel="noopener noreferrer"
          className="bg-white rounded-[30px] p-8 border transition-all hover:shadow-xl hover:-translate-y-1 space-y-4 block"
          style={{ borderColor: '#FFF9C4', textDecoration: 'none' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
          <div className="p-4 rounded-2xl inline-block" style={{ background: '#FFF9C4' }}>
            <FileText size={32} style={{ color: '#FF69B4' }} />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold" style={{ color: '#1A202C' }}>Dossier PPP — Semestre 4</h4>
            <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Recherche d'alternance · Analyse d'offres · Construction du projet professionnel</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
            Consulter le dossier <ArrowRight size={14} />
          </div>
        </a>
      </div>
    </div>
  </div>
);
const PageProjetTransverse = () => (
  <div className="space-y-12">

    {/* Header */}
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Jeunes Pousses · 2025–2026</p>
      <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Sweety Cake</h2>
      <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Coffee shop artisanal sans sucre raffiné — de l'idée à l'entreprise, en équipe.</p>
    </div>

    {/* Hero card */}
    <div className="relative rounded-[40px] overflow-hidden p-10 flex flex-col md:flex-row gap-8 items-center" style={{ background: 'linear-gradient(135deg, #FFB6C1 0%, #FFF9C4 100%)' }}>
      <div className="text-center shrink-0" style={{ fontSize: '6rem', lineHeight: 1 }}>🍰</div>
      <div className="space-y-4 flex-1">
        <h3 className="text-3xl font-serif italic font-bold" style={{ color: '#1A202C' }}>Un coffee shop gourmand et responsable</h3>
        <p className="text-base leading-relaxed" style={{ color: '#1A202C', opacity: 0.8 }}>
          Sweety Cake, c'est un coffee shop artisanal spécialisé dans les gâteaux et boissons <strong>sans sucre raffiné et/ou sans gluten</strong>,
          préparés maison à partir de recettes développées par l'équipe. Le tout complété par une distribution
          en <strong>distributeurs automatiques</strong> dans les lieux de passage de Haute-Normandie.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {['Entrepreneuriat', 'SARL', 'Healthy food', 'Artisanal', 'Haute-Normandie'].map((tag, i) => (
            <span key={i} className="px-4 py-1 rounded-full text-xs font-bold" style={{ background: 'white', color: '#FF69B4', border: '1px solid #FF69B4' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Notre concept */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Notre concept</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { emoji: '🌿', titre: 'L\'offre', desc: 'Gâteaux faits maison sans sucre raffiné, adaptés aux personnes diabétiques, intolérantes au gluten ou simplement soucieuses de leur santé — sans sacrifier le plaisir.' },
          { emoji: '📍', titre: 'La distribution', desc: 'Deux canaux complémentaires : un coffee shop physique pour une pause sur place, et des distributeurs automatiques dans universités, hôpitaux et zones urbaines.' },
          { emoji: '♻️', titre: 'La responsabilité', desc: 'Ingrédients locaux, emballages recyclables ou biodégradables, vaisselle réutilisable sur place et gestion rigoureuse des stocks pour limiter le gaspillage.' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 border space-y-3" style={{ borderColor: '#FFF9C4' }}>
            <div className="text-3xl">{item.emoji}</div>
            <h4 className="font-bold text-sm" style={{ color: '#FF69B4' }}>{item.titre}</h4>
            <p className="text-xs leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Mood board */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Notre univers visuel</h3>
      <div className="rounded-[30px] overflow-hidden border-4" style={{ borderColor: '#FFB6C1' }}>
        <img src="/preuves/projet-transverse/mood-board.png" alt="Mood board Sweety Cake" style={{ width: '100%', objectFit: 'cover' }} />
      </div>
    </div>

    {/* L'équipe */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ L'équipe fondatrice</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { initiale: 'D', nom: 'Douaa Chihhane', role: 'Communication & Branding', desc: 'Sublime le projet grâce à une communication claire, esthétique et cohérente.' },
          { initiale: 'E', nom: 'Elly Larue', role: 'Logistique & Organisation', desc: 'Veille à ce que tout soit prêt en temps voulu — le projet reste structuré et fluide.' },
          { initiale: 'L', nom: 'Lalia Soumaré', role: 'Développement des recettes', desc: 'Crée des recettes healthy mais délicieuses, garante de l\'identité gustative du projet.' },
          { initiale: 'J', nom: 'June Spotbeen', role: 'Production & Finitions', desc: 'Garantit la qualité visuelle et technique des gâteaux pour un rendu professionnel et séduisant.', isMe: true },
        ].map((m, i) => (
          <div key={i} className="bg-white rounded-[24px] p-5 border flex items-start gap-4" style={{ borderColor: m.isMe ? '#FF69B4' : '#FFF9C4', borderWidth: m.isMe ? 2 : 1 }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm" style={{ background: '#FF69B4' }}>{m.initiale}</div>
            <div className="space-y-1">
              <p className="font-bold text-sm" style={{ color: '#1A202C' }}>{m.nom}{m.isMe && <span className="ml-2 text-xs font-normal italic" style={{ color: '#FF69B4' }}>— moi</span>}</p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>{m.role}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Mon rôle */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Mon rôle en détail</h3>
      <div className="rounded-[30px] p-8 space-y-4" style={{ background: '#FFF9C4' }}>
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎨</div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Production & Finitions</p>
            <p className="text-base leading-relaxed" style={{ color: '#1A202C', opacity: 0.85 }}>
              Au sein de l'équipe, j'étais garante de la qualité visuelle et technique des gâteaux.
              Minutieuse et patiente, je supervisais les décors et les finitions pour assurer un rendu
              professionnel et séduisant — essentiel pour une cible connectée et très attachée au visuel.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {['Précision', 'Minutie', 'Maîtrise technique', 'Sens du détail', 'Patience'].map((f, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'white', color: '#FF69B4', border: '1px solid #FFB6C1' }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Étapes du projet */}
    <div className="space-y-6">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Les étapes du projet</h3>
      <div className="space-y-4">
        {[
          {
            num: '01', titre: 'Formaliser le projet', sous: 'Problème · Solution',
            desc: 'Nous avons identifié deux besoins : les personnes souhaitant manger gourmand sans excès de sucre, et celles ayant des régimes spécifiques (diabète, intolérance au gluten). Notre étude qualitative auprès de 10 personnes a confirmé l\'appétit pour des snacks sains et pratiques — 8/10 seraient favorables à des distributeurs automatiques de pâtisseries healthys.',
          },
          {
            num: '02', titre: 'Proposition de valeur', sous: 'Concurrents · Offre commerciale',
            desc: 'Après analyse des acteurs industriels (LU, Gerblé, Bjorg, Karéléa…), nous avons défini notre différence : des produits artisanaux, faits maison, sans sucre raffiné, accessibles à tous. Notre double distribution (coffee shop + distributeurs) nous permet de toucher un large public tout en ancrant notre présence en Haute-Normandie.',
          },
          {
            num: '03', titre: 'Étude de marché', sous: 'Analyse PESTEL · Segmentation',
            desc: 'Le marché du "manger mieux" est en plein essor. Notre PESTEL révèle des opportunités claires (taxe sucre, tendance healthy, essor du libre-service) et des défis à anticiper (perception prix, dépendance aux distributeurs, normes hygiène). Notre cible prioritaire : étudiants et jeunes actifs de Haute-Normandie.',
          },
          {
            num: '04', titre: 'Statut juridique', sous: 'SARL',
            desc: 'Nous avons opté pour la SARL, statut adapté à un groupe de 4 associées. Il offre une répartition claire des rôles, une prise de décision structurée et une image solide auprès des partenaires financiers — indispensable pour un projet dans la restauration.',
          },
          {
            num: '05', titre: 'Financement', sous: 'Budget · Prévisions sur 3 ans',
            desc: 'Budget de fonctionnement estimé à 12 990 €/mois (charges fixes + variables). Chiffre d\'affaires prévisionnel : 22 700 €/mois, soit un bénéfice potentiel de ~6 700 €/mois (29% du CA). Seuil de rentabilité : 10 057 €/mois. Montage financier : apport personnel (10 000 €) + subvention régionale + prêt bancaire.',
          },
          {
            num: '06', titre: 'Gouvernance & Partenariats', sous: 'Organisation · Parties prenantes',
            desc: 'L\'entreprise est pilotée par les 4 fondatrices avec des rôles complémentaires et définis. Parties prenantes clés : producteurs locaux pour garantir la fraîcheur, organisateurs d\'événements pour des prestations externes, plateformes de livraison à l\'avenir, et expert-comptable.',
          },
          {
            num: '07', titre: 'Marketing & Communication', sous: 'Personas · Canaux',
            desc: 'Persona cible : personne soucieuse de sa santé, aimant se faire plaisir, attachée aux valeurs naturelles. Canaux activés : réseaux sociaux (posts, reels, jeux concours), flyers dans salles de sport / universités / primeurs, communication OOH (mobilier urbain à Évreux), dégustations en coffee shop.',
          },
        ].map((etape, i) => (
          <div key={i} className="bg-white rounded-[24px] p-6 border flex gap-5 items-start" style={{ borderColor: '#FFF9C4' }}>
            <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm" style={{ background: '#FFF9C4', color: '#FF69B4' }}>{etape.num}</div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <h4 className="font-bold" style={{ color: '#1A202C' }}>{etape.titre}</h4>
                <span className="text-xs italic" style={{ color: '#FF69B4' }}>{etape.sous}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.75 }}>{etape.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Dossier complet */}
    <div className="space-y-4">
      <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Dossier complet</h3>
      <a href="/preuves/projet-transverse/dossier-sweety-cake.pdf" target="_blank" rel="noopener noreferrer"
        className="bg-white rounded-[30px] p-8 border transition-all hover:shadow-xl hover:-translate-y-1 space-y-4 flex items-center gap-6"
        style={{ borderColor: '#FFF9C4', textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#FF69B4'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#FFF9C4'}>
        <div className="p-4 rounded-2xl shrink-0" style={{ background: '#FFF9C4' }}>
          <FileText size={32} style={{ color: '#FF69B4' }} />
        </div>
        <div className="space-y-1 flex-1">
          <h4 className="text-lg font-bold" style={{ color: '#1A202C' }}>Rapport Sweety Cake — Jeunes Pousses 2025–2026</h4>
          <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Problème · Marché · Juridique · Finance · Gouvernance · Marketing</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest shrink-0" style={{ color: '#FF69B4' }}>
          Consulter <ArrowRight size={14} />
        </div>
      </a>
    </div>

  </div>
);

const PageStages = () => (
  <div className="space-y-12">

    {/* Header */}
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>BUT TC · Terrain & Expérience</p>
      <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mes Stages</h2>
      <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Des immersions professionnelles pour mettre en pratique, observer et grandir.</p>
    </div>

    {/* Stage principal — Wallis et Futuna */}
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Stage de 2ème année</h3>
        <div className="flex-1 h-px" style={{ background: '#FFB6C1' }} />
      </div>

      {/* Hero stage */}
      <div className="rounded-[40px] overflow-hidden border-2" style={{ borderColor: '#FFB6C1' }}>

        {/* Bandeau */}
        <div className="p-8 flex flex-col md:flex-row gap-6 items-center" style={{ background: 'linear-gradient(135deg, #FFB6C1 0%, #FFF9C4 100%)' }}>
          <div className="shrink-0 text-center" style={{ fontSize: '5rem', lineHeight: 1 }}>🌺</div>
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-3xl font-serif italic font-bold" style={{ color: '#1A202C' }}>Wallis et Futuna — La 1ère</h4>
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'white', color: '#FF69B4' }}>2026 · TC2</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.75 }}>
              Stage effectué au sein de <strong>La 1ère</strong>, la chaîne de France Télévisions présente dans les territoires
              d'outre-mer, à Wallis-et-Futuna — un territoire unique situé dans le Pacifique Sud.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Audiovisuel', 'Outre-mer', 'France Télévisions', 'Pacifique Sud'].map((t, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: 'white', color: '#1A202C' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="bg-white p-8 space-y-8">

          {/* Contexte */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Contexte</p>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>
              <em>À compléter — présentation de La 1ère Wallis-et-Futuna, contexte du stage, durée...</em>
            </p>
          </div>

          {/* Missions */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Mes missions</p>
            <div className="space-y-2">
              {['Mission 1 — à compléter', 'Mission 2 — à compléter', 'Mission 3 — à compléter'].map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: '#FF69B4' }} />
                  <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.5 }}>{m}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Compétences mobilisées</p>
            <div className="flex flex-wrap gap-2">
              {['À compléter', 'À compléter', 'À compléter'].map((c, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFF9C4', color: '#1A202C', opacity: 0.5 }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Ce que j'en retiens */}
          <div className="rounded-[20px] p-6 space-y-2" style={{ background: '#FFF9C4' }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Ce que j'en retiens</p>
            <p className="text-sm leading-relaxed italic" style={{ color: '#1A202C', opacity: 0.6 }}>
              À compléter — bilan personnel, apprentissages, ce que ce stage t'a apporté.
            </p>
          </div>

        </div>
      </div>
    </div>

    {/* Transition — Stage N1 Intersport */}
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Stage de 1ère année</h3>
        <div className="flex-1 h-px" style={{ background: '#FFB6C1' }} />
      </div>

      <div className="bg-white rounded-[30px] p-8 border flex flex-col md:flex-row gap-6 items-center"
        style={{ borderColor: '#FFF9C4' }}>
        <div className="shrink-0 text-center" style={{ fontSize: '4rem', lineHeight: 1 }}>🏃</div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Intersport — Guichainville</h4>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FFF9C4', color: '#FF69B4' }}>2024 · TC1</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.7 }}>
            Stage de première année effectué en <strong>vente</strong> au sein du magasin Intersport de Guichainville.
            Une première immersion dans le développement commercial et la relation client en point de vente.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Vente', 'Relation client', 'Commerce'].map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFB6C1', color: '#1A202C' }}>{t}</span>
            ))}
          </div>
        </div>
        <a href="/preuves/stages/diapo-intersport.pdf" target="_blank" rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm transition-all hover:shadow-md"
          style={{ borderColor: '#FF69B4', color: '#FF69B4', textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FF69B4'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF69B4'; }}>
          <FileText size={16} /> Voir la diapo
        </a>
      </div>
    </div>

  </div>
);

const PageSAE = () => (
  <div className="space-y-12">

    {/* Header */}
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>BUT TC · Semestres 3 & 4</p>
      <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mes SAE</h2>
      <p className="text-sm italic" style={{ color: '#1A202C', opacity: 0.55 }}>Situations d'Apprentissage et d'Évaluation — des projets concrets pour ancrer les compétences.</p>
    </div>

    {/* Intro */}
    <div className="bg-white rounded-[30px] p-8 border" style={{ borderColor: '#FFF9C4' }}>
      <p className="text-base leading-relaxed" style={{ color: '#1A202C', opacity: 0.8 }}>
        Les SAE sont au cœur du BUT TC : elles nous plongent dans des situations professionnelles réelles où l'on doit
        mobiliser toutes nos compétences — marketing, commercial, communication, digital — pour répondre à une problématique concrète.
        En deux ans, j'ai mené <strong>quatre SAE</strong> qui m'ont permis de progresser à la fois
        sur le fond et sur la forme.
      </p>
    </div>

    {/* Semestre 3 */}
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Semestre 3</h3>
        <div className="flex-1 h-px" style={{ background: '#FFB6C1' }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SAE S3 - 1 */}
        <div className="bg-white rounded-[30px] p-8 border space-y-5" style={{ borderColor: '#FFF9C4' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="p-4 rounded-2xl" style={{ background: '#FFF9C4' }}>
              <span style={{ fontSize: '2rem' }}>💡</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FFF9C4', color: '#FF69B4' }}>S3</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Création d'entreprise</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.65 }}>
              Concevoir et formaliser un projet entrepreneurial de A à Z — étude de marché, modèle économique, stratégie et pitch.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Entrepreneuriat', 'Étude de marché', 'Business plan'].map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFB6C1', color: '#1A202C' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* SAE S3 - 2 */}
        <div className="bg-white rounded-[30px] p-8 border space-y-5" style={{ borderColor: '#FFF9C4' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="p-4 rounded-2xl" style={{ background: '#FFF9C4' }}>
              <span style={{ fontSize: '2rem' }}>📊</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FFF9C4', color: '#FF69B4' }}>S3</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Analyse d'une activité digitale</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.65 }}>
              Auditer la présence digitale d'une organisation, identifier ses forces et ses axes d'amélioration sur les canaux numériques.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Marketing digital', 'Audit', 'Réseaux sociaux'].map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFB6C1', color: '#1A202C' }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>

    {/* Semestre 4 */}
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-serif italic" style={{ color: '#FF69B4' }}>✦ Semestre 4</h3>
        <div className="flex-1 h-px" style={{ background: '#FFB6C1' }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* SAE S4 - 1 */}
        <div className="bg-white rounded-[30px] p-8 border space-y-5" style={{ borderColor: '#FFF9C4' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="p-4 rounded-2xl" style={{ background: '#FFF9C4' }}>
              <span style={{ fontSize: '2rem' }}>📈</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FFF9C4', color: '#FF69B4' }}>S4</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Pilotage commercial d'une organisation</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.65 }}>
              Analyser et piloter la performance commerciale d'une structure — objectifs, indicateurs, plan d'action et recommandations stratégiques.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Stratégie commerciale', 'KPIs', 'Analyse'].map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFB6C1', color: '#1A202C' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* SAE S4 - 2 */}
        <div className="bg-white rounded-[30px] p-8 border space-y-5" style={{ borderColor: '#FFF9C4' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="p-4 rounded-2xl" style={{ background: '#FFF9C4' }}>
              <span style={{ fontSize: '2rem' }}>💻</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FFF9C4', color: '#FF69B4' }}>S4</span>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold font-serif italic" style={{ color: '#1A202C' }}>Création d'un site web</h4>
            <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.65 }}>
              Concevoir et développer un site web fonctionnel — de la définition du besoin à la mise en ligne, en passant par le design et le contenu.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Web', 'Design', 'Contenu'].map((t, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: '#FFB6C1', color: '#1A202C' }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>

  </div>
);

const PagePlaceholder = ({ title }) => (
  <div className="space-y-8">
    <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>{title}</h2>
    <div className="bg-white p-16 text-center rounded-[40px] shadow-sm border" style={{ borderColor: '#FFF9C4' }}>
      <Layers size={48} className="mx-auto mb-4" style={{ color: '#1A202C', opacity: 0.1 }} />
      <p className="text-lg font-medium" style={{ color: '#1A202C' }}>Contenu en cours de redaction</p>
      <p className="text-sm italic mt-2" style={{ color: '#1A202C', opacity: 0.4 }}>Decouvrez bientot mes realisations dans cette section.</p>
    </div>
  </div>
);
const PageMentionsLegales = ({ setActivePage }) => (
  <div className="max-w-2xl mx-auto space-y-8">
    <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>
      Mentions légales
    </h2>
    <div className="p-10 rounded-[40px] space-y-6" style={{ background: '#FFF9C4' }}>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Éditrice du site</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>June Spotbeen — Étudiante en BUT Techniques de Commercialisation</p>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>IUT d'Évreux, 55 Rue Saint-Germain, 27000 Évreux</p>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Email : june.spotbeen@univ-rouen.fr</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Hébergeur</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Vercel Inc.</p>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>340 Pine Street, Suite 1500, San Francisco, CA 94104, USA</p>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Site : vercel.com</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Propriété intellectuelle</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>L'ensemble du contenu de ce site (textes, images, visuels) est la propriété exclusive de June Spotbeen. Toute reproduction sans autorisation est interdite.</p>
      </div>
      <div className="flex justify-center pt-4">
        <button onClick={() => setActivePage('accueil')}
          className="flex items-center gap-2 px-6 py-3 rounded-full border font-medium text-sm transition-all hover:shadow-md"
          style={{ borderColor: '#FF69B4', color: '#FF69B4' }}>
          <ArrowLeft size={16} /> Retour à la page d'acceuil
        </button>
      </div>
    </div>
  </div>
);

const PageRGPD = ({ setActivePage }) => (
  <div className="max-w-2xl mx-auto space-y-8">
    <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>
      Politique RGPD
    </h2>
    <div className="p-10 rounded-[40px] space-y-6" style={{ background: '#FFF9C4' }}>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Données collectées</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Ce site ne collecte aucune donnée personnelle. Aucun formulaire de contact n'est présent sur ce site.</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Utilisation des données</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Ces données sont utilisées uniquement pour répondre à vos demandes. Elles ne sont jamais transmises à des tiers ni utilisées à des fins commerciales.</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Vos droits</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez : june.spotbeen@univ-rouen.fr</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold" style={{ color: '#1A202C' }}>Cookies</h3>
        <p className="text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>Ce site n'utilise aucun cookie de traçage ou publicitaire.</p>
      </div>
      <div className="flex justify-center pt-4">
        <button onClick={() => setActivePage('accueil')}
          className="flex items-center gap-2 px-6 py-3 rounded-full border font-medium text-sm transition-all hover:shadow-md"
          style={{ borderColor: '#FF69B4', color: '#FF69B4' }}>
          <ArrowLeft size={16} /> Retour à la page d'acceuil
        </button>
      </div>
    </div>
  </div>
);
const PageContact = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <h2 className="text-3xl font-serif italic" style={{ color: '#1A202C' }}>Restons en contact</h2>

      <style>{`
        @keyframes letterRise {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(-60px); opacity: 1; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-6">
        <div className="relative cursor-pointer" style={{ width: '450px', height: '320px' }} onClick={() => setIsOpen(true)}>

          {/* Corps enveloppe blanc cassé */}
          <div className="absolute inset-0 rounded-2xl shadow-2xl" style={{
            background: 'linear-gradient(135deg, #f5f0e8 0%, #ede8dc 100%)',
            border: '1px solid #d4c9b0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)'
          }} />

          {/* Lignes diagonales enveloppe */}
          <div className="absolute inset-0 rounded-2xl" style={{
            background: 'linear-gradient(135deg, transparent 49%, #d4c9b0 49%, #d4c9b0 50%, transparent 50%), linear-gradient(225deg, transparent 49%, #d4c9b0 49%, #d4c9b0 50%, transparent 50%)',
          }} />

          {/* Rabat */}
          <div className="absolute top-0 left-0 right-0 rounded-t-2xl" style={{
            height: '160px',
            background: isOpen ? 'linear-gradient(135deg, #ede8dc, #e0d9cc)' : 'linear-gradient(135deg, #ede8dc, #d4c9b0)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
            transition: 'transform 0.7s ease',
            zIndex: isOpen ? 0 : 2,
            borderBottom: '1px solid #d4c9b0',
          }} />

          {/* Sceau */}
          {!isOpen && (
            <div className="absolute" style={{ top: '110px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
              <img src="/sceau.png" alt="sceau" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            </div>
          )}

          {/* Lettre */}
          {isOpen && (
            <div className="absolute left-8 right-8 rounded-xl p-6 text-left space-y-3"
              style={{
                background: 'linear-gradient(180deg, #fffef9 0%, #faf8f0 100%)',
                border: '1px solid #e8e0cc',
                top: '30px',
                animation: 'letterRise 0.6s ease forwards',
                zIndex: 1,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>Email</p>
              <p className="text-sm font-serif" style={{ color: '#1A202C' }}>june.spotbeen@univ-rouen.fr</p>
              <div className="flex justify-center mt-2">
                <a href="mailto:june.spotbeen@univ-rouen.fr"
                  className="inline-block px-6 py-3 text-white rounded-full text-sm font-bold transition-all hover:shadow-lg hover:scale-105"
                  style={{ background: '#FF69B4' }}>
                  M'envoyer un message
                </a>
              </div>
              <p className="text-right mt-4 font-serif italic text-sm" style={{ color: '#1A202C', opacity: 0.7 }}>
                Merci d'avoir pris le temps de découvrir mon Portfolio, à bientôt —<br />
                <em style={{ fontSize: '1.1rem' }}>June</em>
              </p>
            </div>
          )}
        </div>
        {!isOpen && (
          <p className="text-xs italic" style={{ color: '#1A202C', opacity: 0.5 }}>Cliquez sur le sceau pour ouvrir ✦</p>
        )}
      </div>
    </div >
  );
};
const renderPage = (page, deps) => {
  const { setActivePage, setSelectedSkill, scrollContainerRef, scrollGallery } = deps;
  if (page === 'accueil') return <PageAccueil setActivePage={setActivePage} scrollContainerRef={scrollContainerRef} scrollGallery={scrollGallery} setSelectedSkill={setSelectedSkill} />;
  if (page === 'formation') return <PageFormation />;
  if (page === 'parcours') return <PageParcours />;
  if (page === 'contact') return <PageContact />;
  if (page === 'mentions-legales') return <PageMentionsLegales setActivePage={setActivePage} />;
  if (page === 'rgpd') return <PageRGPD setActivePage={setActivePage} />;
  if (COMPETENCES[page]) {
    const pages = ['marketing', 'vente', 'communication', 'mkt-digital', 'ebusiness'];
    const currentIndex = pages.indexOf(page);
    const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
    return <PageCompétences title={COMPETENCES[page].title} acs={COMPETENCES[page].acs} onSkillClick={setSelectedSkill} setActivePage={setActivePage} nextPage={nextPage} />;
  }
  if (page === 'projets') return <PageProjets setActivePage={setActivePage} />;
  if (page === 'competences-overview') return < PageCompetencesOverview setActivePage={setActivePage} />;
  const projectTitles = {
    sae: "SAE (Situations d'Apprentissage et d'Evaluation)",
    stages: 'Mes Stages',
    'projet-transverse': 'Projet Transverse',
    'ppp': 'PPP (Projet Personnel et Professionnel)',
  };
  if (page === 'ppp') return <PagePPP />;
  if (page === 'projet-transverse') return <PageProjetTransverse />;
  if (page === 'sae') return <PageSAE />;
  if (page === 'stages') return <PageStages />;
  if (projectTitles[page]) return <PagePlaceholder title={projectTitles[page]} />;
  return null;
};
const Sparkles = () => {
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: ['✦', '✧', '·'][Math.floor(Math.random() * 3)],
      };
      setParticles(prev => [...prev.slice(-15), newParticle]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 800);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      {particles.map(p => (
        <span key={p.id} style={{
          position: 'fixed',
          left: p.x,
          top: p.y,
          fontSize: `${Math.random() * 8 + 8}px`,
          color: '#FF69B4',
          animation: 'sparkle 0.8s ease-out forwards',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>{p.emoji}</span>
      ))}
    </div>
  );
};
const App = () => {
  React.useEffect(() => {
    const img = new Image();
    img.src = '/sceau.png';
  }, []);
  const [showCookieBanner, setShowCookieBanner] = React.useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('accueil');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [bonusOpen, setBonusOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const navigate = (item) => {
    if (item.isDownload) {
      window.open('/cv.pdf', '_blank');
    } else {
      setActivePage(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };
  React.useEffect(() => {
    setBonusOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, [activePage]);
  const scrollGallery = (dir) => {
    scrollContainerRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const pageIsActive = (nav) =>
    activePage === nav.id || (nav.items && nav.items.some((i) => i.id === activePage));

  return (
    <div id="app-root" className="min-h-screen font-serif flex flex-col" style={{ background: "url('/wallpaper.jpg') repeat", color: '#1A202C', overflowY: 'auto' }}>
      <style>{`
      @keyframes gentlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
  @keyframes sparkle {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0) translateY(-20px); }
}
        @keyframes scaleIn { from { transform: scale(.94); opacity:0 } to { transform: scale(1); opacity:1 } }
        .no-scrollbar::-webkit-scrollbar { display:none }
        .no-scrollbar { scrollbar-width:none; -ms-overflow-style:none }
      `}</style>
      <Sparkles />
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] flex items-center justify-between gap-4 px-6 py-4 shadow-lg"
          style={{ background: '#FFF9C4', borderTop: '2px solid #FF69B4' }}>
          <p className="text-xs" style={{ color: '#1A202C' }}>
            Ce site n'utilise aucun cookie de traçage ou publicitaire. Pour en savoir plus,{' '}
            <button onClick={() => { setActivePage('rgpd'); setShowCookieBanner(false); }}
              className="underline font-bold transition-opacity hover:opacity-70"
              style={{ color: '#FF69B4' }}>
              cliquez ici
            </button>
          </p>
          <button onClick={() => setShowCookieBanner(false)}
            className="p-1 rounded-full hover:bg-[#FFB6C1] transition-colors flex-shrink-0"
            style={{ color: '#1A202C' }}>
            <X size={16} />
          </button>
        </div>
      )}
      <ModalSkill skill={selectedSkill} onClose={() => setSelectedSkill(null)} />

      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
      `}</style>

      {/* Modal bonus */}
      {bonusOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)' }}
          onClick={() => setBonusOpen(false)}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: '#fffef9', border: '1px solid #e8e0cc', borderRadius: '4px', padding: '1.5rem', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.2), 4px 4px 0 #FF69B4' }}>
            <div style={{ width: '2px', height: '30px', background: '#FF69B4', margin: '0 auto 1rem' }} />
            <div className="w-4 h-4 rounded-full mx-auto mb-4" style={{ background: '#FF69B4' }} />
            <div style={{ background: 'white', padding: '8px 8px 40px 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transform: 'rotate(-2deg)', marginBottom: '1.2rem' }}>
              <img src="/enfant.jpg" alt="June enfant" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
            </div>
            <p className="text-sm leading-relaxed text-center" style={{ color: '#1A202C', fontStyle: 'italic' }}>
              Ayant grandi dans un restaurant familial pendant 10 ans, j'ai acquis les connaissances nécessaires à la restauration.
            </p>
            <p className="text-sm leading-relaxed text-center mt-3" style={{ color: '#1A202C', fontStyle: 'italic' }}>
              De plus, en tant que tante de trois jeunes enfants, je peux m'occuper d'enfants de 0 à 7 ans.
            </p>
            <button onClick={() => setBonusOpen(false)} className="mt-4 text-xs font-bold uppercase tracking-widest block mx-auto" style={{ color: '#FF69B4' }}>
              Fermer
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderColor: '#FFF9C4', overflow: 'visible' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button className="flex-shrink-0" onClick={() => { setActivePage('accueil'); setActiveDropdown(null); }}>
              <h1 className="text-2xl font-bold italic tracking-tight" style={{ color: '#1A202C' }}>
                June Spotbeen<span style={{ color: '#FF69B4' }}>.</span>
              </h1>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {NAVIGATION.map((nav, idx) => (
                <div key={idx} className="relative">
                  <button
                    onClick={() => nav.items ? setActiveDropdown(activeDropdown === idx ? null : idx) : navigate(nav)}
                    onDoubleClick={() => {
                      if (nav.id === 'qui-suis-je') { setActivePage('accueil'); setTimeout(() => document.getElementById('qui-suis-je')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); }
                      if (nav.id === 'projets') setActivePage('projets');
                      if (nav.id === 'compétences') setActivePage('competences-overview');
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors hover:bg-[#FFF9C4]"
                    style={{ color: pageIsActive(nav) ? '#FF69B4' : '#1A202C' }}>
                    {nav.title}
                    {nav.items && (
                      <ChevronDown size={14} style={{ transform: activeDropdown === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    )}
                  </button>
                  {nav.items && activeDropdown === idx && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-3xl shadow-xl border overflow-hidden" style={{ borderColor: '#FFF9C4' }}>
                      <div className="py-2">
                        {nav.items.map((item, ii) => (
                          <button key={ii} onClick={() => navigate(item)}
                            className="flex items-center justify-between w-full px-6 py-4 text-sm text-left transition-colors hover:bg-[#FFF9C4]"
                            style={{ color: '#1A202C' }}>
                            <div className="flex items-center gap-3">
                              <span style={{ color: '#FF69B4' }}>{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                            {item.isDownload && <Download size={14} style={{ color: '#1A202C', opacity: 0.4 }} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: '#1A202C' }}>
              <div className="w-6 h-0.5 bg-current mb-1.5" style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none', transition: 'transform 0.2s' }} />
              <div className="w-6 h-0.5 bg-current mb-1.5" style={{ opacity: isMobileMenuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <div className="w-6 h-0.5 bg-current" style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t px-6 py-8 space-y-8 overflow-y-auto" style={{ background: '#FFFFFF', borderColor: '#FFF9C4', maxHeight: '80vh' }}>
            {NAVIGATION.map((nav, idx) => (
              <div key={idx} className="space-y-4">
                <div className="font-bold flex items-center gap-3 text-lg cursor-pointer" style={{ color: '#1A202C' }}
                  onClick={() => !nav.items && navigate(nav)}>
                  <span style={{ color: '#FF69B4' }}>{nav.icon}</span>
                  <span>{nav.title}</span>
                </div>
                {nav.items && (
                  <div className="pl-8 space-y-4 border-l-2" style={{ borderColor: '#FFF9C4' }}>
                    {nav.items.map((item, ii) => (
                      <button key={ii} onClick={() => navigate(item)}
                        className="flex items-center justify-between w-full text-sm font-medium"
                        style={{ color: '#1A202C', opacity: 0.7 }}>
                        <span>{item.label}</span>
                        {item.isDownload && <Download size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Étiquette BONUS — accrochée sous le header quand on est sur Mon Parcours */}
        {activePage === 'parcours' && (
          <div style={{ position: 'absolute', top: '100%', right: '20px', zIndex: 49, cursor: 'pointer' }}
            onClick={() => setBonusOpen(true)}>
            <div style={{ transformOrigin: 'top center', animation: 'swing 2s ease-in-out infinite' }}>
              <div style={{ width: '2px', height: '30px', background: '#FF69B4', margin: '0 auto' }} />
              <div className="rounded-xl px-4 py-3 shadow-lg text-center"
                style={{ background: '#FFF9C4', border: '2px solid #FF69B4', minWidth: '80px' }}>
                <span className="text-sm font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>BONUS</span>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {renderPage(activePage, { setActivePage, setSelectedSkill, scrollContainerRef, scrollGallery })}
        </div>
      </main>

      <footer className="border-t" style={{ background: '#FFB6C1', borderColor: '#FFB6C1' }}>
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="text-left space-y-2">
            <h4 className="font-bold text-lg" style={{ color: '#1A202C' }}>June Spotbeen</h4>
            <p className="text-xs italic" style={{ color: '#1A202C', opacity: 0.55 }}>IUT d'Évreux — Techniques de commercialisation</p>
            <p className="text-xs" style={{ color: '#1A202C', opacity: 0.55 }}>55 Rue Saint-Germain, 27000 Évreux</p>
            <p className="text-xs" style={{ color: '#1A202C', opacity: 0.55 }}>02 32 29 15 00</p>
          </div>

          <div className="flex gap-4 text-xs">
            <button onClick={() => setActivePage('mentions-legales')} className="font-bold transition-colors hover:opacity-80" style={{ color: '#FFFFFF' }}>Mentions légales</button>
            <span style={{ color: '#FFFFFF', opacity: 0.3 }}>•</span>
            <button onClick={() => setActivePage('rgpd')} className="font-bold transition-colors hover:opacity-80" style={{ color: '#FFFFFF' }}>Politique RGPD</button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: '#1A202C' }}>Suivez-moi<br />sur LinkedIn</p>
            <a href="https://www.linkedin.com/in/june-spotbeen-2a4317405/" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border flex items-center justify-center shadow-sm transition-all hover:bg-[#FFF9C4]"
              style={{ background: '#FFFFFF', borderColor: '#FFF9C4', color: '#0077B5' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

        </div>
      </footer>

      {activeDropdown !== null && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
      )}
    </div>
  );
};

export default App;
