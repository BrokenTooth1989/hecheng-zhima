class GlobalSystem {
    public initialize(): void {
        cc.macro.ENABLE_MULTI_TOUCH = false;
        const manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -2800);
        // manager.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     (cc.PhysicsManager.DrawBits as any).e_pairBit |
        //     (cc.PhysicsManager.DrawBits as any).e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        // 开启物理步长的设置
        (manager as any).enabledAccumulator = true;

        // // 物理步长，默认 FIXED_TIME_STEP 是 1/60
        (manager as any).FIXED_TIME_STEP = cc.sys.os == cc.sys.OS_IOS ? 1 : 1 / 30;

        // 每次更新物理系统处理速度的迭代次数，默认为 10
        (manager as any).VELOCITY_ITERATIONS = cc.sys.os == cc.sys.OS_IOS ? 0 : 8;

        // 每次更新物理系统处理位置的迭代次数，默认为 10
        (manager as any).POSITION_ITERATIONS = cc.sys.os == cc.sys.OS_IOS ? 0 : 8;
    }
}

export default new GlobalSystem();