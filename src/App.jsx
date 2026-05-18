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
  if (skill === 'GALLERY_0') return <GalleryModal src="/une.png" desc="Description à compléter" onClose={onClose} />;
  if (skill === 'GALLERY_1') return <GalleryModal src="/deux.png" desc="Description à compléter" onClose={onClose} />;
  if (skill === 'GALLERY_2') return <GalleryModal src="/trois.png" desc="Description à compléter" onClose={onClose} />;
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
  const handleClose = () => { setView('info'); onClose(); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)' }}>
      <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border"
        style={{ borderColor: '#FFF9C4', animation: 'scaleIn .25s ease' }}>
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-2xl" style={{ background: '#FFF9C4', color: '#FF69B4' }}>
              {view === 'info' ? <Info size={24} /> : <ImageIcon size={24} />}
            </div>
            <button onClick={handleClose} className="p-2 rounded-full transition-colors hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          {view === 'info' ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#FF69B4' }}>
                  Details de l'apprentissage
                </span>
                <h3 className="text-2xl font-serif font-bold leading-snug" style={{ color: '#1A202C' }}>{skill}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1A202C', opacity: 0.65 }}>
                  {AC_EXPLANATIONS[skill] || "Cette compétence a été acquise et validée à travers des travaux dirigés, des projets concrets (SAE) et des mises en situation professionnelle durant mon BUT Techniques de Commercialisation."}
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
          { src: '/une.png', desc: 'Description à compléter' },
          { src: '/deux.png', desc: 'Description à compléter' },
          { src: '/trois.png', desc: 'Description à compléter' },
          null, null, null, null, null
        ].map((item, i) => (
          <div key={i} className="flex-none w-[320px] aspect-video rounded-2xl overflow-hidden relative shadow-sm border border-white snap-start cursor-pointer group transition-all duration-500"
            style={{ background: '#FFF9C4' }}
            onClick={() => item && setSelectedSkill('GALLERY_' + i)}>
            {item ? (
              <img src={item.src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
  const [bonusOpen, setBonusOpen] = React.useState(false);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mon Parcours</h2>
        <style>{`
    @keyframes swing {
      0%, 100% { transform: rotate(-8deg); }
      50% { transform: rotate(8deg); }
    }
  `}</style>
        <div style={{ transformOrigin: 'top center', animation: 'swing 2s ease-in-out infinite', cursor: 'pointer', position: 'fixed', top: '80px', right: '20px', zIndex: 49 }}
          onClick={() => setBonusOpen(true)}>
          <div style={{ width: '2px', height: '30px', background: '#FF69B4', margin: '0 auto' }} />
          <div className="rounded-xl px-4 py-3 shadow-lg text-center"
            style={{ background: '#FFF9C4', border: '2px solid #FF69B4', minWidth: '80px' }}>
            <span className="text-sm font-bold uppercase tracking-widest"
              style={{ color: '#FF69B4', animation: 'gentlePulse 2.5s ease-in-out infinite' }}>
              BONUS
            </span>
          </div>
        </div>
      </div>
      {bonusOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(6px)' }}
          onClick={() => setBonusOpen(false)}>
          <div onClick={e => e.stopPropagation()}
            style={{
              background: '#fffef9',
              border: '1px solid #e8e0cc',
              borderRadius: '4px',
              padding: '1.5rem',
              maxWidth: '420px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), 4px 4px 0 #FF69B4',
              position: 'relative',
            }}>
            {/* Fil de l'étiquette */}
            <div style={{ width: '2px', height: '30px', background: '#FF69B4', margin: '0 auto 1rem' }} />
            <div className="w-4 h-4 rounded-full mx-auto mb-4" style={{ background: '#FF69B4' }} />

            {/* Photo style carte postale */}
            <div style={{
              background: 'white',
              padding: '8px 8px 40px 8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transform: 'rotate(-2deg)',
              marginBottom: '1.2rem',
            }}>
              <img src="/enfant.jpg" alt="June enfant" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
            </div>

            <p className="text-sm leading-relaxed text-center" style={{ color: '#1A202C', fontStyle: 'italic' }}>
              Ayant grandi dans un restaurant familial pendant 10 ans, j'ai acquis les connaissances nécessaires à la restauration.
            </p>
            <p className="text-sm leading-relaxed text-center mt-3" style={{ color: '#1A202C', fontStyle: 'italic' }}>
              De plus, en tant que tante de trois jeunes enfants, je peux m'occuper d'enfants de 0 à 7 ans.
            </p>
            <button onClick={() => setBonusOpen(false)}
              className="mt-4 text-xs font-bold uppercase tracking-widest block mx-auto"
              style={{ color: '#FF69B4' }}>
              Fermer
            </button>
          </div>
        </div>
      )}
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
  <div className="space-y-8">
    <h2 className="text-4xl font-serif italic border-b-2 pb-2 inline-block" style={{ color: '#1A202C', borderColor: '#FF69B4' }}>Mes Projets</h2>
    <style>{`
      @keyframes scrollDiamonds {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>

    <div className="overflow-hidden" style={{ padding: '60px 0' }}>
      <div className="flex gap-12 items-center" style={{ animation: 'scrollDiamonds 20s linear infinite', width: 'max-content' }}>
        {[...Array(2)].map((_, repeat) => (
          [
            { id: 'sae', label: 'SAE', icon: <Presentation size={28} />, color: '#FF69B4', bg: '#FFF9C4' },
            { id: 'stages', label: 'Stages', icon: <Building2 size={28} />, color: '#FF69B4', bg: '#FFB6C1' },
            { id: 'projet-transverse', label: 'Projet Transverse', icon: <Target size={28} />, color: '#FF69B4', bg: '#FFF9C4' },
            { id: 'ppp', label: 'PPP', icon: <Star size={28} />, color: '#FF69B4', bg: '#FFB6C1' },
          ].map((projet, i) => (
            <div
              key={`${repeat}-${i}`}
              onClick={() => setActivePage(projet.id)}
              className="cursor-pointer transition-all duration-500 hover:z-10"
              style={{
                width: '160px',
                height: '160px',
                background: projet.bg,
                transform: 'rotate(45deg)',
                border: `3px solid ${projet.color}`,
                boxShadow: '0 4px 20px rgba(255,105,180,0.2)',
                flexShrink: 0,
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(45deg) scale(1.3)'; e.currentTarget.style.zIndex = '10'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(45deg) scale(1)'; e.currentTarget.style.zIndex = '1'; }}
            >
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                textAlign: 'center',
                width: '120px',
              }}>
                <div style={{ color: projet.color, display: 'flex', justifyContent: 'center' }}>{projet.icon}</div>
                <p className="text-xs font-bold mt-2" style={{ color: '#1A202C' }}>{projet.label}</p>
              </div>
            </div>
          ))
        ))}
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
const PageMentionsLegales = () => (
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
    </div>
  </div>
);

const PageRGPD = () => (
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
  if (page === 'mentions-legales') return <PageMentionsLegales />;
  if (page === 'rgpd') return <PageRGPD />;
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

      <header className="sticky top-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderColor: '#FFF9C4' }}>
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
