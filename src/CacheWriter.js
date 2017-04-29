/**
 *  Implements the CacheWriter interface specified by
 *  RelayTypes, uses an instance of CacheRecordStore
 *  to manage the CacheRecord instances
 *  @flow
 */

import CacheRecordStore from './CacheRecordStore';
import type { CacheRecord } from './CacheRecordStore';

const DEFAULT_CACHE_KEY: string = '__RelayCache__';

export type CacheWriterOptions = {
  cacheKey?: string,
  storage?: any,
  cachedData?: Object,
}


export default class CacheWriter {
  cache: CacheRecordStore;
  cacheKey: string;
  storage: any;

  constructor(options: CacheWriterOptions = {}) {
    this.cacheKey = options.cacheKey || DEFAULT_CACHE_KEY;
    this.storage = options.storage || localStorage;
    this.writeInterval = options.writeInterval || 500;

    if (options.cachedData) {
      this.cache = CacheRecordStore.fromJSON(options.cachedData);
    } else {
      this.cache = new CacheRecordStore();
    }
  }

  clearStorage() {
    this.storage.removeItem(this.cacheKey);
    this.cache = new CacheRecordStore();
  }

  throttle(fn) {
    const context = this;
    if (!this.writeTimeout) {
      this.writeTimeout = setTimeout(() => {
        fn.apply(context);
        this.writeTimeout = null;
      }, this.writeInterval);
    }
  }

  writeField(
    dataId: string,
    field: string,
    value: ?mixed,
    typeName: ?string
  ) {
    let record = this.cache.records[dataId];
    if (!record) {
      record = {
        __dataID__: dataId,
        __typename: typeName,
      }
    }
    record[field] = value;
    this.cache.records[dataId] = record;

    try {
      let cache = [];
      const serialized = JSON.stringify(this.cache, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache && cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
          }
          // Store value in our collection
          cache && cache.push(value);
        }
        return value;
      });
      cache = null;
      this.throttle(() => this.storage.setItem(this.cacheKey, serialized));
    } catch (err) {
      /* noop */
      console.log(
        'I can\'t write cache with key ',
        this.cacheKey,
        ' and value ',
        this.cache
      );
      console.log(err);
    }
  }

  writeNode(dataId: string, record: CacheRecord) {
    this.cache.writeRecord(dataId, record);
  }

  readNode(dataId: string) {
    const record = this.cache.readNode(dataId)
    return record;
  }

  writeRootCall(
    storageKey: string,
    identifyingArgValue: string,
    dataId: string
  ) {
    this.cache.rootCallMap[storageKey] = dataId;
  }

  readRootCall(
    callName: string,
    callValue: string,
    callback: (error: any, value: any) => void
  ) {
    const dataId = this.cache.rootCallMap[callName];
    setImmediate(callback.bind(null, null, dataId));
  }
}
