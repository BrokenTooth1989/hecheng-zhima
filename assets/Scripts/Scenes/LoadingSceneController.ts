import { SCENES_NAME } from "../Common/Constant";
import PlatformSystem from "../Platform/PlatformSystem";
import ArchiveSystem from "../System/ArchiveSystem";
import GlobalSystem from "../System/GlobalSystem";
import SceneManagerSystem from "../System/SceneManagerSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingSceneController extends cc.Component {
    public async onLoad() {
        // 初始化全局配置
        GlobalSystem.initialize();
        // 初始化本地存储
        ArchiveSystem.initialize();
        // 预加载一些Scene
        SceneManagerSystem.initialize();
        // 初始化平台
        PlatformSystem.Initialize();
    }

    public start() {
        // 打开主页
        SceneManagerSystem.open(SCENES_NAME.GameScene);
    }
}
