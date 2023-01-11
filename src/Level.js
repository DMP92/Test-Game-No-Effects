import * as THREE from 'three'
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float, Text } from '@react-three/drei';

// THREE.JS Settings
THREE.ColorManagement.legacyMode = false;

// Geometries
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const spinnerGeometry = new THREE.BoxGeometry(1, 1, 1)


// Materials
const floor1 = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0, roughness: 0 })
const floor2 = new THREE.MeshStandardMaterial({ color: '#222222', metalness: 0, roughness: 0 })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', metalness: 0, roughness: 1 })
const wallMaterial = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 })


/**
 * 
 * @param {Level.js contains each different level in the game. Each section is broken up into individual blocks, 
 * and for sake of efficiency they are all handled here} param0 
 * @returns 
 */

function BlockStart({ position = [ 0, 0, 0 ] })
{
    return <group position={ position }>
        <Float floatIntensity={ 0.25} rotationIntensity={ 0.25 }>
            <Text 
                font="./bebas-neue-v9-latin-regular.woff" 
                scale={ 0.6 } 
                maxWidth={ 0.25 } 
                lineHeight={ 0.75 } 
                textAlign="right" 
                position={ [ 0.75, 1, -1 ] }
                rotation-y={ - 0.25 }
            >
                Marble Race
                <meshBasicMaterial toneMapped={ false }/>
            </Text>
        </Float>
        {/* BlockStart is a component that handles the starting point of the game */}
        <mesh geometry={ boxGeometry } material={ floor1 } scale={ [ 4, 0.2, 4] } position={ [ 0, - 0.1, 0 ] } receiveShadow />
    </group>
}

function BlockEnd({ position = [ 0, 0, 0 ] })
{
    const hamburger = useGLTF('/hamburger.glb')
    hamburger.scene.children.forEach((child) => 
    {
        child.castShadow = true
    })

    return <group position={ position }>
        <Text 
            font="./bebas-neue-v9-latin-regular.woff" 
            scale={ 1 } 
            maxWidth={ 0.25 } 
            lineHeight={ 0.75 } 
            textAlign="right" 
            position={ [ 0, 2.25, 2 ] }
        >
            Finish
            <meshBasicMaterial toneMapped={ false }/>
        </Text>
        {/* BlockStart is a component that handles the starting point of the game */}
        <mesh geometry={ boxGeometry } material={ floor1 } scale={ [ 4, 0.2, 4] } position={ [ 0, - 0.0, 0 ] } receiveShadow />
        <RigidBody type="fixed" colliders={ "hull" } restitution={ 0.2 } friction={ 0 } position={ [ 0, 0.25, 0 ]}>
            <primitive object={ hamburger.scene } scale={ [ 0.2, 0.2, 0.2 ] }/>
        </RigidBody>
    </group>
}

export function BlockSpinner({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ speed ] = useState(() => (Math.random() + 2) * (Math.random() < 0.5 ? - 1 : 1))

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()

        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <group position={ position }>
        {/* BlockStart is a component that handles the starting point of the game */}
        <mesh geometry={ boxGeometry } material={ floor2 } position={ [ 0, - 0.1, 0 ] } scale={ [ 4, 0.2, 4] }  receiveShadow />
        
        <RigidBody ref={ obstacle } type="kinematicPosition" position={ [ 0, 0.2, 0 ] } restitution={ 0.2 } friction={ 0 }>
        <mesh geometry={ spinnerGeometry } material={ obstacleMaterial } position={ [ 0, 0.2, 0 ] } scale={ [ 3, 0.25, 0.25 ] } castShadow/>
        </RigidBody>
    </group>
}

export function BlockLimbo({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2 )

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()

        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
    })

    return <group position={ position }>
        {/* BlockStart is a component that handles the starting point of the game */}
        <mesh geometry={ boxGeometry } material={ floor2 } position={ [ 0, - 0.1, 0 ] } scale={ [ 4, 0.2, 4] }  receiveShadow castShadow/>
        
        <RigidBody ref={ obstacle } type="kinematicPosition" position={ [ 0, 0.2, 0 ] } restitution={ 0.2 } friction={ 0 }>
        <mesh geometry={ spinnerGeometry } material={ obstacleMaterial } position={ [ 0, 0.2, 0 ] } scale={ [ 3, 0.50, 0.50 ] } castShadow/>
        </RigidBody>
    </group>
}

export function BlockAxe({ position = [ 0, 0, 0 ] })
{
    const obstacle = useRef()
    const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2 )

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()

        const x = Math.sin(time + timeOffset) * 0.9
        obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1], z: position[2] })
    })

    return <group position={ position }>
        {/* BlockStart is a component that handles the starting point of the game */}
        <mesh geometry={ boxGeometry } material={ floor2 } position={ [ 0, - 0.1, 0 ] } scale={ [ 4, 0.2, 4] }  receiveShadow />
        
        <RigidBody ref={ obstacle } type="kinematicPosition" position={ [ 0, 1.2, 0 ] } restitution={ 0.2 } friction={ 0 }>
        <mesh geometry={ spinnerGeometry } material={ obstacleMaterial } position={ [ 0, 1.2, 0 ] } scale={ [ 2, 2, 0.50 ] } castShadow/>
        </RigidBody>
    </group>
}

function Bounds({ length = 1})
{
    return <>

        <RigidBody type="fixed" restitution={ 0.2 } friction={ 0 }>
            <mesh geometry={ boxGeometry } material={ wallMaterial } position={ [ 2.15, 0.75, - (length * 2) + 2] } scale={ [ 0.3, 1.5, length * 4 ] } castShadow receiveShadow/>

            <mesh geometry={ boxGeometry } material={ wallMaterial } position={ [ -2.15, 0.75, - (length * 2) + 2] } scale={ [ 0.3, 1.5, length * 4 ] } castShadow receiveShadow/>

            <mesh geometry={ boxGeometry } material={ wallMaterial } position={ [ -0, 0.75, - (length * 4) + 2.15] } scale={ [ 4, 1.5, 0.3 ] } castShadow receiveShadow/>

            <CuboidCollider args={ [ 2, 0.1, length * 2 ] } position={ [ 0, - 0.1, - (length * 2) + 2 ] } restitution={ 0.2 } friction={ 1 }/>
        </RigidBody>
    </>
}

export function Level({ count = 5, types = [ BlockSpinner, BlockAxe, BlockLimbo ], seed = 0})
{
    const blocks = useMemo(() => {
        const blocks = []

        for(let i = 0; i < count; i++)
        {
            const type = types[ Math.floor(Math.random() * types.length) ]
            blocks.push(type)
        }

        return blocks
    }, [ count, types, seed ])

    return <>
        

        <BlockStart position={ [ 0, 0, 0 ] }/>
        
        { blocks.map((Block, index) => <Block key={ index } position={ [ 0, 0, - (index + 1) * 4 ] }/>)}

        <BlockEnd position={ [ 0, 0, - (count + 1) * 4 ] }/>

        <Bounds length={ count + 2 }/>
    </>
}