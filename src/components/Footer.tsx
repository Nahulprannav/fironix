import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="soft-divider py-12 px-4 mt-12">
      <div className="container mx-auto max-w-6xl">
        <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt={SITE_NAME} className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-bold gradient-text">FIRONIX</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            (c) {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Building the future of technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
