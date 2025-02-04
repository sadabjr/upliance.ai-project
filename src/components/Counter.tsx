import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const Counter = () => {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('counter');
    return saved ? parseInt(saved) : 0;
  });

  const [springs, api] = useSpring(() => ({
    from: { backgroundColor: 'rgb(243, 244, 246)' } as { backgroundColor: string },
  }));

  useEffect(() => {
    localStorage.setItem('counter', count.toString());
    
    api.start({
      backgroundColor: `rgb(${Math.min(255, 200 + count * 5)}, 244, 246)`,
    });
  }, [count, api]);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <animated.div
      style={springs}
      className="p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm bg-white/50 max-w-sm mx-auto border border-gray-100"
    >
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {count}
        </h2>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={decrement}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-400 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/25 text-xl font-bold"
          >
            -
          </button>
          <button
            onClick={reset}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500 text-white rounded-full hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-gray-500/25 text-sm font-medium"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-500 text-white rounded-full hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/25 text-xl font-bold"
          >
            +
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default Counter;
