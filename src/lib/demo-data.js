const DEMO_DECISION = {
  id: 'demo-1',
  title: 'Should I leave my stable corporate job to start my own company?',
  description: "I've been at a Fortune 500 company for 6 years. Good salary, great benefits, clear career path. But I have a business idea I can't stop thinking about — a platform that helps small restaurants reduce food waste. I have some savings but not enough for more than 8 months without income. My partner is supportive but nervous. I'm 31.",
  status: 'in_progress',
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
};

const DEMO_COMPLETED_DECISION = {
  id: 'demo-2',
  title: 'Should I relocate to be closer to my aging parents?',
  description: "My parents are in their mid-70s and starting to need more help. I live 800 miles away in a city I love, with a career and social circle I've built over 10 years. My sibling lives near them but is burning out as the sole local support.",
  status: 'completed',
  created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
};

export const DEMO_DECISIONS = [DEMO_DECISION, DEMO_COMPLETED_DECISION];
export const getActiveDemoDecision = () => DEMO_DECISION;

const DEMO_LENS_RESPONSES = {
  values: [
    "That's a really meaningful set of values — **autonomy, impact, and security**. I notice something interesting: autonomy and impact are pulling you toward the startup, while security is pulling you toward staying. That's not unusual, but let's dig deeper.\n\nWhen you think about your current role, how well does it serve your need for *impact*? Not in theory — but in your day-to-day experience. Do you go home feeling like your work mattered?",
    "That tension is very telling. You're describing a life that *looks* successful but doesn't *feel* meaningful to you anymore. The security is real, but it sounds like it's become a golden cage.\n\nHere's a harder question: If the startup fails and you had to go back to a corporate job in 2 years — would you still feel it was worth trying? Or does the startup only feel worth it if it succeeds?",
    "That's a powerful distinction. You're saying the act of *trying* matters to you regardless of outcome — that tells me autonomy and impact aren't just preferences, they're core to your identity.\n\nLet me push a bit: your partner's nervousness — do you think that reflects their own values (security-oriented), or do you think they're picking up on a genuine risk you're underweighting?",
  ],
  'future-self': [
    "That's a vivid picture — and I notice you described the startup path with much more energy and detail than the corporate path. Your body and imagination are telling you something.\n\nNow let's go further. It's 10 years from now, and you *stayed* at the corporate job. You're 41, probably a VP by now, good income, nice life. But the startup idea? Someone else built it. You see it in the news. How does that feel in your chest when you imagine that moment?",
    "That visceral reaction is data. Regret has a physical signature, and you just described it.\n\nLet me try one more exercise. Imagine you're 80 years old, sitting with your grandchildren. They ask you about the biggest decision of your life. In the version where you took the leap — even if it failed — what story do you tell them? And in the version where you stayed safe — what do you tell them?",
    "The fact that you can articulate a compelling story about trying — even failing — but struggle to make the staying story feel meaningful… that's one of the clearest signals the Future Self lens can reveal.\n\nYour future self seems to be saying: *'The risk of regret outweighs the risk of failure.'* Does that resonate with you, or does it feel too simple?",
  ],
  fear: [
    "Thank you for that honesty. Financial ruin and 'being a failure' — those are two different kinds of fear. The first is practical (money), the second is identity-based (who am I if I fail?). Let's separate them.\n\nFor the financial fear: you mentioned 8 months of savings. What's the actual worst-case scenario? If the startup doesn't work after 8 months, what happens next? Walk me through it concretely — not the anxiety, but the logistics.",
    "So the practical worst case is: you go back to a corporate job, maybe at a slightly lower position, with a gap on your resume that's actually explainable and even impressive to many employers. That's uncomfortable, but it's not catastrophic.\n\nNow the harder fear — being a failure. When you imagine people knowing you tried and it didn't work out, whose judgment scares you most? Not everyone's — whose specifically?",
    "That's a crucial insight. The fear isn't really about external judgment — it's about *your own* internal narrative. You're afraid of confirming a story you already half-believe: that you're not good enough to make it on your own.\n\nHere's a CBT reframe to sit with: **Is it possible that NOT trying is actually the thing that would confirm that fear?** That staying safe is the version of you that says 'I couldn't do it' — not the version that tries and learns?",
  ],
  stakeholder: [
    "That's an honest assessment. Your partner wants financial stability but also wants you to be happy — those two desires might be in tension, and that's okay. Let's explore your partner's perspective more deeply.\n\nIf your partner could design the ideal scenario (not just choose between the two options as they stand), what do you think they'd create? What version of this decision would make them feel both supportive AND secure?",
    "A 'soft launch' — keeping your job while validating the idea evenings and weekends — is interesting. Your partner isn't saying 'don't do it,' they're saying 'show me it's real first.' That's actually a reasonable ask.\n\nNow, what about your parents? You haven't mentioned them. If they knew about this decision, what would they say? And more importantly — would their advice be about *you*, or about *their own* fears projected onto you?",
    "So your parents would say 'stay safe' because of their own experiences with financial insecurity. That's valid history — but it's *their* history, not yours. You have advantages they didn't: education, industry experience, a safety net.\n\nHere's the key question from the stakeholder lens: **Is there anyone in your life who would genuinely be harmed — not just worried — if you tried this?** Not inconvenienced, not anxious. Actually harmed.",
  ],
  regret: [
    "Good. So in 10 minutes — relief mixed with terror. That's actually the signature feeling of making a brave choice. Pure relief means it was easy. Pure terror means it might be wrong. The mix is meaningful.\n\nNow, 10 months in. You've been working on the startup for almost a year. Maybe it's gaining traction, maybe it's struggling. Regardless of the outcome — how do you feel about the *person* you've become in that 10 months? Has the experience itself changed you?",
    "That's one of the most important things you've said. The *experience* of building something is valuable regardless of the business outcome. You'd learn skills, build resilience, and know what you're capable of.\n\nNow the Bezos test. You're 80 years old, looking back on your life. Complete this sentence honestly: 'I would regret NOT…'\n\nDon't think about it too long. What comes out first?",
    "'I would regret not trying.' You said it immediately, without hesitation.\n\nLet's check the reverse: 'I would regret trying because ___.' Can you finish that sentence? Is there a genuine regret scenario from trying, or does it feel forced?\n\nThe asymmetry of regret is one of the most reliable decision-making signals we have. When one direction has deep regret potential and the other doesn't — that's data.",
  ],
};

export function getDemoLensResponse(lensId, messageCount) {
  const responses = DEMO_LENS_RESPONSES[lensId];
  if (!responses) return "Tell me more about how you're thinking about this.";
  const idx = Math.min(Math.floor((messageCount - 1) / 2), responses.length - 1);
  return responses[Math.max(0, idx)];
}

export function getDemoSynthesis() {
  return `## Core Tension

You're caught between the safety of a known path and the call of a purpose that feels deeply aligned with who you are. This isn't about risk tolerance — it's about identity. The person you want to become lives on the other side of this leap.

## What the Lenses Revealed

- **Values Alignment**: Your core values (autonomy, impact, meaning) are systematically underserved by your current path, while security — your one satisfied value — has become a golden cage.
- **Future Self**: Your imagination comes alive when picturing the startup path and goes flat when picturing 10 more years of corporate life. Your future self is sending a clear signal.
- **Fear Inventory**: Your deepest fear isn't financial failure — it's confirming an internal narrative that you're "not good enough." Paradoxically, NOT trying may be what actually confirms that fear.
- **Ripple Effects**: No one in your life would be genuinely *harmed* by you trying. Your partner's ask for validation (a soft launch) is reasonable and actionable.
- **Regret Minimization**: You completed "I would regret NOT trying" instantly and couldn't authentically complete "I would regret trying because..." The asymmetry is stark.

## Patterns Across Lenses

Three themes emerged consistently: (1) Your current path satisfies your *circumstances* but starves your *identity*. (2) The fear holding you back is about self-worth, not logistics. (3) Every future-oriented exercise pointed the same direction — toward trying.

## The Blindspot

You may be romanticizing the startup journey. Building a company is not just "following your passion" — it's monotonous, lonely, and often unglamorous work. The lenses explored the *decision* thoroughly, but you may want to pressure-test whether you love the *idea* of being a founder or the *reality* of the daily grind. A 90-day evening/weekend prototype phase (your partner's instinct) might reveal this before you leap.

## Clarity Statement

The evidence across every lens points in one direction: the cost of not trying is higher than the cost of failing. But the *how* matters as much as the *what*. Your partner's instinct for a phased approach isn't fear — it's wisdom. The clearest path forward may be: validate the idea with real customers while you still have income, set a concrete go/no-go milestone, and make the leap with evidence rather than just conviction. You don't have to choose between courage and prudence — the bravest version of this decision includes both.`;
}
