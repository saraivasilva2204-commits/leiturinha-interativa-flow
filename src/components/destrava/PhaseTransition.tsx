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
  const [visibleKey, setVisibleKey] = useState(phaseKey);
  const [leaving, setLeaving] = useState(false);
  const nodeRef = useRef<ReactNode>(children);

  if (phaseKey === visibleKey) {
    // keep the rendered node fresh for internal steps of the same screen
    nodeRef.current = children;
  }

  useEffect(() => {
    if (phaseKey === visibleKey) return;
    setLeaving(true);
    const t = window.setTimeout(() => {
      setVisibleKey(phaseKey);
      setLeaving(false);
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [phaseKey, visibleKey]);

  return (
    <div className="phase-stage">
      <div
        key={visibleKey}
        className={leaving ? "phase-leave" : "phase-enter stagger-in"}
      >
        {nodeRef.current}
      </div>
    </div>
  );
}
