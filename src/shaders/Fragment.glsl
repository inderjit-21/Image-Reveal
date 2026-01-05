precision mediump float;

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
