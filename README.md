# Glimpse Client

Glimpse provides real time diagnostics & insights to the fingertips of
hundreds of thousands of developers daily. This is the client which runs in the
browser, which the user interacts with and reports back to the server.

# Contribute

The main purpose of this repository is to continue to evolve Glimpse.Client core,
making it faster and easier to use. If you're interested in helping with
that, then keep reading. If you're not interested in helping right now that's
ok too. :) Any feedback you have about using the Glimpse Client would be
greatly appreciated.

## Build

The process to build `glimpse.[xyz].js` (and its related files) is built
entirely on top of node.js, using many libraries you may already be familiar
 with.

### Prerequisites

The Glimpse Client heavily relies on `Node` and `npm` for its
build process (`bower` is also used for some library dependencies). Hence,

* You have `node` [installed](nodejs.org) at v0.10.0+ (it might work at lower versions, we just haven't tested).
* You are familiar with `npm` and know whether or not you need to use `sudo` when installing packages globally. Note, typically `npm` will be installed when you install `node`.
* As with `npm`, `bower` should be globally [installed](http://bower.io/) and available.

### Cloning Repository

Assuming you have [Git](http://git-scm.com/) installed, clone a copy of the
Glimpse.Client git repo by running:

```sh
git clone https://github.com/Glimpse/Glimpse.Client.git
```

### Getting Running

From here you have a few choices in terms of getting up
and running depending on what you are doing.

#### Quick Build

Enter the Glimpse.Client directory and the first time run the
you run the build script (or are missing the `npm` and/or `bower`
dependencies), execute the below:

```sh
npm run init
```

This will ensure that any dependencies are already downloaded and then place
the built files into the `build` and `dist` folders.

From this point forward you should be able to execute the below:

```sh
npm run build
```
or

```sh
gulp build
```

### Development Build

If you want to have a bit more control over whats happening, you can also use
the following, depending on your requirements:

**Compile the Client**
```sh
gulp build
```

At this point, you should now have a dist` directory populated
with the effected files.

 - `dist` - packaged files ready for use

*Note*: If you want to break down this task you can do so by running either
`gulp build` or `gulp dist` (the latter assumes the `build` directory is
populated).

**Compile the Client and start Dev environement**

If you are actively developing the client, the `dev` task will provide you with
everything you need:

```sh
gulp dev
```

This does everything that `gulp build` does, but also sets starts up a dev
server, starts watchers which will recompile the Client as changes are made and
live reload those changes into the test app.

### Test Running

*To be completed*

## Components

The Glimpse client is broken into 3 primary components or applications:

 - **Glimpse Application** - Pages that detailed data will be viewed through
 - **Glimpse Agent** - Lightweight agent that will send data back from the client to the server
 - **Glimpse Display** - Display that sits in the users site and provides ongoing feedback (aka HUD)

 *More details coming*
