"use client" // Mark as client component since it uses browser APIs

import { useEffect, useRef } from "react"
import * as THREE from "three" // Import Three.js library
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

/**
 * ThreeScene Component
 * Creates an interactive 3D particle field background using Three.js
 * Particles respond to mouse movement and connect with lines when close
 */
export default function ThreeScene() {
  // Reference to the container div for the canvas
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Skip setup if container ref isn't available
    if (!containerRef.current) return
    
    // SCENE SETUP
    // Create a new Three.js scene
    const scene = new THREE.Scene()
    
    // CAMERA SETUP
    // Create a perspective camera with 75° field of view
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    // Position camera 5 units away from center
    camera.position.z = 5
    
    // RENDERER SETUP
    // Create WebGL renderer with antialiasing and transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    // Set pixel ratio for better quality on high-DPI displays (max 2)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    
    // CONTROLS SETUP
    // Add orbit controls for smooth camera movement
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // Add inertia to controls
    controls.dampingFactor = 0.05 // Control inertia amount
    controls.enableZoom = false // Disable zooming
    controls.autoRotate = true // Auto-rotate the scene
    controls.autoRotateSpeed = 0.5 // Rotation speed
    
    // PARTICLES SETUP
    // Create geometry for particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000 // Total number of particles
    
    // Create arrays for particle positions and colors
    const posArray = new Float32Array(particlesCount * 3) // xyz positions
    const colorArray = new Float32Array(particlesCount * 3) // rgb colors
    
    // Initialize particles with random positions and subtle colors
    for (let i = 0; i < particlesCount * 3; i++) {
      // Position: random within -5 to 5 range
      posArray[i] = (Math.random() - 0.5) * 10
      
      // Color: subtle blues and purples
      if (i % 3 === 0) {
        // R value - subtle red component
        colorArray[i] = 0.2 + Math.random() * 0.3
      } else if (i % 3 === 1) {
        // G value - subtle green component
        colorArray[i] = 0.2 + Math.random() * 0.3
      } else {
        // B value - stronger blue component for blue/purple hue
        colorArray[i] = 0.5 + Math.random() * 0.3
      }
    }
    
    // Add position and color attributes to geometry
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    )
    
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    )
    
    // PARTICLE MATERIAL
    // Create material for particles with vertex colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02, // Particle size
      vertexColors: true, // Use colors from vertices
      transparent: true, // Enable transparency
      opacity: 0.6, // Partial opacity
      sizeAttenuation: true, // Particles get smaller with distance
    })
    
    // Create particle system and add to scene
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // CONNECTING LINES SETUP
    // Create material for lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x4a5568, // Slate color
      transparent: true,
      opacity: 0.05, // Very subtle lines
    })
    
    // Create geometry for lines
    const linesGeometry = new THREE.BufferGeometry()
    const linesCount = 200 // Number of lines
    // Each line has 2 points (start/end) with 3 values (xyz) each
    const linesPositions = new Float32Array(linesCount * 6)
    
    // Initialize lines with random start and end points
    for (let i = 0; i < linesCount; i++) {
      const idx = i * 6
      
      // Random start point
      linesPositions[idx] = (Math.random() - 0.5) * 10
      linesPositions[idx + 1] = (Math.random() - 0.5) * 10
      linesPositions[idx + 2] = (Math.random() - 0.5) * 10
      
      // Random end point
      linesPositions[idx + 3] = (Math.random() - 0.5) * 10
      linesPositions[idx + 4] = (Math.random() - 0.5) * 10
      linesPositions[idx + 5] = (Math.random() - 0.5) * 10
    }
    
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linesPositions, 3)
    )
    
    // Create line segments and add to scene
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(linesMesh)
    
    // MOUSE INTERACTION
    // Track mouse position for particle interaction
    const mouse = new THREE.Vector2()
    
    // Update mouse position on move
    function onMouseMove(event: MouseEvent) {
      // Convert screen coordinates to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    
    // Add event listener for mouse movement
    window.addEventListener("mousemove", onMouseMove)
    
    // WINDOW RESIZE HANDLING
    // Update renderer and camera on window resize
    function onWindowResize() {
      // Update camera aspect ratio
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      
      // Update renderer size
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    // Add event listener for window resize
    window.addEventListener("resize", onWindowResize)
    
    // ANIMATION LOOP
    // Main animation function
    function animate() {
      // Request next frame
      requestAnimationFrame(animate)
      
      // Update controls (for auto-rotation)
      controls.update()
      
      // Render scene
      renderer.render(scene, camera)
    }
    
    // Start animation loop
    animate()
    
    // CLEANUP
    // Return cleanup function to remove event listeners and dispose of resources
    return () => {
      // Remove event listeners
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onWindowResize)
      
      // Dispose of geometries and materials
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
      
      // Dispose of renderer
      renderer.dispose()
      
      // Remove canvas from DOM
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, []) // Empty dependency array means this effect runs once on mount
  
  // Return container div for the canvas
  return <div ref={containerRef} className="w-full h-full" />
}