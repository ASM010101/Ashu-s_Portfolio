import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createHouseFacadeTexture,
  createWoodFloorTexture,
  createCorridorSignTexture,
  createBlueprintDoorTexture,
  createAvatarBillboardTexture,
  createCloudTexture,
  createOceanWavesTexture,
} from '../../utils/itomTextures';
import { audioSynth } from '../../utils/audio';

export type ITomZone =
  | 'ENTRANCE'
  | 'CORRIDOR'
  | 'ABOUT'
  | 'GALLERY'
  | 'STUDIO'
  | 'CONTACT';

interface ITomCanvasProps {
  currentZone: ITomZone;
  onZoneChange: (zone: ITomZone) => void;
  onInspectProject: (projectId: string) => void;
  audioMuted: boolean;
  onUnlockAchievement: (id: string) => void;
}

export const ITomCanvas: React.FC<ITomCanvasProps> = ({
  currentZone,
  onZoneChange,
  onInspectProject,
  audioMuted,
  onUnlockAchievement,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentZone,
    onZoneChange,
    onInspectProject,
    onUnlockAchievement,
    audioMuted,
    isDoorOpen: false,
    doorOpenProgress: 0,
    corridorZ: 2,
    targetCorridorZ: 2,
    skyScrollProgress: 0,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });

  // Keep state updated
  useEffect(() => {
    stateRef.current.currentZone = currentZone;
    stateRef.current.onZoneChange = onZoneChange;
    stateRef.current.onInspectProject = onInspectProject;
    stateRef.current.onUnlockAchievement = onUnlockAchievement;
    stateRef.current.audioMuted = audioMuted;
  }, [currentZone, onZoneChange, onInspectProject, onUnlockAchievement, audioMuted]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f7fa);
    scene.fog = new THREE.FogExp2(0xf6f7fa, 0.024);

    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    container.appendChild(renderer.domElement);

    // Ambient flat light for hand-drawn sketch look
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // ==========================================
    // 1. ZONE_ENTRANCE: HOUSE PORCH & DOUBLE DOORS
    // ==========================================
    const entranceGroup = new THREE.Group();

    // House Facade Wall
    const facadeTex = createHouseFacadeTexture();
    const facadeMat = new THREE.MeshBasicMaterial({ map: facadeTex });
    const facadeGeo = new THREE.PlaneGeometry(12, 12);
    const facadeMesh = new THREE.Mesh(facadeGeo, facadeMat);
    entranceGroup.add(facadeMesh);

    // Interactive Left & Right Double Doors (over facade cutout)
    const doorW = 1.32;
    const doorH = 5.6;

    // Left Door
    const leftDoorPivot = new THREE.Group();
    leftDoorPivot.position.set(-1.32, -1.4, 0.02);
    const doorMat = new THREE.MeshBasicMaterial({
      color: 0xfdfefe,
      transparent: true,
      opacity: 0.99,
    });
    const leftDoorMesh = new THREE.Mesh(new THREE.PlaneGeometry(doorW, doorH), doorMat);
    leftDoorMesh.position.set(doorW / 2, 0, 0);
    leftDoorMesh.userData = { isDoor: true };
    leftDoorPivot.add(leftDoorMesh);
    entranceGroup.add(leftDoorPivot);

    // Right Door
    const rightDoorPivot = new THREE.Group();
    rightDoorPivot.position.set(1.32, -1.4, 0.02);
    const rightDoorMesh = new THREE.Mesh(new THREE.PlaneGeometry(doorW, doorH), doorMat);
    rightDoorMesh.position.set(-doorW / 2, 0, 0);
    rightDoorMesh.userData = { isDoor: true };
    rightDoorPivot.add(rightDoorPivot);
    entranceGroup.add(rightDoorPivot);

    scene.add(entranceGroup);

    // ==========================================
    // 2. ZONE_CORRIDOR: WOODEN FLOOR, DOORS, AVATAR
    // ==========================================
    const corridorGroup = new THREE.Group();
    corridorGroup.position.set(0, 0, -2);
    corridorGroup.visible = false;

    const corridorLength = 70;
    const corridorWidth = 6.8;
    const corridorHeight = 4.6;

    // Wooden Floorboards
    const woodFloorTex = createWoodFloorTexture();
    const floorGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
    const floorMat = new THREE.MeshBasicMaterial({ map: woodFloorTex });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -1.2, -corridorLength / 2);
    corridorGroup.add(floorMesh);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
    const ceilingMat = new THREE.MeshBasicMaterial({ color: 0xf4f6f9 });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, corridorHeight - 1.2, -corridorLength / 2);
    corridorGroup.add(ceilingMesh);

    // Fluorescent Ceiling Light Fixtures
    for (let lz = -6; lz > -corridorLength; lz -= 10) {
      const lightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.8),
        new THREE.MeshBasicMaterial({ color: 0xe6edf5 })
      );
      lightMesh.rotation.x = Math.PI / 2;
      lightMesh.position.set(0, corridorHeight - 1.21, lz);
      corridorGroup.add(lightMesh);
    }

    // Left Wall
    const wallGeo = new THREE.PlaneGeometry(corridorLength, corridorHeight);
    const wallMat = new THREE.MeshBasicMaterial({ color: 0xfbfcfe });
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-corridorWidth / 2, corridorHeight / 2 - 1.2, -corridorLength / 2);
    corridorGroup.add(leftWall);

    // Right Wall
    const rightWall = leftWall.clone();
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = corridorWidth / 2;
    corridorGroup.add(rightWall);

    // End Wall
    const endWall = new THREE.Mesh(new THREE.PlaneGeometry(corridorWidth, corridorHeight), wallMat);
    endWall.position.set(0, corridorHeight / 2 - 1.2, -corridorLength);
    corridorGroup.add(endWall);

    // Hand-drawn Avatar Billboard at Corridor Start
    const avatarTex = createAvatarBillboardTexture();
    const avatarMat = new THREE.MeshBasicMaterial({
      map: avatarTex,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const avatarMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3.15), avatarMat);
    avatarMesh.position.set(0, 0.45, -3.5);
    corridorGroup.add(avatarMesh);

    // 4 Themed Doors along Corridor (Gallery, Studio, About, Contact)
    const doorsConfig = [
      {
        id: 'GALLERY',
        title: 'THE GALLERY',
        desc: 'FLAGSHIP WORKS & COMPUTER VISION',
        z: -14,
        isLeft: true,
      },
      {
        id: 'STUDIO',
        title: 'THE STUDIO',
        desc: 'SAMESPACE & PRODUCTION LAB',
        z: -28,
        isLeft: false,
      },
      {
        id: 'ABOUT',
        title: 'ABOUT',
        desc: 'STORY & RESEARCH PAPERS',
        z: -42,
        isLeft: true,
      },
      {
        id: 'CONTACT',
        title: 'CONTACT',
        desc: 'THE OCEAN PIER & BEACON',
        z: -56,
        isLeft: false,
      },
    ];

    const doorClickTargets: THREE.Mesh[] = [];

    doorsConfig.forEach((cfg) => {
      const doorSubGroup = new THREE.Group();
      const x = cfg.isLeft ? -corridorWidth / 2 + 0.05 : corridorWidth / 2 - 0.05;
      const rotY = cfg.isLeft ? Math.PI / 2 : -Math.PI / 2;

      doorSubGroup.position.set(x, 0.4, cfg.z);
      doorSubGroup.rotation.y = rotY;

      // Wooden Sign
      const signTex = createCorridorSignTexture(cfg.title);
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 0.75),
        new THREE.MeshBasicMaterial({ map: signTex })
      );
      signMesh.position.set(0, 1.85, 0.05);
      doorSubGroup.add(signMesh);

      // Blueprint Taped Door
      const doorTex = createBlueprintDoorTexture(cfg.title, cfg.desc);
      const doorPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(2.0, 3.0),
        new THREE.MeshBasicMaterial({ map: doorTex })
      );
      doorPlane.position.set(0, -0.1, 0.05);
      doorPlane.userData = { doorTargetZone: cfg.id };
      doorSubGroup.add(doorPlane);
      doorClickTargets.push(doorPlane);

      corridorGroup.add(doorSubGroup);
    });

    scene.add(corridorGroup);

    // ==========================================
    // 3. ZONE_ABOUT: SKY WALKER CLOUD FLIGHT
    // ==========================================
    const aboutGroup = new THREE.Group();
    aboutGroup.position.set(0, 0, -120);
    aboutGroup.visible = false;

    // 3D Origami Paper Airplane
    const planeGeo = new THREE.BufferGeometry();
    const planeVertices = new Float32Array([
      // Top fold left
      0, 0, 1.8,   -1.8, 0.3, -1.2,   0, 0.5, -0.8,
      // Top fold right
      0, 0, 1.8,    0, 0.5, -0.8,     1.8, 0.3, -1.2,
      // Under keel
      0, 0, 1.8,    0, -0.4, -0.8,    0, 0.5, -0.8,
    ]);
    planeGeo.setAttribute('position', new THREE.BufferAttribute(planeVertices, 3));
    planeGeo.computeVertexNormals();

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const paperPlane = new THREE.Mesh(planeGeo, planeMat);
    paperPlane.position.set(0, 0, -3.5);
    aboutGroup.add(paperPlane);

    // Drifting Fluffy Sketch Clouds
    const cloudTex = createCloudTexture();
    const cloudMat = new THREE.MeshBasicMaterial({
      map: cloudTex,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const cloudMeshes: THREE.Mesh[] = [];
    for (let c = 0; c < 16; c++) {
      const cloud = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.25), cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 12 + 1,
        -Math.random() * 40 - 5
      );
      aboutGroup.add(cloud);
      cloudMeshes.push(cloud);
    }

    scene.add(aboutGroup);

    // ==========================================
    // 4. ZONE_CONTACT: OCEAN PIER & LIGHTHOUSE
    // ==========================================
    const contactGroup = new THREE.Group();
    contactGroup.position.set(0, 0, -180);
    contactGroup.visible = false;

    // Ocean Surface with Wave Ripples
    const waveTex = createOceanWavesTexture();
    const oceanGeo = new THREE.PlaneGeometry(80, 80);
    const oceanMat = new THREE.MeshBasicMaterial({ map: waveTex });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    oceanMesh.rotation.x = -Math.PI / 2;
    oceanMesh.position.set(0, -1.4, -25);
    contactGroup.add(oceanMesh);

    // Wooden Pier Walkway
    const pierGeo = new THREE.PlaneGeometry(3.2, 18);
    const pierMat = new THREE.MeshBasicMaterial({ map: woodFloorTex });
    const pierMesh = new THREE.Mesh(pierGeo, pierMat);
    pierMesh.rotation.x = -Math.PI / 2;
    pierMesh.position.set(0, -1.35, -4);
    contactGroup.add(pierMesh);

    // Floating Wooden Barrels with Signposts (GitHub, LinkedIn, Email, Resume)
    const channels = [
      { name: 'GITHUB', link: 'https://github.com/ASM010101', x: -4.5, z: -14 },
      { name: 'LINKEDIN', link: 'https://www.linkedin.com/in/ashish-maurya-52277022b/', x: -1.8, z: -16 },
      { name: 'EMAIL', link: 'mailto:amashish950@gmail.com', x: 1.8, z: -16 },
      { name: 'RESUME', link: 'resume.pdf', x: 4.5, z: -14 },
    ];

    const channelClickTargets: THREE.Mesh[] = [];

    channels.forEach((ch) => {
      const signTex = createCorridorSignTexture(ch.name);
      const signPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 0.7),
        new THREE.MeshBasicMaterial({ map: signTex })
      );
      signPlane.position.set(ch.x, -0.3, ch.z);
      signPlane.userData = { link: ch.link, name: ch.name };
      contactGroup.add(signPlane);
      channelClickTargets.push(signPlane);

      // Barrel underneath
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.9, 12),
        new THREE.MeshBasicMaterial({ color: 0x2b303a, wireframe: true })
      );
      barrel.position.set(ch.x, -1.0, ch.z);
      contactGroup.add(barrel);
    });

    scene.add(contactGroup);

    // ==========================================
    // INTERACTION & RAYCASTING
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.mouse.targetX = normX;
      stateRef.current.mouse.targetY = normY;
      mouseVector.x = normX;
      mouseVector.y = normY;

      // Hover feedback
      raycaster.setFromCamera(mouseVector, camera);

      if (stateRef.current.currentZone === 'ENTRANCE') {
        const intersects = raycaster.intersectObjects([leftDoorMesh, rightDoorMesh]);
        if (intersects.length > 0) {
          container.style.cursor = 'pointer';
          return;
        }
      } else if (stateRef.current.currentZone === 'CORRIDOR') {
        const intersects = raycaster.intersectObjects(doorClickTargets);
        if (intersects.length > 0) {
          container.style.cursor = 'pointer';
          return;
        }
      } else if (stateRef.current.currentZone === 'CONTACT') {
        const intersects = raycaster.intersectObjects(channelClickTargets);
        if (intersects.length > 0) {
          container.style.cursor = 'pointer';
          return;
        }
      }

      container.style.cursor = 'default';
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouseVector, camera);

      // 1. Entrance Door Click
      if (stateRef.current.currentZone === 'ENTRANCE') {
        const intersects = raycaster.intersectObjects([leftDoorMesh, rightDoorMesh]);
        if (intersects.length > 0) {
          // Open the double doors and enter corridor!
          stateRef.current.isDoorOpen = true;
          audioSynth.playDoorOpen();
          stateRef.current.onUnlockAchievement('explorer');

          setTimeout(() => {
            stateRef.current.onZoneChange('CORRIDOR');
            stateRef.current.onUnlockAchievement('wanderer');
          }, 650);
          return;
        }
      }

      // 2. Corridor Door Click
      if (stateRef.current.currentZone === 'CORRIDOR') {
        const intersects = raycaster.intersectObjects(doorClickTargets);
        if (intersects.length > 0) {
          const targetZone = intersects[0].object.userData.doorTargetZone as ITomZone;
          if (targetZone) {
            audioSynth.playDoorOpen();
            stateRef.current.onZoneChange(targetZone);

            if (targetZone === 'ABOUT') stateRef.current.onUnlockAchievement('skywalker');
            if (targetZone === 'GALLERY') stateRef.current.onUnlockAchievement('artcritic');
            if (targetZone === 'STUDIO') stateRef.current.onUnlockAchievement('director');
            if (targetZone === 'CONTACT') stateRef.current.onUnlockAchievement('sociable');
          }
          return;
        }
      }

      // 3. Contact Signpost Click
      if (stateRef.current.currentZone === 'CONTACT') {
        const intersects = raycaster.intersectObjects(channelClickTargets);
        if (intersects.length > 0) {
          const link = intersects[0].object.userData.link as string;
          if (link) {
            audioSynth.playClick(1000);
            window.open(link, '_blank');
          }
        }
      }
    };

    // Continuous Wheel Scroll in Corridor or About Sky
    const handleWheel = (e: WheelEvent) => {
      if (stateRef.current.currentZone === 'CORRIDOR') {
        const delta = e.deltaY * 0.035;
        const minZ = -58;
        const maxZ = 2.5;
        stateRef.current.targetCorridorZ = Math.min(
          maxZ,
          Math.max(minZ, stateRef.current.targetCorridorZ - delta)
        );
      } else if (stateRef.current.currentZone === 'ABOUT') {
        stateRef.current.skyScrollProgress += e.deltaY * 0.02;
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
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      const { mouse, currentZone, isDoorOpen } = stateRef.current;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Switch Visibility of Zones
      entranceGroup.visible = currentZone === 'ENTRANCE';
      corridorGroup.visible = currentZone === 'CORRIDOR';
      aboutGroup.visible = currentZone === 'ABOUT';
      contactGroup.visible = currentZone === 'CONTACT';

      // ==========================================
      // ZONE ANIMATIONS & CAMERA TARGETS
      // ==========================================
      if (currentZone === 'ENTRANCE') {
        // Door Opening Rotation Animation
        if (isDoorOpen && stateRef.current.doorOpenProgress < 1) {
          stateRef.current.doorOpenProgress += 0.04;
          const openAngle = (Math.PI / 2.2) * stateRef.current.doorOpenProgress;
          leftDoorPivot.rotation.y = openAngle;
          rightDoorPivot.rotation.y = -openAngle;
        }

        camera.position.x = mouse.x * 0.35;
        camera.position.y = mouse.y * 0.25;
        camera.position.z = isDoorOpen ? 8.5 - stateRef.current.doorOpenProgress * 5 : 8.5;
        camera.lookAt(0, 0, 0);
      } else if (currentZone === 'CORRIDOR') {
        // Smooth camera glide along corridor Z
        stateRef.current.corridorZ +=
          (stateRef.current.targetCorridorZ - stateRef.current.corridorZ) * 0.08;

        camera.position.x = mouse.x * 0.35;
        camera.position.y = 0.2 + mouse.y * 0.2;
        camera.position.z = stateRef.current.corridorZ;
        camera.lookAt(camera.position.x * 0.4, camera.position.y * 0.4, camera.position.z - 6);

        // Bobbing avatar
        avatarMesh.position.y = 0.45 + Math.sin(elapsedTime * 3) * 0.03;
      } else if (currentZone === 'ABOUT') {
        // Sky Walker Cloud Flight
        camera.position.set(mouse.x * 0.5, 0.4 + mouse.y * 0.3, -120);
        camera.lookAt(0, 0, -135);

        // Paper plane bank and roll
        paperPlane.rotation.z = -mouse.x * 0.4;
        paperPlane.rotation.x = mouse.y * 0.2 + Math.sin(elapsedTime * 2) * 0.05;
        paperPlane.position.y = Math.sin(elapsedTime * 2.5) * 0.12;

        // Clouds drifting
        cloudMeshes.forEach((cloud) => {
          cloud.position.z += 0.06;
          if (cloud.position.z > -115) {
            cloud.position.z = -155;
            cloud.position.x = (Math.random() - 0.5) * 24;
          }
        });
      } else if (currentZone === 'CONTACT') {
        // Ocean Pier
        camera.position.set(mouse.x * 0.4, 0.5 + mouse.y * 0.3, -180);
        camera.lookAt(0, 0, -195);

        // Rhythmic wave motion
        waveTex.offset.y = (elapsedTime * 0.04) % 1;
        waveTex.offset.x = Math.sin(elapsedTime * 0.5) * 0.02;

        // Floating barrels bobbing
        channelClickTargets.forEach((target, i) => {
          target.position.y = -0.3 + Math.sin(elapsedTime * 2 + i) * 0.04;
          target.rotation.z = Math.sin(elapsedTime * 1.5 + i) * 0.02;
        });
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
      facadeTex.dispose();
      woodFloorTex.dispose();
      avatarTex.dispose();
      cloudTex.dispose();
      waveTex.dispose();
      facadeGeo.dispose();
      facadeMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      ceilingGeo.dispose();
      ceilingMat.dispose();
      wallGeo.dispose();
      wallMat.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      oceanGeo.dispose();
      oceanMat.dispose();
      pierGeo.dispose();
      pierMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        cursor: 'default',
      }}
    />
  );
};
