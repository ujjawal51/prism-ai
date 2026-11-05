# PRISM AI — submission draft

Status: NOT SUBMITTED. Repository: https://github.com/ujjawal51/prism-ai . Live Switch test and demo video pending.
Do not submit the intended workflow below as already demonstrated.

Project name: PRISM AI
Tagline: Independent release evidence. One shared room. Human accountability.
Intended track: Best Business Workflow (verify the exact form label).

## Problem

Small software teams reconcile test output, security findings and release
approval across separate tools. A passing test suite can obscure a serious
finding, and results may refer to different versions of the code.

## Implemented locally

PRISM generates QA and limited static security reports, ties them to a content
fingerprint, rejects mismatched or stale evidence, and blocks approval when
QA fails or a high/critical finding exists. A separate assessment command lets
an agent report a recommendation without pretending to make a human decision.
The final local record includes the evidence fingerprint and an explicit actor
and action. Local identity is self-reported; the real room provides the visible
human approval context. No deployment is performed.

## Intended Switch workflow — pending live validation

A human requests a release review in a Switch-connected room. The Release
agent asks independent QA and Security agents to run actual checks. All three
share results in the same thread; Release reconciles matching source revisions
and asks the human for a decision. The template defines this workflow using
Switch's official agent/room template surface. Switch supplies shared context,
agent addressing and handoffs. Without Switch the CLI can still run checks,
but this team collaboration workflow is unavailable.

## Technical stack

Node.js 20+, built-in node:test, SHA-256 evidence fingerprints, Switch Console
agent/room template, and the human's configured agent provider and chat bridge.
No npm dependencies or embedded API credentials.

## Known limitations

Regex scanning is illustrative, not a full audit. A content hash is not a
signature or tamper-proof provenance. Local actor names do not authenticate
identity. Real agent behavior, template import, permissions and room handoffs
must be tested before claims about live integration. No ROI numbers measured.

## Fields still requiring authentic artifacts

- Public source repository URL: https://github.com/ujjawal51/prism-ai
- Demo video URL: pending real room execution and recording.
- Switch Console/server version, provider and model: pending actual run.
- Team details: participant to confirm; do not infer teammates.
- Live result: record actual command outputs, human message reference and hash.

## 90-second video script

0–10s: “PRISM helps a team decide whether a release has enough evidence.” Show
real Switch room and member identities.
10–25s: Human requests review; Release assigns QA and Security in that thread.
25–50s: Show real commands and matching source revisions posted by the agents.
50–70s: Show BLOCK for the intentionally vulnerable fixture, with findings.
70–85s: Human explicitly rejects the revision; show the recorded evidence hash.
85–90s: Explain Switch's shared-context role and disclose scanner limitations.

Only record this after the real run. Final form submission is manual under
Section 3(b) of https://www.wemakedevs.org/hackathons/switch/rules .
