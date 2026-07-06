/**
 * SSDQuiz.jsx
 *
 * A multiple-choice quiz on how SSDs work. The viewer answers each question one at
 * a time. Picking an answer locks it in and immediately reveals whether it was
 * right or wrong, along with an inline explanation. At the end, a final score and
 * a short breakdown of every question are shown.
 *
 * ## Learning Notes
 * This component demonstrates several key React concepts:
 * - Multiple pieces of state: `step` (which question we're on), `answers` (what the
 *   viewer picked for each question), and `locked` (whether the current answer has
 *   been submitted so we can reveal the explanation).
 *
 * - Conditional rendering: one component shows the intro, a question, or the final
 *   results depending on `step`. The `{condition && <…/>}` pattern renders a block
 *   only when the condition is true.
 *
 * - Lists with .map(): questions, options, and the results breakdown are arrays
 *   turned into JSX with `.map()`. Each item needs a unique `key`.
 *
 * - Updating state immutably: we never mutate the old answers array. Instead we
 *   copy it (`[...prev]`) and set one slot, so React notices the change.
 *
 * - Data-driven UI: all quiz content lives in the `questions` array near the top.
 *   The JSX below just renders whatever's there, so you can edit the quiz without
 *   touching the component logic.
 *
 * ## Props
 *   None. The quiz is self-contained -- just drop it in.
 *
 * ## Usage Example
 *   <SSDQuiz />
 *
 * ## How to customize
 *   - Add or edit a question -> the `questions` array
 *   - Each option has `text`; the correct one is marked `correct: true`
 *   - `explanation` is shown inline after answering, right or wrong
 */

import { useState } from "react";

// -- Quiz data --------------------------------------------
// Each question has the prompt `text`, a list of `options` (exactly one marked
// `correct`), and an `explanation` revealed once the viewer answers.
const questions = [
  {
    text: "What does the abbreviation “SSD” stand for?",
    options: [
      { text: "Solid State Drive", correct: true },
      { text: "System Storage Disk" },
      { text: "Serial Storage Device" },
      { text: "Static Silicon Drive" },
    ],
    explanation:
      "SSD stands for Solid State Drive. “Solid state” means it has no moving parts — unlike a mechanical hard drive, everything is done electronically in flash memory chips.",
  },
  {
    text: "Which type of memory does a typical SSD use to store your data?",
    options: [
      { text: "Spinning magnetic platters" },
      { text: "NAND flash memory", correct: true },
      { text: "Volatile DRAM only" },
      { text: "Optical discs" },
    ],
    explanation:
      "SSDs store data in NAND flash memory — a non-volatile memory that keeps its contents even without power. An HDD, by contrast, stores data as magnetic charges on spinning platters.",
  },
  {
    text: "Why is an SSD generally much faster than a mechanical hard drive?",
    options: [
      { text: "It spins its platters faster" },
      { text: "It uses a larger cooling fan" },
      {
        text: "It has no moving parts, so there is no seek time waiting for a head to move",
        correct: true,
      },
      { text: "It compresses every file automatically" },
    ],
    explanation:
      "An HDD must physically move a read/write head and wait for the platter to rotate into position (seek time + rotational latency). An SSD accesses any flash cell electronically, so that mechanical delay disappears.",
  },
  {
    text: "What is the job of the SSD controller?",
    options: [
      { text: "It spins the drive up to speed" },
      {
        text: "It manages where data is written, handles wear-leveling, and talks to the computer",
        correct: true,
      },
      { text: "It supplies power to the whole computer" },
      { text: "It only lights up the drive's LED" },
    ],
    explanation:
      "The controller is the SSD's “brain.” It decides which flash cells to write to, spreads writes evenly (wear-leveling), performs error correction, and communicates with the host over the interface.",
  },
  {
    text: "NAND flash cells wear out after many write cycles. What technique spreads writes evenly to make the drive last longer?",
    options: [
      { text: "Defragmentation" },
      { text: "Overclocking" },
      { text: "Wear-leveling", correct: true },
      { text: "Disk mirroring" },
    ],
    explanation:
      "Wear-leveling makes the controller distribute writes across all the flash cells instead of hammering the same ones. This prevents any single block from wearing out early and extends the drive's lifespan.",
  },
  {
    text: "Data in NAND flash is organized into pages grouped into blocks. What is unusual about how flash is erased?",
    options: [
      { text: "You can erase a single byte at a time" },
      {
        text: "You can write a page, but you can only erase a whole block at once",
        correct: true,
      },
      { text: "Flash memory can never be erased" },
      { text: "Erasing happens automatically every second" },
    ],
    explanation:
      "Flash can be written one page at a time, but it can only be erased one full block at a time. This asymmetry is why SSDs use tricks like garbage collection and the TRIM command to stay efficient.",
  },
  {
    text: "Which modern interface lets SSDs reach the highest speeds by connecting directly over PCI Express?",
    options: [
      { text: "SATA" },
      { text: "USB 2.0" },
      { text: "NVMe (over PCIe)", correct: true },
      { text: "IDE / PATA" },
    ],
    explanation:
      "NVMe drives connect over PCI Express lanes, bypassing the older SATA bottleneck. A SATA SSD tops out around 550 MB/s, while an NVMe SSD can reach several thousand MB/s.",
  },
];

// -- Styles -----------------------------------------------
// Some styles are functions that take a flag and return a style object, so the look
// can change with state (e.g. an option looks different once it is revealed as
// correct or incorrect). The var(--…) values are CSS custom properties from the
// page's theme, matching the other components in this exhibit.
const styles = {
  progressBar: (filled) => ({
    flex: 1,
    height: 4,
    borderRadius: 2,
    background: filled
      ? "var(--color-text-primary)"
      : "var(--color-border-tertiary)",
    transition: "background 0.2s",
  }),
  optionBtn: (state) => ({
    // state: "idle" | "selected" | "correct" | "wrong" | "muted"
    position: "relative",
    cursor: state === "idle" || state === "selected" ? "pointer" : "default",
    textAlign: "left",
    padding: "12px 40px 12px 14px",
    width: "100%",
    display: "block",
    borderRadius: "var(--border-radius-md)",
    border:
      state === "correct"
        ? "2px solid #2f9e44"
        : state === "wrong"
          ? "2px solid #e03131"
          : state === "selected"
            ? "2px solid var(--color-border-info)"
            : "0.5px solid var(--color-border-secondary)",
    background:
      state === "correct"
        ? "rgba(47, 158, 68, 0.10)"
        : state === "wrong"
          ? "rgba(224, 49, 49, 0.10)"
          : state === "selected"
            ? "var(--color-background-info)"
            : "var(--color-background-primary)",
    opacity: state === "muted" ? 0.5 : 1,
    transition: "border-color 0.12s, background 0.12s, opacity 0.12s",
    fontFamily: "var(--font-sans)",
    marginBottom: 10,
  }),
  mark: (color) => ({
    position: "absolute",
    top: "50%",
    right: 12,
    transform: "translateY(-50%)",
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1,
    color,
  }),
  btn: (enabled) => ({
    cursor: enabled ? "pointer" : "not-allowed",
    fontSize: 14,
    padding: "8px 18px",
    borderRadius: "var(--border-radius-md)",
    border: "0.5px solid var(--color-border-secondary)",
    background: "transparent",
    color: "var(--color-text-primary)",
    opacity: enabled ? 1 : 0.35,
    fontFamily: "var(--font-sans)",
  }),
  explanation: (correct) => ({
    marginTop: 4,
    marginBottom: "1.25rem",
    padding: "12px 14px",
    borderRadius: "var(--border-radius-md)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderLeft: `3px solid ${correct ? "#2f9e44" : "#e03131"}`,
    background: "var(--color-background-secondary)",
    fontSize: 14,
    lineHeight: 1.6,
    color: "var(--color-text-primary)",
  }),
};

export default function SSDQuiz() {
  // `step` drives which screen shows: 0 = intro, 1..totalQ = questions, >totalQ = results.
  const [step, setStep] = useState(0);
  // `answers[i]` is the option index the viewer chose for question i (or undefined).
  const [answers, setAnswers] = useState([]);
  // `locked` is true once the current question's answer is submitted, revealing feedback.
  const [locked, setLocked] = useState(false);
  // `selected` is the option index highlighted before the viewer confirms it.
  const [selected, setSelected] = useState(null);

  const totalQ = questions.length;
  const isIntro = step === 0;
  const isResult = step > totalQ;
  const currentQ = questions[step - 1]; // step 1 maps to questions[0], etc.

  // Lock in the highlighted option and reveal the explanation.
  function handleSubmit() {
    if (selected === null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[step - 1] = selected;
      return next;
    });
    setLocked(true);
  }

  // Advance to the next question (or the results screen).
  function handleNext() {
    setSelected(null);
    setLocked(false);
    setStep((s) => s + 1);
  }

  // Reset everything back to the intro so the quiz can be retaken.
  function handleRestart() {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
  }

  // Count how many answers were correct (used on the results screen).
  const score = answers.reduce((sum, choice, i) => {
    return sum + (questions[i]?.options[choice]?.correct ? 1 : 0);
  }, 0);

  return (
    <div style={{ padding: "1.5rem 0", fontFamily: "var(--font-sans)" }}>
      {/* -- Intro -- */}
      {isIntro && (
        <div>
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: "1.25rem",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            Ready to test what you've learned? Answer {totalQ} multiple-choice
            questions about how SSDs work. After each answer you'll see whether
            you got it right, with a short explanation, and your total score at
            the end.
          </p>
          <button style={styles.btn(true)} onClick={() => setStep(1)}>
            Start the quiz &rarr;
          </button>
        </div>
      )}

      {/* -- Question -- */}
      {!isIntro && !isResult && currentQ && (
        <div>
          {/* Progress bars: one per question, filled for those already reached */}
          <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem" }}>
            {questions.map((_, i) => (
              <div key={i} style={styles.progressBar(i < step)} />
            ))}
          </div>

          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              margin: "0 0 0.4rem",
            }}
          >
            Question {step} of {totalQ}
          </p>
          <h3 style={{ margin: "0 0 1.25rem", fontSize: 18, fontWeight: 500 }}>
            {currentQ.text}
          </h3>

          {/* One button per option. Before locking, clicking highlights it.
              After locking, the correct option turns green and a wrong pick turns red. */}
          <div style={{ marginBottom: "0.5rem" }}>
            {currentQ.options.map((opt, i) => {
              let state = "idle";
              if (!locked) {
                state = selected === i ? "selected" : "idle";
              } else if (opt.correct) {
                state = "correct";
              } else if (selected === i) {
                state = "wrong";
              } else {
                state = "muted";
              }
              return (
                <button
                  key={i}
                  style={styles.optionBtn(state)}
                  onClick={() => !locked && setSelected(i)}
                  disabled={locked}
                  aria-pressed={selected === i}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: state === "selected" ? 600 : 500,
                      color:
                        state === "correct"
                          ? "#2b8a3e"
                          : state === "wrong"
                            ? "#c92a2a"
                            : "var(--color-text-primary)",
                    }}
                  >
                    {opt.text}
                  </span>
                  {locked && opt.correct && (
                    <span style={styles.mark("#2b8a3e")}>&#10003;</span>
                  )}
                  {locked && !opt.correct && selected === i && (
                    <span style={styles.mark("#c92a2a")}>&#10007;</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Inline explanation, revealed only after the answer is locked in */}
          {locked && (
            <div style={styles.explanation(currentQ.options[selected]?.correct)}>
              <strong>
                {currentQ.options[selected]?.correct
                  ? "Correct! "
                  : "Not quite. "}
              </strong>
              {currentQ.explanation}
            </div>
          )}

          {/* Submit while answering; Next once the answer is locked in */}
          {!locked ? (
            <button
              style={styles.btn(selected !== null)}
              disabled={selected === null}
              onClick={handleSubmit}
            >
              Submit answer
            </button>
          ) : (
            <button style={styles.btn(true)} onClick={handleNext}>
              {step === totalQ ? "See my score →" : "Next question →"}
            </button>
          )}
        </div>
      )}

      {/* -- Results -- */}
      {isResult && (
        <div>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              margin: "0 0 0.5rem",
            }}
          >
            Your score
          </p>
          <div
            style={{
              background: "var(--color-background-primary)",
              border: "2px solid var(--color-border-info)",
              borderRadius: "var(--border-radius-lg)",
              padding: "1.25rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 4,
              }}
            >
              {score} / {totalQ}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                marginBottom: "1.25rem",
              }}
            >
              {score === totalQ
                ? "Perfect score — you really know your SSDs!"
                : score >= totalQ * 0.6
                  ? "Nice work — you've got a solid grasp of how SSDs work."
                  : "Good start — scroll back up and revisit the exhibit, then try again."}
            </div>

            {/* Per-question breakdown so viewers can review what they missed */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {questions.map((q, i) => {
                const choice = answers[i];
                const gotIt = q.options[choice]?.correct;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span
                      style={{
                        color: gotIt ? "#2b8a3e" : "#c92a2a",
                        fontWeight: 700,
                      }}
                    >
                      {gotIt ? "✓" : "✗"}
                    </span>
                    <span>{q.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button style={styles.btn(true)} onClick={handleRestart}>
            &#8634; Retake quiz
          </button>
        </div>
      )}
    </div>
  );
}
