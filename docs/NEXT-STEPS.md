# PRISM: remaining access and launch steps

Verified on 5 November 2026. Code development is complete for this iteration;
production readiness and hackathon eligibility are not claimed.

## GitHub repository

Public repository: https://github.com/ujjawal51/prism-ai

The connected account `ujjawal51` now has push access to this project repository.
Source publication is being completed through the GitHub connection. Check the
repository main branch and Actions page for the published source and CI results.
No unrelated repositories are used.

## Real Switch execution

The user's Windows Docker installation is on another machine; this workspace
cannot control it. Here Docker and the Codex/Claude/OpenCode executables are
absent, and no Switch room/session is configured. No live-agent test is claimed.

1. On an accessible machine, install Switch Console from the official quickstart,
   add its local server and bundled Mattermost, and sign in to an agent provider.
2. Import `switch/prism-release.template.yaml` via the template flow available in
   that installed release. Pick a unique `team`, provider and bridge. Set
   `project_path` to this extracted project folder. Agent runtime directories
   are separate; each agent must be permitted to read the PRISM directory and
   run the listed Node commands there.
3. If template import is unavailable, create three agents manually using the
   roles in the YAML, and create a room with all three and the linked human.
   Use the owner-and-owned-agents addressing setting for handoffs.
4. Check the actual installed Switch version, template validation and all three
   running sessions. A bot greeting alone is not proof a model is running.
5. In the room, ask the release agent to review the seeded app. QA/security
   independently run their commands; release posts `npm run assess` output.
6. Inspect the evidence, then explicitly REJECT the seeded source revision.
   Record the real room messages and video. Never reuse a synthetic transcript.

Sources:
- https://docs.switchagents.ai/switch-rooms/getting-started/
- https://docs.switchagents.ai/switch-rooms/getting-started/onboard-your-agents
- https://docs.switchagents.ai/switch-rooms/getting-started/create-a-room
- https://github.com/sandbox-quantum/switch/blob/main/examples/agent-templates/triage-pair.template.yaml

The YAML is a configuration implementation grounded in the official example,
not a verified deployment. There is no invented Switch endpoint or fake agent.

## Final entry must be manual

The official rules Section 3(b) prohibit automated registration and submission.
AI development is allowed. Prepare all fields here, but the participant must
register/submit personally. Deadline: 7 November 2026, 11:59 PM IST.

- https://www.wemakedevs.org/hackathons/switch
- https://www.wemakedevs.org/hackathons/switch/rules
- https://www.wemakedevs.org/hackathons/switch/schedule
