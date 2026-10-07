declare module 'ogl' {
  export class Renderer {
    constructor(options?: Record<string, unknown>);
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
    setSize(width: number, height: number): void;
    render(options: { scene: Mesh }): void;
  }

  export class Color {
    constructor(color: string);
    r: number;
    g: number;
    b: number;
  }

  export class Program {
    constructor(gl: WebGLRenderingContext, options: Record<string, unknown>);
    uniforms: Record<string, { value: unknown }>;
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
    attributes: Record<string, unknown>;
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: { geometry: Triangle; program: Program });
  }
}
