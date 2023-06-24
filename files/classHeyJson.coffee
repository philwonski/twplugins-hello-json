fetchJson = require('./fetcher.js')

class HeyJson
    constructor: (@hey = {}) ->

    runName: =>
        @hey
    
    runFetch: (url) =>
        try
            f = await fetchJson(url)
            return f
        catch e
            console.log(e)
            return "error fetching json in runFetch method"
    
    runMsg: =>
        msg = "hello there"
        return msg


module.exports = HeyJson
