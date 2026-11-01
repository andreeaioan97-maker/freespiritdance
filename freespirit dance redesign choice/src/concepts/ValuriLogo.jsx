import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import * as c from '../content.js';
import { In } from './Valuri.jsx';
import './valuri-logo.css';

const COPIES = 3;
const SPEED = 45; // px per second

function Ring({ text, id, className, style }) {
  return (
    <motion.svg className={className} style={style} viewBox="0 0 400 400" aria-hidden="true">
      <defs><path id={id} d="M 200,200 m -184,0 a 184,184 0 1,1 368,0 a 184,184 0 1,1 -368,0" /></defs>
      <text><textPath href={`#${id}`} textLength="1140">{text}</textPath></text>
    </motion.svg>
  );
}

export function PhotoRing() {
  const { scrollY } = useScroll();
  const rotate = useSpring(useTransform(scrollY, [0, 1200], [0, 300]), { stiffness: 70, damping: 20 });
  return (
    <div className="vl-ring-turn">
      <Ring id="vl-ring" className="vl-ring" text={`${c.hero.tagline} · ${c.hero.tagline} · ${c.hero.tagline} · `} style={{ rotate }} />
    </div>
  );
}

// Idea 7's instructor strip with no ends: it moves by itself and can be dragged or swiped either way.
function EndlessReel() {
  const track = useRef(null);
  const offset = useRef(0);
  const setWidth = useRef(0);
  const drag = useRef(null);
  const moved = useRef(false);
  const fling = useRef(0);
  const hovering = useRef(false);
  const still = useRef(false);
  const x = useMotionValue(0);

  useEffect(() => {
    still.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const measure = () => {
      const second = track.current?.children[c.team.length];
      setWidth.current = second ? second.offsetLeft - track.current.children[0].offsetLeft : 0;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track.current);
    return () => observer.disconnect();
  }, []);

  const place = () => {
    const w = setWidth.current;
    if (w) offset.current = ((offset.current % w) + w) % w;
    x.set(-offset.current);
  };

  useAnimationFrame((_, delta) => {
    if (drag.current) return;
    const dt = Math.min(delta, 50) / 1000;
    fling.current *= Math.exp(-3 * dt);
    if (Math.abs(fling.current) < 5) fling.current = 0;
    const cruise = hovering.current || still.current ? 0 : SPEED;
    offset.current += (cruise + fling.current) * dt;
    place();
  });

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { id: e.pointerId, lastX: e.clientX, lastT: e.timeStamp, startX: e.clientX, v: 0 };
    moved.current = false;
    fling.current = 0;
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const step = e.clientX - d.lastX;
    if (!moved.current && Math.abs(e.clientX - d.startX) > 6) {
      moved.current = true;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* the pointer already ended */ }
    }
    if (moved.current) {
      offset.current -= step;
      place();
      d.v = -step / Math.max(e.timeStamp - d.lastT, 1) * 1000;
    }
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const onPointerEnd = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (moved.current) fling.current = Math.max(-2500, Math.min(2500, d.v));
    drag.current = null;
  };

  const figures = Array.from({ length: COPIES }, (_, copy) => c.team.map((t) => ({ ...t, copy }))).flat();
  return (
    <div
      className="af-reel vl-reel"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') hovering.current = true; }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') hovering.current = false; }}
      onFocus={() => { hovering.current = true; }}
      onBlur={() => { hovering.current = false; }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } }}
      onDragStart={(e) => e.preventDefault()}
    >
      <motion.div ref={track} className="vl-reel-track" style={{ x }}>
        {figures.map((t, i) => (
          <figure key={i} aria-hidden={t.copy > 0 || undefined}>
            <img src={t.image} alt={t.copy ? '' : t.name} loading={t.copy ? undefined : 'lazy'} />
            <figcaption>
              <strong>{t.name}</strong>
              <span><a href={t.facebook} tabIndex={t.copy ? -1 : 0}>Facebook</a> · <a href={t.instagram} tabIndex={t.copy ? -1 : 0}>Instagram</a></span>
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

export function Team() {
  return (
    <section className="vl-team" id="echipa">
      <In className="va-head"><h2>{c.teamIntro.title}</h2><p>{c.teamIntro.text}</p></In>
      <EndlessReel />
    </section>
  );
}
