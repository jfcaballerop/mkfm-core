class Cache {
    constructor(name = 'cache', loadFn){
        if(!loadFn){
            throw new Error('load function is required')
        }

        this._name = name
        this._loadFn = loadFn
        this._loadingPromise = null
        this._loaded = false
        this._data = null
    }

    async load(){
        if(this._loadingPromise) return this._loadingPromise
        try {
            let start = Date.now()
            this._loadingPromise = this._loadFn().then(data => {
                this._data = data
                this._loaded = true
                console.log(`Cache ${this._name} loaded in ${(Date.now()-start)/1000} secs`)
            })
            return this._loadingPromise

        }
        catch(error){
            console.log('Error loading cache ' + this._name + ': ' + error.message)
            console.log(error.stack)
        }
    }

    async get(){
        if(!this._loaded){
            console.log('Cache miss in cache: ', this._name, 'loading...')
            await this.load()
        }
        return this._data
    }

    refresh(){
        this._loadingPromise = null
        this._loaded = false
    }
}

module.exports = Cache