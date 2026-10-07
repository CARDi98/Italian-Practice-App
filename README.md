# Italian Practice V2

A separate rebuild of the frozen È → Sono prototype.

## What is included
- New dashboard/interface shell
- Grammar library based on the photographed review pages
- Vocabulary library based on handwritten class notes
- Listen & Speak interaction pattern
- Italian speech synthesis with an Italian locale voice preference
- Slow audio toggle
- Hint → Show Answer → I got it / Need practice flow
- Mixed retrieval review saved locally in the browser
- Existing È → Sono trainer preserved as a featured drill

## Grammar coverage in this build
- Capitalization
- Definite and indefinite articles
- Nouns and plurals, including special patterns
- Adjective agreement and plurals
- Regular present tense: -are, -ere, -ire, -isc
- Irregular verbs: avere, essere, fare, andare, venire, uscire
- Modal verbs: potere, volere, dovere
- sapere, dire, bere, stare
- Reflexive verbs
- Possessives
- Subject, direct and indirect pronouns
- Simple and articulated prepositions
- Question words
- Adverbs and molto/poco
- questo
- qualcuno, qualcosa, nessuno, niente
- Passato prossimo with avere/essere
- Regular and selected irregular past participles
- Tu imperative
- Formal and informal forms

## Run
Open `index.html` in a browser. For the most reliable speech behavior, serve the folder from a simple web server or GitHub Pages.

This V2 folder is intentionally separate from the frozen prototype.

## Instructional callout system added
V2.1 adds targeted post-answer instructional callouts:
- 🧠 Brain Alert
- 💡 Memory Trick
- 👂 Train Your Ear
- 🗣️ Practice
- 🔎 Common Pattern
- ⚠️ Watch Out

They appear selectively, after the learner reveals an answer, rather than on every question.

## V2.3 Learning Booster design locked
Answer flow is now:
Italian answer + Italian audio → categorized Learning Booster(s) → Need practice / I got it.

Every booster has an icon and category label. Current categories:
- 📘 Grammar Key
- 🧠 Brain Alert
- 🔎 Common Pattern
- 💡 Memory Trick
- 👂 Train Your Ear
- ⚠️ Watch Out
- 🗣️ Say It

Multiple boosters may appear on one answer when they add distinct instructional value.

## V2.4 restored Listen Only
- Listen & Speak remains the default.
- Listen Only is active from the home screen.
- Default retrieval interval is 5 seconds.
- Learner can change the interval from 1 to 20 seconds with +/- controls.
- Listen Only uses Italian audio, waits for retrieval, then reveals and speaks the Italian answer.
- Read & Choose remains intentionally deferred to the full app.
- Grammar guidance for -ca/-ga and -co/-go plurals was corrected and strengthened.

## V2.5 Listen Only baseline
- Retrieval timer baseline changed to 8 seconds.
- Adjustable slider at the top of Listen Only, 3–20 seconds.
- Start and Pause/Resume controls added.
- Listen Only no longer starts automatically.
- Audio-first task instructions added for non-conversation items so exercises make sense without looking at the screen.
- Conversation questions remain natural Italian questions.
- Fill-in/article, plural, conjugation and vocabulary tasks receive a short spoken instruction before the Italian target.
- Two-second transition pause follows each spoken answer before the next item.

## V2.6 interface correction
- Start/Pause controls moved out of the retrieval-time panel.
- Start/Pause appear at the top of the question area only during Listen Only mode.
- Player controls disappear in all other modes and views.
- Retrieval-time helper copy now reads: “Adjust the time between the question and answer.”

## V2.7 Listen Only direction rule
- Direct Italian questions are spoken naturally in Italian with no added direction.
- All task directions are spoken in English.
- Italian exercise material and answers are spoken in Italian.
- Vocabulary prompts use English direction + English cue, followed after retrieval time by the Italian answer.

## V2.7.1 bug fix only
- English directions now use an explicitly selected English voice.
- Removed per-utterance speech cancellation that could interrupt alternating direction/prompt sequences.
- No UI, content, timer, or learning-flow changes.

## V2.7.2 Listen Only sequence fix
Fixed the alternating-question bug: automatic advance no longer restores the completed question's stale sequence token. Added a short handoff gap between voice segments so English directions are not dropped when switching from Italian answer audio to the next question.

## V2.7.3 navigation regression fix
Restored Previous and Next controls in regular Listen & Speak practice. Previous is disabled on question 1. Both navigation controls are hidden in Listen Only. V2.7.2 Listen Only audio sequencing is unchanged.

## V2.7.4 alternating English-direction bug fix
Root cause isolated to the chained Web Speech utterance handoff. English direction and Italian prompt are now queued together as one browser speech queue for each question, while retaining separate English and Italian voices. The retrieval timer begins only after the final prompt utterance ends. No UI, content, navigation, timer, or Learning Booster changes.

## V2.7.5 deterministic speech sequence fix
Replaced the multi-utterance queue approach with a serialized speech state machine. Each question now speaks one retained utterance at a time, waits for its onend event, then advances to the next language segment. SpeechSynthesisUtterance objects are retained until the full question finishes, preventing browser garbage collection/queue loss. A stale speech queue is cleared once at the start of each new question. No UI, content, navigation, timer, or Learning Booster changes.

## V2.7.6 root-cause fix: direct-question classification
Found the exact cause of the every-other-question pattern. Listen Only classified any prompt ending in a question mark as a direct conversational question. In Articles, questions 2 and 4 are transformations written as “l’amica → ?” and “il pomodoro → ?”, so the app intentionally suppressed their English directions. Direct conversational questions are now identified only by explicit item metadata (`direct: true` or `type: "conversation"`). A question mark alone never suppresses English directions.

## V2.7.7 global mode controls
Kept the Listen & Speak, Listen Only, and Read & Choose controls on the home page and added the same mode selector to the persistent global header. Users can switch between Listen & Speak and Listen Only without leaving their current content. Read & Choose remains visibly reserved for the full app. V2.7.6 direct-question root-cause fix is preserved.

## V2.8 Verb curriculum expansion
Grammar now includes three verb families, broken into units of 10 or fewer:
- -ARE: 34 unique verbs across 4 units
- -ERE: 25 unique verbs across 3 units
- -IRE: 21 unique verbs across 3 units
Includes recovered class/chat/homework verbs, reflexive forms, high-frequency irregulars, -ISC verbs, and Learning Booster teaching moments. Duplicate infinitives removed. Existing V2.7.7 global modes and V2.7.6 Listen Only direction fix are preserved.

## V2.9 Verb subcategories and pattern-first charts
Six visible learning groups: ARE regular (30), ARE irregular (4), ERE pattern (14), ERE irregular (11), IRE regular (5), IRE irregular/-ISC (16). Each remains in units of 10 or fewer. Every verb unit opens with a compact pattern card. Regular groups show a six-person representative conjugation; irregular groups explain that there is no single regular pattern, with the IRE irregular section showing finire as the high-value -ISC sub-pattern.

## V2.9.1 Pattern-card fading scaffold
- Verb pattern card is shown automatically on Question 1.
- From Question 2 onward it collapses automatically.
- A View pattern button remains available as intentional learner support.
- If opened, the card collapses again on the next question.
- Returning to Question 1 restores the opening pattern card.
- No verb content, audio sequence, timer, global mode, navigation, or Learning Booster logic changed.
