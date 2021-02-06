import { SCENES_NAME } from "../Common/Constant";
import PlatformSystem from "../Platform/PlatformSystem";
import GameSceneController from "../Scenes/GameSceneController";
import SceneManagerSystem from "../System/SceneManagerSystem";
import AudioController from "./AudioController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EndPageController extends cc.Component {
    @property(cc.Node)
    public nodePlayAgain: cc.Node = null;

    @property(cc.Label)
    public labelScoreEnd: cc.Label = null;

    public onEnable() {
        AudioController.I.playLose();
        this.labelScoreEnd.string = GameSceneController.I.score.toString();
        this.nodePlayAgain.active = false;
        this.scheduleOnce(() => {
            this.nodePlayAgain.active = true;
        }, 3);
    }

    public playAgain(): void {
        AudioController.I.playButton();
        SceneManagerSystem.open(SCENES_NAME.GameScene);
        PlatformSystem.platform.showInterstitialAd();
    }

    public revive(): void {
        AudioController.I.playButton();
        PlatformSystem.platform.showRewardVideo(() => {
            this.node.active = false;
            GameSceneController.I.revive();
        });
    }
}
