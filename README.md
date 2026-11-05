# PRISM AI — Evidence-based multi-agent release review

**Hackathon:** Flip the Switch 2026 · Best Business Workflow · **Status: local MVP implemented; Switch room integration not yet verified.**

PRISM is a release-review workflow where a QA agent and a Security agent share real command output in a Switch room, a Release agent reconciles evidence, and a human explicitly approves or rejects. A high-risk finding prevents approval. This repository provides deterministic local checks and human decision recording, **not** a substitute for live Switch collaboration.

## Run (Node.js 20+)

```bash
npm test
npm run review
npm run qa
npm run assess
npm run demo
npm run doctor
npm run decide -- "Demo Reviewer" REJECT
```

The seeded fixture `sample-app/app.js` contains intentional vulnerabilities; security results should be `BLOCK`. `APPROVE` must fail while blocked. Reports are saved in `reports/` (gitignored). No dependencies or API keys are required for this local workflow.

## Architecture

Human (Mattermost/Discord) → Switch shared room → QA agent (`npm run qa`) + Security agent (`npm run review`) → Release agent (compare reports, request human decision) → human runs `npm run decide -- "Name" REJECT|APPROVE` → SHA-256 evidence fingerprint in `reports/decision.json`.

The local CLI is not an AI model, and does not autonomously post to Switch. Agents must actually be onboarded via Switch for the hackathon demonstration.

## Switch integration checklist (required before submission)

1. Install Switch Console and Docker using the current [official Switch docs](https://docs.switchagents.ai/). Windows availability is early access; verify compatibility.
2. Create a room called `prism-release-review` using Mattermost or another supported chat bridge; add one human and at least one real AI agent (ideally QA, Security, Release).
3. Give agents role instructions from `agents/INSTRUCTIONS.md`, scoped project access, and minimal shell permissions.
4. Trigger a real review in the room. QA agent runs `npm run qa`, Security agent runs `npm run review`, and both post **actual** outputs. Release agent compares evidence and requests explicit human action.
5. Human executes the approval/rejection command; share the resulting decision hash back in the Switch room.
6. Capture authentic room transcript/screenshots, setup instructions, agent provider/version and a demo video. Never fake a Switch interaction.

## Scope and limitations

- Static regex checks are a demonstration, **not a comprehensive security audit**.
- A passing test suite is not proof of release safety.
- No automated deployment, merges or production access.
- Hash fingerprints evidence in the local report; they do not prove provenance or prevent local tampering.
- Agent execution, Switch room setup, and external platform submission require the user's local account/environment.

## Submission checklist

- [x] Reproducible local QA/security review and evidence-based approval gate
- [x] Unit tests and safe-by-default rejection of blocked releases
- [ ] Real Switch room with human + AI agent working together
- [ ] Public GitHub repository and clean-clone reproduction
- [ ] Recorded end-to-end video showing Switch centrality
- [ ] Official registration/submission and rule verification

Official event: https://www.wemakedevs.org/hackathons/switch

## November 5 continuation

Version 0.2.0 adds same-source evidence checks, 30-minute freshness validation,
invalid-severity rejection, a non-decision assessment CLI, a local demo runner,
an environment diagnostic, and GitHub Actions configuration. Unit tests cover
blocked approval, mismatched revisions and stale/invalid evidence.

`switch/prism-release.template.yaml` implements the intended QA/Security/Release
room using the official Switch template format. It has not been imported or
executed on a live Switch server. See `docs/NEXT-STEPS.md` for exact access
blockers and `docs/SUBMISSION-DRAFT.md` for prepared submission text.

The decision CLI rechecks current source before recording a decision. It trusts
local report files and the provided actor name; it is not an authentication
system. Source fingerprints cover `src/`, `sample-app/` and `package.json`.
Rerun checks if these files change. Template/configuration changes require a new
live validation; they are outside the code fingerprint.
