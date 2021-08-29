import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Store/AuthContext";
import classes from "../styles/Home.module.css";

let ctx: any;
let window2: any;

let mouse = {
  x: 0,
  y: 0,
};

const colorArra = [
  "#9A77CF",
  "#843884",
  "#262254",
  "#A13670",
  "#EC4176",
  "#FFA45E",
];

const maxRadius = 50;
const minRadius = 5;

class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (
      this.x + this.radius >= window2.innerWidth ||
      this.x - this.radius <= 0
    ) {
      this.dx = this.dx * -1;
    }
    if (
      this.y - this.radius <= 0 ||
      this.y + this.radius >= window2.innerHeight
    ) {
      this.dy = this.dy * -1;
    }

    if (
      mouse.x - this.x > -100 &&
      mouse.x - this.x < 100 &&
      mouse.y - this.y > -100 &&
      mouse.y - this.y < 100
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.create();
  }
}

var circleArray: any[] = [];

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window2.innerWidth, window2.innerHeight);
  circleArray.forEach((circle) => {
    circle.update();
  });
}

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    if (authCtx.loginId && authCtx.isAdmin){
      router.replace('/admin/home')
    }
    else if(authCtx.loginId){
      router.replace('/profile')
    }
  })
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = 560;
      const context = canvas.getContext("2d");

      window.addEventListener("resize", function (event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      window.addEventListener("mousemove", function (event: any) {
        mouse.x = event.x;
        mouse.y = event.y;
      });
      if (context) {
        ctx = context;
        window2 = window;
        for (var i = 0; i < 500; i++) {
          let radius = minRadius;
          let x = Math.random() * (window.innerWidth - radius * 2) + radius;
          let y = Math.random() * (window.innerHeight - radius * 2) + radius;
          let yIncrement = Math.random() - 0.5;
          let xIncrement = Math.random() - 0.5;
          circleArray.push(
            new Circle(x, y, xIncrement, yIncrement, radius, colorArra[i % 6])
          );
        }
        animate();
      }
    }
  }, [mouse]);

  return (
    <>
      <Head>
        <title>PCRres.Lk</title>
      </Head>
      <div>
        <canvas
          className={classes.Canvas}
          id="myCanvas"
          ref={canvasRef}
        ></canvas>
        <div className={classes.Main}>
          <h1>PCRres.Lk</h1>
          <p>Your PCR Reporter</p>
        </div>
      </div>
    </>
  );
};

export default Home;
