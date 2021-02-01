import FruitController from "../Game/FruitController";
import NodePool from "../Libraries/NodePool";
import PlatformSystem from "../Platform/PlatformSystem";

const { ccclass, property } = cc._decorator;
const moveSpeed: number = 2000;

@ccclass
export default class GameSceneController extends cc.Component {
    @property(cc.Node)
    public fruitArea: cc.Node = null

    @property(cc.Node)
    public fruitPosition: cc.Node = null

    @property([cc.Prefab])
    public fruits: cc.Prefab[] = [];

    private _currentFruit: FruitController = null;
    private _existFruits: FruitController[] = [];

    public onLoad() {
        this.fruitArea.on(cc.Node.EventType.TOUCH_END, this.releaseFruit, this);
    }

    public start() {
        PlatformSystem.platform.showBannerAd();
        this.addFruit();
    }

    public addFruit(): void {
        let fruit = this.getOneFruit();
        this.fruitArea.addChild(fruit);
        let currentFruit = fruit.getComponent(FruitController);
        currentFruit.stay();
        fruit.setPosition(this.fruitPosition.position);
        fruit.scale = 0;
        cc.tween(fruit)
            .to(0.25, { scale: 1 })
            .call(() => {
                this._currentFruit = currentFruit;
                this._existFruits.push(this._currentFruit);
            })
            .start();
    }

    public releaseFruit(e: cc.Event.EventTouch): void {
        if (!this._currentFruit) return;
        let currentFruit = this._currentFruit;
        this._currentFruit = null;
        let x = this.fruitArea.convertToNodeSpaceAR(e.getLocation()).x;
        cc.tween(currentFruit.node)
            .to(Math.abs(x - currentFruit.node.x) / moveSpeed, { x: x }, { easing: t => 1 - Math.pow(1 - t, 3) })
            .call(() => {
                currentFruit.fall();
                this.scheduleOnce(this.addFruit, 1);
            })
            .start();
    }

    public clean(): void {

    }

    public startGame(): void {

    }






    public getOneFruit(): cc.Node {
        let prefab = this.fruits[Math.floor(Math.random() * this.fruits.length)];
        let node = NodePool.getItem(prefab.name, prefab);
        return node;
    }
}
