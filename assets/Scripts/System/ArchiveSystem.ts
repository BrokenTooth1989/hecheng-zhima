import Archive from "../Common/Archive";

class ArchiveSystem extends cc.Component {
    private _localData: ILocalData;

    public userID: string;
    public localData: ILocalData;

    public initialize(): void {
        this.userID = Archive.createUserID();
        this._localData = Archive.createLocalData(this.userID);
        this.__saveLocalData();

        this.localData = new Proxy(this._localData, {
            get: (target: ILocalData, key: string) => {
                return target[key];
            },
            set: (target: ILocalData, key: string, value: any) => {
                target[key] = value;
                this.__saveLocalData();
                return true;
            }
        });
    }


    private __saveLocalData(): void {
        Archive.saveLocalData(this.userID, this._localData);
    }
}

export default new ArchiveSystem();