const EventEmitter: cc.EventTarget = new cc.EventTarget();
const EventEmitters: IEventTargets = {};

/**
 * 获取事件派发器
 * @param name 传入派发器名称则获取指定事件派发器，不传入则获取默认事件派发器
 */
export default function getEventEmiter(name: string = null): cc.EventTarget {
    if (name) {
        if (EventEmitters.hasOwnProperty(name)) {
            return EventEmitters[name]
        } else {
            let ne: cc.EventTarget = new cc.EventTarget();
            EventEmitters[name] = ne;
            return ne;
        }
    } else {
        return EventEmitter;
    }
};