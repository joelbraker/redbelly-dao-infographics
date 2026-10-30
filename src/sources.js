// Full source list per plate: which fact comes from where. Used by the website and to build SOURCES.md.
window.SOURCES = {
  '01': [
    ['Layer 1 blockchain built and optimised for real-world asset tokenisation; DBFT consensus', 'https://docs.redbelly.network'],
    ['DBFT developed with The University of Sydney and CSIRO’s Data61; no forking, near-instant finality; identity layer ensures all participants are known', 'https://redbelly.network/whitepaper'],
    ['Asset types: treasuries & bonds, private credit, carbon credits, real estate', 'https://redbelly.network'],
  ],
  '02': [
    ['Tokenisation records ownership as digital tokens and lets you program the rules of the asset', 'https://tokeniser.com'],
    ['24/7 markets; fewer intermediaries; automated issuance, settlement and compliance', 'https://redbelly.network/asset-tokenisation'],
    ['Bond trades take 2–4 business days to settle; asset and payment on one ledger swap in a single atomic transaction (§1.2)', 'https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project'],
    ['Reduced reconciliation overhead', 'https://tokeniser.com/why-tokenise'],
  ],
  '03': [
    ['DBFT: leaderless Byzantine consensus; verified for any f < n/3 Byzantine processes (Holistic Verification)', 'https://redbelly.network/research'],
    ['Leaderless; impossibility of forking; near-instant finality', 'https://redbelly.network/whitepaper'],
    ['Deterministic finality in a single round; proven by model checking', 'https://tokeniser.com/technology'],
  ],
  '04': [
    ['Receptor: native digital identity and verifiable credential protocol; checks participants are who they say they are; eligibility criteria; Issuer, Holder and Verifier modules; accredited issuers for network access', 'https://docs.redbelly.network/pages/receptor/'],
  ],
  '05': [
    ['W3C verifiable credential data model; Issuer, Holder, Verifier roles', 'https://docs.redbelly.network/pages/receptor/'],
    ['Disclosed data comes with a cryptographic signature the verifier checks', 'https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/'],
    ['Credential types such as ProofOfAddressCredential, AMLCTFCredential, AUSophisticatedWholesaleInvestorCredential', 'https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/'],
    ['Reusable identity and KYC credentials reduce duplication', 'https://redbelly.network/asset-tokenisation'],
  ],
  '06': [
    ['Proof by Query (zero knowledge): prove a statement without revealing data; “Is the user over 18?”; smart contract verifies on-chain, result true or false; selective disclosure reveals only requested fields, off-chain', 'https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/'],
    ['Age proof without disclosing the birth date', 'https://docs.redbelly.network/pages/methods/proof-by-query/'],
  ],
  '07': [
    ['Tokeniser is a Redbelly Network project; SaaS for fund administration and investor portals; one platform from issuance to settlement; staged onboarding keeping workflows such as AML/KYC', 'https://tokeniser.com'],
    ['Stack: Tokeniser (issue), Averer (identity and wallet), Redbelly Network (settle)', 'https://tokeniser.com/technology'],
  ],
  '08': [
    ['Identity, eligibility (incl. wholesale or sophisticated status) and limits verified before every trade; failing trades do not proceed; every check logged; manual checks find breaches after the trade', 'https://tokeniser.com/product/superpowers/automated-compliance'],
    ['Investor eligibility enforced at the point of trade', 'https://redbelly.network/asset-tokenisation'],
  ],
  '09': [
    ['Accountability at protocol level (Polygraph: undeniable proofs of fraud) and functional level (identity layer: all network participants known)', 'https://redbelly.network/whitepaper'],
    ['Polygraph: the first accountable Byzantine consensus algorithm', 'https://redbelly.network/research/polygraph-accountable-byzantine-agreement'],
    ['Polygraph paper: if t ≥ n/3, it detects the malicious users that cause disagreement; honest participants detect at least n/3 responsible', 'https://redbelly.network/research/2021-ICDCS-Polygraph.pdf'],
  ],
  '10': [
    ['Signature voting on Redbelly: no gas, no transaction, never asks for approvals or transfers; ballots signed and receipts on IPFS', 'https://redbelly-governance.vercel.app/safety'],
    ['Verified wallets only (Receptor credential); each proposal sets voting system, voting power, period, quorum and identity quorum (minimum distinct verified voters)', 'https://redbelly-governance.vercel.app/create'],
    ['Treasury multisig: at least 3 approvals for treasury transactions (ratified Aug 2026)', 'https://redbelly-governance.vercel.app/proposals'],
    ['In force: elected High Council (July 2026); five pods (Marketing, Builder/Develop, Researcher, Community, Partnerships)', 'https://redbelly.smartcodedbot.com/changelog/'],
  ],
  '11': [
    ['Selected for the RBA’s Project Acacia; live transactions with real tokenised assets and AUD; RBA mints wholesale CBDC on Redbelly mainnet', 'https://redbelly.network/projectacacia'],
    ['Phase 1 (2024), Phase 2 (July 2025 – Feb 2026), Final Report (May 2026); Redbelly the only public platform of the three that carried pilot wCBDC; tokenised bond issued and resold in under four minutes vs up to four days', 'https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project'],
  ],
};
