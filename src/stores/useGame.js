import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        blocksCount: 12,
        blocksSeed: 0,

        /**
         * Time
         */
        startTime: 0,
        endTime: 0,

        /**
         * Phases
         */
        phase: 'ready',

        // simplified version of the below functions
        start: () => set((state) => state.phase === 'ready' ? { phase: 'playing', startTime: Date.now()} : {} ),
            
        
        restart: () =>
        {
            set((state) =>
            {
                if(state.phase === 'playing' || state.phase === 'ended')
                    return { phase: 'ready', blocksSeed: Math.random() }
                return {}
            }) 
        },

        end: () =>
        {

            set((state) => {
                
                if (state.phase === 'playing')
                    return { phase: 'ended', endTime: Date.now() }
                return {}

            })
        },
    }
}))