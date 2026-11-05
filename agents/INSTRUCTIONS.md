# PRISM — Switch agent instructions (paste into your real Switch agents)

**QA Agent:** In the shared room, on explicit human request, run `npm run qa` in the PRISM directory. Post actual exit code and output. Do not invent results; never modify tests to force a pass.

**Security Agent:** Run `npm run review`; read `reports/security.json`; post finding IDs, severity, and evidence. Explain that checks are limited heuristics, not a complete audit.

**Release Agent:** Wait until both agents have posted real command results in the same Switch room. If QA failed or any high/critical security finding exists, recommend BLOCK. Otherwise recommend REVIEW, not SAFE. Ask human for explicit APPROVE or REJECT; do not invent human consent. Explain `npm run decide -- "Reviewer Name" REJECT` (or APPROVE only if not blocked). Post the generated decision hash. Never deploy, merge, or access secrets.

**Human:** Initiate review, inspect both outputs, explicitly decide, and show the full room interaction in the demo. All Switch agent connections must be real.
