class Cache {
    constructor(name = 'cache', loadFn){
        if(!loadFn){
            throw new Error('load function is required')
        }

        this._name = name
        this._loadFn = loadFn
        this._loaded = false
        this._data = null
    }

    async load(){
        try {
            let start = Date.now()
            this._data = await this._loadFn()
            this._loaded = true
            console.log(`Cache ${this._name} loaded in ${(Date.now()-start)/1000} secs`)
        }
        catch(error){
            console.log('Error loading cache ' + this._name + ': ' + error.message)
            console.log(error.stack)
        }
    }

    async get(){
        if(!this._loaded){
            console.log('Cache miss', this._name, 'loading...')
            await this.load()
        }
        console.log('Returning cached data from', this._name)
        return this._data
    }

    async refresh(){
        this._loaded = false
    }
}

module.exports = Cache