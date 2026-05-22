import React, { type JSX, type SVGProps, useMemo } from 'react';

import GoogleIconSvg from './google-icon.svg?react';

type IconType = 'google';

type Props = SVGProps<SVGSVGElement> & {
  iconType: IconType;
};

const SvgIcon: React.FC<Props> = ({ iconType, ...props }) => {
  const icons: Record<IconType, JSX.Element> = useMemo(
    () => ({
      google: (
        <GoogleIconSvg className="size-4" aria-hidden="true" {...props} />
      ),
    }),
    [props]
  );

  return icons[iconType];
};

export default SvgIcon;
