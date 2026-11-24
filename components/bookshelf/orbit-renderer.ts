import type { OrbitBook } from "@/data/books";

type Vec3 = [number, number, number];
type Camera = { distance: number; sin: number; cos: number; aspect: number; radiusX: number };
type Mesh = { buffer: WebGLBuffer; vertices: number };
type Cover = { texture: WebGLTexture; aspect: number };

export type BookPose = {
  book: OrbitBook;
  angle: number;
  opacity: number;
  scale: number;
  depth: number;
  highlight: number;
};

const sphereRadius = 1.62;
const orbitDepth = 2.15;
const bookHeight = 1.62;
const bookThickness = 0.11;
const lens = 1 / Math.tan(38 * Math.PI / 360);
const maxYaw = 25 * Math.PI / 180;

const vertexSource = `
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec2 aUv;
  uniform vec3 uPosition;
  uniform vec3 uSize;
  uniform vec2 uRotation;
  uniform vec4 uCamera;
  uniform float uLens;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    mat3 rotation = mat3(uRotation.x, 0.0, -uRotation.y,
                         0.0, 1.0, 0.0,
                         uRotation.y, 0.0, uRotation.x);
    vec3 world = rotation * (aPosition * uSize) + uPosition;
    float depth = uCamera.x - (world.y * uCamera.y + world.z * uCamera.z);
    float height = world.y * uCamera.z - world.z * uCamera.y;
    gl_Position = vec4(world.x * uLens / uCamera.w, height * uLens,
                       depth * 1.002002 - 0.2002002, depth);
    vNormal = rotation * aNormal;
    vUv = aUv;
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform vec3 uMaterial;
  uniform vec3 uAccent;
  uniform vec3 uPaper;
  uniform vec3 uLook;
  uniform float uSphere;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    if (uSphere > 0.5) {
      float key = max(dot(normal, normalize(vec3(-0.65, 0.82, 0.62))), 0.0);
      float fill = max(dot(normal, normalize(vec3(0.67, 0.12, 0.32))), 0.0);
      float rim = pow(1.0 - max(normal.z, 0.0), 3.0);
      vec3 satin = uMaterial * (0.31 + key * 1.06 + fill * 0.23);
      gl_FragColor = vec4(satin + uAccent * rim * (0.18 + 0.36 * fill), 1.0);
    } else {
      vec3 color;
      if (vUv.x >= 0.0) {
        color = texture2D(uTexture, vUv).rgb;
      } else if (vUv.x > -1.5) {
        color = uPaper * (0.74 + 0.16 * abs(normal.y));
      } else {
        color = texture2D(uTexture, vec2(0.02, 0.5)).rgb * 0.76;
      }
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      color = mix(vec3(gray), color, mix(0.66, 1.0, uLook.y));
      color *= mix(0.67, 1.0, uLook.y);
      color = mix(color, uPaper, uLook.z * 0.09);
      gl_FragColor = vec4(color, uLook.x);
    }
  }
`;

function createProgram(gl: WebGLRenderingContext) {
  const shaders = [vertexSource, fragmentSource].map((source, index) => {
    const shader = gl.createShader(index === 0 ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  });
  const program = gl.createProgram();
  if (!program || shaders.some((shader) => !shader || !gl.getShaderParameter(shader, gl.COMPILE_STATUS))) {
    shaders.forEach((shader) => shader && gl.deleteShader(shader));
    if (program) gl.deleteProgram(program);
    return null;
  }

  for (const shader of shaders) gl.attachShader(program, shader!);
  gl.linkProgram(program);
  for (const shader of shaders) gl.deleteShader(shader);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  gl.deleteProgram(program);
  return null;
}

function sphereVertices() {
  const vertices: number[] = [];
  function vertex(row: number, col: number) {
    const phi = row / 32 * Math.PI;
    const theta = col / 48 * Math.PI * 2;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    vertices.push(x, y, z, x, y, z, 0, 0);
  }
  for (let row = 0; row < 32; row++) {
    for (let col = 0; col < 48; col++) {
      vertex(row, col);
      vertex(row + 1, col);
      vertex(row + 1, col + 1);
      vertex(row, col);
      vertex(row + 1, col + 1);
      vertex(row, col + 1);
    }
  }
  return vertices;
}

function bookVertices() {
  const vertices: number[] = [];
  const l = -0.5;
  const h = 0.5;
  function face(points: Vec3[], normal: Vec3, surface: number) {
    const uv = [[0, 0], [1, 0], [1, 1], [0, 1]];
    for (const i of [0, 1, 2, 0, 2, 3]) {
      vertices.push(...points[i], ...normal, surface === 0 ? uv[i][0] : surface, uv[i][1]);
    }
  }
  face([[l, l, h], [h, l, h], [h, h, h], [l, h, h]], [0, 0, 1], 0);
  face([[h, l, l], [l, l, l], [l, h, l], [h, h, l]], [0, 0, -1], -2);
  face([[h, l, h], [h, l, l], [h, h, l], [h, h, h]], [1, 0, 0], -1);
  face([[l, l, l], [l, l, h], [l, h, h], [l, h, l]], [-1, 0, 0], -2);
  face([[l, h, h], [h, h, h], [h, h, l], [l, h, l]], [0, 1, 0], -1);
  face([[l, l, l], [h, l, l], [h, l, h], [l, l, h]], [0, -1, 0], -1);
  return vertices;
}

function mesh(gl: WebGLRenderingContext, vertices: number[]): Mesh | null {
  const buffer = gl.createBuffer();
  if (!buffer) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  return { buffer, vertices: vertices.length / 8 };
}

function tokenRgb(style: CSSStyleDeclaration, name: string): Vec3 {
  const hex = style.getPropertyValue(name).trim().slice(1);
  return [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255) as Vec3;
}

function wrapText(context: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? line + " " + word : word;
    if (line && context.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function coverArtwork(book: OrbitBook, cover: HTMLCanvasElement, style: CSSStyleDeclaration) {
  const width = cover.width;
  const height = cover.height;
  const context = cover.getContext("2d")!;
  const palette = style.getPropertyValue("--color-spine-" + book.spineColor);
  const dark = style.getPropertyValue("--orbit-cover-ink");
  const light = style.getPropertyValue("--orbit-cover-paper");
  const ink = book.spineColor === "ink" ? light : dark;
  const idSum = Array.from(book.id).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const font = style.getPropertyValue("--font-serif");

  context.fillStyle = palette;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = ink;
  context.globalAlpha = 0.37;
  context.lineWidth = 2;
  context.strokeRect(15, 15, width - 30, height - 30);
  context.save();
  context.translate(width / 2, height * 0.69);
  context.rotate((idSum % 11 - 5) * Math.PI / 20);
  for (let i = 0; i < 5; i++) {
    context.beginPath();
    context.ellipse(0, 0, 22 + i * 11, 8 + i * 6, i * 0.59, 0, Math.PI * 2);
    context.stroke();
  }
  context.restore();
  context.globalAlpha = 1;
  context.fillStyle = ink;
  context.textAlign = "center";
  let size = Number(style.getPropertyValue("--orbit-art-title"));
  const minSize = Number(style.getPropertyValue("--orbit-art-title-min"));
  let lines: string[];
  do {
    context.font = size + "px " + font;
    lines = wrapText(context, book.title, width - 48);
    if (lines.length <= 3) break;
    size -= 2;
  } while (size >= minSize);
  lines.slice(0, 4).forEach((line, index) => {
    context.fillText(line, width / 2, 62 + index * size * 1.06, width - 48);
  });
  context.font = style.getPropertyValue("--orbit-art-author").trim() + "px " + font;
  const authors = wrapText(context, book.authors, width - 40).slice(0, 2);
  authors.forEach((line, index) => {
    context.fillText(line, width / 2, height - 34 - (authors.length - 1 - index) * 20, width - 40);
  });
}

function nearestBoxHit(origin: Vec3, ray: Vec3, center: Vec3, size: Vec3, yaw: number) {
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const offset = origin.map((value, axis) => value - center[axis]) as Vec3;
  const local: Vec3 = [offset[0] * cos - offset[2] * sin, offset[1], offset[0] * sin + offset[2] * cos];
  const direction: Vec3 = [ray[0] * cos - ray[2] * sin, ray[1], ray[0] * sin + ray[2] * cos];
  let near = 0;
  let far = Infinity;
  for (let i = 0; i < 3; i++) {
    const half = size[i] / 2;
    if (Math.abs(direction[i]) < 0.00001) {
      if (Math.abs(local[i]) > half) return Infinity;
      continue;
    }
    const a = (-half - local[i]) / direction[i];
    const b = (half - local[i]) / direction[i];
    near = Math.max(near, Math.min(a, b));
    far = Math.min(far, Math.max(a, b));
    if (near > far) return Infinity;
  }
  return near;
}

export function createOrbitRenderer(canvas: HTMLCanvasElement, invalidate: () => void) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) return null;
  const program = createProgram(gl);
  if (!program) return null;
  const sphere = mesh(gl, sphereVertices());
  const bookMesh = mesh(gl, bookVertices());
  const neutral = gl.createTexture();
  if (!sphere || !bookMesh || !neutral) {
    gl.deleteProgram(program);
    if (sphere) gl.deleteBuffer(sphere.buffer);
    if (bookMesh) gl.deleteBuffer(bookMesh.buffer);
    if (neutral) gl.deleteTexture(neutral);
    return null;
  }

  const style = getComputedStyle(canvas);
  const covers = new Map<string, Cover>();
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const position = uniform("uPosition");
  const size = uniform("uSize");
  const rotation = uniform("uRotation");
  const look = uniform("uLook");
  const isSphere = uniform("uSphere");
  const cameraUniform = uniform("uCamera");
  const attributes = ["aPosition", "aNormal", "aUv"].map((name) => gl.getAttribLocation(program, name));
  const sphereScale: Vec3 = [sphereRadius, sphereRadius, sphereRadius];
  const camera: Camera = { distance: 9, sin: 0, cos: 1, aspect: 1, radiusX: 2.85 };
  let disposed = false;
  let drawn: Array<{ pose: BookPose; center: Vec3; size: Vec3; yaw: number; cover: Cover }> = [];

  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.bindTexture(gl.TEXTURE_2D, neutral);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.uniform1f(uniform("uLens"), lens);
  gl.uniform3fv(uniform("uMaterial"), tokenRgb(style, "--orbit-sphere"));
  gl.uniform3fv(uniform("uAccent"), tokenRgb(style, "--orbit-accent"));
  gl.uniform3fv(uniform("uPaper"), tokenRgb(style, "--orbit-paper"));
  attributes.forEach((attribute) => gl.enableVertexAttribArray(attribute));

  function bind(target: Mesh) {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, target.buffer);
    gl!.vertexAttribPointer(attributes[0], 3, gl!.FLOAT, false, 32, 0);
    gl!.vertexAttribPointer(attributes[1], 3, gl!.FLOAT, false, 32, 12);
    gl!.vertexAttribPointer(attributes[2], 2, gl!.FLOAT, false, 32, 24);
  }

  function loadCover(book: OrbitBook) {
    const cached = covers.get(book.id);
    if (cached) return cached;
    const texture = gl!.createTexture();
    if (!texture) return null;
    const cover = { texture, aspect: 2 / 3 };
    const artwork = document.createElement("canvas");
    artwork.width = 256;
    artwork.height = 384;
    coverArtwork(book, artwork, style);
    function upload(source: HTMLCanvasElement | HTMLImageElement) {
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, source);
    }
    upload(artwork);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
    covers.set(book.id, cover);
    if (book.coverUrl) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        if (disposed) return;
        try {
          upload(image);
          cover.aspect = image.naturalWidth / image.naturalHeight;
          invalidate();
        } catch {
          // Keep the generated cover if the image cannot be uploaded.
        }
      };
      image.src = book.coverUrl;
    }
    return cover;
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    camera.aspect = width / height;
    camera.radiusX = Math.min(2.85, Math.max(2.16, width / 210));
    let distance = 8.35;
    for (let i = 0; i < 36; i++) {
      const angle = i * Math.PI / 18;
      const edge = Math.abs(Math.sin(angle) * camera.radiusX) + 0.69;
      distance = Math.max(distance, Math.cos(angle) * orbitDepth + edge * lens / (camera.aspect * 0.94));
    }
    camera.distance = distance;
    camera.sin = 0.25 / distance;
    camera.cos = Math.sqrt(1 - camera.sin ** 2);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform4f(cameraUniform, camera.distance, camera.sin, camera.cos, camera.aspect);
  }

  function render(poses: BookPose[]) {
    drawn = [];
    for (const pose of poses) {
      if (pose.opacity <= 0.005) continue;
      const cover = loadCover(pose.book);
      if (!cover) continue;
      const height = bookHeight * pose.scale * Math.min(1, 0.8 / cover.aspect);
      drawn.push({
        pose,
        cover,
        center: [Math.sin(pose.angle) * camera.radiusX, 0, Math.cos(pose.angle) * orbitDepth],
        size: [height * cover.aspect, height, bookThickness * pose.scale],
        yaw: -Math.sin(pose.angle) * maxYaw,
      });
    }
    drawn.sort((a, b) => a.center[2] - b.center[2]);
    gl!.depthMask(true);
    gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
    gl!.disable(gl!.BLEND);
    gl!.disable(gl!.CULL_FACE);
    gl!.bindTexture(gl!.TEXTURE_2D, neutral);
    gl!.uniform1f(isSphere, 1);
    gl!.uniform3f(position, 0, 0, 0);
    gl!.uniform3fv(size, sphereScale);
    gl!.uniform2f(rotation, 1, 0);
    bind(sphere!);
    gl!.drawArrays(gl!.TRIANGLES, 0, sphere!.vertices);

    gl!.enable(gl!.BLEND);
    gl!.enable(gl!.CULL_FACE);
    gl!.depthMask(false);
    gl!.uniform1f(isSphere, 0);
    bind(bookMesh!);
    for (const { pose, center, size: dimensions, yaw, cover } of drawn) {
      gl!.bindTexture(gl!.TEXTURE_2D, cover.texture);
      gl!.uniform3fv(position, center);
      gl!.uniform3fv(size, dimensions);
      gl!.uniform2f(rotation, Math.cos(yaw), Math.sin(yaw));
      gl!.uniform3f(look, pose.opacity, pose.depth, pose.highlight);
      gl!.drawArrays(gl!.TRIANGLES, 0, bookMesh!.vertices);
    }
  }

  function pick(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    const x = (2 * (clientX - rect.left) / rect.width - 1) * camera.aspect / lens;
    const y = (1 - 2 * (clientY - rect.top) / rect.height) / lens;
    const ray: Vec3 = [x, y * camera.cos - camera.sin, -y * camera.sin - camera.cos];
    const origin: Vec3 = [0, camera.distance * camera.sin, camera.distance * camera.cos];
    const speed = Math.hypot(...ray);
    const dot = origin[1] * ray[1] + origin[2] * ray[2];
    const discriminant = dot ** 2 - speed ** 2 * (camera.distance ** 2 - sphereRadius ** 2);
    let distance = discriminant < 0 ? Infinity : (-dot - Math.sqrt(discriminant)) / speed ** 2;
    let hit: (typeof drawn)[number] | null = null;
    for (const entry of drawn) {
      if (entry.pose.depth < 0.47 || entry.pose.opacity < 0.48) continue;
      const depth = nearestBoxHit(origin, ray, entry.center, entry.size, entry.yaw);
      if (depth < distance) {
        distance = depth;
        hit = entry;
      }
    }
    if (!hit) return null;
    const [cx, cy, cz] = hit.center;
    const depth = camera.distance - (cy * camera.sin + cz * camera.cos);
    return {
      book: hit.pose.book,
      x: (1 + cx * lens / (depth * camera.aspect)) / 2,
      y: (1 - (cy * camera.cos - cz * camera.sin) * lens / depth) / 2,
    };
  }

  function dispose() {
    disposed = true;
    covers.forEach(({ texture }) => gl!.deleteTexture(texture));
    gl!.deleteTexture(neutral);
    gl!.deleteBuffer(sphere!.buffer);
    gl!.deleteBuffer(bookMesh!.buffer);
    gl!.deleteProgram(program!);
  }

  return { resize, render, pick, dispose };
}
