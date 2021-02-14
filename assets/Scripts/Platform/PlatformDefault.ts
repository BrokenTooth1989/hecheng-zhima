class PlatformDefault implements IPlatform {

    public initialize(): void {
        cc.log('初始化默认广告框架');
    }


    public showToast(param: { title: string, icon?: 'success' | 'loading' | 'none', image?: string, duration?: number, mask?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void {
        cc.log('显示toast  ', param);
    }

    public shareAppMessage(param: { title?: string, imageUrl?: string, query?: string, imageUrlId?: string } = {}): void {
        cc.log('分享 ', param);
    }

    public vibrateShort(param: any = {}): void {
        cc.log('短震动 ', param);
    }

    public vibrateLong(param: any = {}): void {
        cc.log('长震动 ', param);
    }

    public shareShowReward(handler: Function = null): void {
        cc.log('直接执行分享回调');
        if (handler) handler();
    }

    public showRewardVideo(handler: Function = null): void {
        cc.log('直接执行视频回调');
        if (handler) handler();
    }

    public showBannerAd(): void {
        cc.log('显示banner广告');
    }

    public hideBannerAd(recreate: boolean = false): void {
        cc.log('隐藏banner广告，刷新：', recreate);
    }

    public refreshBannerAd(): void {
        cc.log('刷新banner广告');
    }

    public showInterstitialAd(): void {
        cc.log('显示插屏广告');
    }

    public loadInterstitialAd(): void {
        cc.log('手动加载插屏广告');
    }

    public showCustomAd(): void {
        cc.log('显示自定义广告');
    }

    public hideCustomAd(): void {
        cc.log('隐藏自定义广告');
    }

    public exitGame(): void {
        cc.log('退出游戏');
    }

    public shareApp(): void {
        cc.log('分享游戏');
    }

    private __createVideoAd(): void {
        cc.log('创建视频广告');
    }

    private __createBannerAd(): void {
        cc.log('创建banner广告');
    }

    private __createInterstitialAd(): void {
        cc.log('创建插屏广告');
    }
}

export default new PlatformDefault();