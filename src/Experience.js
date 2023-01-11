import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.js'
import { Level } from './Level.js'
import Player from './Player.js'
import { Physics, Debug } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import Effects from './Effects.js'
import useGame from './stores/useGame.js'

export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)

    return <>
        <color args={ [ '#252731' ] } attach="background" />

        <OrbitControls makeDefault />
        {/* <Perf /> */}

        <Physics>
            {/* <Debug /> */}
            <Lights />
            <Level count={ blocksCount } seed={ blocksSeed + 1 }/>
            <Player />
            <Effects />
        </Physics>
    </>
}