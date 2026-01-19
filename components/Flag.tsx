'use client';

import React, { memo, useMemo } from 'react';

interface FlagProps {
  /** ISO-2 country code */
  iso2: string;
  /** Use SVG instead of PNG */
  useSVG?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Flag size (width in pixels) */
  size?: number;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Country flag component using CDN-hosted flag images
 * 
 * Uses flagcdn.com for reliable flag delivery
 */
const Flag: React.FC<FlagProps> = memo(({
  iso2,
  useSVG = true,
  className = '',
  size = 24,
  alt,
}) => {
  const code = iso2.toLowerCase();
  
  const src = useMemo(() => {
    // Use flagcdn.com - reliable CDN for country flags
    const format = useSVG ? 'svg' : 'png';
    
    if (useSVG) {
      return `https://flagcdn.com/${code}.svg`;
    }
    
    // For PNG, use width parameter
    const width = Math.min(Math.max(size * 2, 40), 256); // 2x for retina, min 40, max 256
    return `https://flagcdn.com/w${width}/${code}.png`;
  }, [code, useSVG, size]);

  const imgAlt = alt || `${iso2} flag`;

  // Calculate height based on standard flag aspect ratio (3:2)
  const height = Math.round(size * (2 / 3));

  return (
    <img
      src={src}
      alt={imgAlt}
      className={`antd-country-phone-input-flag ${className}`.trim()}
      width={size}
      height={height}
      loading="lazy"
      style={{
        width: size,
        height: height,
        objectFit: 'cover',
        borderRadius: 2,
        verticalAlign: 'middle',
      }}
      onError={(e) => {
        // Fallback: hide the image if it fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );
});

Flag.displayName = 'Flag';

export { Flag };
export type { FlagProps };
export default Flag;
