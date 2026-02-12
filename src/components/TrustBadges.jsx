import React from 'react';
import { Clock, CheckCircle, Ruler } from 'lucide-react';
import { Badge } from './ui/badge';

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
      <Badge variant="green" className="gap-2">
        <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
        <span>&lt; 1 min</span>
      </Badge>
      <Badge variant="blue" className="gap-2">
        <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
        <span>5 etapas</span>
      </Badge>
      <Badge variant="purple" className="gap-2">
        <Ruler className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
        <span>Sob medida</span>
      </Badge>
    </div>
  );
}
