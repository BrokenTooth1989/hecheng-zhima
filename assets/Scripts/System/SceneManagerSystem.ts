import { PREFABS_NAME, SCENES_NAME } from "../Common/Constant";

class SceneManagerSystem {
    public initialize(): void {
        // 预加载场景
        for (let scene of Object.values(SCENES_NAME)) {
            cc.log('预加载场景： ', scene);
            cc.director.preloadScene(<string>scene);
        }

        // 预加载预制体
        for (let prefab of Object.values(PREFABS_NAME)) {
            cc.log('预加预制体： ', prefab);
            cc.resources.preload(<string>prefab);
        }
    }

    public open(sceneName: string, onOpened?: Function): void {
        cc.director.loadScene(sceneName, onOpened);
    }
}

export default new SceneManagerSystem();