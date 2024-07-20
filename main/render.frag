uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D velocity;

#define PI 3.141592653589793

// Function to convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Reinhard tone mapping function
float reinhardToneMapping(float x) {
    return x / (1.0 + x);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    // Sample the velocity field at the given texture coordinates
    vec2 v = texture(velocity, uv).xy;

    // Calculate the hue based on the direction of the velocity
    float hue = atan(v.y, v.x) / (2.0 * 3.14159265) + 0.5;

    // Calculate the magnitude of the velocity
    float magnitude = length(v) / (200.0 / iResolution.x);

    // Apply Reinhard tone mapping to the magnitude
    float toneMappedMagnitude = reinhardToneMapping(magnitude);

    // Use tone-mapped magnitude for saturation
    float saturation = toneMappedMagnitude;

    // Convert HSV to RGB
    vec3 hsv = vec3(hue, 1.0, toneMappedMagnitude);
    vec3 rgb = hsv2rgb(hsv);

    // Set the fragment color
    gl_FragColor = vec4(rgb, 1.0);
}
