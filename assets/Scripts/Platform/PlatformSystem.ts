import PlatformDefault from "./PlatformDefault";
import PlatformQQ from "./PlatformQQ";
import PlatformWX from "./PlatformWX";

class PlatformSystem {
    private _isQQ: boolean = true;
    private _platformWX = PlatformWX;
    private _platformQQ = PlatformQQ;
    private _platformDefault = PlatformDefault;

    public allowShowInter: boolean = true;

    public get platform(): IPlatform {
        if (this._isQQ) return this._platformQQ;
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
        if (this._isQQ) {
            this._platformQQ.initialize();
            return;
        }
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