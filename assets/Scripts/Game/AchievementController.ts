import PlatformSystem from "../Platform/PlatformSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AchievementController extends cc.Component {
    public static I: AchievementController;

    @property(cc.Node)
    public nodeContent: cc.Node = null;

    @property(cc.Node)
    public nodeContinue: cc.Node = null;

    @property(cc.Label)
    public labelDesc: cc.Label = null;

    @property(cc.Sprite)
    public spriteFruit: cc.Sprite = null;

    @property([cc.SpriteFrame])
    public frameFruits: cc.SpriteFrame[] = [];

    private fruitNames: string[] = [
        '大西瓜',
        '大椰子',
        '大哈密瓜',
        '小苹果',
        '小桃子',
        '小火龙果',
        '小橙子',
        '小柠檬',
        '小猕猴桃',
        '小山竹',
        '小芝麻'
    ];


    public onLoad() {
        AchievementController.I = this;
        this.node.active = false;
    }


    public show(fruitIndex: number, achieveNumber: number): void {
        if (this.node.active) return;
        this.nodeContent.scale = 0;
        this.node.active = true;
        cc.tween(this.nodeContent)
            .to(0.3, { scale: 1 }, { easing: cc.easing.backOut })
            .start();
        this.nodeContinue.active = true;
        this.spriteFruit.spriteFrame = this.frameFruits[fruitIndex];
        this.labelDesc.string = `累计合成 ${achieveNumber} 个${this.fruitNames[fruitIndex]}`;
        PlatformSystem.platform.showInterstitialAd();
    }

    public shareApp(): void {
        PlatformSystem.platform.shareApp();
    }

    public resume(): void {
        cc.tween(this.nodeContent)
            .to(0.3, { scale: 0 }, { easing: cc.easing.backIn })
            .call(() => {
                this.node.active = false;
            })
            .start();
    }
}
