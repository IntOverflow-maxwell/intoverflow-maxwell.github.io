import * as THREE from 'three';

let scene1, scene2, scene3, scene4, camera, renderer, renderTarget1, renderTarget2, renderTarget3, renderTarget4, material1, material2, material3, material4, quad1, quad2, quad3, quad4;
let iResolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
let iMouse = new THREE.Vector2();
let iTime = 0;
const SOR_iterations = 30;
const SOR_omega = 1.001;
const dt = 0.01;
const nu = 0.1;
const f = new THREE.Vector2(0.0, 0.0);

init();
animate();
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('mousemove', onMouseMove, false);

function init() {
    scene1 = new THREE.Scene();
    scene2 = new THREE.Scene();
    scene3 = new THREE.Scene();
    scene4 = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const renderTargetParams = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
    };

    renderTarget1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParams);
    renderTarget2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParams);
    renderTarget3 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParams);
    renderTarget4 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParams);

    fetch('./fluid.frag')
        .then(response => response.text())
        .then(data => {
            material1 = new THREE.ShaderMaterial({
                uniforms: {
                    iResolution: { value: iResolution },
                    iTime: { value: iTime },
                    iMouse: { value: iMouse },
                    velocity: { value: renderTarget1.texture }, // Initially set to renderTarget1.texture
                    solid: { value: renderTarget3.texture },
                    nu: { value: nu },
                    dt: { value: dt },
                    f: { value: f },
                },
                fragmentShader: data,
                vertexShader: `
                    void main() {
                        gl_Position = vec4(position, 1.0);
                    }
                `
            });

            quad1 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material1);
            scene1.add(quad1);
        });

    fetch('./render.frag')
        .then(response => response.text())
        .then(data => {
            material2 = new THREE.ShaderMaterial({
                uniforms: {
                    iResolution: { value: iResolution },
                    iTime: { value: iTime },
                    iMouse: { value: iMouse },
                    velocity: { value: renderTarget2.texture }, // Initially set to renderTarget2.texture
                },
                fragmentShader: data,
                vertexShader: `
                    void main() {
                        gl_Position = vec4(position, 1.0);
                    }
                `
            });

            quad2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material2);
            scene2.add(quad2);
        });

    fetch('./solid.frag')
        .then(response => response.text())
        .then(data => {
            material3 = new THREE.ShaderMaterial({
                uniforms: {
                    iResolution: { value: iResolution },
                    iTime: { value: iTime },
                    iMouse: { value: iMouse },
                },
                fragmentShader: data,
                vertexShader: `
                    void main() {
                        gl_Position = vec4(position, 1.0);
                    }
                `
            });

            quad3 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material3);
            scene3.add(quad3);
        });

    fetch('./SOR.frag')
        .then(response => response.text())
        .then(data => {
            material4 = new THREE.ShaderMaterial({
                uniforms: {
                    iResolution: { value: iResolution },
                    iTime: { value: iTime },
                    iMouse: { value: iMouse },
                    velocity: { value: renderTarget1.texture }, // Initially set to renderTarget1.texture
                    solid: { value: renderTarget3.texture },
                    omega: { value: SOR_omega },
                },
                fragmentShader: data,
                vertexShader: `
                    void main() {
                        gl_Position = vec4(position, 1.0);
                    }
                `
            });

            quad4 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material4);
            scene4.add(quad4);
        });
}

function animate() {
    requestAnimationFrame(animate);
    iTime += 0.016; // Increment time

    if (material1 && material2 && material3 && material4) {
        material3.uniforms.iTime.value = iTime;
        material3.uniforms.iMouse.value = iMouse;
        renderer.setRenderTarget(renderTarget3);
        renderer.render(scene3, camera);

        material1.uniforms.iTime.value = iTime;
        material1.uniforms.iMouse.value = iMouse;
        material1.uniforms.solid.value = renderTarget3.texture;
        material1.uniforms.velocity.value = renderTarget1.texture;
        renderer.setRenderTarget(renderTarget2);
        renderer.render(scene1, camera);

        material4.uniforms.iTime.value = iTime;
        material4.uniforms.iMouse.value = iMouse;

        for(let i = 0; i < SOR_iterations; i++){
            material4.uniforms.solid.value = renderTarget3.texture;
            material4.uniforms.velocity.value = renderTarget2.texture;
            renderer.setRenderTarget(renderTarget4);
            renderer.render(scene4, camera);

            let tmp = renderTarget2;
            renderTarget2 = renderTarget4;
            renderTarget4 = tmp;
        }

        let tmp = renderTarget2;
        renderTarget2 = renderTarget1;
        renderTarget1 = tmp;

        material2.uniforms.iTime.value = iTime;
        material2.uniforms.iMouse.value = iMouse;
        material2.uniforms.velocity.value = renderTarget1.texture;
        renderer.setRenderTarget(null);
        renderer.render(scene2, camera);

        // Uncomment if you need to read pixels
        // const readBuffer = new Uint8Array(window.innerWidth * window.innerHeight * 4);
        // renderer.readRenderTargetPixels(renderTarget2, 0, 0, window.innerWidth, window.innerHeight, readBuffer);
        // console.log(readBuffer); // This buffer contains the RGBA values of the texture
    }
}

function onWindowResize() {
    iResolution.set(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderTarget1.setSize(window.innerWidth, window.innerHeight);
    renderTarget2.setSize(window.innerWidth, window.innerHeight);
    renderTarget3.setSize(window.innerWidth, window.innerHeight);
    renderTarget4.setSize(window.innerWidth, window.innerHeight);

    if (material1) {
        material1.uniforms.iResolution.value = iResolution;
    }

    if (material2) {
        material2.uniforms.iResolution.value = iResolution;
    }

    if (material3) {
        material3.uniforms.iResolution.value = iResolution;
    }

    if (material4) {
        material4.uniforms.iResolution.value = iResolution;
    }

    camera.left = -window.innerWidth / window.innerHeight;
    camera.right = window.innerWidth / window.innerHeight;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
}

function onMouseMove(event) {
    iMouse.x = event.clientX / window.innerWidth;
    iMouse.y = 1.0 - event.clientY / window.innerHeight; // Invert Y coordinate
}
