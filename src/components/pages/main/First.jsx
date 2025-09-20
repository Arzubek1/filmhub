"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./First.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/Card/Card";
import { getFIRST, getToday } from "@/redux/mainSlice";
import { AnimatePresence, motion } from "framer-motion";

const SCROLL_THRESHOLD_PX = 300;

const First = () => {
  const scrollRef = useRef(null);
  const rafRef = useRef(0);

  const dispatch = useDispatch();
  const { main, today } = useSelector((s) => s.firstReducer);
  const [route, setRoute] = useState(false);

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  useEffect(() => {
    dispatch(getFIRST());
    dispatch(getToday());
  }, [dispatch]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handle = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollLeft = el.scrollLeft;
        const max = el.scrollWidth - el.clientWidth;
        setShowLeftFade(scrollLeft > SCROLL_THRESHOLD_PX + 300);
        setShowRightFade(scrollLeft < Math.max(0, max - SCROLL_THRESHOLD_PX));
      });
    };

    handle();

    el.addEventListener("scroll", handle, { passive: true });
    const ro = new ResizeObserver(handle);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", handle);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [route, main, today]); 

  return (
    <section id={styles.first}>
      <div className="container">
        <div className={styles.route}>
          <div
            className={`${styles.bg} ${route ? styles.activebg : styles.notbg}`}
          />
          <h4
            className={styles.left}
            onClick={() => {
              setRoute(false);
              if (scrollRef.current) scrollRef.current.scrollLeft = 0;
            }}
            style={{ color: route ? "#52b69a" : "#d8f3dc" }}
          >
            Week
          </h4>
          <h4
            className={styles.right}
            onClick={() => {
              setRoute(true);
              if (scrollRef.current) scrollRef.current.scrollLeft = 0;
            }}
            style={{ color: !route ? "#52b69a" : "#d8f3dc" }}
          >
            Today
          </h4>
        </div>

        <div className={styles.content}>
          {/* overlay fades */}
          <div
            className={styles.fadeLeft}
            style={{ opacity: showLeftFade ? 1 : 0 }}
            aria-hidden
          />
          <div
            className={styles.fadeRight}
            style={{ opacity: showRightFade ? 1 : 0 }}
            aria-hidden
          />

            <motion.div
              ref={scrollRef}
              key={route ? "today" : "week"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={styles.block}
            >
              {(route ? today : main)?.map((el, idx) => (
                <Card el={el} key={el.id || idx} />
              ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default First;
