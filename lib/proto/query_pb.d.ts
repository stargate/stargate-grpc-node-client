// package: stargate
// file: query.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class ConsistencyValue extends jspb.Message {
  getValue(): ConsistencyMap[keyof ConsistencyMap];
  setValue(value: ConsistencyMap[keyof ConsistencyMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsistencyValue.AsObject;
  static toObject(includeInstance: boolean, msg: ConsistencyValue): ConsistencyValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsistencyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsistencyValue;
  static deserializeBinaryFromReader(message: ConsistencyValue, reader: jspb.BinaryReader): ConsistencyValue;
}

export namespace ConsistencyValue {
  export type AsObject = {
    value: ConsistencyMap[keyof ConsistencyMap],
  }
}

export class Collection extends jspb.Message {
  clearElementsList(): void;
  getElementsList(): Array<Value>;
  setElementsList(value: Array<Value>): void;
  addElements(value?: Value, index?: number): Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Collection.AsObject;
  static toObject(includeInstance: boolean, msg: Collection): Collection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Collection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Collection;
  static deserializeBinaryFromReader(message: Collection, reader: jspb.BinaryReader): Collection;
}

export namespace Collection {
  export type AsObject = {
    elementsList: Array<Value.AsObject>,
  }
}

export class UdtValue extends jspb.Message {
  getFieldsMap(): jspb.Map<string, Value>;
  clearFieldsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UdtValue.AsObject;
  static toObject(includeInstance: boolean, msg: UdtValue): UdtValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UdtValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UdtValue;
  static deserializeBinaryFromReader(message: UdtValue, reader: jspb.BinaryReader): UdtValue;
}

export namespace UdtValue {
  export type AsObject = {
    fieldsMap: Array<[string, Value.AsObject]>,
  }
}

export class Uuid extends jspb.Message {
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Uuid.AsObject;
  static toObject(includeInstance: boolean, msg: Uuid): Uuid.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Uuid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Uuid;
  static deserializeBinaryFromReader(message: Uuid, reader: jspb.BinaryReader): Uuid;
}

export namespace Uuid {
  export type AsObject = {
    value: Uint8Array | string,
  }
}

export class Inet extends jspb.Message {
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Inet.AsObject;
  static toObject(includeInstance: boolean, msg: Inet): Inet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Inet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Inet;
  static deserializeBinaryFromReader(message: Inet, reader: jspb.BinaryReader): Inet;
}

export namespace Inet {
  export type AsObject = {
    value: Uint8Array | string,
  }
}

export class Varint extends jspb.Message {
  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Varint.AsObject;
  static toObject(includeInstance: boolean, msg: Varint): Varint.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Varint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Varint;
  static deserializeBinaryFromReader(message: Varint, reader: jspb.BinaryReader): Varint;
}

export namespace Varint {
  export type AsObject = {
    value: Uint8Array | string,
  }
}

export class Decimal extends jspb.Message {
  getScale(): number;
  setScale(value: number): void;

  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Decimal.AsObject;
  static toObject(includeInstance: boolean, msg: Decimal): Decimal.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Decimal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Decimal;
  static deserializeBinaryFromReader(message: Decimal, reader: jspb.BinaryReader): Decimal;
}

export namespace Decimal {
  export type AsObject = {
    scale: number,
    value: Uint8Array | string,
  }
}

export class Value extends jspb.Message {
  hasNull(): boolean;
  clearNull(): void;
  getNull(): Value.Null | undefined;
  setNull(value?: Value.Null): void;

  hasUnset(): boolean;
  clearUnset(): void;
  getUnset(): Value.Unset | undefined;
  setUnset(value?: Value.Unset): void;

  hasInt(): boolean;
  clearInt(): void;
  getInt(): number;
  setInt(value: number): void;

  hasFloat(): boolean;
  clearFloat(): void;
  getFloat(): number;
  setFloat(value: number): void;

  hasDouble(): boolean;
  clearDouble(): void;
  getDouble(): number;
  setDouble(value: number): void;

  hasBoolean(): boolean;
  clearBoolean(): void;
  getBoolean(): boolean;
  setBoolean(value: boolean): void;

  hasString(): boolean;
  clearString(): void;
  getString(): string;
  setString(value: string): void;

  hasBytes(): boolean;
  clearBytes(): void;
  getBytes(): Uint8Array | string;
  getBytes_asU8(): Uint8Array;
  getBytes_asB64(): string;
  setBytes(value: Uint8Array | string): void;

  hasInet(): boolean;
  clearInet(): void;
  getInet(): Inet | undefined;
  setInet(value?: Inet): void;

  hasUuid(): boolean;
  clearUuid(): void;
  getUuid(): Uuid | undefined;
  setUuid(value?: Uuid): void;

  hasDate(): boolean;
  clearDate(): void;
  getDate(): number;
  setDate(value: number): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): number;
  setTime(value: number): void;

  hasCollection(): boolean;
  clearCollection(): void;
  getCollection(): Collection | undefined;
  setCollection(value?: Collection): void;

  hasUdt(): boolean;
  clearUdt(): void;
  getUdt(): UdtValue | undefined;
  setUdt(value?: UdtValue): void;

  hasVarint(): boolean;
  clearVarint(): void;
  getVarint(): Varint | undefined;
  setVarint(value?: Varint): void;

  hasDecimal(): boolean;
  clearDecimal(): void;
  getDecimal(): Decimal | undefined;
  setDecimal(value?: Decimal): void;

  getInnerCase(): Value.InnerCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Value.AsObject;
  static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Value;
  static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
}

export namespace Value {
  export type AsObject = {
    pb_null?: Value.Null.AsObject,
    unset?: Value.Unset.AsObject,
    pb_int: number,
    pb_float: number,
    pb_double: number,
    pb_boolean: boolean,
    string: string,
    bytes: Uint8Array | string,
    inet?: Inet.AsObject,
    uuid?: Uuid.AsObject,
    date: number,
    time: number,
    collection?: Collection.AsObject,
    udt?: UdtValue.AsObject,
    varint?: Varint.AsObject,
    decimal?: Decimal.AsObject,
  }

  export class Null extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Null.AsObject;
    static toObject(includeInstance: boolean, msg: Null): Null.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Null, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Null;
    static deserializeBinaryFromReader(message: Null, reader: jspb.BinaryReader): Null;
  }

  export namespace Null {
    export type AsObject = {
    }
  }

  export class Unset extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Unset.AsObject;
    static toObject(includeInstance: boolean, msg: Unset): Unset.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Unset, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Unset;
    static deserializeBinaryFromReader(message: Unset, reader: jspb.BinaryReader): Unset;
  }

  export namespace Unset {
    export type AsObject = {
    }
  }

  export enum InnerCase {
    INNER_NOT_SET = 0,
    NULL = 1,
    UNSET = 2,
    INT = 3,
    FLOAT = 4,
    DOUBLE = 5,
    BOOLEAN = 6,
    STRING = 7,
    BYTES = 8,
    INET = 9,
    UUID = 10,
    DATE = 11,
    TIME = 12,
    COLLECTION = 13,
    UDT = 14,
    VARINT = 15,
    DECIMAL = 16,
  }
}

export class Query extends jspb.Message {
  getCql(): string;
  setCql(value: string): void;

  hasValues(): boolean;
  clearValues(): void;
  getValues(): Values | undefined;
  setValues(value?: Values): void;

  hasParameters(): boolean;
  clearParameters(): void;
  getParameters(): QueryParameters | undefined;
  setParameters(value?: QueryParameters): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    cql: string,
    values?: Values.AsObject,
    parameters?: QueryParameters.AsObject,
  }
}

export class Values extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<Value>;
  setValuesList(value: Array<Value>): void;
  addValues(value?: Value, index?: number): Value;

  clearValueNamesList(): void;
  getValueNamesList(): Array<string>;
  setValueNamesList(value: Array<string>): void;
  addValueNames(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Values.AsObject;
  static toObject(includeInstance: boolean, msg: Values): Values.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Values, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Values;
  static deserializeBinaryFromReader(message: Values, reader: jspb.BinaryReader): Values;
}

export namespace Values {
  export type AsObject = {
    valuesList: Array<Value.AsObject>,
    valueNamesList: Array<string>,
  }
}

export class QueryParameters extends jspb.Message {
  hasKeyspace(): boolean;
  clearKeyspace(): void;
  getKeyspace(): google_protobuf_wrappers_pb.StringValue | undefined;
  setKeyspace(value?: google_protobuf_wrappers_pb.StringValue): void;

  hasConsistency(): boolean;
  clearConsistency(): void;
  getConsistency(): ConsistencyValue | undefined;
  setConsistency(value?: ConsistencyValue): void;

  hasPageSize(): boolean;
  clearPageSize(): void;
  getPageSize(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setPageSize(value?: google_protobuf_wrappers_pb.Int32Value): void;

  hasPagingState(): boolean;
  clearPagingState(): void;
  getPagingState(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setPagingState(value?: google_protobuf_wrappers_pb.BytesValue): void;

  getTracing(): boolean;
  setTracing(value: boolean): void;

  getSkipMetadata(): boolean;
  setSkipMetadata(value: boolean): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_wrappers_pb.Int64Value | undefined;
  setTimestamp(value?: google_protobuf_wrappers_pb.Int64Value): void;

  hasSerialConsistency(): boolean;
  clearSerialConsistency(): void;
  getSerialConsistency(): ConsistencyValue | undefined;
  setSerialConsistency(value?: ConsistencyValue): void;

  hasNowInSeconds(): boolean;
  clearNowInSeconds(): void;
  getNowInSeconds(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setNowInSeconds(value?: google_protobuf_wrappers_pb.Int32Value): void;

  hasTracingConsistency(): boolean;
  clearTracingConsistency(): void;
  getTracingConsistency(): ConsistencyValue | undefined;
  setTracingConsistency(value?: ConsistencyValue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryParameters.AsObject;
  static toObject(includeInstance: boolean, msg: QueryParameters): QueryParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryParameters;
  static deserializeBinaryFromReader(message: QueryParameters, reader: jspb.BinaryReader): QueryParameters;
}

export namespace QueryParameters {
  export type AsObject = {
    keyspace?: google_protobuf_wrappers_pb.StringValue.AsObject,
    consistency?: ConsistencyValue.AsObject,
    pageSize?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    pagingState?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    tracing: boolean,
    skipMetadata: boolean,
    timestamp?: google_protobuf_wrappers_pb.Int64Value.AsObject,
    serialConsistency?: ConsistencyValue.AsObject,
    nowInSeconds?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    tracingConsistency?: ConsistencyValue.AsObject,
  }
}

export class TypeSpec extends jspb.Message {
  hasBasic(): boolean;
  clearBasic(): void;
  getBasic(): TypeSpec.BasicMap[keyof TypeSpec.BasicMap];
  setBasic(value: TypeSpec.BasicMap[keyof TypeSpec.BasicMap]): void;

  hasMap(): boolean;
  clearMap(): void;
  getMap(): TypeSpec.Map | undefined;
  setMap(value?: TypeSpec.Map): void;

  hasList(): boolean;
  clearList(): void;
  getList(): TypeSpec.List | undefined;
  setList(value?: TypeSpec.List): void;

  hasSet(): boolean;
  clearSet(): void;
  getSet(): TypeSpec.Set | undefined;
  setSet(value?: TypeSpec.Set): void;

  hasUdt(): boolean;
  clearUdt(): void;
  getUdt(): TypeSpec.Udt | undefined;
  setUdt(value?: TypeSpec.Udt): void;

  hasTuple(): boolean;
  clearTuple(): void;
  getTuple(): TypeSpec.Tuple | undefined;
  setTuple(value?: TypeSpec.Tuple): void;

  getSpecCase(): TypeSpec.SpecCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TypeSpec.AsObject;
  static toObject(includeInstance: boolean, msg: TypeSpec): TypeSpec.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TypeSpec, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TypeSpec;
  static deserializeBinaryFromReader(message: TypeSpec, reader: jspb.BinaryReader): TypeSpec;
}

export namespace TypeSpec {
  export type AsObject = {
    basic: TypeSpec.BasicMap[keyof TypeSpec.BasicMap],
    map?: TypeSpec.Map.AsObject,
    list?: TypeSpec.List.AsObject,
    set?: TypeSpec.Set.AsObject,
    udt?: TypeSpec.Udt.AsObject,
    tuple?: TypeSpec.Tuple.AsObject,
  }

  export class Map extends jspb.Message {
    hasKey(): boolean;
    clearKey(): void;
    getKey(): TypeSpec | undefined;
    setKey(value?: TypeSpec): void;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): TypeSpec | undefined;
    setValue(value?: TypeSpec): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Map.AsObject;
    static toObject(includeInstance: boolean, msg: Map): Map.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Map, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Map;
    static deserializeBinaryFromReader(message: Map, reader: jspb.BinaryReader): Map;
  }

  export namespace Map {
    export type AsObject = {
      key?: TypeSpec.AsObject,
      value?: TypeSpec.AsObject,
    }
  }

  export class List extends jspb.Message {
    hasElement(): boolean;
    clearElement(): void;
    getElement(): TypeSpec | undefined;
    setElement(value?: TypeSpec): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): List.AsObject;
    static toObject(includeInstance: boolean, msg: List): List.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: List, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): List;
    static deserializeBinaryFromReader(message: List, reader: jspb.BinaryReader): List;
  }

  export namespace List {
    export type AsObject = {
      element?: TypeSpec.AsObject,
    }
  }

  export class Set extends jspb.Message {
    hasElement(): boolean;
    clearElement(): void;
    getElement(): TypeSpec | undefined;
    setElement(value?: TypeSpec): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Set.AsObject;
    static toObject(includeInstance: boolean, msg: Set): Set.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Set, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Set;
    static deserializeBinaryFromReader(message: Set, reader: jspb.BinaryReader): Set;
  }

  export namespace Set {
    export type AsObject = {
      element?: TypeSpec.AsObject,
    }
  }

  export class Udt extends jspb.Message {
    getFieldsMap(): jspb.Map<string, TypeSpec>;
    clearFieldsMap(): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Udt.AsObject;
    static toObject(includeInstance: boolean, msg: Udt): Udt.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Udt, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Udt;
    static deserializeBinaryFromReader(message: Udt, reader: jspb.BinaryReader): Udt;
  }

  export namespace Udt {
    export type AsObject = {
      fieldsMap: Array<[string, TypeSpec.AsObject]>,
    }
  }

  export class Tuple extends jspb.Message {
    clearElementsList(): void;
    getElementsList(): Array<TypeSpec>;
    setElementsList(value: Array<TypeSpec>): void;
    addElements(value?: TypeSpec, index?: number): TypeSpec;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tuple.AsObject;
    static toObject(includeInstance: boolean, msg: Tuple): Tuple.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Tuple, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Tuple;
    static deserializeBinaryFromReader(message: Tuple, reader: jspb.BinaryReader): Tuple;
  }

  export namespace Tuple {
    export type AsObject = {
      elementsList: Array<TypeSpec.AsObject>,
    }
  }

  export interface BasicMap {
    CUSTOM: 0;
    ASCII: 1;
    BIGINT: 2;
    BLOB: 3;
    BOOLEAN: 4;
    COUNTER: 5;
    DECIMAL: 6;
    DOUBLE: 7;
    FLOAT: 8;
    INT: 9;
    TEXT: 10;
    TIMESTAMP: 11;
    UUID: 12;
    VARCHAR: 13;
    VARINT: 14;
    TIMEUUID: 15;
    INET: 16;
    DATE: 17;
    TIME: 18;
    SMALLINT: 19;
    TINYINT: 20;
  }

  export const Basic: BasicMap;

  export enum SpecCase {
    SPEC_NOT_SET = 0,
    BASIC = 1,
    MAP = 2,
    LIST = 3,
    SET = 4,
    UDT = 5,
    TUPLE = 6,
  }
}

export class ColumnSpec extends jspb.Message {
  hasType(): boolean;
  clearType(): void;
  getType(): TypeSpec | undefined;
  setType(value?: TypeSpec): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ColumnSpec.AsObject;
  static toObject(includeInstance: boolean, msg: ColumnSpec): ColumnSpec.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ColumnSpec, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ColumnSpec;
  static deserializeBinaryFromReader(message: ColumnSpec, reader: jspb.BinaryReader): ColumnSpec;
}

export namespace ColumnSpec {
  export type AsObject = {
    type?: TypeSpec.AsObject,
    name: string,
  }
}

export class Traces extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getDuration(): number;
  setDuration(value: number): void;

  getStartedAt(): number;
  setStartedAt(value: number): void;

  clearEventsList(): void;
  getEventsList(): Array<Traces.Event>;
  setEventsList(value: Array<Traces.Event>): void;
  addEvents(value?: Traces.Event, index?: number): Traces.Event;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Traces.AsObject;
  static toObject(includeInstance: boolean, msg: Traces): Traces.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Traces, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Traces;
  static deserializeBinaryFromReader(message: Traces, reader: jspb.BinaryReader): Traces;
}

export namespace Traces {
  export type AsObject = {
    id: string,
    duration: number,
    startedAt: number,
    eventsList: Array<Traces.Event.AsObject>,
  }

  export class Event extends jspb.Message {
    getActivity(): string;
    setActivity(value: string): void;

    getSource(): string;
    setSource(value: string): void;

    getSourceElapsed(): number;
    setSourceElapsed(value: number): void;

    getThread(): string;
    setThread(value: string): void;

    getEventId(): string;
    setEventId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
  }

  export namespace Event {
    export type AsObject = {
      activity: string,
      source: string,
      sourceElapsed: number,
      thread: string,
      eventId: string,
    }
  }
}

export class SchemaChange extends jspb.Message {
  getChangeType(): SchemaChange.TypeMap[keyof SchemaChange.TypeMap];
  setChangeType(value: SchemaChange.TypeMap[keyof SchemaChange.TypeMap]): void;

  getTarget(): SchemaChange.TargetMap[keyof SchemaChange.TargetMap];
  setTarget(value: SchemaChange.TargetMap[keyof SchemaChange.TargetMap]): void;

  getKeyspace(): string;
  setKeyspace(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): google_protobuf_wrappers_pb.StringValue | undefined;
  setName(value?: google_protobuf_wrappers_pb.StringValue): void;

  clearArgumentTypesList(): void;
  getArgumentTypesList(): Array<string>;
  setArgumentTypesList(value: Array<string>): void;
  addArgumentTypes(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SchemaChange.AsObject;
  static toObject(includeInstance: boolean, msg: SchemaChange): SchemaChange.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SchemaChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SchemaChange;
  static deserializeBinaryFromReader(message: SchemaChange, reader: jspb.BinaryReader): SchemaChange;
}

export namespace SchemaChange {
  export type AsObject = {
    changeType: SchemaChange.TypeMap[keyof SchemaChange.TypeMap],
    target: SchemaChange.TargetMap[keyof SchemaChange.TargetMap],
    keyspace: string,
    name?: google_protobuf_wrappers_pb.StringValue.AsObject,
    argumentTypesList: Array<string>,
  }

  export interface TypeMap {
    CREATED: 0;
    UPDATED: 1;
    DROPPED: 2;
  }

  export const Type: TypeMap;

  export interface TargetMap {
    KEYSPACE: 0;
    TABLE: 1;
    TYPE: 2;
    FUNCTION: 3;
    AGGREGATE: 4;
  }

  export const Target: TargetMap;
}

export class Response extends jspb.Message {
  hasResultSet(): boolean;
  clearResultSet(): void;
  getResultSet(): ResultSet | undefined;
  setResultSet(value?: ResultSet): void;

  hasSchemaChange(): boolean;
  clearSchemaChange(): void;
  getSchemaChange(): SchemaChange | undefined;
  setSchemaChange(value?: SchemaChange): void;

  clearWarningsList(): void;
  getWarningsList(): Array<string>;
  setWarningsList(value: Array<string>): void;
  addWarnings(value: string, index?: number): string;

  hasTraces(): boolean;
  clearTraces(): void;
  getTraces(): Traces | undefined;
  setTraces(value?: Traces): void;

  getResultCase(): Response.ResultCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    resultSet?: ResultSet.AsObject,
    schemaChange?: SchemaChange.AsObject,
    warningsList: Array<string>,
    traces?: Traces.AsObject,
  }

  export enum ResultCase {
    RESULT_NOT_SET = 0,
    RESULT_SET = 1,
    SCHEMA_CHANGE = 4,
  }
}

export class Unavailable extends jspb.Message {
  getConsistency(): ConsistencyMap[keyof ConsistencyMap];
  setConsistency(value: ConsistencyMap[keyof ConsistencyMap]): void;

  getRequired(): number;
  setRequired(value: number): void;

  getAlive(): number;
  setAlive(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Unavailable.AsObject;
  static toObject(includeInstance: boolean, msg: Unavailable): Unavailable.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Unavailable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Unavailable;
  static deserializeBinaryFromReader(message: Unavailable, reader: jspb.BinaryReader): Unavailable;
}

export namespace Unavailable {
  export type AsObject = {
    consistency: ConsistencyMap[keyof ConsistencyMap],
    required: number,
    alive: number,
  }
}

export class WriteTimeout extends jspb.Message {
  getConsistency(): ConsistencyMap[keyof ConsistencyMap];
  setConsistency(value: ConsistencyMap[keyof ConsistencyMap]): void;

  getReceived(): number;
  setReceived(value: number): void;

  getBlockFor(): number;
  setBlockFor(value: number): void;

  getWriteType(): string;
  setWriteType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WriteTimeout.AsObject;
  static toObject(includeInstance: boolean, msg: WriteTimeout): WriteTimeout.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WriteTimeout, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WriteTimeout;
  static deserializeBinaryFromReader(message: WriteTimeout, reader: jspb.BinaryReader): WriteTimeout;
}

export namespace WriteTimeout {
  export type AsObject = {
    consistency: ConsistencyMap[keyof ConsistencyMap],
    received: number,
    blockFor: number,
    writeType: string,
  }
}

export class ReadTimeout extends jspb.Message {
  getConsistency(): ConsistencyMap[keyof ConsistencyMap];
  setConsistency(value: ConsistencyMap[keyof ConsistencyMap]): void;

  getReceived(): number;
  setReceived(value: number): void;

  getBlockFor(): number;
  setBlockFor(value: number): void;

  getDataPresent(): boolean;
  setDataPresent(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadTimeout.AsObject;
  static toObject(includeInstance: boolean, msg: ReadTimeout): ReadTimeout.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReadTimeout, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadTimeout;
  static deserializeBinaryFromReader(message: ReadTimeout, reader: jspb.BinaryReader): ReadTimeout;
}

export namespace ReadTimeout {
  export type AsObject = {
    consistency: ConsistencyMap[keyof ConsistencyMap],
    received: number,
    blockFor: number,
    dataPresent: boolean,
  }
}

export class ReadFailure extends jspb.Message {
  getConsistency(): ConsistencyMap[keyof ConsistencyMap];
  setConsistency(value: ConsistencyMap[keyof ConsistencyMap]): void;

  getReceived(): number;
  setReceived(value: number): void;

  getBlockFor(): number;
  setBlockFor(value: number): void;

  getNumFailures(): number;
  setNumFailures(value: number): void;

  getDataPresent(): boolean;
  setDataPresent(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadFailure.AsObject;
  static toObject(includeInstance: boolean, msg: ReadFailure): ReadFailure.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ReadFailure, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadFailure;
  static deserializeBinaryFromReader(message: ReadFailure, reader: jspb.BinaryReader): ReadFailure;
}

export namespace ReadFailure {
  export type AsObject = {
    consistency: ConsistencyMap[keyof ConsistencyMap],
    received: number,
    blockFor: number,
    numFailures: number,
    dataPresent: boolean,
  }
}

export class FunctionFailure extends jspb.Message {
  getKeyspace(): string;
  setKeyspace(value: string): void;

  getFunction(): string;
  setFunction(value: string): void;

  clearArgTypesList(): void;
  getArgTypesList(): Array<string>;
  setArgTypesList(value: Array<string>): void;
  addArgTypes(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FunctionFailure.AsObject;
  static toObject(includeInstance: boolean, msg: FunctionFailure): FunctionFailure.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FunctionFailure, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FunctionFailure;
  static deserializeBinaryFromReader(message: FunctionFailure, reader: jspb.BinaryReader): FunctionFailure;
}

export namespace FunctionFailure {
  export type AsObject = {
    keyspace: string,
    pb_function: string,
    argTypesList: Array<string>,
  }
}

export class WriteFailure extends jspb.Message {
  getConsistency(): ConsistencyMap[keyof ConsistencyMap];
  setConsistency(value: ConsistencyMap[keyof ConsistencyMap]): void;

  getReceived(): number;
  setReceived(value: number): void;

  getBlockFor(): number;
  setBlockFor(value: number): void;

  getNumFailures(): number;
  setNumFailures(value: number): void;

  getWriteType(): string;
  setWriteType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WriteFailure.AsObject;
  static toObject(includeInstance: boolean, msg: WriteFailure): WriteFailure.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WriteFailure, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WriteFailure;
  static deserializeBinaryFromReader(message: WriteFailure, reader: jspb.BinaryReader): WriteFailure;
}

export namespace WriteFailure {
  export type AsObject = {
    consistency: ConsistencyMap[keyof ConsistencyMap],
    received: number,
    blockFor: number,
    numFailures: number,
    writeType: string,
  }
}

export class AlreadyExists extends jspb.Message {
  getKeyspace(): string;
  setKeyspace(value: string): void;

  getTable(): string;
  setTable(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AlreadyExists.AsObject;
  static toObject(includeInstance: boolean, msg: AlreadyExists): AlreadyExists.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AlreadyExists, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AlreadyExists;
  static deserializeBinaryFromReader(message: AlreadyExists, reader: jspb.BinaryReader): AlreadyExists;
}

export namespace AlreadyExists {
  export type AsObject = {
    keyspace: string,
    table: string,
  }
}

export class CasWriteUnknown extends jspb.Message {
  getConsistency(): ConsistencyMap[keyof ConsistencyMap];
  setConsistency(value: ConsistencyMap[keyof ConsistencyMap]): void;

  getReceived(): number;
  setReceived(value: number): void;

  getBlockFor(): number;
  setBlockFor(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CasWriteUnknown.AsObject;
  static toObject(includeInstance: boolean, msg: CasWriteUnknown): CasWriteUnknown.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CasWriteUnknown, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CasWriteUnknown;
  static deserializeBinaryFromReader(message: CasWriteUnknown, reader: jspb.BinaryReader): CasWriteUnknown;
}

export namespace CasWriteUnknown {
  export type AsObject = {
    consistency: ConsistencyMap[keyof ConsistencyMap],
    received: number,
    blockFor: number,
  }
}

export class Row extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<Value>;
  setValuesList(value: Array<Value>): void;
  addValues(value?: Value, index?: number): Value;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Row.AsObject;
  static toObject(includeInstance: boolean, msg: Row): Row.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Row, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Row;
  static deserializeBinaryFromReader(message: Row, reader: jspb.BinaryReader): Row;
}

export namespace Row {
  export type AsObject = {
    valuesList: Array<Value.AsObject>,
  }
}

export class ResultSet extends jspb.Message {
  clearColumnsList(): void;
  getColumnsList(): Array<ColumnSpec>;
  setColumnsList(value: Array<ColumnSpec>): void;
  addColumns(value?: ColumnSpec, index?: number): ColumnSpec;

  clearRowsList(): void;
  getRowsList(): Array<Row>;
  setRowsList(value: Array<Row>): void;
  addRows(value?: Row, index?: number): Row;

  hasPagingState(): boolean;
  clearPagingState(): void;
  getPagingState(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setPagingState(value?: google_protobuf_wrappers_pb.BytesValue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultSet.AsObject;
  static toObject(includeInstance: boolean, msg: ResultSet): ResultSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResultSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResultSet;
  static deserializeBinaryFromReader(message: ResultSet, reader: jspb.BinaryReader): ResultSet;
}

export namespace ResultSet {
  export type AsObject = {
    columnsList: Array<ColumnSpec.AsObject>,
    rowsList: Array<Row.AsObject>,
    pagingState?: google_protobuf_wrappers_pb.BytesValue.AsObject,
  }
}

export class BatchQuery extends jspb.Message {
  getCql(): string;
  setCql(value: string): void;

  hasValues(): boolean;
  clearValues(): void;
  getValues(): Values | undefined;
  setValues(value?: Values): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchQuery.AsObject;
  static toObject(includeInstance: boolean, msg: BatchQuery): BatchQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BatchQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BatchQuery;
  static deserializeBinaryFromReader(message: BatchQuery, reader: jspb.BinaryReader): BatchQuery;
}

export namespace BatchQuery {
  export type AsObject = {
    cql: string,
    values?: Values.AsObject,
  }
}

export class BatchParameters extends jspb.Message {
  hasKeyspace(): boolean;
  clearKeyspace(): void;
  getKeyspace(): google_protobuf_wrappers_pb.StringValue | undefined;
  setKeyspace(value?: google_protobuf_wrappers_pb.StringValue): void;

  hasConsistency(): boolean;
  clearConsistency(): void;
  getConsistency(): ConsistencyValue | undefined;
  setConsistency(value?: ConsistencyValue): void;

  getTracing(): boolean;
  setTracing(value: boolean): void;

  hasTimestamp(): boolean;
  clearTimestamp(): void;
  getTimestamp(): google_protobuf_wrappers_pb.Int64Value | undefined;
  setTimestamp(value?: google_protobuf_wrappers_pb.Int64Value): void;

  hasSerialConsistency(): boolean;
  clearSerialConsistency(): void;
  getSerialConsistency(): ConsistencyValue | undefined;
  setSerialConsistency(value?: ConsistencyValue): void;

  hasNowInSeconds(): boolean;
  clearNowInSeconds(): void;
  getNowInSeconds(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setNowInSeconds(value?: google_protobuf_wrappers_pb.Int32Value): void;

  hasTracingConsistency(): boolean;
  clearTracingConsistency(): void;
  getTracingConsistency(): ConsistencyValue | undefined;
  setTracingConsistency(value?: ConsistencyValue): void;

  getSkipMetadata(): boolean;
  setSkipMetadata(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BatchParameters.AsObject;
  static toObject(includeInstance: boolean, msg: BatchParameters): BatchParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BatchParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BatchParameters;
  static deserializeBinaryFromReader(message: BatchParameters, reader: jspb.BinaryReader): BatchParameters;
}

export namespace BatchParameters {
  export type AsObject = {
    keyspace?: google_protobuf_wrappers_pb.StringValue.AsObject,
    consistency?: ConsistencyValue.AsObject,
    tracing: boolean,
    timestamp?: google_protobuf_wrappers_pb.Int64Value.AsObject,
    serialConsistency?: ConsistencyValue.AsObject,
    nowInSeconds?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    tracingConsistency?: ConsistencyValue.AsObject,
    skipMetadata: boolean,
  }
}

export class Batch extends jspb.Message {
  getType(): Batch.TypeMap[keyof Batch.TypeMap];
  setType(value: Batch.TypeMap[keyof Batch.TypeMap]): void;

  clearQueriesList(): void;
  getQueriesList(): Array<BatchQuery>;
  setQueriesList(value: Array<BatchQuery>): void;
  addQueries(value?: BatchQuery, index?: number): BatchQuery;

  hasParameters(): boolean;
  clearParameters(): void;
  getParameters(): BatchParameters | undefined;
  setParameters(value?: BatchParameters): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Batch.AsObject;
  static toObject(includeInstance: boolean, msg: Batch): Batch.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Batch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Batch;
  static deserializeBinaryFromReader(message: Batch, reader: jspb.BinaryReader): Batch;
}

export namespace Batch {
  export type AsObject = {
    type: Batch.TypeMap[keyof Batch.TypeMap],
    queriesList: Array<BatchQuery.AsObject>,
    parameters?: BatchParameters.AsObject,
  }

  export interface TypeMap {
    LOGGED: 0;
    UNLOGGED: 1;
    COUNTER: 2;
  }

  export const Type: TypeMap;
}

export interface ConsistencyMap {
  ANY: 0;
  ONE: 1;
  TWO: 2;
  THREE: 3;
  QUORUM: 4;
  ALL: 5;
  LOCAL_QUORUM: 6;
  EACH_QUORUM: 7;
  SERIAL: 8;
  LOCAL_SERIAL: 9;
  LOCAL_ONE: 10;
}

export const Consistency: ConsistencyMap;

