class GlobalSystem {
    public initialize(): void {
        const manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -2800);
        // manager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     (cc.PhysicsManager.DrawBits as any).e_pairBit |
        //     (cc.PhysicsManager.DrawBits as any).e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        cc.macro.ENABLE_MULTI_TOUCH = false;
    }
}

export default new GlobalSystem();