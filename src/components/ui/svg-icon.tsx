import React, { type JSX, type SVGProps, useMemo } from 'react';

import GoogleIconSvg from '@/assets/google-icon.svg?react';
import Logo from '@/assets/logo.svg?react';

type IconType = 'google' | 'logo';

type Props = SVGProps<SVGSVGElement> & {
  iconType: IconType;
};

const SvgIcon: React.FC<Props> = ({ iconType, ...props }) => {
  const icons: Record<IconType, JSX.Element> = useMemo(
    () => ({
      google: (
        <GoogleIconSvg className="size-4" aria-hidden="true" {...props} />
      ),
      logo: <Logo className="size-4" aria-hidden="true" {...props} />,
    }),
    [props]
  );

  return icons[iconType];
};

export default SvgIcon;
