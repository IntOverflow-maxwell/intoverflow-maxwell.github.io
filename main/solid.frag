uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

// Solidity pass.

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    if(uv.y < 0.03 || uv.y > 0.97){
        gl_FragColor.x = 0.0;
        return;
    }
    if(length(gl_FragCoord.xy - iMouse * iResolution.xy) < 100.0){
        gl_FragColor.x = 0.0;
        return;
    }
    gl_FragColor.x = 1.0;
}