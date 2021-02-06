const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioController extends cc.Component {
    public static I: AudioController;

    @property({ type: cc.AudioClip })
    public audioButtonClick: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    public audioMerge: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    public audioLose: cc.AudioClip = null;


    public onLoad() {
        AudioController.I = this;
    }

    public playButton(): void {
        cc.audioEngine.play(this.audioButtonClick, false, 1);
    }

    public playMerge(): void {
        cc.audioEngine.play(this.audioMerge, false, 1);
    }

    public playLose(): void {
        cc.audioEngine.play(this.audioLose, false, 1);
    }
}
