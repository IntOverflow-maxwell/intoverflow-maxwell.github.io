uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D velocity;
uniform sampler2D solid;

// Navier Stokes Solver (Without pressure term)

uniform float dt;
uniform float nu;
uniform vec2 f;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 dx = vec2(1.0 / iResolution.x, 0.0);
    vec2 dy = vec2(0.0, 1.0 / iResolution.y);
    vec2 texel = dx + dy;
    // Save is solid in z to save texture reads later.
    gl_FragColor = vec4(0.0, 0.0, texture(solid, uv).x, 1.0);

    if(gl_FragColor.z <= 0.5){
        gl_FragColor.xy = vec2(0.0, 0.0);
        return;
    }

    if(iTime < 1.0){
        gl_FragColor.xy = vec2(400.0, 0.0);
        return;
    }

    if(uv.x < 0.03){
        gl_FragColor.xy = vec2(400.0, 0.0);
        return;
    }

    vec2 u = texture(velocity, uv).xy;
    vec2 du_dt = vec2(0.0);
    // Semi-Lagrangian advection.
    u = texture(velocity, uv - u * texel * dt).xy;
    // Apply external forces.
    du_dt += f;
    // Apply viscosity.
    vec2 laplacian = vec2(0.0);
    laplacian += texture(velocity, uv - dx).xy;
    laplacian += texture(velocity, uv + dx).xy;
    laplacian += texture(velocity, uv - dy).xy;
    laplacian += texture(velocity, uv + dy).xy;
    laplacian -= u * 4.0;
    du_dt += nu * laplacian;
    // Integrate.
    u += du_dt * dt;
    gl_FragColor.xy = u;
}