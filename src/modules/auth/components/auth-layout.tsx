import type { ReactNode } from 'react';

type AuthLayoutProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const AuthLayout = ({
  title,
  description,
  children,
}: AuthLayoutProps) => {
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </header>
        {children}
      </div>
    </main>
  );
};
