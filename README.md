# Elements editor

A three-dee making tool with simple commands and powerups for everyone. Built with THREE.js, JavaScript, and <3. Built on Draw With Code/Make Art by [Tancredi Trugenberger](https://github.com/tancredi) and [Kano Computing](https://github.com/KanoComputing).

This v0.0.0 release is super ultra alpha. To play with this, use the code here:

```
ambientLight = new THREE.AmbientLight(0x333333)
session.scene.add(ambientLight)
light = new THREE.DirectionalLight(0xFFFFFF, 1.0)
light.position.set(200, 400, 500)
session.scene.add(light)
light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light2.position.set(-500, 250, -200);
session.scene.add(light2)

# Geometries
icoGeo = new THREE.IcosahedronGeometry(5)

# Materials
icoMaterial = new (THREE.MeshPhongMaterial)(
  color: 0xF05C94
  shading: 1
  side: THREE.Doubleside
  specular: 0x111111
  shininess: 0)

# Meshes
icoMesh = new THREE.Mesh(icoGeo, icoMaterial)
icoMesh.rotation.x += Math.PI / 180 * 60
# Add to scene
session.scene.add(icoMesh)

draw = ->
    icoMesh.position.y = Math.sin(Date.now() / 1000)
    icoMesh.rotation.x = Math.sin(Date.now() / 3000)
    icoMesh.rotation.y = Math.sin(Date.now() / 2500)
    icoMesh.rotation.z = Math.sin(Date.now() / 2000)
animate draw
render()
```

## Setup

    git clone git@github.com:alecmolloy/elements.git
    cd elements
    npm install

## Build

Build the app before running it

    npm run build

## Run

    npm start

Open your browser at [http://localhost:3000](http://localhost:3000)

## Develop

Run the watch script when developing

    npm run watch
