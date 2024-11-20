import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function MichiBot({ isMobile }: { isMobile: boolean }) {
  const group = useRef();
  const { nodes, animations } = useGLTF("/michi_bot/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the default animation if available
    const animation = Object.values(actions)[0];
    if (animation) {
      animation.play();
    }
  }, [actions]);

  return (
    <group ref={group as any} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={isMobile ? 90.5 : 120.5}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.Sketchfab_model} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/michi_bot/scene.gltf");
