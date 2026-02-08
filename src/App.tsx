import { useState } from "react";

type GameStatus = "found" | "lost" | "possible-lost";

interface Game {
  id: number;
  title: string;
  status: GameStatus;
  description: string;
  year?: string;
  image?: string;
}

const games: Game[] = [
  {
    id: 1,
    title: "Theme Park Tycoon 2",
    status: "found",
    description:
      "A popular tycoon game where players design and manage their own theme park. Build roller coasters, food stalls, and decorations to attract visitors and earn money.",
    year: "2012",
  },
  {
    id: 2,
    title: "Paintball Frenzy",
    status: "possible-lost",
    description:
      "A fast-paced paintball shooter game on Roblox. Its current availability is uncertain and it may be lost media. If you have any information about this game, please help us archive it!",
    year: "Unknown",
  },
];

function StatusBadge({ status }: { status: GameStatus }) {
  const config = {
    found: {
      label: "Found",
      bg: "bg-emerald-500/20",
      text: "text-emerald-300",
      border: "border-emerald-500/40",
      dot: "bg-emerald-400",
      glow: "shadow-emerald-500/20",
    },
    lost: {
      label: "Lost Media",
      bg: "bg-red-500/20",
      text: "text-red-300",
      border: "border-red-500/40",
      dot: "bg-red-400",
      glow: "shadow-red-500/20",
    },
    "possible-lost": {
      label: "Possible Lost Media?",
      bg: "bg-amber-500/20",
      text: "text-amber-300",
      border: "border-amber-500/40",
      dot: "bg-amber-400",
      glow: "shadow-amber-500/20",
    },
  };

  const c = config[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${c.bg} ${c.text} ${c.border} shadow-sm ${c.glow}`}
    >
      <span className={`h-2 w-2 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

function GameCard({ game }: { game: Game }) {
  const [expanded, setExpanded] = useState(false);

  const borderColor =
    game.status === "found"
      ? "border-emerald-500/30 hover:border-emerald-400/60"
      : game.status === "lost"
        ? "border-red-500/30 hover:border-red-400/60"
        : "border-amber-500/30 hover:border-amber-400/60";

  const glowColor =
    game.status === "found"
      ? "hover:shadow-emerald-500/10"
      : game.status === "lost"
        ? "hover:shadow-red-500/10"
        : "hover:shadow-amber-500/10";

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-gray-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${borderColor} ${glowColor}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent line */}
      <div
        className={`h-1 w-full ${
          game.status === "found"
            ? "bg-gradient-to-r from-emerald-500 to-teal-400"
            : game.status === "lost"
              ? "bg-gradient-to-r from-red-500 to-rose-400"
              : "bg-gradient-to-r from-amber-500 to-yellow-400"
        }`}
      />

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
                  game.status === "found"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : game.status === "lost"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {game.status === "found" ? "✅" : game.status === "lost" ? "❌" : "❓"}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-gray-100">
                {game.title}
              </h3>
            </div>
            <StatusBadge status={game.status} />
          </div>
          {game.year && (
            <span className="rounded-lg bg-gray-800 px-3 py-1 text-sm font-medium text-gray-400">
              {game.year}
            </span>
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-4">
            <p className="leading-relaxed text-gray-300">{game.description}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {expanded ? "Click to collapse" : "Click to expand"}
        </div>
      </div>
    </div>
  );
}

function StatsCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`rounded-xl border bg-gray-900/60 p-4 backdrop-blur-sm ${color}`}>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-gray-400">{label}</div>
    </div>
  );
}

export function App() {
  const [filter, setFilter] = useState<"all" | GameStatus>("all");

  const filteredGames =
    filter === "all" ? games : games.filter((g) => g.status === filter);

  const foundCount = games.filter((g) => g.status === "found").length;
  const lostCount = games.filter((g) => g.status === "lost").length;
  const possibleLostCount = games.filter((g) => g.status === "possible-lost").length;

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-600/8 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl shadow-lg shadow-blue-500/25">
              🎮
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Roblox Game Archive
                </span>
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Preserving Roblox gaming history — tracking found & lost games
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 py-10">
        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatsCard
            label="Total Games"
            value={games.length}
            color="border-gray-700/50"
          />
          <StatsCard
            label="Found"
            value={foundCount}
            color="border-emerald-500/30"
          />
          <StatsCard
            label="Lost"
            value={lostCount}
            color="border-red-500/30"
          />
          <StatsCard
            label="Possible Lost"
            value={possibleLostCount}
            color="border-amber-500/30"
          />
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(
            [
              { key: "all", label: "All Games" },
              { key: "found", label: "✅ Found" },
              { key: "lost", label: "❌ Lost" },
              { key: "possible-lost", label: "❓ Possible Lost" },
            ] as { key: "all" | GameStatus; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                filter === f.key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-800/80 text-gray-400 hover:bg-gray-700/80 hover:text-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Game list */}
        <div className="space-y-4">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-12 text-center">
              <div className="text-4xl">🔍</div>
              <p className="mt-3 text-gray-400">No games found with this filter.</p>
            </div>
          )}
        </div>

        {/* Info banner */}
        <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="text-2xl">📢</div>
            <div>
              <h3 className="font-bold text-blue-300">Help Us Archive!</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                Do you remember any old Roblox games that are no longer available? Do you
                have screenshots, videos, or any information about lost Roblox games? Every
                bit of information helps preserve Roblox gaming history. This archive is a
                work in progress — more games will be added over time.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
            Status Legend
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-sm">
                ✅
              </span>
              <div>
                <span className="font-semibold text-emerald-400">Found</span>
                <span className="ml-2 text-sm text-gray-500">
                  — Game is still playable or has been successfully archived
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-sm">
                ❓
              </span>
              <div>
                <span className="font-semibold text-amber-400">Possible Lost Media</span>
                <span className="ml-2 text-sm text-gray-500">
                  — Game may be lost; needs further investigation
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-sm">
                ❌
              </span>
              <div>
                <span className="font-semibold text-red-400">Lost Media</span>
                <span className="ml-2 text-sm text-gray-500">
                  — Game is confirmed lost and no longer accessible
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-16 border-t border-gray-800/80 bg-gray-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <p className="text-center text-sm text-gray-600">
            Roblox Game Archive • Preserving gaming history, one game at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
