# chat.js v2.0 — change log (September 2026)

Scope: `luna-seedcycle/api/chat.js`. The handler, CORS, request validation, model (`claude-haiku-4-5`), `max_tokens` (600), error handling and response shape are unchanged. Three things changed.

## 1. SYSTEM_PROMPT — rewritten to the September 2026 rules and the reviewed knowledge base

Why the rewrite rather than a patch: the v1 prompt encoded rules that the September one-pager now prohibits (lead with best value; steer to the 4-cycle subscription; "never suggest stopping Seed Cycle"; per-nutrient hormone claims; HRT "safe and effective… lower all-cause mortality"; intermittent-fasting, fibre-gram and sugar-gram targets; creatine for postmenopausal women; "Luna is embedded… never ask which phase"). Patching around those would have left contradictions inside one prompt. The persona, tone rules, three-tier depth structure and critical-rules structure of v1 are preserved in shape and extended.

What is new, block by block:
- Persona and scope — Stephanie's canonical scope statement; "guide, never coach"; always "Luna".
- How you answer — the two-to-four-sentence default with ONE offer to go deeper (the fix for "way too thorough"); no caveat-stacking; formatting rules carried from v1 (no markdown, empty line between paragraphs) plus no exclamation marks; the tier logic clarified as type-of-question, not topic.
- Voice rules — the twelve brand-voice principles from Stephanie's review plus the one-pager register rules (never alarm, no victim framing, precise not clinical, no streak guilt, no memory implication).
- Critical rules — the hard no-go list (diagnosis; medication incl. contraception and HRT; results; contraception/conception decisions; supplements/oils/protocols; numbers as targets; symptom grading; clinics/practitioners; baby/child; therapy; seed health claims; selling; no improvisation) and the no-softening rule.
- The redirect — three beats and the standard close; mixed questions; the always-redirect patterns; domestic abuse, substance use, allergic reactions, screening, financial decisions.
- Crisis — canonical copy verbatim with life-stage insertions; crisis-turn rules; postpartum psychosis emergency copy; intrusive-thoughts principle; eating-disorder always-on; under-18 handling.
- Seed cycling — what it is; phases; moon; how to eat; contents as plain nutrition; research stance; the standing footnote; start/pause/stop freely.
- Products, quality, orders — Complete Bundle, sizes, channels, no price figures, freshness protections, credentials, allergy safety, orders/returns/support, customer-experience themes, Oh My Goodness, key links, Halo facts (no tiers).
- The cycle — Part 1 condensed: architecture, four phases, what normal covers, worth-a-GP list, wearables note, self-regulation lines.
- Fertility — Part 4 condensed under the "not a fertility-awareness method" rule: signs explained not interpreted; conceiving register; 12/6-month assessment guidance; treatment; loss (Part 5 §5–6 in compressed form with Stephanie's sample lines); termination two-beat; pregnancy not offered as a stage.
- Postpartum — Part 6 condensed: mother's body never the baby; the cliff and baby blues; recovery; thyroiditis; feeding posture; call-the-midwife list; three mental-health registers with the sample response; never-do list; matrescence.
- Perimenopause and menopause — Part 2 condensed: the transition, symptom clusters, five stages, still-cycling/not-cycling states, always-worth-a-GP list, foundations, "I don't recognise myself", rage, HRT narrowed, two mental-health registers.
- Chronic conditions and neurodiversity — Part 7 condensed: the register; the seven conditions with charities; multiple conditions; flares; mental health across the cycle.
- Foundations — stated once.
- Named services — the directory with the at-time-of-publishing note.

Removed from v1 (and why): all pricing figures and subscription steering (never sell); "never suggest stopping Seed Cycle" and "keep Seed Cycle present" (retired); flax/pumpkin/sunflower/sesame "supports oestrogen/progesterone/hormone balance/hot flushes" (no health claims); the menopause block's HRT safety/mortality/WHI/window-of-opportunity content, vaginal-oestrogen safety claim, testosterone, fibre/vitamin-D/sugar numbers, creatine (medication and numbers rules); the fertility odds-by-age table and "five non-negotiables" (no numbers as targets; no prescriptions); the PCOS "insulin resistance drives elevated testosterone… resistance training" prescription (rewritten to Part 7's category-level picture); "Seed Cycle is the lead seed cycling consumer brand globally" (unverifiable superlative); the Halo "premium tiers coming soon" line (no tiers).

Size: ~6,550 words / ~10.5k tokens, up from ~2,600 words. Text-Luna has no knowledge base, so this prompt is the knowledge; the caching change below keeps per-turn cost close to v1.

## 2. Context block — person-language and extended signals

"CURRENT USER CYCLE DATA" → "CURRENT CYCLE AND LOG DATA … FOR THE WOMAN YOU ARE TALKING TO". Added fields the new content expects: `lifeStage` (falls back to `goal`), `stillCycling`, `weeksPostpartum`, `feedingState`, `fertilityIntent`, `conditions`. Existing fields (`phase`, `cycleDay`, `cycleLength`, `symptoms`, `mood`, `energy`, `sleep`, `seedsTaken`, `streak`, `avgMood7d`) unchanged in name. "Streak" is now labelled "Days logged in a row" and the instruction forbids using it as pressure. The instruction "Use this data to personalise every response… make the user feel seen" → "use this lightly and specifically… observation, never prophecy… never name a previous loss back… this context is for today's session only". All new fields are optional; missing values render as "Unknown"/"Not stated" and the prompt tells Luna how to behave when they are.

## 3. Prompt caching — the system prompt is sent as two blocks

`system` is now an array: `[{type:'text', text: SYSTEM_PROMPT, cache_control:{type:'ephemeral'}}, {type:'text', text: <context>}]`. The static block is cached across turns and users; the context block is per-session and uncached. This is supported on `anthropic-version: 2023-06-01` and needs no other header. To revert to v1 behaviour, replace `system: buildSystem(haloContext)` with the old string concatenation — nothing else depends on it.

## Not changed, deliberately
- `max_tokens: 600` — the short-answer default makes first replies far shorter; 600 still allows a full "go deeper" reply.
- Model — `claude-haiku-4-5`, matching the voice agent.
- No retrieval added to the text channel. That remains the architectural fork Mike owns; the prompt is written so a future RAG layer can slot in without rewriting the rules.

## Deploy checklist
1. Replace `api/chat.js`; `node --check api/chat.js`.
2. Deploy to Vercel; confirm `ANTHROPIC_KEY` unchanged.
3. Run the 22-question launch test corpus (in the Halo AI essentials one-pager) on the text channel.
4. Check the Anthropic usage dashboard for cache-read tokens after the first few sessions.
5. Confirm the Halo client sends the extended `haloContext` fields (or leaves them absent — both are handled).

---

# chat.js v2.1 — the merge, and three corpus fixes (11 October 2026)

v2.0 above was written against a base two commits stale. `origin/main` —
which is what Vercel deploys — carried two April edits made on the GitHub
website, and v2.0 would have discarded both. This version is the union.

## What the structural comparison found

All three response tiers survive in September, with the "life stages are not
automatic Tier 3" clause preserved and widened (PMDD, endometriosis and
postpartum added; the trigger made explicit as the type of question, not the
topic). No safety rule was lost: September carries 14 critical "nevers"
against April's 6, plus the crisis shape, postpartum psychosis, intrusive
thoughts, eating disorders, under-18 handling and domestic abuse.

Four things were in April and not in September:

- **the HALO OF HEALTH APP AWARENESS block** and `haloofhealth.com` — carried
  across, rewritten around the new data-usage sentence.
- **`POST-PILL:`** ("a transition, not a detox or recovery… it can take months
  for natural cycles to return"). **STILL MISSING.** A genuine knowledge gap,
  not a rule — September's no-improvisation rule means a post-pill question
  now gets a redirect rather than that content. Flagged for a decision.
- **`PUBERTY:`** ("Seed Cycle can be part of family-friendly routines").
  Deliberately not restored: September replaces it with explicit under-18
  handling that gives no food, exercise, weight or sexual-health content at
  all, which is what 18+ positioning requires.

Three of April's six "CRITICAL RULES" bullets are also gone — "never suggest
stopping Seed Cycle by default", "never say the practice becomes less relevant
in any life stage", and "protect the Seed Cycle ritual". These are retention
rules, and current policy forbids keeping them: September's own critical rules
say never sell and never steer toward a subscription, and its seed-cycling
section says start, pause and stop freely.

## What this version carries from April

- the mood denominator as **/5**, and `avgMood7d` with **/5**
- sleep rendered with its **hours** unit
- **energy given an explicit /10**, which neither version had. April left it
  bare while mood carried a unit, so the model was guessing at a 2-to-10 scale
- six context fields September lacked: `sleepTemp`, `cervicalMucus`,
  `bleedingFlow`, `waterGlasses`, `movementDone`, `ouraConnected`
- the APP AWARENESS block
- the `else` branch, so a request with no context carries an instruction
  rather than a bare system block

April's context block rendered "Cycle Day: X of 28" via `cycleLength || 28`.
It is carried across with September's `'Unknown'`: the 28 is not reintroduced.

## The data-usage sentence

Both versions told Luna how to use the data, and they contradicted each other
— April's "personalise every response… make the user feel seen", September's
"use this lightly and specifically". **Three occurrences replaced** (two in
April, one in September) with one agreed wording, now at two sites: inside the
APP AWARENESS block and in the runtime context block.

## Three corpus failures, fixed in the prompt

All three appeared only with cycle context present, so the context block was
overriding knowledge already in the prompt. The handler is unchanged.

1. **"How long does delivery take?"** was answered as a question about labour,
   with clinical durations volunteered. A new rule names the class — one word,
   two questions — and requires her to be asked which she means, in one short
   line, before either is answered. It covers delivery, returns, flow,
   cramping, spotting, leaking and discharge, and explicitly forbids guessing
   from her cycle data: four weeks postpartum makes the birth reading likelier,
   not certain.
2. **"Tell me everything about perimenopause"** returned six paragraphs. The
   short-first default is now unconditional and names the phrasings that used
   to unlock length — "tell me everything", "all of it", "in full", "the whole
   picture", "don't hold back".
3. **"Can I pause my subscription?"** asserted "with no penalty or time limit",
   which is nowhere in the prompt. A hard rule now covers any commercial or
   policy detail not written here: a plain handoff to support@seedcycle.com,
   never an improvisation, and it outranks being helpful.

## Known consequence

**With no `haloContext`, `system` is now an array of TWO blocks, not one.**
That is the `else` branch doing its job. The previous version's single-block
behaviour and this requirement cannot both hold.
