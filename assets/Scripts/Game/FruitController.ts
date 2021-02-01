import { FRUIT_TAG } from "../Common/Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FruitController extends cc.Component {
    @property({ type: cc.Enum(FRUIT_TAG) })
    public fruitTag: number = FRUIT_TAG.f1;

    private _rigidBody: cc.RigidBody = null;
    private _collider: cc.PhysicsCollider = null;

    public onLoad() {
        this.node.getComponent(cc.PhysicsCollider).tag = this.fruitTag;
        this._rigidBody = this.node.getComponent(cc.RigidBody);
        this._rigidBody.bullet = true;
        this._collider = this.node.getComponent(cc.PhysicsCollider);
        this._collider.friction = 0.2;
        this._collider.restitution = 0.2;
    }

    public stay(): void {
        this._rigidBody.type = cc.RigidBodyType.Static;
    }

    public fall(): void {
        this._rigidBody.type = cc.RigidBodyType.Dynamic
    }


    // 只在两个碰撞体开始接触时被调用一次
    public onBeginContact(c: cc.PhysicsContact, s: cc.PhysicsCollider, o: cc.PhysicsCollider): void {
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
