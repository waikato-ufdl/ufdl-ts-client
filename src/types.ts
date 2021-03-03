export type RawJSONObject = {
    [key: string]: RawJSONElement
}

export type RawJSONArray = RawJSONElement[]

export type RawJSONPrimitive = string | number | boolean | null

export type RawJSONElement = RawJSONObject | RawJSONArray | RawJSONPrimitive
