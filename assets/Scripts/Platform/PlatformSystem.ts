import PlatformDefault from "./PlatformDefault";
import PlatformWX from "./PlatformWX";

class PlatformSystem {
    private _platformWX = PlatformWX;
    private _platformDefault = PlatformDefault;
    public get platform(): IPlatform {
        switch (cc.sys.platform) {
            // 微信小游戏
            case cc.sys.WECHAT_GAME:
                return this._platformWX;
                break;

            // 测试用
            default:
                return this._platformDefault;
                break;
        }
    }

    Initialize() {
        switch (cc.sys.platform) {
            // 微信小游戏
            case cc.sys.WECHAT_GAME:
                this._platformWX.initialize();
                break;

            // 测试用
            default:
                this._platformDefault.initialize();
                break;
        }
    }
}

export default new PlatformSystem();