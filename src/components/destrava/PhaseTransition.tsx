import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  phaseKey: string;
  children: ReactNode;
};

const EXIT_MS = 180;

/**
 * Cross-fades between screens: the outgoing screen eases out (fade + slight
 * lift + blur) before the incoming one glides in with staggered children.
 */
export function PhaseTransition({ phaseKey, children }: Props) {
  const [shown, setShown] = useState({ key: phaseKey, node: children });
  const [leaving, setLeaving] = useState(false);
  const pending = useRef<{ key: string; node: ReactNode } | null>(null);

  // Keep the visible node fresh while the key is unchanged (internal steps).
  useEffect(() => {
    if (phaseKey === shown.key) {
      setShown({ key: phaseKey, node: children });
      return;
    }
    pending.current = { key: phaseKey, node: children };
    setLeaving(true);
    const t = window.setTimeout(() => {
      if (pending.current) setShown(pending.current);
      pending.current = null;
      setLeaving(false);
    }, EXIT_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey, children]);

  return (
    <div className="phase-stage">
      <div
        key={shown.key}
        className={leaving ? "phase-leave" : "phase-enter stagger-in"}
      >
        {shown.node}
      </div>
    </div>
  );
}
