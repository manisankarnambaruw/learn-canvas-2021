import { useRef, useEffect, useState } from "react";

function useCanvas(draw, options) {
  const canvasRef = useRef(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current,
      context = canvas.getContext(options?.context || "2d"),
      body = document.querySelector("body");
    let id = 0;

    canvas.height = options?.height || window.innerHeight;
    canvas.width = options?.width || body.offsetWidth;

    const drawCtx = !!draw ? draw(context) : null;

    const animate = () => {
      id = window.requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (!!drawCtx) drawCtx();
    };

    animate();

    const resizeFunc = function (e) {
      canvas.height = options?.height || window.innerHeight;
      canvas.width = options?.width || body.offsetWidth;
      setRefetch(!refetch);
      cancelAnimationFrame(id);
    };

    window.addEventListener("resize", resizeFunc);

    return () => {
      drawCtx()();
      context.clearRect(0, 0, canvas.width, canvas.height);
      window.removeEventListener("resize", resizeFunc);
      cancelAnimationFrame(id);
    };
  }, [draw, refetch]);

  return canvasRef;
}

export default useCanvas;
