import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { detectCapabilities } from '../../utils/capabilities';
import { generatePaperTexture } from '../../utils/paperTexture';
import { navigationSteps } from '../../data/navigation';
import { audioSynth } from '../../utils/audio';

interface CorridorCanvasProps {
  currentDoorIndex: number;
  onSelectDoor: (index: number) => void;
  onEnterRoom: (index: number) => void;
  isRoomOpen: boolean;
  recruiterMode: boolean;
}

// Helper to generate dynamic high-resolution illuminated signboards for each door
function createSignboardTexture(
  stepNumber: string,
  title: string,
  subtitle: string,
  accentColor: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Background dark obsidian slate
    ctx.fillStyle = '#080a12';
    ctx.fillRect(0, 0, 512, 128);

    // Subtle technical grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 512; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 128);
      ctx.stroke();
    }

    // Outer accent neon frame
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, 506, 122);

    // Glowing top bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(3, 3, 506, 6);

    // Station Number badge
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillStyle = accentColor;
    ctx.fillText(`PORTAL // ${stepNumber}`, 20, 36);

    // Main Station Title
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(title.toUpperCase(), 20, 80);

    // Subtitle / domain
    ctx.font = '16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#8b9bb4';
    ctx.fillText(subtitle.toUpperCase().slice(0, 38), 20, 110);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export const CorridorCanvas: React.FC<CorridorCanvasProps> = ({
  currentDoorIndex,
  onSelectDoor,
  onEnterRoom,
  isRoomOpen,
  recruiterMode,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentDoorIndex,
    isRoomOpen,
    recruiterMode,
    onSelectDoor,
    onEnterRoom,
    cameraZ: 2,
    targetCameraZ: 2,
    cameraX: 0,
    targetCameraX: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    doorsZ: navigationSteps.map((_, i) => -10 - i * 11),
    isEntering: false,
    hoveredDoorIdx: -1,
  });

  // Keep state updated
  useEffect(() => {
    stateRef.current.currentDoorIndex = currentDoorIndex;
    stateRef.current.isRoomOpen = isRoomOpen;
    stateRef.current.recruiterMode = recruiterMode;
    stateRef.current.onSelectDoor = onSelectDoor;
    stateRef.current.onEnterRoom = onEnterRoom;

    const baseDoorZ = stateRef.current.doorsZ[currentDoorIndex];
    if (isRoomOpen) {
      // Zoom camera deep into the portal
      stateRef.current.targetCameraZ = baseDoorZ + 1.2;
      stateRef.current.targetCameraX = currentDoorIndex % 2 === 0 ? -1.8 : 1.8;
    } else {
      // Stand in corridor facing the door
      stateRef.current.targetCameraZ = baseDoorZ + 5.5;
      stateRef.current.targetCameraX = currentDoorIndex % 2 === 0 ? -0.4 : 0.4;
    }
  }, [currentDoorIndex, isRoomOpen, recruiterMode, onSelectDoor, onEnterRoom]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const capabilities = detectCapabilities();
    if (!capabilities.hasWebGL) return;

    // Scene setup with atmospheric deep dark fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.034);

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      180
    );
    camera.position.set(0, 0.2, 2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: capabilities.qualityLevel === 'high',
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(capabilities.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ==========================================
    // CORRIDOR ARCHITECTURE: FLOOR, WALLS, CEILING
    // ==========================================
    const corridorLength = 170;
    const corridorWidth = 6.4;
    const corridorHeight = 5.0;

    const paperTextureUrl = generatePaperTexture(1024, 1024);
    const textureLoader = new THREE.TextureLoader();
    const wallTexture = textureLoader.load(paperTextureUrl);
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(14, 2);

    // Floor (Dark Reflective Slate with metallic sheen)
    const floorGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090b12,
      roughness: 0.28,
      metalness: 0.4,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.2, -corridorLength / 2 + 5);
    scene.add(floor);

    // Floor Gridlines
    const gridHelper = new THREE.GridHelper(corridorLength, 140, 0x00f0ff, 0x121728);
    gridHelper.rotation.y = Math.PI / 2;
    gridHelper.position.set(0, -1.19, -corridorLength / 2 + 5);
    (gridHelper.material as THREE.Material).opacity = 0.22;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x06080e,
      roughness: 0.85,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, corridorHeight - 1.2, -corridorLength / 2 + 5);
    scene.add(ceiling);

    // Left Wall
    const wallGeo = new THREE.PlaneGeometry(corridorLength, corridorHeight);
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTexture,
      roughness: 0.75,
      metalness: 0.2,
      color: 0x0e111a,
    });
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-corridorWidth / 2, corridorHeight / 2 - 1.2, -corridorLength / 2 + 5);
    scene.add(leftWall);

    // Right Wall
    const rightWall = leftWall.clone();
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = corridorWidth / 2;
    scene.add(rightWall);

    // End Wall
    const endWallGeo = new THREE.PlaneGeometry(corridorWidth, corridorHeight);
    const endWall = new THREE.Mesh(endWallGeo, wallMat);
    endWall.position.set(0, corridorHeight / 2 - 1.2, -corridorLength + 5);
    scene.add(endWall);

    // ==========================================
    // GLOWING DOORWAY PORTALS ALONG THE CORRIDOR
    // ==========================================
    const doorGroups: THREE.Group[] = [];
    const raycastMeshes: THREE.Mesh[] = [];
    const hologramMeshes: THREE.Mesh[] = [];
    const signboardTextures: THREE.CanvasTexture[] = [];

    navigationSteps.forEach((step, idx) => {
      const doorGroup = new THREE.Group();
      const z = -10 - idx * 11;
      const isLeft = idx % 2 === 0 && idx !== navigationSteps.length - 1;
      const isEnd = idx === navigationSteps.length - 1;

      let x = isLeft ? -corridorWidth / 2 + 0.05 : corridorWidth / 2 - 0.05;
      let rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;
      if (isEnd) {
        x = 0;
        rotY = 0;
      }

      doorGroup.position.set(x, 0.2, isEnd ? -corridorLength + 5.1 : z);
      doorGroup.rotation.y = rotY;

      // 1. Neon Portal Arch Frame
      const archMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(step.color),
        wireframe: true,
      });
      const archGeo = new THREE.BoxGeometry(2.4, 3.4, 0.12);
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.y = 0.5;
      doorGroup.add(arch);

      // 2. Inner Dark Portal Face (clickable raycast target)
      const portalMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.9,
      });
      const portalFace = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 3.1), portalMat);
      portalFace.position.set(0, 0.5, 0.06);
      portalFace.userData = { doorIndex: idx };
      doorGroup.add(portalFace);
      raycastMeshes.push(portalFace);

      // 3. Overhead Illuminated Signboard with custom canvas texture
      const signTex = createSignboardTexture(
        step.stepNumber,
        step.label,
        step.domain,
        step.color
      );
      signboardTextures.push(signTex);

      const signMat = new THREE.MeshBasicMaterial({
        map: signTex,
      });
      const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.65), signMat);
      signMesh.position.set(0, 2.55, 0.1);
      signMesh.userData = { doorIndex: idx };
      doorGroup.add(signMesh);
      raycastMeshes.push(signMesh);

      // 4. Rotating 3D Hologram Artifact inside the portal doorway
      let holoGeo: THREE.BufferGeometry;
      switch (idx % 6) {
        case 0:
          holoGeo = new THREE.IcosahedronGeometry(0.35, 0);
          break;
        case 1:
          holoGeo = new THREE.TorusGeometry(0.3, 0.08, 12, 24);
          break;
        case 2:
          holoGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
          break;
        case 3:
          holoGeo = new THREE.OctahedronGeometry(0.38, 0);
          break;
        case 4:
          holoGeo = new THREE.DodecahedronGeometry(0.35, 0);
          break;
        default:
          holoGeo = new THREE.TetrahedronGeometry(0.4, 0);
          break;
      }

      const holoMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(step.color),
        wireframe: true,
      });
      const holoMesh = new THREE.Mesh(holoGeo, holoMat);
      holoMesh.position.set(0, 0.5, 0.25);
      doorGroup.add(holoMesh);
      hologramMeshes.push(holoMesh);

      // 5. Overhead Downlight Spotlight casting a warm beam on the doorway
      const doorSpot = new THREE.SpotLight(new THREE.Color(step.color), 3.2, 8, Math.PI / 4, 0.5, 1.2);
      doorSpot.position.set(0, 2.8, 1.0);
      doorSpot.target = portalFace;
      doorGroup.add(doorSpot);

      scene.add(doorGroup);
      doorGroups.push(doorGroup);
    });

    // ==========================================
    // ATMOSPHERIC SIGNAL DUST PARTICLES
    // ==========================================
    const particleCount = capabilities.qualityLevel === 'high' ? 900 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color(0x00f0ff);
    const coral = new THREE.Color(0xff6b4a);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * (corridorWidth - 0.6);
      particlePositions[i * 3 + 1] = Math.random() * corridorHeight - 1.2;
      particlePositions[i * 3 + 2] = -Math.random() * corridorLength;

      const col = Math.random() > 0.75 ? coral : cyan;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ==========================================
    // LIGHTING: CORRIDOR OVERHEAD RECESSED SPOTLIGHTS
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Moving camera headlight (flashlight exploring the corridor)
    const cameraLight = new THREE.PointLight(0x00f0ff, 3.2, 22, 1.2);
    cameraLight.position.set(0, 1.5, 0);
    scene.add(cameraLight);

    // Mouse tracking & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.mouse.targetX = normX;
      stateRef.current.mouse.targetY = normY;
      mouseVector.x = normX;
      mouseVector.y = normY;

      // Check raycast hover
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(raycastMeshes);
      if (intersects.length > 0) {
        const hoveredIdx = intersects[0].object.userData.doorIndex;
        if (typeof hoveredIdx === 'number') {
          stateRef.current.hoveredDoorIdx = hoveredIdx;
          if (container) container.style.cursor = 'pointer';
          return;
        }
      }
      stateRef.current.hoveredDoorIdx = -1;
      if (container) container.style.cursor = 'default';
    };

    const handleClick = () => {
      if (stateRef.current.isRoomOpen) return;
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(raycastMeshes);
      if (intersects.length > 0) {
        const clickedDoorIdx = intersects[0].object.userData.doorIndex;
        if (typeof clickedDoorIdx === 'number') {
          if (clickedDoorIdx === stateRef.current.currentDoorIndex) {
            stateRef.current.onEnterRoom(clickedDoorIdx);
          } else {
            stateRef.current.onSelectDoor(clickedDoorIdx);
            audioSynth.playGlide();
          }
        }
      }
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Continuous Wheel Navigation down Corridor when room is not open
    const handleWheel = (e: WheelEvent) => {
      if (stateRef.current.isRoomOpen || stateRef.current.recruiterMode) return;
      // Advance or reverse along Z
      const delta = e.deltaY * 0.015;
      const minZ = stateRef.current.doorsZ[stateRef.current.doorsZ.length - 1] + 2;
      const maxZ = 6;
      stateRef.current.targetCameraZ = Math.min(maxZ, Math.max(minZ, stateRef.current.targetCameraZ - delta));

      // Calculate nearest door
      let closestIdx = 0;
      let minDistance = 999999;
      stateRef.current.doorsZ.forEach((dZ, i) => {
        const dist = Math.abs(stateRef.current.targetCameraZ - (dZ + 5.5));
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      });

      if (closestIdx !== stateRef.current.currentDoorIndex) {
        stateRef.current.onSelectDoor(closestIdx);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // Render loop
    let animId: number;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      const { mouse, targetCameraZ, targetCameraX, recruiterMode, isRoomOpen } = stateRef.current;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      renderer.domElement.style.opacity = recruiterMode ? '0.1' : '0.98';

      // Smooth camera interpolation along corridor Z
      stateRef.current.cameraZ += (targetCameraZ - stateRef.current.cameraZ) * 0.06;
      stateRef.current.cameraX += (targetCameraX - stateRef.current.cameraX) * 0.06;

      const parallaxAmount = isRoomOpen ? 0.04 : 0.22;
      camera.position.x = stateRef.current.cameraX + mouse.x * parallaxAmount;
      camera.position.y = 0.2 + mouse.y * (parallaxAmount * 0.7);
      camera.position.z = stateRef.current.cameraZ;

      const lookTargetZ = isRoomOpen
        ? stateRef.current.doorsZ[stateRef.current.currentDoorIndex] - 4
        : camera.position.z - 6;

      camera.lookAt(
        camera.position.x * 0.5,
        camera.position.y * 0.5,
        lookTargetZ
      );

      cameraLight.position.set(camera.position.x, camera.position.y + 0.8, camera.position.z);

      // Animate rotating 3D holograms inside each portal
      hologramMeshes.forEach((mesh, i) => {
        mesh.rotation.y = elapsedTime * 0.8 + i * 0.5;
        mesh.rotation.x = Math.sin(elapsedTime * 0.5 + i) * 0.3;
        mesh.position.y = 0.5 + Math.sin(elapsedTime * 2 + i) * 0.05;
      });

      // Pulse active door portal frame
      const activeIdx = stateRef.current.currentDoorIndex;
      if (doorGroups[activeIdx]) {
        const arch = doorGroups[activeIdx].children[0] as THREE.Mesh;
        if (arch && arch.scale) {
          const pulse = 1 + Math.sin(elapsedTime * 4) * 0.035;
          arch.scale.set(pulse, pulse, 1);
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      wallTexture.dispose();
      signboardTextures.forEach((t) => t.dispose());
      floorGeo.dispose();
      floorMat.dispose();
      ceilingGeo.dispose();
      ceilingMat.dispose();
      wallGeo.dispose();
      wallMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
        transition: 'opacity 0.4s ease',
      }}
    />
  );
};
