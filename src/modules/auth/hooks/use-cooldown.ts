import { useCallback, useEffect, useEffectEvent, useState } from 'react';

const COOLDOWN_SECONDS = 60;

const useCooldown = () => {
  const [cooldown, setCooldown] = useState(0);

  const onCooldown = useEffectEvent(() => {
    setCooldown((prev) => prev - 1);
  });

  const triggerCooldown = useCallback(
    (val?: number) => setCooldown(val ?? COOLDOWN_SECONDS),
    []
  );

  useEffect(() => {
    if (cooldown <= 0) return;

    const id = setTimeout(onCooldown, 1000);

    return () => clearTimeout(id);
  }, [cooldown]);

  return { cooldown, triggerCooldown };
};

export default useCooldown;
