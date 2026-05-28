import { Spinner } from '@/components/ui/spinner';

const AppSplash = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center"
    >
      <Spinner className="size-8 text-primary" />
    </div>
  );
};

export default AppSplash;
