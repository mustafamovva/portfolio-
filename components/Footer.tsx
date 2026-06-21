export default function Footer() {
  return (
    <footer className="relative mx-auto mt-[90px] flex max-w-[1180px] flex-wrap items-center justify-between gap-[18px] border-t border-white/[0.06] px-[6vw] pb-11 pt-[50px]">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-gradient-to-br from-primary to-violet font-display text-[13px] font-bold text-heading">
          MM
        </span>
        <span className="font-mono text-xs text-muted">
          © 2026 Mustafa Mahmoud
        </span>
      </div>
      <div className="font-mono text-xs text-faint">
        Built from code to production.
      </div>
    </footer>
  );
}
