/*
 * quicktype fails to parse the AnnotationsFile schema properly, so it has been
 * hand-produced here.
 */
export type AnnotationsFile = {
    [filename: string]: Image | Video | undefined
}

export interface File {
    /** The file's format. */
    format?: string

    /** The file's dimensions (width, height). */
    dimensions?: [number, number]
}

export interface FileType extends File {
    /** The length (in seconds) of the video (if it is a video). */
    length?: number
}

export interface Image extends File {
    /** The annotations of the image. */
    annotations: ImageAnnotation[]
}

export interface Video extends File {
    /** The length (in seconds) of the video. */
    length: number

    /** The annotations of the video. */
    annotations: VideoAnnotation[]
}

export interface Annotation {
    /** The bounding-box of the annotation. */
    x: number
    y: number
    width: number
    height: number

    /** The optional polygon for mask annotations. */
    polygon?: Polygon

    /** The annotations label. */
    label: string

    /** The optional prefix for the annotation. */
    prefix?: string
}

export interface ImageAnnotation extends Annotation {
    // No additional properties required
}

export interface VideoAnnotation extends Annotation {
    /** The time into the video at which the detection occurred. */
    time: number
}

export interface Polygon {
    /** The co-ordinates of the polygon. */
    points: [Point, Point, Point, ...Point[]]
}

export type Point = [number, number]
