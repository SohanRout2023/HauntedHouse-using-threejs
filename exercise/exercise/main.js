import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import gsap from 'gsap'
import * as dat from 'dat.gui'



// debug 
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene 
const scene = new THREE.Scene()

// fog 

const fog = new THREE.Fog('#262837',1,15)
scene.fog=fog


// Textures
const TextureLoader = new THREE.TextureLoader()
const doorColorTexture= TextureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture= TextureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture= TextureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture= TextureLoader.load('/textures/door/height.jpg')
const doorNormalTexture= TextureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture= TextureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture= TextureLoader.load('/textures/door/roughness.jpg')


const bricksColorTexture =TextureLoader.load('/textures/bricks/color.jpg')
const bricksAmbiestOcclusionTexture =TextureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture =TextureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture =TextureLoader.load('/textures/bricks/roughness.jpg')


const grassColorTexture =TextureLoader.load('/textures/grass/color.jpg')
const grassAmbiestOcclusionTexture =TextureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture =TextureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture =TextureLoader.load('/textures/grass/roughness.jpg')


grassColorTexture.repeat.set(8,8)
grassAmbiestOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbiestOcclusionTexture.wrapS =THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbiestOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


// Materials
 const material = new THREE.MeshStandardMaterial()
 material.roughness =0.4

//  objects
 const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  material
 )

// House 

// Group
const  house = new THREE.Group()
scene.add(house)

// Walls 
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial({
    map:bricksColorTexture,
    aoMap:bricksAmbiestOcclusionTexture,
    normalMap:bricksNormalTexture,
    roughnessMap:bricksRoughnessTexture

  })
)
walls.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
)
walls.position.y=1.25
house.add(walls)


// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5,1,4),
  new THREE.MeshStandardMaterial({color: '#b35f45'})
)
roof.rotation.y = Math.PI *0.25
roof.position.y = 3
scene.add(roof)

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2,2),
  new THREE.MeshStandardMaterial({
    map:doorColorTexture,
    transparent:true,
    alphaMap:doorAlphaTexture,
    aoMap:doorAmbientOcclusionTexture,
    displacementMap:doorHeightTexture,
    displacementScale:0.1,
    normalMap:doorNormalTexture,
    metalnessMap:doorMetalnessTexture,
    roughnessMap:doorRoughnessTexture
  })
)
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)

)
door.position.y=1
door.position.z =2.01
house.add(door)

// bushes 
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({color : 'green'})

 const bush1 = new  THREE.Mesh(bushGeometry,bushMaterial)
 bush1.scale.set(0.5,0.5,0.5)
 bush1.position.set(0.8,0.2,2.2)
 house.add(bush1)

 const bush2 = new THREE.Mesh(bushGeometry,bushMaterial)
 bush2.scale.set(0.25,0.25,0.25)
 bush2.position.set(1.4,0.1,2.1)

 const bush3 = new THREE.Mesh(bushGeometry,bushMaterial)
 bush3.scale.set(0.4,0.4,0.4)
 bush3.position.set(-1,0.1,2.3)

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial)
bush4.scale.set(0.2,0.2,0.2)
bush4.position.set(-1.3,0.1,2.6)

 house.add(bush1,bush2,bush3,bush4)


//  Graves

const graves = new THREE.Group()
scene.add(graves)
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color:'#b2b6b1'})

for (let i =0;i<50;i++)
{
const angle = Math.random() * Math.PI *2
const radius = 3 + Math.random() * 6
const x = Math.cos(angle) * radius
const z = Math.sin(angle) * radius

// Create the mesh 
const grave = new THREE.Mesh(graveGeometry,graveMaterial)

// Position 
grave.position.set(x,0.3,z)
grave.rotation.z = (Math.random() - 0.5) * 0.4
grave.castShadow=true
grave.rotation.y = (Math.random() - 0.5) * 0.4
graves.add(grave)

}


// floor 

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20,20),
  new THREE.MeshStandardMaterial({
    map:grassColorTexture,
    aoMap:grassAmbiestOcclusionTexture,
    normalMap:grassNormalTexture,
    roughnessMap:grassRoughnessTexture
  })
)
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2)
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y=0
scene.add(floor)

// Lights
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional Light 
const moonLight = new THREE.DirectionalLight('#b9d5ff',0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// DoorLight 
const doorLight = new THREE.PointLight('#ff7d46',1,9)
doorLight.position.set(0,2.2,2.7)
house.add(doorLight)


// Ghosts
 const ghost1 = new THREE.PointLight('#ff00ff',2,3)
 scene.add(ghost1)

 const ghost2 = new THREE.PointLight('#00ffff',2,3)
 scene.add(ghost2)

 const ghost3 = new THREE.PointLight('#ffff00',2,3)
 scene.add(ghost3)


//  Size 

const size ={
  width:window.innerWidth,
  height:window.innerHeight
}
 window.addEventListener('resize', () =>
 {
  //  Update Size
  size.width = window.innerWidth
  size.height = window.innerHeight   

  // update Camera 
      camera.aspect= size.width/ size.height
      camera.updateProjectionMatrix() 

      // update Renderer
      renderer.setSize(size.width,size.height)
 })


// camera

const camera =  new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.x=4
camera.position.y=2
camera.position.z=5
scene.add(camera)

// Controls

const controls = new OrbitControls(camera,canvas)
controls.enableDamping =true
// controls.maxPolarAngle=Math.PI/2.5

// Renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas
})
renderer.setSize(size.width,size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

// Shadows
renderer.shadowMap.enabled = true

moonLight.castShadow= true
doorLight.castShadow=true
ghost1.castShadow=true
ghost2.castShadow=true
ghost3.castShadow= true


walls.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
bush4.castShadow=true

floor.receiveShadow=true

// Animate 
const clock = new THREE.Clock()
 
const tick =() =>
{
 const elapsedTime =clock.getElapsedTime()

//  update ghosts
  const ghost1Angle = elapsedTime *0.5
  ghost1.position.x= Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3)

  const ghost2Angle = -elapsedTime *0.32
  ghost2.position.x= Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(elapsedTime *4) + Math.sin(elapsedTime *2.5)


  const ghost3Angle = -elapsedTime *0.32
  ghost3.position.x= Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime *  0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime *  0.5))
  ghost3.position.y = Math.sin(elapsedTime *4) + Math.sin(elapsedTime *2.5)

   // Update controls
   controls.update()

  // Render
  renderer.render(scene,camera)

 

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}
tick()





































