import * as mixin_actions_ from "./mixin_actions";
import {nodes as nodes_} from "./nodes";
import * as user_ from "./user";
import * as team_ from "./team";
import * as project_ from "./project";
import * as licence_ from "./licence";
import * as dataset_ from "./dataset";

export namespace core {
    export const mixin_actions: typeof mixin_actions_ = mixin_actions_;
    export const nodes: typeof nodes_ = nodes_;
    export const user: typeof user_ = user_;
    export const team: typeof team_ = team_;
    export const project: typeof project_ = project_;
    export const licence: typeof licence_ = licence_;
    export const dataset: typeof dataset_ = dataset_;
}
