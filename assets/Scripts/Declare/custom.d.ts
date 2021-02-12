/**
 * 地图每层的原始数据结构
 */
interface IMapLayerInfo {
    width: number;
    height: number;
    x: number[];
    y: number[];
    blocks: number[];
}

/**
 * 每个地图的配置文件结构
 */
interface IMapInfo {
    blockTypeNum: number;
    map: IMapLayerInfo[];
}

interface IFruitPosition {
    typeIndex: number;
    position: { x: number, y: number }
}

/**
 * 本地存储的数据结构
 */
interface ILocalData {
    achievement: number[];
    lastData: IFruitPosition[];
    lastMaxLevel: number;
    lastScroe: number;
}

/**
 * 存储已经加载出来的皮肤信息
 */
interface ISkinLoaded {
    blockSkin: { [index: string]: cc.SpriteFrame[] };
}

/**
 * 事件派发器列表
 */
interface IEventTargets {
    [index: string]: cc.EventTarget;
}

interface INodePool {
    [index: string]: cc.NodePool;
}


/** 封装平台方法接口 */
interface IPlatform {
    initialize: Function;
    showToast: { (param: { title: string, icon?: 'success' | 'loading' | 'none', image?: string, duration?: number, mask?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void };
    shareAppMessage: { (param: { title?: string, imageUrl?: string, query?: string, imageUrlId?: string } = {}): void };
    vibrateShort: Function;
    vibrateLong: Function;
    shareShowReward: { (handler: Function): void };
    showRewardVideo: { (handler: Function): void };
    showBannerAd: Function;
    hideBannerAd: { (recreate: boolean = false): void };
    refreshBannerAd: Function;
    showInterstitialAd: Function;
    showCustomAd: Function;
    hideCustomAd: Function;
    exitGame: Function;
    shareApp: Function;
}