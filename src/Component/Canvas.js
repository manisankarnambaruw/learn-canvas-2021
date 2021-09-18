import styled from "styled-components";
import useCanvas from "../Hooks/useCanvas";

const CanvasWrapper = styled.canvas`
  background: white;
`;

function Canvas({ draw, options, ...rest }) {
  const canvasRef = useCanvas(draw, options);
  return <CanvasWrapper ref={canvasRef} {...rest} />;
}

export default Canvas;
