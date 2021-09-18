import Canvas from "../Component/Canvas";
import { getRandom } from "../utils";

function Animation() {
  let balls = [];

  const colors = ["#79B4B7", "#E9896A", "#387C6D", "#343F56"];

  const percentOfBallsSpace = 0.3; //12%

  const hoverSize = 75;

  function Ball(x, y, radius, dx, dy, colorIndex, radiusMultiplier) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colors[colorIndex];
    this.hoverRadius = this.radius * radiusMultiplier;

    this.draw = (ctx, radiusOfCircle) => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, radiusOfCircle, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = this.color;
    };

    this.update = (ctx, mouse) => {
      const width = ctx.canvas.offsetWidth,
        height = ctx.canvas.offsetHeight;

      let radiusOfCircle = this.radius;

      if (mouse.x && mouse.y) {
        if (
          mouse.x + hoverSize >= this.x &&
          mouse.x - hoverSize <= this.x &&
          mouse.y + hoverSize >= this.y &&
          mouse.y - hoverSize <= this.y
        ) {
          radiusOfCircle = this.hoverRadius;
        }
      }

      if (this.x + radiusOfCircle >= width || this.x - radiusOfCircle <= 0) {
        this.dx = -this.dx;
      }

      if (this.y + radiusOfCircle >= height || this.y - radiusOfCircle <= 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw(ctx, radiusOfCircle);
    };
  }

  const draw = (ctx) => {
    balls = [];
    let mouse = {};
    const width = ctx.canvas.offsetWidth,
      height = ctx.canvas.offsetHeight,
      onMouseMove = function (e) {
        mouse["x"] = e.clientX;
        mouse["y"] = e.clientY;
      };

    for (let i = 0; i < width * percentOfBallsSpace; i++) {
      const radius = getRandom(7),
        x = getRandom(width - radius),
        y = getRandom(height - radius),
        dx = (Math.round(getRandom(i)) % 2 === 0 ? -1 : 1) * getRandom(3),
        dy = (Math.round(getRandom(i)) % 2 === 0 ? 1 : -1) * getRandom(2),
        colorIndex = getRandom(4),
        hoverRadius = getRandom(14);

      balls.push(new Ball(x, y, radius, dx, dy, colorIndex, hoverRadius));
    }

    ctx.canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      balls.forEach((ball) => ball.update(ctx, mouse));
      return () => {
        ctx.canvas.removeEventListener("mousemove", onMouseMove);
      };
    };
  };

  return <Canvas draw={draw} />;
}
export default Animation;
