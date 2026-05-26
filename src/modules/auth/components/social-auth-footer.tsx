import React from 'react';

import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SvgIcon from '@/components/ui/svg-icon';

import { AuthApi } from '../api';

type SocialAuthFooterProps = {
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
};

const SocialAuthFooter: React.FC<SocialAuthFooterProps> = ({
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  const handleGoogleAuth = (): void => {
    AuthApi.googleAuth();
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">
            or
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleAuth}
      >
        <SvgIcon iconType="google" />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {footerText}{' '}
        <Link
          to={footerLinkTo}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {footerLinkText}
        </Link>
      </p>
    </>
  );
};

export default SocialAuthFooter;
