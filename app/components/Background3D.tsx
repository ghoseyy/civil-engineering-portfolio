'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add some floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x9c27b0,
      wireframe: true
    });

    const shapes: THREE.Mesh[] = [];
    const count = 8;

    for (let i = 0; i < count; i++) {
      const shape = new THREE.Mesh(geometry, material);
      shape.position.x = Math.random() * 20 - 10;
      shape.position.y = Math.random() * 20 - 10;
      shape.position.z = Math.random() * 20 - 10;
      shape.scale.setScalar(Math.random() * 2 + 0.5);
      scene.add(shape);
      shapes.push(shape);
    }

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      shapes.forEach(shape => {
        shape.rotation.x += 0.005;
        shape.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 opacity-20" />;
} 