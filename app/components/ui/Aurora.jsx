"use client";

import { useEffect, useRef } from "react";
import "./Aurora.css";

export default function Aurora({
  colorStops = ["#5227FF", "#7C4DFF", "#ff4d5a"],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.5,
  ...rest
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctn = containerRef.current;
    if (!ctn) return;

    let cancelled = false;
    let raf = 0;
    let cleanup = () => {};

    const init = async () => {
      if (cancelled || typeof window === "undefined") return;

      const { Renderer, Program, Mesh, Color, Triangle } = await import("ogl");
      if (cancelled || typeof window === "undefined") return;

      const renderer = new Renderer({ alpha: true, antialias: true });
      const gl = renderer.gl;
      ctn.appendChild(gl.canvas);

      gl.clearColor(0, 0, 0, 0);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: `
          attribute vec2 position;
          attribute vec2 uv;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform float uTime;
          uniform vec3 uColor0;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform float uAmplitude;
          uniform float uBlend;
          varying vec2 vUv;

          vec3 hash3(vec2 p) {
            vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
            return fract(sin(q) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(dot(hash3(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), dot(hash3(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                       mix(dot(hash3(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash3(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
          }

          void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            float n = noise(uv * 3.0 + vec2(uTime * 0.05, uTime * 0.03));
            float wave = sin(uv.y * 8.0 + uTime * 0.6) * 0.5 + sin(uv.x * 5.0 - uTime * 0.4) * 0.3;
            float mask = smoothstep(0.2, 1.0, 0.5 + 0.5 * sin(uv.x * 3.0 + uTime * 0.15 + n * 2.0));
            vec3 col = mix(uColor0, uColor1, smoothstep(-1.0, 1.0, wave + uAmplitude * 0.4));
            col = mix(col, uColor2, smoothstep(0.2, 0.9, n + mask * 0.5));
            gl_FragColor = vec4(col, 1.0 - uBlend * 0.2);
          }
        `,
        uniforms: {
          uTime: { value: 0 },
          uColor0: { value: new Color(colorStops[0]).rgb },
          uColor1: { value: new Color(colorStops[1]).rgb },
          uColor2: { value: new Color(colorStops[2]).rgb },
          uAmplitude: { value: amplitude },
          uBlend: { value: blend },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      const resize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        mesh.scale.set(width, height, 1);
      };

      resize();
      window.addEventListener("resize", resize);

      const animate = () => {
        program.uniforms.uTime.value += speed * 0.016;
        renderer.render({ scene: mesh });
        raf = window.requestAnimationFrame(animate);
      };

      animate();

      cleanup = () => {
        if (raf) window.cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        if (container) container.innerHTML = "";
      };
    };

    void init();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [amplitude, blend, colorStops, speed]);

  return <div ref={containerRef} className="aurora-shell" {...rest} />;
}
