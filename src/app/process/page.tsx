export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <a href="/" className="text-sm text-black/60 hover:text-black">← Back</a>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">My process</h1>
        <p className="mt-4 text-lg text-black/70 max-w-2xl">
          This is a placeholder process page. Next, we’ll add your real diagram, artifacts, and a few
          mini case studies showing how you move from ambiguity → decisions → shipped work.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Frame", body: "Define the problem, constraints, and success metrics." },
            { title: "Explore", body: "Sketch, prototype, test fast—keep it playful." },
            { title: "Ship", body: "Make tradeoffs, document decisions, iterate in reality." },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl border border-black/10 p-6">
              <div className="text-xl font-semibold">{c.title}</div>
              <div className="mt-2 text-black/70">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
