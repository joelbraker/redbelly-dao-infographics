// Copy for the 11 plates. Every line is traceable to the sources listed per plate (full list: SOURCES.md).
// Edit text here; layout and diagrams pick it up automatically.
// *word* = highlighted in brand red.

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
      'Born from research at the University of Sydney and CSIRO.',
      'An identity layer means everyone on the network is known.',
      'DBFT consensus: no forks and near-instant finality.',
    ],
    source: 'docs.redbelly.network · redbelly.network/whitepaper · redbelly.network',
  },
  {
    id: '02', fig: 'Settlement, before and after', slug: 'why-tokenise', kicker: 'Real world assets',
    title: 'Why turn assets into *tokens*?',
    lede: 'Tokenisation records ownership as a digital token, with the asset’s rules programmed in.',
    notes: [
      'Today a corporate bond trade can take 2–4 business days to settle.',
      'On one ledger, the asset and the payment swap in a single transaction.',
      'Markets can run 24/7, with fewer middlemen and less manual checking.',
    ],
    source: 'tokeniser.com · redbelly.network/asset-tokenisation · TASK-07 Acacia deep dive',
  },
  {
    id: '03', fig: 'Who proposes the next block', slug: 'dbft-consensus', kicker: 'DBFT consensus',
    title: 'Agreement *without a leader*',
    lede: 'Consensus is how computers on a network agree. Redbelly’s is DBFT: Democratic Byzantine Fault Tolerance.',
    notes: [
      'No leader: nodes propose and decide together.',
      'No forks: there is only ever one version of the record.',
      'Final in one round. Still safe if under a third of nodes misbehave.',
    ],
    source: 'redbelly.network/research · redbelly.network/whitepaper · tokeniser.com/technology',
  },
  {
    id: '04', fig: 'The identity check', slug: 'receptor', kicker: 'Receptor',
    title: 'Receptor checks *who is who*',
    lede: 'Receptor is Redbelly’s own digital identity and verifiable credential protocol.',
    notes: [
      'It checks that everyone on the network is who they say they are.',
      'Apps set who is eligible for a product. Users prove they qualify.',
      'Only accredited issuers can give out credentials for network access.',
    ],
    source: 'docs.redbelly.network/pages/receptor',
  },
  {
    id: '05', fig: 'Who handles a credential', slug: 'verifiable-credentials', kicker: 'Verifiable credentials',
    title: 'A digital proof *you keep*',
    lede: 'A verifiable credential is a signed digital record about you, like proof of address.',
    notes: [
      'An issuer signs it. You keep it. A verifier checks it is genuine.',
      'Reusable: verify once, then use it again across products.',
      'Built on the open W3C verifiable credential standard.',
    ],
    source: 'docs.redbelly.network (Receptor, Eligibility Kit) · redbelly.network/asset-tokenisation',
  },
  {
    id: '06', fig: 'A yes or no, with no data', slug: 'zk-proofs', kicker: 'Zero-knowledge proofs',
    title: 'Prove it *without showing it*',
    lede: 'A zero-knowledge proof shows something is true without revealing the data behind it.',
    notes: [
      'Asked “Over 18?”, your wallet sends a proof. Your birth date stays hidden.',
      'A smart contract can check the proof on-chain: just true or false.',
      'Selective disclosure differs: it reveals only the fields asked for.',
    ],
    source: 'docs.redbelly.network: Selective disclosure vs zero knowledge · Proof by Query',
  },
  {
    id: '07', fig: 'The Tokeniser stack', slug: 'tokeniser', kicker: 'Tokeniser',
    title: 'Tokenisation without the *tech project*',
    lede: 'Tokeniser is a Redbelly Network project that helps funds and companies tokenise assets.',
    notes: [
      'Familiar software for fund admin and investor portals.',
      'One platform from issuance to settlement, on Redbelly Network.',
      'Start in stages and keep existing workflows, like AML/KYC.',
    ],
    source: 'tokeniser.com · tokeniser.com/technology',
  },
  {
    id: '08', fig: 'A trade, checked first', slug: 'compliance-aware-assets', kicker: 'Compliance aware assets',
    title: 'Assets that *know the rules*',
    lede: 'An asset’s eligibility rules can be built in, and checked at the moment of trade.',
    notes: [
      'Identity, eligibility (like wholesale status) and limits are checked first.',
      'A trade that fails a check does not go through. Each check is logged.',
      'Today these checks are often manual, and breaches show up after the trade.',
    ],
    source: 'tokeniser.com (Automated compliance) · redbelly.network/asset-tokenisation',
  },
  {
    id: '09', fig: 'Accountability at two levels', slug: 'identity-and-accountability', kicker: 'Identity and accountability',
    title: 'Known people, *accountable* network',
    lede: 'Redbelly is designed around accountability, enforced at two levels.',
    notes: [
      'Protocol: Polygraph creates undeniable proof if a node cheats.',
      'Participants: an identity layer means everyone is known.',
      'Privacy: zero-knowledge proofs show eligibility, not personal data.',
    ],
    source: 'redbelly.network/whitepaper · redbelly.network/research · redbelly.network/projectacacia',
  },
  {
    id: '10', fig: 'One vote, start to finish', slug: 'governance', kicker: 'Governance',
    title: 'How the DAO *decides today*',
    lede: 'The Redbelly Community DAO votes on its own platform, not Snapshot. Only verified wallets vote.',
    notes: [
      'Voting is free. You sign a message: no gas, no token approvals.',
      'A proposal can require a minimum number of verified voters, not just tokens.',
      'An elected High Council and five pods. Treasury transactions need 3+ multisig approvals.',
    ],
    source: 'redbelly-governance.vercel.app · TASK-23 changelog (what is in force)',
  },
  {
    id: '11', fig: 'The Acacia timeline', slug: 'project-acacia', kicker: 'Project Acacia',
    title: 'Central bank money on a *public* chain',
    lede: 'Project Acacia is the Reserve Bank of Australia’s pilot on digital money for wholesale markets.',
    notes: [
      'July 2025: Redbelly selected for Phase 2, using real money and assets.',
      'The RBA put pilot wholesale CBDC on 3 networks. Redbelly was the only public one.',
      'A tokenised bond was issued and resold in under 4 minutes, vs up to 4 days.',
    ],
    source: 'redbelly.network/projectacacia · TASK-07 Project Acacia deep dive',
  },
];
