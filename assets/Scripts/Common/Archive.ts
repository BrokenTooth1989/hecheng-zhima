import { PROJECT_CONFIG } from "./ProjectConfig";

const LOCAL_DATA_DEFAULT: ILocalData = {
    achievement: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

class Archive {
    public createUserID(): string {
        let userID = cc.sys.localStorage.getItem(`${PROJECT_CONFIG.appID}_userID`);
        if (!userID) {
            let fullString: string = `0123456789abcdef`;
            userID = '';
            for (let i: number = 0; i < 16; i++) {
                userID += fullString[Math.floor(Math.random() * fullString.length)];
            }
            cc.sys.localStorage.setItem(`${PROJECT_CONFIG.appID}_userID`, userID);
        }
        return userID;
    }


    public createLocalData(userID: string): ILocalData {
        let localDataArchive: string = cc.sys.localStorage.getItem(`${PROJECT_CONFIG.appID}_${userID}_localData`);
        if (!localDataArchive /*|| !localDataArchive.includes('dataVersion')*/) {
            return LOCAL_DATA_DEFAULT;
        } else {
            return Object.assign(
                Object.assign({}, LOCAL_DATA_DEFAULT),
                JSON.parse(localDataArchive)
            );
        }
    }


    public saveLocalData(userID: string, data: ILocalData): void {
        cc.sys.localStorage.setItem(
            `${PROJECT_CONFIG.appID}_${userID}_localData`
            , JSON.stringify(data)
        );
    }
}

export default new Archive();
