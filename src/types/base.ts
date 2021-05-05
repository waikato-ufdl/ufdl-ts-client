import {RawJSONObject} from "../json/types";

/** The base type of all serialised models. */
export type RawModelInstance = Readonly<RawJSONObject & {pk: number}>

/** The type of response from a download request. */
export type DataStream = ReadableStream<Uint8Array>;
