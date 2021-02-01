class Helper extends cc.Component {
    /**
     * 格式化毫秒数为mm:ss
     * @param t 毫秒数
     */
    public timeFormat(t: number): string {
        const mi: string = Math.floor(t / 60).toString().padStart(2, '0');
        const se: string = (t % 60).toString().padStart(2, '0');
        return `${mi}:${se}`;
    }

    public getContent(originalString: string, format?: any): string {
        if (format && originalString) {
            for (let fk in format) {
                originalString = originalString.replace(`{{ ${fk} }}`, format[fk].toString());
            }
        }
        return originalString;
    }


    /**
     * 逐字显示
     * @param s 字符串
     */
    public *verbatim(s: any) {
        if (!s.hasOwnProperty('length')) {
            return;
        }
        yield* s;
    }

    /**
     * 逐字显示
     * @param l 对应cc.Label
     * @param c 要显示的字符串
     * @param t 每字时间间隔
     */
    public labelVerbatim(l: cc.Label, c: string, t: number = 0.05): Promise<any> {
        const f = this.verbatim(c);
        l.string = '';
        return new Promise((resolve: Function, reject: Function) => {
            this.schedule(() => {
                const r = f.next();
                if (r.done) {
                    resolve();
                } else {
                    l.string += r.value;
                }
            }, t, c.length);
        });
    }
}


export default new Helper();