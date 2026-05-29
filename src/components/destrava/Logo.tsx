export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-9 w-9 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-primary-foreground"
          aria-hidden="true"
        >
          <path
            d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 7h7M8 11h7M8 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">
          DESTRAVA<span className="text-gradient">Ê</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
          leia · pense · destrave
        </span>
      </div>
    </div>
  );
}
