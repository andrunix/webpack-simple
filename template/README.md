# {{ name }}

> {{ description }}

## Prerequisites

This template is for building Script Applications with Vue.js on IBM
WebSphere Portal Server, a.k.a. Digital Experience version 9. 

You can create, edit, debug, and run everything locally but in order to
push the Script Application to the Portal Server, you need to take a
few preliminary steps. 

1. Have access to a Portal Server
2. Have the sp command line utility configured on your local machine
3. Add a new Script Application to the Portal Page where you would like it to run
4. Download (export) the Script Application, or minimally the sp-config.json file 
5. Copy the sp-config.json from step 4 to this project's sp directory

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# push script application to server
npm run push
```

Note that before you can run the push command, you need to have completed the sp command line setup and fulfilled all the other prerequisites.

## webpack setup

This project uses Webpack for development and production builds. The configuration
uses an ejs template (index.template.ejs) for the index.html. This means that the
index.html file from your script application is replaced by this template when you 
build for production `npm run build`.

This allows you to customize the index.html for development vs. production. For example,
in production, we assume some things are provided by the theme. So we don't want to bundle
them in this index.html. Bootstrap being an example. So in the template, we add Bootstrap
but it is surrounded by an if statement checking for the existence of dev-specific parameters.

These are provided in the HtmlWebpackPlugin options. 

``` javascript
  ...
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
      devOptions: {
          user: 'g100050'
      }
    })
    
    ...
  ]

```

Then, in the index.template.ejs file, you can conditionally include code based 
on the presence of this devOptions value. For example:

``` html

    <% if (htmlWebpackPlugin.options.devOptions) { %>
    <span id="theme-userid"><%= htmlWebpackPlugin.options.devOptions.user %></span>
    <% } %>

```

## sp setup

Setting up the sp command line utility is fairly easy. DO NOT DOWNLOAD FROM THE INTERNET.
Get the copy that ships with the version of DX9 you are running. In my case, this was in:

``` bash
/usr/wps/WebSphere/PortalServer/scriptingportlet/wp.scriptportlet.cmdln/bin/sp_cmdln.zip
```

* Download this file to the local machine, using whatever utility you like. scp is fine.
* Extract the zip file to the location of your choice. I put things like this in C:\tools
* Add the appropriate script to your PATH. If you are using Windows command prompt, use sp.bat. If you are using Linux, OSX, or git bash on Windows, use sp.sh
* Edit the sp-config.json in this directory to include the server name, username, and password. Yes, this password is stored in plain text. Guard it! Keep this file in the same directory with the binary. Each portlet will have its own version that keeps the portlet-specific information like the WCM id.

### Script Application Links

* [Render Parameter Tags](https://www.ibm.com/support/knowledgecenter/en/SSYJ99_8.5.0/script-portlet/render_param_tags.html)
* [spHelper](https://www.ibm.com/support/knowledgecenter/en/SSYJ99_8.5.0/script-portlet/cmd_line_api.html)
* [Add tokens to generate unique namespace IDs](https://www.ibm.com/support/knowledgecenter/en/SSYJ99_8.5.0/script-portlet/cmd_line_push_cmd_patt_rep.html)


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
