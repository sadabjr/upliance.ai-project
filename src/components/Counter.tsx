import { animated, useSpring } from "react-spring";
import { Button, Box } from "@mui/material";

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Counter: React.FC<CounterProps> = ({ count, setCount }) => {
  
  const backgroundColor = useSpring({
    backgroundColor: `rgb(${count * 5}, ${255 - count * 5}, ${200 - count * 2})`,
    config: { tension: 170, friction: 26 } 
  });

  return (
    <animated.div style={backgroundColor}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={6}
        className="text-center"
        sx={{padding: "2rem" }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold">Counter: {count}</h2>

        <div className="flex gap-6 flex-wrap justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCount(count + 1)}
            className="px-8 py-3 text-sm sm:text-base"
          >
            +
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setCount(0);
            }}
            className="px-8 py-3 text-sm sm:text-base"
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCount(count - 1)}
            className="px-8 py-3 text-sm sm:text-base"
          >
            -
          </Button>
        </div>
      </Box>
    </animated.div>
  );
};

export default Counter;
