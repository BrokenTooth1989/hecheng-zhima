import { FRUIT_TAG, MERGE_SPEED } from "../Common/Constant";
import NodePool from "../Libraries/NodePool";
import GameSceneController from "../Scenes/GameSceneController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitController extends cc.Component {
    @property({ type: cc.Enum(FRUIT_TAG) })
    public fruitTag: number = FRUIT_TAG.f1;

    @property(cc.Integer)
    public fruitIndex: number = 0;

    public growing: boolean = false;
    public mergeAllow: boolean = false;

    private _rigidBody: cc.RigidBody = null;
    private _collider: cc.PhysicsCollider = null;
    private _originScale: number = 1;
    private _merging: boolean = false;

    // 0-未匹配 1-主动 2-被动
    private _matchStatus: number;
    public get matchStatus(): number {
        return this._matchStatus;
    }
    public set matchStatus(v: number) {
        if (this.matchStatus === 0 && v === 0) return;
        if (this.matchStatus !== 0 && v !== 0) return;
        this._matchStatus = v;
        switch (v) {
            case 0:
                break;

            case 1:
                this.turnToUnreal();
                break;

            case 2:
                break;
        }
    }



    public onLoad() {
        this.node.getComponent(cc.PhysicsCollider).tag = this.fruitTag;
        this._originScale = this.node.scale;
        this._rigidBody = this.node.getComponent(cc.RigidBody);
        this._rigidBody.bullet = true;
        this._collider = this.node.getComponent(cc.PhysicsCollider);
        this._collider.friction = 0.2;
        // this._collider.restitution = 0.2;
        this._collider.density = 0.3;
    }

    public onDisable() {
        this.unschedule(this.checkFail);
    }

    public initForNew(): void {
        this.matchStatus = 0;
        this.node.scale = this._originScale;
        this._collider.enabled = true;
        this._rigidBody.active = false;
        this._merging = false;
        this.growing = false;
        this.mergeAllow = false;
    }

    public initForUpgrade(): void {
        this.matchStatus = 0;
        this.node.scale = 0;
        this._collider.enabled = true;
        this._rigidBody.active = true;
        this._merging = false;
        this.growing = true;
        this.mergeAllow = true;
        cc.tween(this.node)
            .to(0.4, { scale: this._originScale }, { easing: cc.easing.backOut })
            .start();
        this.scheduleOnce(() => {
            this.growing = false;
        }, 0.2);
    }

    public fall(): void {
        this._rigidBody.active = true;
        this.mergeAllow = true;
        this.scheduleOnce(this.checkFail, 2);
    }

    public turnToUnreal(): void {
        this._collider.enabled = false;
        this._rigidBody.linearVelocity = cc.v2(0, 0);
    }

    public mergeFrom(from: cc.Node): void {
        if (this._merging) return;
        this._merging = true;
        cc.tween(from)
            .to(this.node.width / MERGE_SPEED, { position: this.node.position })
            .call(() => {
                NodePool.putItem(from.name, from);
                this.generateNextLevel();
            })
            .start();
    }

    public generateNextLevel(): void {
        cc.tween(this.node)
            .to(0.1, { scale: 0 })
            .call(() => {
                // TODO 在原位置生成一个高等级的水果
                GameSceneController.I.showMergeFruit(this);
                NodePool.putItem(this.node.name, this.node);
            })
            .start();
    }

    public checkFail(): void {
        GameSceneController.I.checkDangerous(this.node);
    }


    // 只在两个碰撞体开始接触时被调用一次
    public onBeginContact(c: cc.PhysicsContact, s: cc.PhysicsCollider, o: cc.PhysicsCollider): void {
        if (s.tag === o.tag) {
            let sc = this;
            let oc = o.node.getComponent(FruitController);
            if (sc.growing || oc.growing) return;
            if (!sc.mergeAllow || !oc.mergeAllow) return;
            if (sc.matchStatus !== 0 || oc.matchStatus !== 0) return;
            if (Math.abs(s.node.y - o.node.y) >= 1) {
                // y轴相差大于1，使用坐标判断
                if (s.node.y > o.node.y) {
                    sc.matchStatus = 1;
                    oc.matchStatus = 2;
                    oc.mergeFrom(s.node);
                } else if (s.node.y < o.node.y) {
                    sc.matchStatus = 2;
                    oc.matchStatus = 1;
                    sc.mergeFrom(o.node);
                }
            } else {
                // y轴相差小于1，使用速度判断
                let vs = Math.abs(this._rigidBody.linearVelocity.x);
                let os = Math.abs(o.node.getComponent(cc.RigidBody).linearVelocity.x);
                cc.log(vs, os);
                if (vs > os) {
                    sc.matchStatus = 1;
                    oc.matchStatus = 2;
                    oc.mergeFrom(s.node);
                } else {
                    sc.matchStatus = 2;
                    oc.matchStatus = 1;
                    sc.mergeFrom(o.node);
                }
            }
        }
    }

    // 只在两个碰撞体结束接触时被调用一次
    public onEndContact(c: cc.PhysicsContact, s: cc.PhysicsCollider, o: cc.PhysicsCollider): void {
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    public onPreSolve(c: cc.PhysicsContact, s: cc.PhysicsCollider, o: cc.PhysicsCollider): void {
    }

    // 每次处理完碰撞体接触逻辑时被调用
    public onPostSolve(c: cc.PhysicsContact, s: cc.PhysicsCollider, o: cc.PhysicsCollider): void {
    }
}
