import GameSceneController from "../Scenes/GameSceneController";
import PlatformSystem from "./PlatformSystem";
import { WX_CONFIG, QQ_CONFIG } from "./AdConfig";

const delayTime: number = 3600;
const onWixinMiniGame: boolean = false;

class PlatformWX implements IPlatform {
    private _onHideTime: number = Infinity;

    private _rewardVideo: wx.RewardedVideoAd;
    private _bannerAd: wx.BannerAd;
    private _interstitialAd: any;
    private _customAd: any;
    private _adConfig: any;

    private _shareSuccessHandler: Function = null;
    private _videoSuccessHandler: Function = null;

    public initialize(): void {
        console.log("初始化微信/QQ框架");
        this._adConfig = WX_CONFIG;
        if (!onWixinMiniGame) this._adConfig = QQ_CONFIG;
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
            success: () => { },
            fail: () => { },
            complete: () => { }
        });
        wx.onShow((res: {
            scene: string;
            query: any;
            shareTicket: string;
            referrerInfo: wx.ReferrerInfo;
        }) => {
            if (this._shareSuccessHandler == null) return;
            if (Date.now() - this._onHideTime < delayTime) {
                this.showToast({
                    title: "分享成功才能获得奖励哦"
                });
            } else {
                if (this._shareSuccessHandler) this._shareSuccessHandler();
            }
            this._shareSuccessHandler = null;
            this._onHideTime = Infinity;
        });
        wx.onHide(() => {
            if (GameSceneController.I) {
                GameSceneController.I.saveData();
            }
        });

        this.__createBannerAd();
        this.__createVideoAd();
        this.__createInterstitialAd();
        this.__createCustomAd();
    }


    public showToast(param: { title: string, icon?: 'success' | 'loading' | 'none', image?: string, duration?: number, mask?: boolean, success?: (res?: any) => void, fail?: (res?: any) => void, complete?: (res?: any) => void }): void {
        let finalParam = {
            title: '',
            icon: 'none',
            duration: 2000,
        } as any;
        Object.assign(finalParam, param);
        wx.showToast(finalParam);
    }

    public shareAppMessage(param: { title?: string, imageUrl?: string, query?: string, imageUrlId?: string } = {}): void {
        wx.shareAppMessage(param);
    }

    public vibrateShort(param: any = {}): void {
        wx.vibrateShort(param);
    }

    public vibrateLong(param: any = {}): void {
        wx.vibrateLong(param);
    }

    public shareShowReward(handler: Function = null): void {
        this._shareSuccessHandler = handler;
        this._onHideTime = Date.now();
        this.shareAppMessage();
    }

    public showRewardVideo(handler: Function = null): void {
        if (!this._rewardVideo) return;
        this._videoSuccessHandler = handler;
        this._rewardVideo
            .show()
            .then(() => {
                console.log("视频播放成功")
            })
            .catch(err => {
                this._rewardVideo.load()
                    .then(() => {
                        this._rewardVideo
                            .show()
                            .then(() => {
                                console.log("视频重新加载，播放成功")
                            });
                    })
                    .catch(err2 => {
                        this.shareShowReward(handler);
                        this._videoSuccessHandler = null;
                    });
            });
    }

    public showBannerAd(): void {
        if (!this._bannerAd) return;
        const { screenWidth, screenHeight } = wx.getSystemInfoSync();
        this._bannerAd.show()
            .then(() => {
                this._bannerAd.style.left = (screenWidth - this._bannerAd.style.realWidth) / 2;
                this._bannerAd.style.top = screenHeight - this._bannerAd.style.realHeight;
            }).catch((e: any) => {
                cc.log('banner广告显示出错', e);
            });
    }

    public hideBannerAd(recreate: boolean = false): void {
        if (!this._bannerAd) return;
        this._bannerAd.hide();
        if (recreate) {
            this.refreshBannerAd();
        }
    }

    public refreshBannerAd(): void {
        if (!this._bannerAd) return;
        this._bannerAd.destroy();
        this.__createBannerAd();
    }

    public showInterstitialAd(): void {
        if (!this._interstitialAd) return;
        this._interstitialAd.show();
    }

    public loadInterstitialAd(): void {
        if (!this._interstitialAd) return;
        this._interstitialAd.load();
    }

    public showCustomAd(): void {
        if (!!this._customAd) {
            this._customAd
                .show()
                .catch((e: any) => {
                    cc.log('原生广告显示出错', e);
                });
        }

        // if (!!this._customAd_2) {
        //     this._customAd_2
        //         .show()
        //         .catch((e: any) => {
        //             cc.log('原生广告显示出错2', e);
        //         });
        // }
    }

    public hideCustomAd(): void {
        if (!!this._customAd) {
            this._customAd
                .hide()
                .catch((e: any) => {
                    cc.log('原生广告隐藏出错', e);
                });
        }
    }

    public exitGame(): void {
        wx.exitMiniProgram({});
    }

    public shareApp(): void {
        wx.shareAppMessage({});
    }


    private __createVideoAd(): void {
        if (!this._adConfig.AD_ID.video) return;
        this._rewardVideo = wx.createRewardedVideoAd({ adUnitId: this._adConfig.AD_ID.video });
        // 注册视频的onClose事件
        this._rewardVideo.onClose(res => {
            if (res && res.isEnded || res === undefined) {
                if (this._videoSuccessHandler == null) return;
                if (this._videoSuccessHandler) this._videoSuccessHandler();
            } else {
                this.showToast({
                    title: "完整观看视频才有奖励哦"
                });
            }
            this._videoSuccessHandler = null;
        });
        // 注册视频的onError事件
        this._rewardVideo.onError(res => {
            // switch (this._videoType) {

            // }
            this.showToast({
                title: "暂时没有可观看的视频"
            });
            this.shareShowReward(this._videoSuccessHandler);
            this._videoSuccessHandler = null;
        });
    }

    private __createBannerAd(): void {
        if (!this._adConfig.AD_ID.banner) return;
        console.log('创建banner广告');
        let info = wx.getSystemInfoSync();
        this._bannerAd = wx.createBannerAd({
            adUnitId: this._adConfig.AD_ID.banner,
            adIntervals: 420,
            style: {
                left: 0,
                top: 0,
                width: info.screenWidth,
                height: 0
            }
        });
        this._bannerAd.onError(err => {
            switch (err.errCode) {
                case 1001: {

                    break;
                }

                case 1004: {

                    break;
                }
            }
        });
        this._bannerAd.onResize(() => {

        });
        console.log(this._bannerAd);
    }

    private __createInterstitialAd(): void {
        if (!this._adConfig.AD_ID.interstitial) return;
        this._interstitialAd = wx.createInterstitialAd({ adUnitId: this._adConfig.AD_ID.interstitial });
        this._interstitialAd.onError(err => {
            console.log('拉取插屏广告失败', err.errMsg);
            switch (err.errCode) {
                case 1004:
                    PlatformSystem.allowShowInter = false;
                    break;
            }
        });
        this._interstitialAd.onLoad(() => {
            console.log('拉取插屏广告成功');
            PlatformSystem.allowShowInter = true;
        });
    }

    private __createCustomAd(): void {
        if (!this._adConfig.AD_ID.custom) return;
        if (!wx.createCustomAd) return;
        let info = wx.getSystemInfoSync();
        this._customAd = wx.createCustomAd({
            adUnitId: this._adConfig.AD_ID.custom,
            adIntervals: 60,
            style: { left: 10, top: 80 + (info.screenHeight - 1280 * (info.screenWidth / 720)) / 2 }
        });
    }
}

export default new PlatformWX();