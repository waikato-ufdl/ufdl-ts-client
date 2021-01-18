import UFDLServerContext from "../../UFDLServerContext";
import {get_response_stream, get_response_json_value} from "../../util";
import {RawJSONObject} from "../../types";

// region AcquireJobViewSet

export async function acquire_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<RawJSONObject> {
    let response = await context.get(`${url}/${pk}/acquire`);

    return response.json();
}

export async function release_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<RawJSONObject> {
    let response = await context.get(`${url}/${pk}/release`);

    return response.json();
}

export async function start_job(
    context: UFDLServerContext,
    url: string,
    pk: number,
    send_notification: string
): Promise<RawJSONObject> {
    let response = await context.post(`${url}/${pk}/start`,
                                      {
                                          send_notification: send_notification
                                      });

    return response.json();
}

export async function finish_job(
    context: UFDLServerContext,
    url: string,
    pk: number,
    send_notification: string,
    error?: string
): Promise<RawJSONObject> {
    let response = await context.post(`${url}/${pk}/finish`,
                                      {
                                          success: (error === undefined),
                                          send_notification: send_notification,
                                          error: error
                                      });

    return response.json();
}

export async function reset_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<RawJSONObject> {
    let response = await context.delete_(`${url}/${pk}/reset`);

    return response.json();
}

export async function abort_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<RawJSONObject> {
    let response = await context.delete_(`${url}/${pk}/abort`);

    return response.json();
}

// endregion

// region AddJobOutputViewSet

// TODO

// endregion

// region ClearDatasetViewSet

// TODO

// endregion

// region CopyableViewSet

export async function copy(
    context: UFDLServerContext,
    url: string,
    pk: number,
    params: {}
): Promise<RawJSONObject> {
    let response = await context.post(`${url}/${pk}/copy`, params);

    return response.json();
}

// endregion

// region CreateJobViewSet

// TODO

// endregion

// region DowloadableViewSet

export async function download(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filetype?: string,
    params: {} = {}
): Promise<ReadableStream<Uint8Array>> {
    let response = await context.download(
        `${url}/${pk}/download`,
        {
            filetype: filetype,
            ...params
        }
    );

    return get_response_stream(response);
}

// endregion

// region FileContainerViewSet

export async function add_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    data: Blob | BufferSource | ReadableStream<Uint8Array>
): Promise<RawJSONObject> {
    let response = await context.upload(
        `${url}/${pk}/files/${filename}`,
        filename,
        data
    );

    return response.json();
}

export async function get_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<ReadableStream<Uint8Array>> {
    let response = await context.download(
        `${url}/${pk}/files/${filename}`
    );

    return get_response_stream(response);
}

export async function delete_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<RawJSONObject> {
    let response = await context.delete_(
        `${url}/${pk}/files/${filename}`
    );

    return response.json();
}

export async function set_metadata(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    metadata: string
): Promise<string> {
    let response = await context.post(
        `${url}/${pk}/metadata/${filename}`,
        {
            metadata: metadata
        }
    );

    return get_response_json_value<string>(response, "metadata");
}

export async function get_metadata(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<string> {
    let response = await context.get(
        `${url}/${pk}/metadata/${filename}`
    );

    return get_response_json_value<string>(response, "metadata");
}

export async function get_all_metadata(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<string> {
    let response = await context.get(
        `${url}/${pk}/metadata`
    );

    return response.json()
}

// endregion

// region GetHardwareGenerationViewSet

// TODO

// endregion

// region ImportTemplateViewSet

// TODO

// endregion

// region LicenceSubdescriptorViewSet

// TODO

// endregion

// region MembershipViewSet

export async function add_membership(
    context: UFDLServerContext,
    url: string,
    pk: number,
    username: string,
    permissions: string = "R"
): Promise<RawJSONObject> {
    let response = await context.patch(
        `${url}/${pk}/memberships`,
        {
            method: "add",
            username: username,
            permissions: permissions
        }
    );

    return response.json();
}

export async function remove_membership(
    context: UFDLServerContext,
    url: string,
    pk: number,
    username: string
): Promise<RawJSONObject> {
    let response = await context.patch(
        `${url}/${pk}/memberships`,
        {
            method: "remove",
            username: username
        }
    );

    return response.json();
}

export async function update_membership(
    context: UFDLServerContext,
    url: string,
    pk: number,
    username: string,
    permissions: string = "R"
): Promise<RawJSONObject> {
    let response = await context.patch(
        `${url}/${pk}/memberships`,
        {
            method: "update",
            username: username,
            permissions: permissions
        }
    );

    return response.json();
}

export async function get_permissions_for_user(
    context: UFDLServerContext,
    url: string,
    pk: number,
    username: string
): Promise<string> {
    let response = await context.get(
        `${url}/${pk}/permissions/${username}`
    );

    return response.json();
}

// endregion

// region MergeViewSet

// TODO

// endregion

// region PingNodeViewSet

export async function ping(context: UFDLServerContext, url: string): Promise<void> {
    await context.get(`${url}/ping`);
}

// endregion

// region SetFileViewSet

// TODO

// endregion

// region SoftDeleteViewSet

// TODO

// endregion
