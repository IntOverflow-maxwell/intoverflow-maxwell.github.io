uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform float omega;
uniform sampler2D velocity;
uniform sampler2D solid;

// SOR pass.

#define press_f 0.70710678118

float contrib(vec2 uv, vec2 dx, vec2 dy){
    float div = 0.0;
    div += texture(velocity, uv + dx).x;
    div -= texture(velocity, uv - dx).x;
    div += texture(velocity, uv + dy).y;
    div -= texture(velocity, uv - dy).y;
    float s = 0.0;
    s += texture(solid, uv + dx).x;
    s += texture(solid, uv - dx).x;
    s += texture(solid, uv + dy).x;
    s += texture(solid, uv - dy).x;
    if(abs(s) < 0.5){
        return 0.0;
    }
    return div / s;
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 dx = vec2(1.0 / iResolution.x, 0.0);
    vec2 dy = vec2(0.0, 1.0 / iResolution.y);
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

    if(abs(texture(solid, uv).x) < 0.5){
        gl_FragColor.xy = vec2(0.0);
        return;
    }

    // Remove divergence.
    vec2 u = texture(velocity, uv).xy;
    vec2 diff = vec2(0.0);
    diff.x -= contrib(uv - dx, dx, dy);
    diff.x += contrib(uv + dx, dx, dy);
    diff.y -= contrib(uv - dy, dx, dy);
    diff.y += contrib(uv + dy, dx, dy);
    gl_FragColor.xy = u + diff * omega;
}