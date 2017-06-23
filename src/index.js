// @flow

import CacheWriter from './CacheWriter';
import type { CacheWriterOptions } from './CacheWriter';

export default class RelayCacheManager {
  cacheWriter: CacheWriter;
  constructor(options: CacheWriterOptions) {
    this.cacheWriter = new CacheWriter(options);
  }

  clear() {
    this.cacheWriter.clearStorage();
  }

  getMutationWriter(): CacheWriter {
    return this.cacheWriter;
  }

  getQueryWriter(): CacheWriter {
    return this.cacheWriter;
  }

  getAllRecords() {
    return this.cacheWriter.cache.records;
  }

  readNode(
    id: string,
    callback: (error: any, value: any) => void
  ) {
    const node = this.cacheWriter.readNode(id);
    setImmediate(callback.bind(null, null, node));
  }

  readRootCall(
    callName: string,
    callValue: string,
    callback: (error: any, value: any) => void
  ) {
    this.cacheWriter.readRootCall(callName, callValue, callback);
  }
}
