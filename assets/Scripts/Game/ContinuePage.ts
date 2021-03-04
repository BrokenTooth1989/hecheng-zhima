import PlatformSystem from "../Platform/PlatformSystem";
import GameSceneController from "../Scenes/GameSceneController";
import ArchiveSystem from "../System/ArchiveSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ContinuePage extends cc.Component {
    public static I: ContinuePage;

    @property(cc.Node)
    public nodeContent: cc.Node = null;

    @property(cc.Label)
    public labelScore: cc.Label = null;

    @property(cc.Label)
    public labelDesc: cc.Label = null;



    public onLoad() {
        ContinuePage.I = this;
        this.node.active = false;
    }


    public show(): void {
        if (this.node.active) return;
        const localData = ArchiveSystem.localData;
        this.nodeContent.scale = 0;
        this.node.active = true;
        cc.tween(this.nodeContent)
            .to(0.3, { scale: 1 }, { easing: cc.easing.backOut })
            .start();
        this.labelScore.string = localData.lastScroe.toString();
        this.labelDesc.string = `当前 ${localData.lastData.filter((v) => { return v.typeIndex === 10; }).length} 个小芝麻`;
    }

    public continue(): void {
        PlatformSystem.platform.showRewardVideo(() => {
            this.__close(() => {
                GameSceneController.I.enterGame();
            });
        });
    }

    public restart(): void {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            wx.showModal({
                title: '继续游戏',
                content: '重新开始将清空水果和分数\n是否继续游戏？',
                success: (res) => {
                    if (res.confirm) {
                        this.continue();
                    } else {
                        this.__close(() => {
                            GameSceneController.I.clearData();
                            GameSceneController.I.enterGame();
                        });
                    }
                },
            });
            return;
        }
        this.__close(() => {
            GameSceneController.I.clearData();
            GameSceneController.I.enterGame();
        });
    }

    private __close(callBack: Function): void {
        cc.tween(this.nodeContent)
            .to(0.3, { scale: 0 }, { easing: cc.easing.backIn })
            .call(() => {
                this.node.active = false;
                callBack();
            })
            .start();
    }
}
