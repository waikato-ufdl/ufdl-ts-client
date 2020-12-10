import {core as core_} from "./core";
import {object_detection as object_detection_} from "./object_detection";

export namespace functional {
    export const core: typeof core_ = core_;
    export const object_detection: typeof object_detection_ = object_detection_;
}
