# rn-relay-cache-manager

A RelayCacheManager implementation for local data caching on React Native apps.
Based on [relay-cache-manager](https://github.com/ConciergeAuctions/relay-cache-manager).


## Overview

Relay defines the [`CacheManager` interface](https://github.com/facebook/relay/blob/752da6940c4eab41397a8d77aaef4adca255aa12/packages/react-relay/classic/tools/RelayTypes.js#L59) which lets you write and read records to a local cache.
Relay will check the cache first when identifying what data it has/needs; by implementing a `CacheManager` you can render locally cached data quickly while Relay queries your API and updates the data when the response comes in.

## Install

```
$ npm install --save rn-relay-cache-manager
```

## Usage

Just create a instance of CacheManager and inject it to the Relay Store:

```js
import CacheManager from 'rn-relay-cache-manager';

const cacheKey = '__cache_key__';
const cachedData = await AsyncStorage.getItem(cacheKey);

const cacheManager = new CacheManager({
  cacheKey, // optional
  cachedData, // optional
  storage: AsyncStorage,
});
Relay.Store.injectCacheManager(cacheManager);
```

## Options

- `cacheKey`: (optional) A string with the key used by storage to read/write data. Default value: `__RelayCache__`.
- `cachedData`: (optional) The loaded cache object
- `storage`: The key-value persistent system that the cache manage will use. Default value: `AsyncStorage` from `react-native`.


## TODO
- Add a example
- Write tests
