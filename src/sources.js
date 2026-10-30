// Full source list per plate: which fact comes from where. Used by the website and to build SOURCES.md.
// Verbatim quotes for every line are in src/facts.js; verify.js checks the two stay in step.
window.SOURCES = {
  '01': [
    ['Layer 1 blockchain built and optimised for real world asset tokenisation', 'https://docs.redbelly.network'],
    ['DBFT consensus developed with The University of Sydney and CSIRO’s Data61; impossibility of forking; near-instant finality; identity layer ensures all network participants are known', 'https://redbelly.network/whitepaper'],
    ['Born from research at the University of Sydney and CSIRO', 'https://tokeniser.com'],
    ['Asset types: treasuries & bonds, private credit, carbon credits', 'https://redbelly.network'],
  ],
  '02': [
    ['Tokenisation records ownership as digital tokens and lets you program the rules of the asset', 'https://tokeniser.com'],
    ['Borderless 24/7 markets; lower intermediaries', 'https://redbelly.network/asset-tokenisation'],
    ['A corporate bond trade can take two to four business days to settle; asset and payment on one ledger swap in a single atomic transaction (§1.2)', 'https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project'],
  ],
  '03': [
    ['DBFT: leaderless Byzantine consensus (Democratic Byzantine Fault Tolerance)', 'https://redbelly.network/research'],
    ['Each node plays a similar role, so the decision is “democratic”', 'https://redbelly.network/research/dbft-ef-cient-leaderless-byzantine-consensus'],
    ['Consensus on a block despite Byzantine participants; verified for any f < n/3 Byzantine processes', 'https://redbelly.network/research/holistic-verification-of-blockchain-consensus'],
    ['Impossibility of forking', 'https://redbelly.network/whitepaper'],
    ['Settlement that completes in a single round', 'https://tokeniser.com/technology'],
  ],
  '04': [
    ['Receptor: native digital identity and verifiable credential protocol; participants are who they say they are; eligibility criteria; issuers who provide network access are accredited', 'https://docs.redbelly.network/pages/receptor/'],
  ],
  '05': [
    ['W3C verifiable credential data model; Issuer, Holder and Verifier modules', 'https://docs.redbelly.network/pages/receptor/'],
    ['Disclosed data comes with a cryptographic signature the verifier checks', 'https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/'],
    ['Credential types such as ProofOfAddressCredential', 'https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/'],
    ['Reusable identity and KYC credentials reduce duplication', 'https://redbelly.network/asset-tokenisation'],
  ],
  '06': [
    ['Proof by Query (zero knowledge): prove a statement without revealing data; “Is the user over 18?”; smart contract verifies on-chain, result “true” or “false”; selective disclosure reveals only specific fields', 'https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/'],
    ['Proof of age without disclosing the date of birth', 'https://docs.redbelly.network/pages/methods/proof-by-query/'],
  ],
  '07': [
    ['Tokeniser is a Redbelly Network project; built for funds and companies; SaaS for fund administration and investor portals; one platform from issuance to settlement; staged onboarding, keeping workflows such as AML/KYC', 'https://tokeniser.com'],
    ['Stack: Tokeniser (issue), Averer (identity and wallet), Redbelly Network (settlement layer)', 'https://tokeniser.com/technology'],
  ],
  '08': [
    ['Identity, eligibility and limits verified before any trade; trades that fail a check do not proceed; every check is logged; breaches often identified after the trade', 'https://tokeniser.com/product/superpowers/automated-compliance'],
    ['Investor eligibility enforced at the point of trade', 'https://redbelly.network/asset-tokenisation'],
  ],
  '09': [
    ['Accountability at protocol level (Polygraph: undeniable proofs of fraud) and functional level (identity layer: all network participants known)', 'https://redbelly.network/whitepaper'],
    ['Polygraph: the first accountable Byzantine consensus algorithm', 'https://redbelly.network/research/polygraph-accountable-byzantine-agreement'],
    ['Polygraph paper: if t ≥ n/3, it detects the malicious users that cause disagreement; honest participants detect at least n/3 responsible', 'https://redbelly.network/research/2021-ICDCS-Polygraph.pdf'],
  ],
  '10': [
    ['Signature voting on Redbelly; receipts on IPFS', 'https://redbelly-governance.vercel.app/'],
    ['Signature voting on Redbelly (the DAO’s own platform)', 'https://redbelly-governance.vercel.app/proposals'],
    ['No gas, no transaction; never asks for approvals or transfers', 'https://redbelly-governance.vercel.app/safety'],
    ['Only wallets holding a Receptor credential vote; each proposal sets voting period, quorum and identity quorum (distinct verified voters)', 'https://redbelly-governance.vercel.app/create'],
    ['Treasury multisig: three required approvals for treasury transactions (passed August 2026)', 'https://redbelly-governance.vercel.app/proposal/5f0845f0-7bc3-4db7-a79e-0fdb74613c1f'],
    ['In force: High Council elected July 2026; five pods (Marketing, Builder/Develop, Researcher, Community, Partnerships)', 'https://redbelly.smartcodedbot.com/changelog/'],
  ],
  '11': [
    ['Selected for the RBA’s Project Acacia; RBA mints wholesale CBDC directly onto the Redbelly mainnet', 'https://redbelly.network/projectacacia'],
    ['Phase 1 (2024); Redbelly selected July 2025 for Phase 2, a real-money pilot; the only public platform of the three that carried pilot wCBDC; bond issued and resold in under four minutes vs up to four days; RBA Final Report May 2026', 'https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project'],
  ],
};
