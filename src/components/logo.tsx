import { Compass } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Compass className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold text-foreground">
        Career<span className="text-primary">Compass</span>
      </h1>
    </div>
  );
}
