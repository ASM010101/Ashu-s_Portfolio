import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { detectCapabilities } from '../../utils/capabilities';
import { generatePaperTexture } from '../../utils/paperTexture';

interface SystemWorldCanvasProps {
  currentStationIndex: number;
  recruiterMode: boolean;
}

export const SystemWorldCanvas: React.FC<SystemWorldCanvasProps> = ({
  currentStationIndex,
  recruiterMode,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentStationIndex,
    recruiterMode,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    cameraPos: new THREE.Vector3(0, 0.5, 6.5),
    targetCameraPos: new THREE.Vector3(0, 0.5, 6.5),
    lookTarget: new THREE.Vector3(0, 0.3, 0),
    targetLookTarget: new THREE.Vector3(0, 0.3, 0),
  });

  useEffect(() => {
    stateRef.current.currentStationIndex = currentStationIndex;
    stateRef.current.recruiterMode = recruiterMode;

    // Define 3D Camera Coordinates for each of the 13 Stations along the Laboratory
    const stationSpacing = 14;
    const x = currentStationIndex * stationSpacing;

    switch (currentStationIndex) {
      case 0: // BOOT / Drafting Desk
        stateRef.current.targetCameraPos.set(x, 0.6, 6.2);
        stateRef.current.targetLookTarget.set(x, 0.3, 0);
        break;
      case 1: // SEE / Optical Inspection
        stateRef.current.targetCameraPos.set(x, 0.7, 5.8);
        stateRef.current.targetLookTarget.set(x, 0.4, 0);
        break;
      case 2: // RETRIEVE / Vector Memory
        stateRef.current.targetCameraPos.set(x, 1.1, 5.6);
        stateRef.current.targetLookTarget.set(x, 0.5, 0);
        break;
      case 3: // ACT / Agentic Console
        stateRef.current.targetCameraPos.set(x, 0.6, 5.8);
        stateRef.current.targetLookTarget.set(x, 0.3, 0);
        break;
      case 4: // SPEAK / Acoustic Studio
        stateRef.current.targetCameraPos.set(x, 0.9, 5.5);
        stateRef.current.targetLookTarget.set(x, 0.4, 0);
        break;
      case 5: // GENERATE / Latent Light Table
        stateRef.current.targetCameraPos.set(x, 0.8, 5.8);
        stateRef.current.targetLookTarget.set(x, 0.35, 0);
        break;
      case 6: // VERIFY / Evaluation Gate
        stateRef.current.targetCameraPos.set(x, 0.8, 6.0);
        stateRef.current.targetLookTarget.set(x, 0.4, 0);
        break;
      case 7: // RESEARCH / Paper Archive
        stateRef.current.targetCameraPos.set(x, 0.5, 5.4);
        stateRef.current.targetLookTarget.set(x, 0.3, 0);
        break;
      case 8: // FIELD LOG / Mission Log
        stateRef.current.targetCameraPos.set(x, 0.7, 5.8);
        stateRef.current.targetLookTarget.set(x, 0.35, 0);
        break;
      case 9: // TOOLBOX / System Pegboard
        stateRef.current.targetCameraPos.set(x, 0.9, 6.0);
        stateRef.current.targetLookTarget.set(x, 0.45, 0);
        break;
      case 10: // SIDE MISSIONS / Hackathons
        stateRef.current.targetCameraPos.set(x, 0.65, 5.6);
        stateRef.current.targetLookTarget.set(x, 0.35, 0);
        break;
      case 11: // ORIGIN / Academic Vector
        stateRef.current.targetCameraPos.set(x, 0.8, 5.8);
        stateRef.current.targetLookTarget.set(x, 0.4, 0);
        break;
      case 12: // SHIP / Broadcast Terminal
        stateRef.current.targetCameraPos.set(x, 0.5, 5.2);
        stateRef.current.targetLookTarget.set(x, 0.35, 0);
        break;
      default:
        stateRef.current.targetCameraPos.set(x, 0.6, 6.0);
        stateRef.current.targetLookTarget.set(x, 0.3, 0);
    }
  }, [currentStationIndex, recruiterMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const capabilities = detectCapabilities();
    if (!capabilities.hasWebGL) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0.6, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: capabilities.qualityLevel === 'high',
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(capabilities.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ==========================================
    // PROCEDURAL TEXTURE SETUP
    // ==========================================
    const paperTextureUrl = generatePaperTexture(1024, 1024);
    const textureLoader = new THREE.TextureLoader();
    const paperTexture = textureLoader.load(paperTextureUrl);
    paperTexture.wrapS = THREE.RepeatWrapping;
    paperTexture.wrapT = THREE.RepeatWrapping;
    paperTexture.repeat.set(8, 2);

    // Continuous Blueprint Laboratory Floor
    const floorGeo = new THREE.PlaneGeometry(300, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      map: paperTexture,
      roughness: 0.85,
      metalness: 0.1,
      color: 0x121622,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(80, -1.2, 0);
    scene.add(floor);

    // Drafting Matrix Grid Line Helper
    const gridHelper = new THREE.GridHelper(300, 150, 0x00f0ff, 0x16222f);
    gridHelper.position.set(80, -1.18, 0);
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Dynamic Signal Particle Field
    const particleCount = capabilities.qualityLevel === 'high' ? 900 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cyanColor = new THREE.Color(0x00f0ff);
    const coralColor = new THREE.Color(0xff6b4a);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.2) * 220;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const col = Math.random() > 0.85 ? coralColor : cyanColor;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // THE STYLIZED RESEARCHER AVATAR
    // Cel-shaded engineer in dark tech hoodie with cyan visor
    // ==========================================
    const avatarGroup = new THREE.Group();
    avatarGroup.position.set(0, -1.1, 0);

    const darkSuitMat = new THREE.MeshStandardMaterial({
      color: 0x151822,
      roughness: 0.6,
      metalness: 0.15,
    });
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const tabletMat = new THREE.MeshStandardMaterial({
      color: 0x090b10,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.45,
    });

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.85, 8), darkSuitMat);
    torso.position.y = 0.9;
    avatarGroup.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), darkSuitMat);
    head.position.y = 1.55;
    avatarGroup.add(head);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 0.16), visorMat);
    visor.position.set(0, 1.57, 0.2);
    avatarGroup.add(visor);

    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 8, 24), haloMat);
    halo.position.set(0, 1.62, 0);
    halo.rotation.x = Math.PI / 2;
    avatarGroup.add(halo);

    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.55, 6), darkSuitMat);
    leftArm.position.set(-0.42, 0.85, 0.15);
    leftArm.rotation.x = 0.5;
    leftArm.rotation.z = -0.2;
    avatarGroup.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.55, 6), darkSuitMat);
    rightArm.position.set(0.42, 0.85, 0.15);
    rightArm.rotation.x = 0.4;
    rightArm.rotation.z = 0.2;
    avatarGroup.add(rightArm);

    const tablet = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.3), tabletMat);
    tablet.position.set(0, 0.85, 0.38);
    tablet.rotation.x = 0.3;
    avatarGroup.add(tablet);

    scene.add(avatarGroup);

    // ==========================================
    // CRAFTED 3D OBJECTS AT EACH OF THE 13 STATIONS
    // ==========================================
    const stationSpacing = 14;

    // Station 0: Drafting Table
    const desk0 = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.08, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x181c28, roughness: 0.5 })
    );
    desk0.position.set(0, -0.4, 0);
    scene.add(desk0);

    // Station 1: Optical Vision Scanner
    const x1 = 1 * stationSpacing;
    const scanStand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.9, 0.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x141824, roughness: 0.4 })
    );
    scanStand.position.set(x1, -0.8, 0);
    scene.add(scanStand);

    const scanPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.1),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.5 })
    );
    scanPlane.position.set(x1, 0.4, 0);
    scene.add(scanPlane);

    const bbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.45, 0.05),
      new THREE.MeshBasicMaterial({ color: 0x00f59b, wireframe: true })
    );
    bbox.position.set(x1, 0.4, 0.1);
    scene.add(bbox);

    // Station 2: Vector Memory Core (Shards orbiting crystal)
    const x2 = 2 * stationSpacing;
    const shards: THREE.Mesh[] = [];
    const shardMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.7 });
    for (let s = 0; s < 16; s++) {
      const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.18 + Math.random() * 0.1, 0), shardMat);
      shard.position.set(
        x2 + (Math.random() - 0.5) * 2.8,
        0.5 + (Math.random() - 0.5) * 2.2,
        (Math.random() - 0.5) * 1.8
      );
      scene.add(shard);
      shards.push(shard);
    }

    // Station 3: Agentic Routing Matrix
    const x3 = 3 * stationSpacing;
    const agentHub = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.65, 1),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true })
    );
    agentHub.position.set(x3, 0.5, 0);
    scene.add(agentHub);

    // Station 4: Acoustic Oscilloscope Waveform
    const x4 = 4 * stationSpacing;
    const waveCount = 50;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(waveCount * 3);
    for (let w = 0; w < waveCount; w++) {
      const angle = (w / waveCount) * Math.PI * 2;
      wavePos[w * 3] = x4 + Math.cos(angle) * 1.6;
      wavePos[w * 3 + 1] = 0.5 + Math.sin(angle) * 1.6;
      wavePos[w * 3 + 2] = 0;
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    const waveLine = new THREE.LineLoop(
      waveGeo,
      new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.65 })
    );
    scene.add(waveLine);

    // Station 5: Latent Diffusion Lattice
    const x5 = 5 * stationSpacing;
    const diffusionLattice = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.15, 64, 8),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.5 })
    );
    diffusionLattice.position.set(x5, 0.5, 0);
    scene.add(diffusionLattice);

    // Station 6: Evaluation Gate (Industrial Arch)
    const x6 = 6 * stationSpacing;
    const gateArch = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.6, 0.2),
      new THREE.MeshBasicMaterial({ color: 0x00f59b, wireframe: true, transparent: true, opacity: 0.4 })
    );
    gateArch.position.set(x6, 0.6, 0);
    scene.add(gateArch);

    // Station 7: Manuscript Desk (Research Archive)
    const x7 = 7 * stationSpacing;
    const researchDesk = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.1, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x1f1912, roughness: 0.8 })
    );
    researchDesk.position.set(x7, -0.4, 0);
    scene.add(researchDesk);

    const paper1 = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 1.1),
      new THREE.MeshBasicMaterial({ color: 0xffd166, wireframe: true, transparent: true, opacity: 0.6 })
    );
    paper1.rotation.x = -Math.PI / 2 + 0.15;
    paper1.position.set(x7 - 0.5, -0.34, 0.1);
    scene.add(paper1);

    const paper2 = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 1.1),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 })
    );
    paper2.rotation.x = -Math.PI / 2 + 0.1;
    paper2.position.set(x7 + 0.5, -0.34, 0.1);
    scene.add(paper2);

    // Station 12: Broadcast Radar Dish (Ship)
    const x12 = 12 * stationSpacing;
    const radarDish = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.2, 0.4, 16, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
    );
    radarDish.position.set(x12, 0.9, 0);
    radarDish.rotation.z = Math.PI / 4;
    scene.add(radarDish);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    keyLight.position.set(10, 8, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff6b4a, 2.0);
    rimLight.position.set(-10, -3, -4);
    scene.add(rimLight);

    // Mouse Tracking for Parallax
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      const { mouse, cameraPos, targetCameraPos, lookTarget, targetLookTarget, currentStationIndex, recruiterMode } =
        stateRef.current;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // In Recruiter Mode, smoothly dim canvas
      const targetOpacity = recruiterMode ? 0.15 : 0.95;
      renderer.domElement.style.opacity = `${targetOpacity}`;

      // Smooth Camera Glide to Target Station
      cameraPos.lerp(targetCameraPos, 0.055);
      lookTarget.lerp(targetLookTarget, 0.055);

      camera.position.x = cameraPos.x + mouse.x * 0.35;
      camera.position.y = cameraPos.y + mouse.y * 0.25;
      camera.position.z = cameraPos.z;
      camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);

      // Avatar follows camera to the current active station!
      const targetAvatarX = currentStationIndex * stationSpacing;
      avatarGroup.position.x += (targetAvatarX - avatarGroup.position.x) * 0.05;
      avatarGroup.position.y = -1.1 + Math.sin(elapsedTime * 2) * 0.05;

      head.rotation.y = mouse.x * 0.4;
      head.rotation.x = -mouse.y * 0.2;
      halo.rotation.z += 0.015;

      // Station-specific object micro-animations
      bbox.position.x = x1 + Math.sin(elapsedTime * 2) * 0.35;
      bbox.position.y = 0.4 + Math.cos(elapsedTime * 1.5) * 0.25;

      shards.forEach((s, idx) => {
        s.rotation.x += 0.012;
        s.rotation.y += 0.014;
        s.position.y += Math.sin(elapsedTime * 2 + idx) * 0.0015;
      });

      agentHub.rotation.x += 0.01;
      agentHub.rotation.y += 0.015;

      diffusionLattice.rotation.x += 0.008;
      diffusionLattice.rotation.y += 0.012;

      radarDish.rotation.y += 0.02;

      // Oscilloscope wave animation
      const waveAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const waveArr = waveAttr.array as Float32Array;
      for (let w = 0; w < waveCount; w++) {
        const angle = (w / waveCount) * Math.PI * 2;
        const waveRadius = 1.6 + Math.sin(angle * 7 + elapsedTime * 4) * 0.2;
        waveArr[w * 3] = x4 + Math.cos(angle) * waveRadius;
        waveArr[w * 3 + 1] = 0.5 + Math.sin(angle) * waveRadius;
      }
      waveAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      paperTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease',
      }}
    />
  );
};
