
/**声明qq小游戏明明空间 */
declare namespace qq {
    type ReferrerInfo = {
        /** 来源小程序或公众号或App的 appId	*/
        appId: string,
        /**  来源小程序传过来的数据，scene=1037或1038时支持*/
        extraData: any
    }

    type systemInfo = {
        /** 手机品牌*/
        brand: string;
        /** 手机型号*/
        model: string;
        /**	设备像素比 */
        pixelRatio: number;
        /** 屏幕宽度*/
        screenWidth: number;
        /** 屏幕高度*/
        screenHeight: number;
        /** 可使用窗口宽度*/
        windowWidth: number;
        /** 可使用窗口高度*/
        windowHeight: number;
        /** 状态栏的高度*/
        statusBarHeight: number;
        /** 微信设置的语言*/
        language: string;
        /** 微信版本号*/
        version: string;
        /** 操作系统版本*/
        system: string;
        /** 客户端平台*/
        platform: string
        /** 用户字体大小设置。以“我-设置 - 通用 - 字体大小”中的设置为准，单位 px。*/
        fontSizeSetting: number;
        /** 客户端基础库版本*/
        SDKVersion: string;
        /** 性能等级*/
        benchmarkLevel: number;
    }

    function createRewardedVideoAd(res: { adUnitId: string }): any;
    function showShareMenu(object: { withShareTicket?: boolean, menus: string[], success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    function onShow(callback: (res: {
        /** 场景值*/
        scene: string,
        /** 查询参数*/
        query: any,
        /** shareTicket*/
        shareTicket: string,
        /** 当场景为由从另一个小程序或公众号或App打开时，返回此字段*/
        referrerInfo: ReferrerInfo
    }) => void): void;
    function onHide(callback: () => void): void;
    function showToast(object: { title: string, icon?: 'success' | 'loading' | 'none', image?: string, duration?: number, mask?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void;
    function shareAppMessage(object: { title?: string, imageUrl?: string, query?: string }): void;
    function vibrateShort(object: {
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;
    function vibrateLong(object: {
        success?: (res?: any) => void,
        fail?: (res?: any) => void,
        complete?: (res?: any) => void
    }): void;
    function getSystemInfoSync(): systemInfo;
    function createBannerAd(res: {
        adUnitId: string,
        testDemoType?: string,
        style: {
            left: number,
            top: number,
            width: number,
            height: number
        }
    }): any;
    function exitMiniProgram(object: { success?: () => void, fail?: () => void, complete?: () => void }): void;
    function createInterstitialAd(param: any): any;
}