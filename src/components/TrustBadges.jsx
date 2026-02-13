import React from 'react';
import { Clock, CheckCircle, Ruler } from 'lucide-react';
import { Badge } from './ui/badge';

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <Badge variant="green" className="gap-2 px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2} aria-hidden />
        <span>&lt; 1 min</span>
      </Badge>
      <Badge variant="blue" className="gap-2 px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm">
        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2} aria-hidden />
        <span>5 etapas</span>
      </Badge>
      <Badge variant="purple" className="gap-2 px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm">
        <Ruler className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={2} aria-hidden />
        <span>Sob medida</span>
      </Badge>
    </div>
  );
}
