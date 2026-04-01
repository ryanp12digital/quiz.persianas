import React from 'react';
import { Clock, CheckCircle, Ruler } from 'lucide-react';
import { Badge } from './ui/badge';

const badgeClass =
  'shrink-0 gap-1 border px-2 py-0.5 text-[10px] leading-none font-semibold shadow-none sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs';

const iconClass = 'w-3 h-3 shrink-0 sm:w-3.5 sm:h-3.5';

export default function TrustBadges() {
  return (
    <div
      className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5 w-full max-w-md mx-auto"
      role="list"
      aria-label="Destaques do orçamento"
    >
      <Badge variant="green" className={badgeClass} role="listitem">
        <Clock className={iconClass} strokeWidth={2.25} aria-hidden />
        <span>&lt; 1 min</span>
      </Badge>
      <Badge variant="blue" className={badgeClass} role="listitem">
        <CheckCircle className={iconClass} strokeWidth={2.25} aria-hidden />
        <span>5 etapas</span>
      </Badge>
      <Badge variant="purple" className={badgeClass} role="listitem">
        <Ruler className={iconClass} strokeWidth={2.25} aria-hidden />
        <span>Sob medida</span>
      </Badge>
    </div>
  );
}
