# HelloJson

HelloJson is an opinionated workflow for developing TiddlyWiki plugins -- namely plugins that do asynchronous CRUD operations on JSON from external sources (like JSON from SaaS apps or any other REST API). 

At bottom, it's really just a *file structure* with 3 levels. I like to use this structure for js development in general, and TiddlyWiki plugins in particular.

![image](/docs/illustration.png)

* In this repo, the main.js is called hj.js for "hellojson" and the class file is called classHeyJson.js. Helper filenames vary.

This setup serves me well whenever I'm building alternative user interfaces for tools like Salesforce, Airtable, Quickbooks, and Wordpress.

You can see a demo of the plugin in action [here](https://philwonski.github.io/twplugins-hello-json/#heyJay-test) and actual integrations in the [hello-json-advanced](https://github.com/philwonski/twplugins-hello-json-advanced) repo.

# Why?

TiddlyWiki, typically known as a "second brain" solution, is actually a full-fledged javascript framework under the hood. By extending it with plugins, we can use TiddlyWiki's convenient WikiText syntax to generate complex html, **rapidly building all sorts of user experiences.**

> *That's the Why:* TiddlyWiki and WikiText are just really great tools for building user interfaces FAST.

My focus with this framework is on leveraging that speed to build internal tools for small teams. I do it with  TiddlyWiki + the principles I explore in this repo, as well as its sister repo [hello-json-advanced](https://github.com/philwonski/twplugins-hello-json-advanced). Some fun use cases I've developed with this stack include:

- Work Order Management with Quickbooks for a music studio
- Claims Management in Salesforce for an insurance processor
- Restauraunt Order Management with Wordpress and Twilio texting
- Retailer Warranty Claim submissions with images to AWS


# How?

Basically, by leveraging ChatGPT to scaffold "helpers" underneath the HeyJson class, I can keep the class itself very clean, and write simple and expressive "human" code to do increasingly complex things.

> The idea is straightforward: try to **express all your business logic in the HeyJson class methods** and leave the helpers and the plugin file itself as generic as possible. 

The basic structure starts with just 3 files:

1. `hj.js` - the main plugin file that's (almost) straight from the TiddlyWiki plugin boilerplate 
2. `classHeyJson.js` - required inside the `hj.js` file, it has the cool methods like `fetch(url)`
3. `fetcher.js` - our first helper file, which abstracts a GET request and keeps the class file clean


### Plugin File (hj.js)

In this way, your plugin file itself is just a boilerplate with minimal logic... that is, just enough logic to pass params from the frontend to the class, and handle the response when it comes back from the class. 

"When it comes back from the class" is the key phrase here. All I did in this repo is took a standard plugin boilerplate file and made a few tweaks, namely to make it work with the class file in an *asyncronous* fashion. 

Don't be intimidated by the async stuff: in fact, **my main motivation for creating this system was to make asyncronous code easier to write and read.**

### Class File (classHeyJson.js)

The class file is the heart of this setup. It's where you get to define all the cool methods you want your plugin to have: `fetch(url)`, `post(url, data)`, `makeWordpressPost(post)`, `getSalesforceRecord(opp)`, you get it. 

But instead of building all the functionality of these methods in the class file itself, I'm keeping just the business logic in the class file, and abstracting tedious stuff into helpers underneath the class. This way every little helper can just return a promise with some data to be used in your class method; and this way, every little helper can be written by someone else (like a chatbot or an npm community) instead of you, so you can focus on the business logic.

Using the class file as a sort of "human" interface to the functionality of our plugin is key to the whole system. I developed this style because I wanted a way to write asyncronous operations in a repeatable and fun way.

In other words, the reason you should bother installing good 'ol coffeescript is because it's a great way to write super-clean asyncronous code like this:

```
    runFetch: (url) =>
        try
            f = await fetchJson(url) // where fetchJson is a helper function written by ChatGPT
            return f
        catch e
            console.log(e)
            return "error fetching json in runFetch method"
```

You will see in the classHeyJson.coffee in this repo (and the advanced rep) that virtually every method is structured just like that, a simple try/catch block that calls a helper function with `await`. Neat. 

### Helper File (fetcher.js)

What really supercharges this workflow is the ability to use tools like ChatGPT to scaffold helper functions that do more complex stuff. The key to the framework is respecting the 3-tiered structure of the plugin and using the class file to handle promises from the helper files.

For example, when I have a new need, usually the prompt to ChatGPT will go something like this, which I used to get the `fetcher.js` in this repo:

> i'm using javascript in the browser. I need a sample script that I can require and use in my main app.js script. The sample script should return a promise. 

> the script should simply fetch json from a url and return a string in the promise with the stringified json.

Now you can check `fetcher.js` to see exactly what ChatGPT generated for me. Sweet!

In practice, you can have many helper files besides just the JSON fetcher. Some random examples I've put together in the past include:

4. `poster.js` - a helper to post data to a url
5. `parsexml.js` - a helper to parse xml into json and save in the wiki
6. `wp.js` - a minimized version of [WPAPI](https://www.npmjs.com/package/wpapi)
7. `sendEmail.js` - a helper to send an email
7. `SendText.js` - a helper to send a text message
8. `GetSalesforceRecord.js` - a helper to get a single record from Salesforce
9. etc... 


# This Repo

This repo is the most basic template to create a simple TiddlyWiki plugin using the Hello Json workflow. It's a good starting point for most any plugin of this nature (see the Advanced Repo section below for important context on the phrase "starting point").

The recommended TiddlyWiki [developer workflow](https://tiddlywiki.com/dev/#Developing%20plugins%20using%20Node.js%20and%20GitHub) with git is used to set up the project.

After the brief setup, note the file structure, which explains the basics of my little HelloJson framework:

`plugins/philwonski/twplugins-hello-json/`

- `hj.js` - the main plugin file (based on boilerplate TiddlyWiki plugin code)
- `plugin.info` - the plugin metadata (based on boilerplate TiddlyWiki plugin code)
- `/files` - the supporting files I set up to do cool stuff
  - `tiddlywiki.files` - this is an important file which tells TiddlyWiki to load the files in this directory
  - `classHeyJson.coffee` - this is the main class that I use to write logic like a human
  - `classHeyJson.js` - compiled version of the class (run `coffee -c classHeyJson.coffee` to compile)
  - `fetcher.js` - a ChatGPT-generated helper used by the HeyJson class to fetch data from a url

I have also included the `heyJay-test.tid` to to show how to use the plugin in any Wiki. You can view the example index.html output with the heyJay-test loaded [here](https://philwonski.github.io/twplugins-hello-json/#heyJay-test).

# Advanced Repo

The [advanced repo](https://github.com/philwonski/twplugins-hello-json-advanced) is a more complex example of a plugin that uses the Hello Json workflow to do a bunch of different things. But the point of all this is that the advanced repo still has the exact same structure as this one:

- *Entry hj.js* file to take params from the frontend and pass them to the class
  - *classHeyJson.coffee* file with all the cool methods
    - fetcher.js *helper* file which the class uses to fetch data from a url
    - lots of other *helper* files to help the class do cool stuff

So the main idea of the Advanced Repo is to show more examples of the different things you can do with this file structure. A couple quick points to understand about why I call this repo a "starting point," even though it is a functional plugin:

1. **RENDER FUNCTION:** In the RENDER section of our basic TW plugin `hj.js`, you can see that "rendering the widget" just means returning a string of text to the frontend when you do `<$hellojson command="hangover" />` in your WikiText. That's nice and all, but what if we want to do something other than just display some text? Well, you can, but I try to keep RENDER and REFRESH as close to boilerplate as possible for hello-json repos, for the sake of emphasizing the EXECUTE block and its relationship to the class file.

2. **MISSING INVOKE FUNCTION:** In regards to the TiddlyWiki boilerplate function used in this repo, it's the kind that gets invoked whenever it's called in WikiText with `<$hellojson`... but, that's not always what we want. Sometimes we want something to happen only when we click a button, for example. That's why TiddlyWiki provides the option to add the **INVOKE** block to your plugin. Here again, I try to keep everything in the main plugin file as close to boilerplate as possible in this repo, so I've left out the INVOKE function. In the advanced repo, I move the actions I want the plugin to perform from the EXECUTE function into the INVOKE function, so the actions occur in response to an event like a button click, as opposed to every time the tag `<$hellojson` appears.

# Usage

I set up my dev environment exactly like the instructions here: 

[https://tiddlywiki.com/dev/#Developing%20plugins%20using%20Node.js%20and%20GitHub](https://tiddlywiki.com/dev/#Developing%20plugins%20using%20Node.js%20and%20GitHub)

It may seem like a bunch of steps, but the build process is very logical once you get the hang of it. It can be boiled down to this:

1. Make a folder on your computer called TWdev (or whatever you want). This is where you will keep all your plugins that you work on.

2. Inside the new directory, install a local copy of TW5 with `git clone https://github.com/Jermolene/TiddlyWiki5.git TW5`.

3. Now you can see the TW5 directory has two important folders: `editions` and `plugins`. All we are doing is:
    1. Adding our own plugin code under plugins.
    2. Picking an edition, like `TW5/editions/empty`, and adding a quick reference to our plugin in the `tiddlywiki.info` file.
    3. Running a single command *in the TW5 folder* to build that particular edition with our plugin included, like `node ./tiddlywiki.js editions/empty --build index`... this will create a static html version of the wiki you can view and share. Find the static file in the the `output` folder under the edition you just built.

So the top of my file `TWdev/TW5/editions/empty/tiddlywiki.info` now looks like this:

```
{
	"description": "Empty edition",
	"plugins": [
		"philwonski/twplugins-hello-json"
	],

```

And I can generate a static html version of the wiki, with my plugin included, by running this command in the TW5 folder: `node ./tiddlywiki.js editions/empty --build index` and then opening the file `...TWdev/TW5/editions/empty/output/index.html#heyJay-test` in my browser.

## Coffeescript

Make fun of me all you want, I get a ton of mileage out of Coffeescript for all types of javascript dev. I use VSCode and the "CoffeeScript Preview" plugin by Drew Barrett. I just write my code in Coffeescript and then compile it to javascript with a single command `coffee -c classHeyJson.coffee` from the /files folder.