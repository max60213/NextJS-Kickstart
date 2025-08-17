import { useEffect, useState } from 'react';

const BREAKPOINTS = {
  sm: 640, // min-width: 640px
  md: 768, // min-width: 768px
  lg: 1024, // min-width: 1024px
  xl: 1280, // min-width: 1280px
  "2xl": 1536, // min-width: 1536px
};

const getMinWidthQuery = (minWidth: number) => `(min-width: ${minWidth}px)`;
const getMaxWidthQuery = (maxWidth: number) => `(max-width: ${maxWidth - 1}px)`;

/**
 * useBreakpoints
 *
 * 提供語意化的斷點判斷（如 smUp, mdDown 等），可用於響應式元件顯示/隱藏。
 *
 * 斷點預設值：
 *   sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
 *
 * 回傳值：
 *   smUp   // >= 640px
 *   mdUp   // >= 768px
 *   lgUp   // >= 1024px
 *   xlUp   // >= 1280px
 *   2xlUp  // >= 1536px
 *   smDown // < 640px
 *   mdDown // < 768px
 *   lgDown // < 1024px
 *   xlDown // < 1280px
 *   2xlDown // < 1536px
 *
 * 用法範例：
 *   const { mdUp, mdDown } = useBreakpoints();
 *   if (mdUp) { ... } // >= 768px
 *   if (mdDown) { ... } // < 768px
 */
export function useBreakpoints() {
  const [matches, setMatches] = useState({
    smUp: false, mdUp: false, lgUp: false, xlUp: false, "2xlUp": false,
    smDown: true, mdDown: true, lgDown: true, xlDown: true, "2xlDown": true,
  });

  useEffect(() => {
    const mqls = {
      smUp: window.matchMedia(getMinWidthQuery(BREAKPOINTS.sm)),
      mdUp: window.matchMedia(getMinWidthQuery(BREAKPOINTS.md)),
      lgUp: window.matchMedia(getMinWidthQuery(BREAKPOINTS.lg)),
      xlUp: window.matchMedia(getMinWidthQuery(BREAKPOINTS.xl)),
      "2xlUp": window.matchMedia(getMinWidthQuery(BREAKPOINTS["2xl"])),
      smDown: window.matchMedia(getMaxWidthQuery(BREAKPOINTS.sm)),
      mdDown: window.matchMedia(getMaxWidthQuery(BREAKPOINTS.md)),
      lgDown: window.matchMedia(getMaxWidthQuery(BREAKPOINTS.lg)),
      xlDown: window.matchMedia(getMaxWidthQuery(BREAKPOINTS.xl)),
      "2xlDown": window.matchMedia(getMaxWidthQuery(BREAKPOINTS["2xl"])),
    };
    const handler = () => {
      setMatches({
        smUp: mqls.smUp.matches,
        mdUp: mqls.mdUp.matches,
        lgUp: mqls.lgUp.matches,
        xlUp: mqls.xlUp.matches,
        "2xlUp": mqls["2xlUp"].matches,
        smDown: mqls.smDown.matches,
        mdDown: mqls.mdDown.matches,
        lgDown: mqls.lgDown.matches,
        xlDown: mqls.xlDown.matches,
        "2xlDown": mqls["2xlDown"].matches,
      });
    };
    Object.values(mqls).forEach(mql => mql.addEventListener('change', handler));
    handler();
    return () => {
      Object.values(mqls).forEach(mql => mql.removeEventListener('change', handler));
    };
  }, []);

  return matches;
} 