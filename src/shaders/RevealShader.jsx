
export const Vertex = `
// precision mediump float;

// uniform float uTime;
// uniform float uReveal;

// varying vec2 vUv;

// /* -------- HASH -------- */
// float hash(vec2 p) {
//     return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
// }

// void main() {

//     vUv = uv;

//     float gridSize = 15.0;

//     vec2 gridUv = uv * gridSize;
//     vec2 cellId = floor(gridUv);

//     float cellRandom = hash(cellId);

//     float revealMask = smoothstep(
//         cellRandom - 0.1,
//         cellRandom + 0.1,
//         uReveal
//     );

//     float wave =
//         sin(uTime * 2.0 + cellRandom * 6.2831) * 0.15;

//     vec3 pos = position;
//     pos.z += wave * revealMask;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
// }


precision mediump float;

uniform float uTime;
uniform float uReveal;

varying vec2 vUv;

void main() {

    vUv = uv;

    vec3 pos = position;

    /* -------- WATER WAVES -------- */

    float wave1 = sin((uv.x * 8.0) + uTime * 2.0);
    float wave2 = cos((uv.y * 6.0) + uTime * 1.5);
    float wave3 = sin((uv.x + uv.y) * 4.0 + uTime);

    float wave = (wave1 + wave2 + wave3) * 0.05;

    /* Optional: reveal controls wave strength */
    pos.z += wave * uReveal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;



export const Fragment = `precision mediump float;

uniform sampler2D uTexture;
uniform float uReveal;

varying vec2 vUv;

/* -------- HASH -------- */
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {

    vec2 uv = vUv;

    float gridSize = 12.0;
    vec2 cellId = floor(uv * gridSize);

    float cellRandom = hash(cellId);
    float edge = 0.08;

    float mask = smoothstep(
        cellRandom - edge,
        cellRandom + edge,
        uReveal
    );

    /* -------- HARD ZERO FIX -------- */
    mask *= step(0.001, uReveal);

    vec4 tex = texture2D(uTexture, uv);

    gl_FragColor = vec4(tex.rgb, tex.a * mask);
}
`;