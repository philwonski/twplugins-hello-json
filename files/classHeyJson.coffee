fetchJson = require('./helper-fetcher.js')

class HeyJson
    constructor: (@hey = {}) ->

    runFetch: (url) =>
        try
            f = await fetchJson(url)
            return f
        catch e
            console.log(e)
            return "error fetching json in runFetch method"


module.exports = HeyJson
