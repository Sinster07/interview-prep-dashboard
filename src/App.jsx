const { useMemo, useState, useEffect } = React;

const STORAGE_KEY = "frontend-interview-dashboard-v2";

const TRACKS = [
  { id: "All", label: "All", accent: "bg-slate-900 text-white" },
  { id: "JavaScript", label: "JS", accent: "bg-amber-100 text-amber-800" },
  { id: "React", label: "React", accent: "bg-sky-100 text-sky-800" },
  { id: "DSA", label: "DSA", accent: "bg-violet-100 text-violet-800" },
  { id: "System Design", label: "System", accent: "bg-emerald-100 text-emerald-800" }
];

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-50 text-emerald-700",
  Medium: "bg-amber-50 text-amber-700",
  Hard: "bg-rose-50 text-rose-700"
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getTrackStyle(track) {
  return TRACKS.find((item) => item.id === track)?.accent || "bg-slate-100 text-slate-700";
}

function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex min-h-6 items-center rounded-full px-2.5 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}

function Button({ children, variant = "secondary", className = "", ...props }) {
  const variants = {
    primary: "border-brand bg-brand text-white hover:bg-teal-700",
    secondary: "border-line bg-white text-ink hover:border-slate-300 hover:bg-slate-50",
    danger: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
  };

  return (
    <button
      className={`min-h-10 rounded-lg border px-3 font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function QuestionMeta({ question }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Pill className={getTrackStyle(question.track)}>{question.track}</Pill>
      <Pill className="bg-slate-100 text-slate-700">{question.category}</Pill>
      <Pill className={DIFFICULTY_STYLES[question.difficulty]}>{question.difficulty}</Pill>
    </div>
  );
}

function ProgressPanel({ progress, total, onClear }) {
  const counts = Object.values(progress).reduce(
    (acc, item) => {
      if (item.level) acc[item.level] += 1;
      return acc;
    },
    { done: 0, review: 0, again: 0 }
  );
  const percent = total ? Math.round((counts.done / total) * 100) : 0;

  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Done", counts.done],
          ["Review", counts.review],
          ["Again", counts.again],
          ["Total", total]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-emerald-50/60 p-3">
            <strong className="block text-2xl">{value}</strong>
            <span className="text-sm text-muted">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600" style={{ width: `${percent}%` }} />
      </div>
      <Button className="mt-4 w-full" onClick={onClear}>
        Clear progress
      </Button>
    </section>
  );
}

function Filters({ filters, categories, onChange, onReset }) {
  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase text-muted">Search</span>
          <input
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="closure, hook, redux..."
            className="min-h-11 w-full rounded-lg border border-line bg-white px-3 outline-none focus:border-brand focus:ring-4 focus:ring-teal-100"
          />
        </label>

        <div>
          <span className="mb-1.5 block text-xs font-bold uppercase text-muted">Track</span>
          <div className="grid grid-cols-5 overflow-hidden rounded-lg border border-line">
            {TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => onChange({ track: track.id })}
                className={`min-h-10 border-r border-line text-sm last:border-r-0 ${
                  filters.track === track.id ? "bg-brand text-white" : "bg-white text-muted hover:bg-slate-50"
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>
        </div>

        {[
          ["Category", "category", categories],
          ["Difficulty", "difficulty", ["All", "Easy", "Medium", "Hard"]],
          ["Status", "status", ["All", "unseen", "again", "review", "done", "bookmarked"]]
        ].map(([label, key, options]) => (
          <label className="block" key={key}>
            <span className="mb-1.5 block text-xs font-bold uppercase text-muted">{label}</span>
            <select
              value={filters[key]}
              onChange={(event) => onChange({ [key]: event.target.value })}
              className="min-h-11 w-full rounded-lg border border-line bg-white px-3 outline-none focus:border-brand focus:ring-4 focus:ring-teal-100"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option[0].toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </label>
        ))}

        <Button className="w-full" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}

function InterviewControls({ count, onCountChange, onStart }) {
  return (
    <section className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <label className="block">
        <span className="mb-1.5 block text-xs font-bold uppercase text-muted">Interview round</span>
        <select
          value={count}
          onChange={(event) => onCountChange(Number(event.target.value))}
          className="min-h-11 w-full rounded-lg border border-line bg-white px-3 outline-none focus:border-brand focus:ring-4 focus:ring-teal-100"
        >
          {[5, 10, 15, 20].map((value) => (
            <option key={value} value={value}>
              {value} questions
            </option>
          ))}
        </select>
      </label>
      <Button variant="primary" className="mt-4 w-full" onClick={onStart}>
        Start interview mode
      </Button>
    </section>
  );
}

function Hero({ onStart }) {
  return (
    <section className="mb-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="relative overflow-hidden rounded-lg border border-line bg-white p-6 shadow-soft">
        <span className="text-xs font-extrabold uppercase tracking-wide text-brand">Prep workspace</span>
        <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight">
          Pick a track, answer out loud, then reveal and mark confidence.
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          The dashboard covers JavaScript, React, DSA, and System Design. Use study mode for revision or
          mock mode for a focused interview round.
        </p>
      </div>

      <div className="rounded-lg border border-line bg-white p-4 shadow-soft">
        <h3 className="text-lg font-bold">Suggested flow</h3>
        <div className="mt-3 divide-y divide-line">
          {[
            ["Concepts", "JS + React"],
            ["Coding", "DSA"],
            ["Discussion", "System"]
          ].map(([label, value]) => (
            <div className="flex justify-between py-3 text-sm" key={label}>
              <span className="text-muted">{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <Button variant="primary" className="mt-3 w-full" onClick={onStart}>
          Start mock round
        </Button>
      </div>
    </section>
  );
}

function InterviewPanel({ session, onReveal, onMark, onNext, onEnd }) {
  if (!session.active || !session.queue.length) return null;
  const question = session.queue[session.current];

  return (
    <section className="mb-5 rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold">
          Interview mode: {session.current + 1} of {session.queue.length}
        </h2>
        <Button onClick={onEnd}>End</Button>
      </div>
      <h3 className="mt-4 text-2xl font-black leading-tight">{question.question}</h3>
      <div className="mt-3">
        <QuestionMeta question={question} />
      </div>

      {session.revealed && (
        <div className="mt-4 border-t border-line pt-4 leading-7 text-muted">
          <p>{question.answer}</p>
          {question.code && <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{question.code}</pre>}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={onReveal}>Reveal answer</Button>
        <Button onClick={() => onMark("again")}>Again</Button>
        <Button onClick={() => onMark("review")}>Review</Button>
        <Button variant="primary" onClick={() => onMark("done")}>
          Done + next
        </Button>
        <Button onClick={onNext}>Skip</Button>
      </div>
    </section>
  );
}

function QuestionCard({ question, progress, expanded, onToggle, onBookmark, onMark }) {
  const level = progress?.level;

  return (
    <article className="rounded-lg border border-line bg-white shadow-soft transition hover:-translate-y-0.5 hover:border-slate-300">
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-snug">{question.question}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <QuestionMeta question={question} />
            {level && <Pill className="bg-slate-100 text-slate-700">{level}</Pill>}
            {progress?.bookmarked && <Pill className="bg-blue-50 text-blue-700">Bookmarked</Pill>}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Button className="w-11 px-0" onClick={onBookmark} aria-label={progress?.bookmarked ? "Unbookmark" : "Bookmark"}>
            {progress?.bookmarked ? "★" : "☆"}
          </Button>
          <Button onClick={onToggle}>{expanded ? "Hide" : "Answer"}</Button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-line px-4 pb-4 pt-4">
          <p className="leading-7 text-muted">{question.answer}</p>
          {question.code && <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{question.code}</pre>}
          <div className="mt-4 flex flex-wrap gap-2">
            {["again", "review", "done"].map((item) => (
              <Button
                key={item}
                onClick={() => onMark(item)}
                variant={level === item ? "primary" : "secondary"}
                className="capitalize"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [filters, setFilters] = useState({
    query: "",
    track: "All",
    category: "All",
    difficulty: "All",
    status: "All"
  });
  const [expanded, setExpanded] = useState({});
  const [expandAll, setExpandAll] = useState(false);
  const [interviewCount, setInterviewCount] = useState(10);
  const [session, setSession] = useState({ active: false, queue: [], current: 0, revealed: false });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const categories = useMemo(() => {
    return ["All", ...new Set(QUESTIONS.map((question) => question.category))].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });
  }, []);

  const visibleQuestions = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return QUESTIONS.filter((question) => {
      const itemProgress = progress[question.id] || {};
      const haystack = `${question.question} ${question.answer} ${question.track} ${question.category}`.toLowerCase();
      const statusMatches =
        filters.status === "All" ||
        (filters.status === "unseen" && !itemProgress.level) ||
        (filters.status === "bookmarked" && itemProgress.bookmarked) ||
        itemProgress.level === filters.status;

      return (
        (filters.track === "All" || question.track === filters.track) &&
        (filters.category === "All" || question.category === filters.category) &&
        (filters.difficulty === "All" || question.difficulty === filters.difficulty) &&
        (!query || haystack.includes(query)) &&
        statusMatches
      );
    });
  }, [filters, progress]);

  function updateProgress(id, patch) {
    setProgress((current) => ({
      ...current,
      [id]: { ...(current[id] || {}), ...patch }
    }));
  }

  function startInterview() {
    if (!visibleQuestions.length) return;
    setSession({
      active: true,
      queue: shuffle(visibleQuestions).slice(0, Math.min(interviewCount, visibleQuestions.length)),
      current: 0,
      revealed: false
    });
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  function endInterview() {
    setSession({ active: false, queue: [], current: 0, revealed: false });
  }

  function nextInterview() {
    setSession((current) => {
      if (current.current >= current.queue.length - 1) return { active: false, queue: [], current: 0, revealed: false };
      return { ...current, current: current.current + 1, revealed: false };
    });
  }

  function markInterview(level) {
    const question = session.queue[session.current];
    if (!question) return;
    updateProgress(question.id, { level });
    if (level === "done") nextInterview();
  }

  function resetFilters() {
    setFilters({ query: "", track: "All", category: "All", difficulty: "All", status: "All" });
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-[#f5f7fa]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-2xl font-black">Interview Prep Dashboard</h1>
            <p className="text-sm text-muted">React + Tailwind workspace for JS, React, DSA, and System Design.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setFilters((current) => ({ ...current, status: current.status === "bookmarked" ? "All" : "bookmarked" }))}>
              Bookmarks
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (!visibleQuestions.length) return;
                const question = visibleQuestions[Math.floor(Math.random() * visibleQuestions.length)];
                setFilters((current) => ({ ...current, query: question.question }));
                setExpanded({ [question.id]: true });
              }}
            >
              Random question
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-6 px-6 py-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProgressPanel progress={progress} total={QUESTIONS.length} onClear={() => setProgress({})} />
          <Filters filters={filters} categories={categories} onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))} onReset={resetFilters} />
          <InterviewControls count={interviewCount} onCountChange={setInterviewCount} onStart={startInterview} />
        </aside>

        <main className="min-w-0">
          <Hero onStart={startInterview} />
          <InterviewPanel
            session={session}
            onReveal={() => setSession((current) => ({ ...current, revealed: true }))}
            onMark={markInterview}
            onNext={nextInterview}
            onEnd={endInterview}
          />

          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black">{visibleQuestions.length} questions</h2>
            <Button
              onClick={() => {
                setExpandAll((current) => !current);
                setExpanded({});
              }}
            >
              {expandAll ? "Hide all" : "Reveal all"}
            </Button>
          </div>

          <section className="grid gap-4">
            {visibleQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                progress={progress[question.id] || {}}
                expanded={expandAll || Boolean(expanded[question.id])}
                onToggle={() => setExpanded((current) => ({ ...current, [question.id]: !current[question.id] }))}
                onBookmark={() => updateProgress(question.id, { bookmarked: !(progress[question.id] || {}).bookmarked })}
                onMark={(level) => updateProgress(question.id, { level })}
              />
            ))}
          </section>

          {!visibleQuestions.length && (
            <div className="rounded-lg border border-line bg-white p-8 text-center text-muted shadow-soft">
              No questions match these filters.
            </div>
          )}

          <p className="mt-5 text-sm leading-6 text-muted">
            Study set inspired by common frontend interviews, EventLooped JavaScript prep, sudheerj React questions,
            kunalmanchanda interview_prep, and common DSA/System Design patterns.
          </p>
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
