class NodePool {
    private _nodePools: INodePool = {};

    public getItem(name: string, prefab: cc.Prefab): cc.Node {
        let pool = this.__getPool(name);
        if (pool.size() > 0) {
            return pool.get();
        }
        return cc.instantiate(prefab);
    }

    public putItem(name: string, node: cc.Node): void {
        this.__getPool(name).put(node);
    }

    public clear(name: string): void {
        this.__getPool(name).clear();
    }


    private __getPool(name: string): cc.NodePool {
        if (!(name in this._nodePools)) this._nodePools[name] = new cc.NodePool();
        return this._nodePools[name];
    }
}

export default new NodePool();