# PRISM AI — Real Switch Room Runbook

This file is a **runbook**, not evidence that Switch is connected. Follow the current official Switch Console instructions at https://github.com/sandbox-quantum/switch and https://docs.switchagents.ai/ . Do not claim compliance until a real human and an AI agent have interacted in the same Switch room.

## Goal

A human asks for a release assessment in a Switch-connected chat room. Two independently assigned AI teammates execute the actual PRISM QA and security commands; a release teammate reconciles their outputs; a human makes the recorded final decision.

## Guardrails

- Scope agent file access to this demo directory; do not grant administrator credentials or cloud deployment permissions.
- Do not give agents personal GitHub tokens or any production secrets. Use the intentionally insecure sample application only.
- Run read-only checks on the human review request. Require an explicit human release decision; do not deploy or merge.
- Never use fabricated screenshots, simulated chat logs, or test output as proof of live Switch integration.
- Record Switch/agent versions and exact setup steps used for reproducibility.

## Collaboration transcript template (illustrative prompts only; NOT an actual chat log)

1. Human: `@release-agent Review the local sample-app/app.js for release. Obtain independent QA and security evidence.`
2. Release agent asks QA and Security agents to inspect the same specific version of the demo files.
3. QA agent runs `npm run qa` and posts the real summary including the command and its exit code.
4. Security agent runs `npm run review` and posts the actual findings, with limits disclosed.
5. Release agent checks that both results came from the same demo revision, states `BLOCK` if QA failed or high-severity findings exist, and asks for human approval or rejection.
6. Human explicitly posts `REJECT` for the seeded vulnerable demo. The human (or an authorized agent acting on explicit human instruction) runs `npm run decide -- "Demo Reviewer" REJECT`.
7. Release agent posts the resulting evidence fingerprint with a clear limitation: the hash is only a local integrity fingerprint, not a tamper-proof audit record.

## Demo acceptance criteria

- [ ] Actual Switch Console instance set up and identifiable
- [ ] At least one actual AI agent joined a room with a human
- [ ] Real chat messages show context being shared via Switch
- [ ] Outputs in the room match locally generated CLI reports
- [ ] Unsafe seeded example is BLOCKed rather than approved
- [ ] Human approval decision explicitly present in chat
- [ ] Video, README, and source repo reproduce the flow

## If only one AI agent can be connected

Use that single real AI agent as the Release agent. It can run both local checks and request human approval; do not misrepresent this as 3 distinct live agents. Once stable, expand to QA and Security agents.
