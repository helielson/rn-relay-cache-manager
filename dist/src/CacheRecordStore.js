/**
 * Manages all cached records, including read/write and
 * deserialization.
 * 
 */

import GraphQLRange from 'react-relay/lib/GraphQLRange';

/**
 * These types are being copied from RelayInternalTypes.
 * Relay does not currently offer a way to use internal
 * type definitions. Since this library is essentially
 * mimicking internal data structures, we just copy what we
 * need manually until a better solution presents itself.
 *
 * https://github.com/facebook/relay/blob/master/src/tools/RelayInternals.js
 */

export default class CacheRecordStore {
  constructor(records, rootCallMap) {
    this.records = records || {};
    this.rootCallMap = rootCallMap || {};
  }

  updateRecords(records, rootCallMap) {
    this.records = records;
    this.rootCallMap = rootCallMap;
  }

  writeRootCall(storageKey, identifyingArgValue, dataId) {
    this.rootCallMap[storageKey] = dataId;
  }

  writeRecord(dataId, record) {
    this.records[dataId] = record;
  }

  getDataIdFromRootCallName(callName, callValue // eslint-disable-line no-unused-vars
  ) {
    return this.rootCallMap[callName];
  }

  readNode(dataID) {
    return this.records[dataID] || null;
  }

  /**
   * Takes an object that represents a partially
   * deserialized instance of CacheRecordStore
   * and creates a new instance from it. This is required
   * so that __range__ values can be correctly restored.
   */
  static fromJSON({ records, rootCallMap }) {
    for (var key in records) {
      const record = records[key];
      const range = record.__range__;
      if (range) {
        record.__range__ = GraphQLRange.fromJSON(range);
      }
    }
    return new CacheRecordStore(records, rootCallMap);
  }
}
//# sourceMappingURL=CacheRecordStore.js.map