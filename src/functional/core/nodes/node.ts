import * as mixin_actions from "../mixin_actions";
import UFDLServerContext from "../../../UFDLServerContext";
import {NODES_URL} from "../../../constants";

export default {
    ping: ping
}

export async function ping(context: UFDLServerContext): Promise<void> {
    await mixin_actions.ping(context, NODES_URL);
}
