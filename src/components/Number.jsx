import { useState, useEffect, useRef } from "react";

const Number = ({ start }) => {
  const numberValue = [
    {
      id: 1001,
      startValue: 200,
      value: 237.1,
      unit: "MW",
      desc: "總交易容量",
    },
    {
      id: 1002,
      startValue: 20,
      value: 47.4,
      unit: "MW",
      desc: "即時備轉交易容量",
    },
    {
      id: 1003,
      startValue: 100,
      value: 189.7,
      unit: "MW",
      desc: "補充備轉交易容量",
    },
    {
      id: 1004,
      startValue: 9940000,
      value: 9950000,
      unit: "度",
      desc: "累計轉供度數",
    },
    {
      id: 1005,
      startValue: 9500,
      value: 9950,
      unit: "張",
      desc: "累績再生能源憑證交易量",
    },
  ];
  const [displayValues, setDisplayValues] = useState(
    numberValue.map((item) => item.startValue),
  );

  const animationRef = useRef(null);

  useEffect(() => {
    if (!start) {
      console.log("123");
      return;
    }
    const duration = 3000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValues = numberValue.map((item) => {
        return item.startValue + (item.value - item.startValue) * progress;
      });

      setDisplayValues(newValues);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [start]);

  //   const startAnimation = () => {
  //     const duration = 3000; // 3 秒
  //     const startTime = performance.now();

  //     const animate = (currentTime) => {
  //       const elapsed = currentTime - startTime;
  //       const progress = Math.min(elapsed / duration, 1);

  //       const newValues = numberValue.map((item) => {
  //         const current =
  //           item.startValue + (item.value - item.startValue) * progress;

  //         return current;
  //       });

  //       setDisplayValues(newValues);

  //       if (progress < 1) {
  //         animationRef.current = requestAnimationFrame(animate);
  //       }
  //     };

  //     animationRef.current = requestAnimationFrame(animate);
  //   };
  return (
    <div>
      <button>開始跑數字</button>
      {numberValue.map((item, index) => (
        <div key={item.id} style={{ margin: "10px 0" }}>
          <h2>
            {displayValues[index].toLocaleString(undefined, {
              maximumFractionDigits: 1,
            })}
            {item.unit}
          </h2>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Number;
