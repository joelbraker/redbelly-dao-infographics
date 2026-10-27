# Redbelly Explained: source list

Every fact in the 11 infographics, mapped to the supplied resource it comes from. Sources accessed 27 October 2026.

**Governance note.** Plate 10 does not use Constitution v1.2 or Snapshot rules. What is decided and in force comes from the TASK-23 changelog (sourced to 1 August 2026). How voting works today comes from the DAO voting platform, which takes priority wherever the changelog describes Snapshot voting.

## 01. The basics: A blockchain built for real-world assets

- Layer 1 blockchain built and optimised for real-world asset tokenisation; DBFT consensus  
  https://docs.redbelly.network
- DBFT developed with The University of Sydney and CSIRO’s Data61; no forking, near-instant finality; identity layer ensures all participants are known  
  https://redbelly.network/whitepaper
- Asset types: treasuries & bonds, private credit, carbon credits, real estate  
  https://redbelly.network

## 02. Real world assets: Why turn assets into tokens?

- Tokenisation records ownership as digital tokens and lets you program the rules of the asset  
  https://tokeniser.com
- 24/7 markets; fewer intermediaries; automated issuance, settlement and compliance  
  https://redbelly.network/asset-tokenisation
- Bond trades take 2–4 business days to settle; asset and payment on one ledger swap in a single atomic transaction (§1.2)  
  https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project
- Reduced reconciliation overhead  
  https://tokeniser.com/why-tokenise

## 03. DBFT consensus: Agreement without a leader

- DBFT: leaderless Byzantine consensus; verified for any f < n/3 Byzantine processes (Holistic Verification)  
  https://redbelly.network/research
- Leaderless; impossibility of forking; near-instant finality  
  https://redbelly.network/whitepaper
- Deterministic finality in a single round; proven by model checking  
  https://tokeniser.com/technology

## 04. Receptor: Receptor checks who is who

- Receptor: native digital identity and verifiable credential protocol; checks participants are who they say they are; eligibility criteria; Issuer, Holder and Verifier modules; accredited issuers for network access  
  https://docs.redbelly.network/pages/receptor/

## 05. Verifiable credentials: A digital proof you keep

- W3C verifiable credential data model; Issuer, Holder, Verifier roles  
  https://docs.redbelly.network/pages/receptor/
- Disclosed data comes with a cryptographic signature the verifier checks  
  https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/
- Credential types such as ProofOfAddressCredential, AMLCTFCredential, AUSophisticatedWholesaleInvestorCredential  
  https://docs.redbelly.network/pages/eligibility-sdk/configure-eligibility-criteria/
- Reusable identity and KYC credentials reduce duplication  
  https://redbelly.network/asset-tokenisation

## 06. Zero-knowledge proofs: Prove it without showing it

- Proof by Query (zero knowledge): prove a statement without revealing data; “Is the user over 18?”; smart contract verifies on-chain, result true or false; selective disclosure reveals only requested fields, off-chain  
  https://docs.redbelly.network/pages/eligibility-sdk/selective-disclosure-vs-zero-knowledge/
- Age proof without disclosing the birth date  
  https://docs.redbelly.network/pages/methods/proof-by-query/

## 07. Tokeniser: Tokenisation without the tech project

- Tokeniser is a Redbelly Network project; SaaS for fund administration and investor portals; one platform from issuance to settlement; staged onboarding keeping workflows such as AML/KYC  
  https://tokeniser.com
- Stack: Tokeniser (issue), Averer (identity and wallet), Redbelly Network (settle)  
  https://tokeniser.com/technology

## 08. Compliance aware assets: Assets that know the rules

- Identity, eligibility (incl. wholesale or sophisticated status) and limits verified before every trade; failing trades do not proceed; every check logged; manual checks find breaches after the trade  
  https://tokeniser.com/product/superpowers/automated-compliance
- Investor eligibility enforced at the point of trade  
  https://redbelly.network/asset-tokenisation

## 09. Identity and accountability: Known people, accountable network

- Accountability at protocol level (Polygraph: undeniable proofs of fraud) and functional level (identity layer: all participants known)  
  https://redbelly.network/whitepaper
- Polygraph: the first accountable Byzantine consensus algorithm  
  https://redbelly.network/research
- Participants verify identities; privacy protected through zero-knowledge proofs  
  https://redbelly.network/projectacacia

## 10. Governance: How the DAO decides today

- Signature voting on Redbelly: no gas, no transaction, never asks for approvals or transfers; ballots signed and receipts on IPFS  
  https://redbelly-governance.vercel.app/safety
- Verified wallets only (Receptor credential); each proposal sets voting system, voting power, period, quorum and identity quorum (minimum distinct verified voters)  
  https://redbelly-governance.vercel.app/create
- Treasury multisig: at least 3 approvals for treasury transactions (ratified Aug 2026)  
  https://redbelly-governance.vercel.app/proposals
- In force: elected High Council (July 2026); five pods (Marketing, Builder/Develop, Researcher, Community, Partnerships)  
  https://redbelly.smartcodedbot.com/changelog/

## 11. Project Acacia: Central bank money on a public chain

- Selected for the RBA’s Project Acacia; live transactions with real tokenised assets and AUD; RBA mints wholesale CBDC on Redbelly mainnet  
  https://redbelly.network/projectacacia
- Phase 1 (2024), Phase 2 (July 2025 – Feb 2026), Final Report (May 2026); Redbelly the only public platform of the three that carried pilot wCBDC; tokenised bond issued and resold in under four minutes vs up to four days  
  https://khalyd.substack.com/p/redbelly-network-and-the-rbas-project

## Brand assets and licences

- Logo wordmark and isotype: extracted as vectors from the Redbelly Brand Guidelines PDF (supplied media kit). Not redrawn or altered.
- Colours: Redbelly Brand Guidelines palette (#FF5050, #283A46, #142530, #848B91, #DCDCDC, #ECEBEC); #86EFAC from the supplied DAO tokens file for pass ticks.
- Typefaces, both SIL Open Font License 1.1:
  - Readex Pro (Medium) for headers and subheaders, per the Redbelly brand page (redbelly.network/brand, "HEADERS / SUBHEADERS - Readex Pro Medium") and the Brand Guidelines PDF ("Readex Pro, Brand system"). Font files from Google Fonts, the brand page's own download link. Licence: assets/fonts/OFL-ReadexPro.txt.
  - Be Vietnam Pro for running text, per the supplied DAO brand tokens ("font.sans"), font files from the supplied media kit. Licence: assets/fonts/OFL-BeVietnamPro.txt.
- Icons and diagrams: drawn from scratch in SVG for this series (src/diagrams.js). No stock images or third-party icon sets.
