uniform vec2 iResolution;
// uniform float iTime;
// uniform vec2 iMouse;
uniform float omega;
uniform sampler2D velocity;
// uniform sampler2D solid;

// SOR pass.

// float contrib(vec2 uv, vec2 dx, vec2 dy){
//    float div = texture(velocity, uv + dx).x - texture(velocity, uv - dx).x +
//                texture(velocity, uv + dy).y - texture(velocity, uv - dy).y;
//
//    float sum = texture(solid, uv + dx).x + texture(solid, uv - dx).x +
//              texture(solid, uv + dy).x + texture(solid, uv - dy).x;
//
//    if(abs(sum) < 0.5){
//        return 0.0;
//    }
//    return div / s;
//}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 dx = vec2(1.0 / iResolution.x, 0.0);
    vec2 dy = vec2(0.0, 1.0 / iResolution.y);

//    vec4 solidVal = texture(solid, uv);
    vec4 solidVal = texture(velocity, uv);
    if(abs(solidVal.z) < 0.5){
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    vec2 u = solidVal.xy;

    // Remove divergence.
//    vec2 diff = vec2(
//        contrib(uv + dx, dx, dy) - contrib(uv - dx, dx, dy),
//        contrib(uv + dy, dx, dy) - contrib(uv - dy, dx, dy)
//    );
    // In our ways of saving texture reads, we are approaching the peak of stupidity.
    vec4 e1 = texture(velocity, uv + dx + dx);
    vec4 e2 = solidVal;
    vec4 e3 = texture(velocity, uv + dx + dy);
    vec4 e4 = texture(velocity, uv + dx - dy);

    vec4 w1 = solidVal;
    vec4 w2 = texture(velocity, uv - dx - dx);
    vec4 w3 = texture(velocity, uv - dx + dy);
    vec4 w4 = texture(velocity, uv - dx - dy);

    vec4 n1 = e3;
    vec4 n2 = w3;
    vec4 n3 = texture(velocity, uv + dy + dy);
    vec4 n4 = solidVal;

    vec4 s1 = e4;
    vec4 s2 = w4;
    vec4 s3 = solidVal;
    vec4 s4 = texture(velocity, uv - dy - dy);

    float div1 = e1.x - w1.x + n1.y - s1.y;
    float sum1 = n1.z + s1.z + e1.z + w1.z;

    float div2 = e2.x - w2.x + n2.y - s2.y;
    float sum2 = n2.z + s2.z + e2.z + w2.z;

    float div3 = e3.x - w3.x + n3.y - s3.y;
    float sum3 = n3.z + s3.z + e3.z + w3.z;

    float div4 = e4.x - w4.x + n4.y - s4.y;
    float sum4 = n4.z + s4.z + e4.z + w4.z;

    vec2 diff = vec2(
        div1 / sum1 - div2 / sum2,
        div3 / sum3 - div4 / sum4
    );

    gl_FragColor = vec4(u + diff * omega, solidVal.z, 1.0);
}
