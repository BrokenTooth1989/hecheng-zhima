import { FRUIT_TAG } from "../Common/Constant";
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
    private _originGravityScale: number = 1;
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
                cc.log('设置为  0');
                break;

            case 1:
                cc.log('设置为  1');
                this.turnToUnreal();
                break;

            case 2:
                cc.log('设置为  2');
                break;
        }
    }



    public onLoad() {
        this.node.getComponent(cc.PhysicsCollider).tag = this.fruitTag;
        this._originScale = this.node.scale;
        this._rigidBody = this.node.getComponent(cc.RigidBody);
        this._rigidBody.bullet = true;
        this._originGravityScale = this._rigidBody.gravityScale;
        this._collider = this.node.getComponent(cc.PhysicsCollider);
        this._collider.friction = 0.2;
        this._collider.restitution = 0.2;
        this._collider.density = 0.5;
    }

    public onDisable() {
        this.unschedule(this.checkFail);
    }

    public initForNew(): void {
        this.matchStatus = 0;
        this.node.scale = this._originScale;
        this._collider.enabled = true;
        this._rigidBody.gravityScale = this._originGravityScale;
        this._merging = false;
        this.growing = false;
        this.mergeAllow = false;
    }

    public initForUpgrade(): void {
        this.matchStatus = 0;
        this.node.scale = 0;
        this._collider.enabled = true;
        this._rigidBody.gravityScale = this._originGravityScale;
        this._merging = false;
        this.growing = true;
        this.mergeAllow = true;
        cc.tween(this.node)
            .to(0.1, { scale: this._originScale })
            .call(() => {
                this.growing = false;
            })
            .start();
    }

    public stay(): void {
        this._rigidBody.type = cc.RigidBodyType.Static;
    }

    public fall(): void {
        this._rigidBody.type = cc.RigidBodyType.Dynamic;
        this.mergeAllow = true;
        this.scheduleOnce(this.checkFail, 2);
    }

    public turnToUnreal(): void {
        this._collider.enabled = false;
        this._rigidBody.gravityScale = 0;
        this._rigidBody.linearVelocity = cc.v2(0, 0);
    }

    public mergeFrom(from: cc.Node): void {
        if (this._merging) return;
        this._merging = true;
        cc.tween(from)
            .to(0.1, { position: this.node.position })
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
            sc.matchStatus = 2;
            oc.matchStatus = 1;
            if (s.node.y > o.node.y) {
                sc.matchStatus = 1;
                oc.matchStatus = 2;
                oc.mergeFrom(s.node);
            } else {
                sc.mergeFrom(o.node);
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
