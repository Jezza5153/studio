import Link from 'next/link';
import { type Maker } from '@/content/site-content';
import { MapPin, X, ExternalLink } from 'lucide-react';

type MakerDetailProps = {
  maker: Maker;
  onClose: () => void;
};

export default function MakerDetail({ maker, onClose }: MakerDetailProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="maker-detail-title"
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div
        className="absolute inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[720px] rounded-t-2xl sm:rounded-2xl border border-border bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary/80">
                Maker
              </p>
              <h3 id="maker-detail-title" className="font-headline text-2xl">{maker.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                {maker.location && (
                  <>
                    <MapPin className="h-3.5 w-3.5" />
                    {maker.location}
                  </>
                )}
              </p>
            </div>
            <button
              className="inline-flex rounded-xl border border-border p-1.5 hover:bg-muted"
              onClick={onClose}
              aria-label="Sluiten"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3 text-foreground/90 max-h-[50vh] overflow-y-auto pr-2">
            <p className="font-medium">{maker.blurb}</p>
            {maker.story?.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-5 flex gap-2">
            {maker.website && (
              <Link
                href={maker.website}
                target="_blank"
                prefetch={false}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Bezoek website <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Link>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-border px-3 py-1.5 text-sm hover:bg-muted"
            >
              Sluiten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
