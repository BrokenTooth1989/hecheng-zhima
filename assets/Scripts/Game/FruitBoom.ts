import NodePool from "../Libraries/NodePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitBoom extends cc.Component {
    private _animation: cc.Animation;

    public onLoad() {
        this._animation = this.node.getComponent(cc.Animation);
        this._animation.on('finished', this.recover, this);
        this.node.zIndex = 10;
    }

    public onEnable() {
        this._animation.stop();
        this._animation.play(null, 0);
    }

    public recover(): void {
        NodePool.putItem(this.node.name, this.node);
    }
}
