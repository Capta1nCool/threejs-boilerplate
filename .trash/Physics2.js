import * as THREE from "three"
import Experience from "../Experience"

let exp = new Experience()

export const addBox = props => {
  const RAPIER = exp.RAPIER
  const { scene, size, world, rigidBodyDesc, material, geometry } = props

  //THREE
  const meshThree = new THREE.Mesh(geometry, material)
  scene.add(meshThree)

  //RAPIER
  const rigidBody = world.createRigidBody(rigidBodyDesc)
  const colliderDesc = RAPIER.ColliderDesc.cuboid(
    size.x / 2,
    size.y / 2,
    size.z / 2
  )
  const collider = world.createCollider(colliderDesc, rigidBody)

  return { meshThree, rigidBody, collider }
}

export const addCapsule = props => {
  const RAPIER = exp.RAPIER
  const { scene, size, world, rigidBodyDesc, material, geometry } = props

  //THREE
  const meshThree = new THREE.Mesh(geometry, material)
  scene.add(meshThree)

  //RAPIER
  const rigidBody = world.createRigidBody(rigidBodyDesc)
  const colliderDesc = RAPIER.ColliderDesc.capsule(size.y / 2, size.x)
  const collider = world.createCollider(colliderDesc, rigidBody)

  return { meshThree, rigidBody, collider }
}

export const addCylinder = props => {
  const RAPIER = exp.RAPIER
  const { scene, size, world, rigidBodyDesc, material, geometry } = props

  //THREE
  const meshThree = new THREE.Mesh(geometry, material)
  scene.add(meshThree)

  //RAPIER
  const rigidBody = world.createRigidBody(rigidBodyDesc)
  const colliderDesc = RAPIER.ColliderDesc.cylinder(size.y / 2, size.x)
  const collider = world.createCollider(colliderDesc, rigidBody)

  return { meshThree, rigidBody, collider }
}

export const addSphere = props => {
  const RAPIER = exp.RAPIER
  const { scene, radius, world, rigidBodyDesc, material, geometry } = props

  //THREE
  const meshThree = new THREE.Mesh(geometry, material)
  scene.add(meshThree)

  //RAPIER
  const rigidBody = world.createRigidBody(rigidBodyDesc)
  const colliderDesc = RAPIER.ColliderDesc.ball(radius)
  const collider = world.createCollider(colliderDesc, rigidBody)

  return { meshThree, rigidBody, collider }
}