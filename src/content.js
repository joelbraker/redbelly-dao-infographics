// Copy for the 11 plates. Every line is traceable to the sources listed per plate (full list: SOURCES.md,
// verbatim quotes: src/facts.js, checked by verify.js). Edit text here; layout and diagrams pick it up automatically.
// *word* = highlighted in brand red. Keep notes short: check.js fails any plate whose text no longer fits.

window.SERIES = {
  name: 'Redbelly Explained',
  total: 11,
};

window.PLATES = [
  {
    id: '01', fig: 'Three layers, one network', slug: 'what-is-redbelly', kicker: 'The basics',
    title: 'A blockchain built for *real-world* assets',
    lede: 'Redbelly Network is a layer 1 blockchain built for turning real-world assets into digital tokens.',
    notes: [
      'Born from University of Sydney and CSIRO research.',
      'An identity layer means everyone is known.',
      'DBFT consensus: no forks and near-instant finality.',
    ],
    source: 'docs.redbelly.network · redbelly.network/whitepaper · tokeniser.com',
  },
  {
    id: '02', fig: 'Settlement, before and after', slug: 'why-tokenise', kicker: 'Real world assets',
    title: 'Why turn assets into *tokens*?',
    lede: 'Tokenisation records ownership as a digital token, with the asset’s rules programmed in.',
    notes: [
      'A corporate bond trade: 2–4 business days to settle.',
      'On one ledger, asset and payment swap at once.',
      'Markets can run 24/7, with fewer middlemen.',
    ],
    source: 'tokeniser.com · redbelly.network/asset-tokenisation · TASK-07 Acacia deep dive',
  },
  {
    id: '03', fig: 'Who decides the next block', slug: 'dbft-consensus', kicker: 'DBFT consensus',
    title: 'Agreement *without a leader*',
    lede: 'Consensus is how computers on a network agree. Redbelly’s is DBFT: Democratic Byzantine Fault Tolerance.',
    notes: [
      'No leader: nodes propose and decide together.',
      'No forks: only ever one version of the record.',
      'Final in one round. Safe if under 1/3 misbehave.',
    ],
    source: 'redbelly.network/research · redbelly.network/whitepaper · tokeniser.com/technology',
  },
  {
    id: '04', fig: 'The identity check', slug: 'receptor', kicker: 'Receptor',
    title: 'Receptor checks *who is who*',
    lede: 'Receptor is Redbelly’s own digital identity and verifiable credential protocol.',
    notes: [
      'It checks participants are who they say they are.',
      'Apps set who is eligible. Users prove they qualify.',
      'Issuers giving network access must be accredited.',
    ],
    source: 'docs.redbelly.network/pages/receptor',
  },
  {
    id: '05', fig: 'Who handles a credential', slug: 'verifiable-credentials', kicker: 'Verifiable credentials',
    title: 'A digital proof *you keep*',
    lede: 'A verifiable credential is a signed digital record about you, like proof of address.',
    notes: [
      'An issuer signs it. You keep it. A verifier checks it.',
      'Reusable: verify once, then use it across products.',
      'Built on the open W3C verifiable credential model.',
    ],
    source: 'docs.redbelly.network (Receptor, Eligibility SDK) · redbelly.network/asset-tokenisation',
  },
  {
    id: '06', fig: 'A yes or no, with no data', slug: 'zk-proofs', kicker: 'Zero-knowledge proofs',
    title: 'Prove it *without showing it*',
    lede: 'A zero-knowledge proof shows something is true without revealing the data behind it.',
    notes: [
      'Prove you’re over 18 without showing your birth date.',
      'A smart contract checks it on-chain: true or false.',
      'Selective disclosure is different: it shows some fields.',
    ],
    source: 'docs.redbelly.network: Selective disclosure vs zero knowledge · Proof by Query',
  },
  {
    id: '07', fig: 'The Tokeniser stack', slug: 'tokeniser', kicker: 'Tokeniser',
    title: 'Tokenisation without the *tech project*',
    lede: 'Tokeniser is a Redbelly Network project that helps funds and companies tokenise assets.',
    notes: [
      'Familiar software for fund admin and investor portals.',
      'One platform from issuance to settlement.',
      'Start in stages and keep workflows such as AML/KYC.',
    ],
    source: 'tokeniser.com · tokeniser.com/technology',
  },
  {
    id: '08', fig: 'A trade, checked first', slug: 'compliance-aware-assets', kicker: 'Compliance aware assets',
    title: 'Assets that *know the rules*',
    lede: 'An asset’s eligibility rules can be built in, and enforced at the point of trade.',
    notes: [
      'Identity, eligibility and limits are checked first.',
      'A failed check stops the trade. Every check is logged.',
      'Manual checks often find breaches after the trade.',
    ],
    source: 'tokeniser.com (Automated compliance) · redbelly.network/asset-tokenisation',
  },
  {
    id: '09', fig: 'Accountability at two levels', slug: 'identity-and-accountability', kicker: 'Identity and accountability',
    title: 'Known people, *accountable* network',
    lede: 'Redbelly is designed for accountability, enforced at two levels.',
    notes: [
      'Polygraph builds proof if honest nodes disagree.',
      'The proof names at least 1/3 of nodes as responsible.',
      'An identity layer means all participants are known.',
    ],
    source: 'redbelly.network/whitepaper · redbelly.network/research (Polygraph paper)',
  },
  {
    id: '10', fig: 'One vote, start to finish', slug: 'governance', kicker: 'Governance',
    title: 'How the DAO *decides today*',
    lede: 'The Redbelly Community DAO votes on its own platform, not Snapshot. Only verified wallets vote.',
    notes: [
      'Voting is free: sign a message, no gas or approvals.',
      'A proposal can require a minimum of verified voters.',
      'Elected High Council, five pods, 3+ treasury approvals.',
    ],
    source: 'redbelly-governance.vercel.app · TASK-23 changelog (what is in force)',
  },
  {
    id: '11', fig: 'The Acacia timeline', slug: 'project-acacia', kicker: 'Project Acacia',
    title: 'Central bank money on a *public* chain',
    lede: 'Project Acacia is the Reserve Bank of Australia’s pilot of tokenised money and assets in wholesale markets.',
    notes: [
      'July 2025: selected for Phase 2, with real money.',
      'The only public chain of 3 to carry pilot wholesale CBDC.',
      'Tokenised bond issued and resold in under 4 minutes.',
    ],
    source: 'redbelly.network/projectacacia · TASK-07 Project Acacia deep dive',
  },
];
