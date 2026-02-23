import { useState, useEffect, useRef } from "react";
import Number from "@/components/Number";
import styles from "./Home.module.css";

import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/services/analytics.service";

const Home = () => {
  const images = ["/img/1.jpg", "/img/2.jpg", "/img/3.jpg", "/img/4.jpg"];
  const extendedImages = [
    images[images.length - 1], // 最後一張 clone
    ...images,
    images[0], // 第一張 clone
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  const timerRef = useRef(null);

  const startAutoPlay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
  };

  const nextSlide = () => {
    if (isLocked) return; // 🚫 防爆
    setIsLocked(true); // 🔒 上鎖
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isLocked) return; // 🚫 防爆
    setIsLocked(true); // 🔒 上鎖
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === extendedImages.length - 1) {
      setIsAnimating(false);
      setCurrentIndex(1);
      return;
    }

    if (currentIndex === 0) {
      setIsAnimating(false);
      setCurrentIndex(images.length);
      return;
    }

    // ✅ 正常滑動結束（不是 clone）
    setIsLocked(false);
  };

  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setIsLocked(false); // 🔓 最終解鎖
      });
    }
  }, [isAnimating]);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 頁籤不可見 → 停掉 autoplay
        clearInterval(timerRef.current);
      } else {
        // 回到頁籤 → 重啟 autoplay
        startAutoPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // ---------------------------------
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalyticsData().then(setData).catch(console.error);
  }, []);
  useEffect(() => {
    fetchAnalyticsData().then(setData).catch(console.error);
  }, []);

  const handleSubmit = async () => {
    try {
      await createClient({
        name: "Test Client",
        email: "test@test.com",
      });
      alert("建立成功");
    } catch (err) {
      console.error(err);
    }
  };
  // -----------------------------number-----------------
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect(); // ⭐ 只觸發一次
        }
      },
      { threshold: 0.3 }, // 進入 30% 才觸發
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.bannerSection}>
        <div className={styles.carouselWindow}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: isAnimating ? "transform 0.5s ease" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedImages.map((src, index) => (
              <img key={index} src={src} />
            ))}
          </div>
          {/* 左按鈕 */}
          <button
            className={`${styles.controlBtn} ${styles.leftBtn} ${isLocked ? styles.locked : ""}`}
            onClick={() => {
              prevSlide();
              startAutoPlay(); // 點擊後重啟 autoplay
            }}
          >
            ‹
          </button>
          {/* 右按鈕 */}
          <button
            className={`${styles.controlBtn} ${styles.rightBtn} ${isLocked ? styles.locked : ""}`}
            onClick={() => {
              nextSlide();
              startAutoPlay(); // 點擊後重啟 autoplay
            }}
          >
            ›
          </button>
        </div>
      </div>
      <div className={styles.otherst}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={handleSubmit}>送出</button>
      </div>
      <div ref={sectionRef} className={styles.numberst}>
        <Number start={start} />
      </div>
    </>
  );
};

export default Home;
