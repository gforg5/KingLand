import { CONTINENTS } from "@/lib/api";

interface ContinentFilterProps {
  selected: string;
  onChange: (continent: string) => void;
}

export default function ContinentFilter({ selected, onChange }: ContinentFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CONTINENTS.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === c
              ? "gradient-accent text-primary-foreground shadow-glow"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-emerald/40"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
