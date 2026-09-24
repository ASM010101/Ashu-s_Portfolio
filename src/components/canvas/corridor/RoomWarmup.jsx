import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * RoomWarmup Component (Optimized)
 * 
 * Safely signals warmup completion to allow the preloader to open cleanly
 * without overloading GPU memory with 4 off-screen rooms simultaneously.
 */
const RoomWarmup = ({ onWarmupComplete }) => {
    const completeFired = useRef(false);

    useFrame(() => {
        if (completeFired.current) return;
        completeFired.current = true;

        requestAnimationFrame(() => {
            onWarmupComplete?.();
        });
    });

    return null;
};

export default RoomWarmup;
