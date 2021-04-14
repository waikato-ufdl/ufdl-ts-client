import UFDLServerContext from "../../UFDLServerContext";
import {get_response_stream, get_response_json_value} from "../../util";
import {CreateJobSpec} from "../../json/generated/CreateJobSpec";
import {JobTemplateSpec} from "../../json/generated/JobTemplateSpec";
import {DataStream, RawModelInstance} from "../../types/base";
import {JobOutputInstance} from "../../types/core/jobs/job_output";
import {JobInstance} from "../../types/core/jobs/job";
import {NamedFileInstance} from "../../types/core/named_file";
import {JobTemplateInstance} from "../../types/core/jobs/job_template";
import {MembershipInstance} from "../../types/core/membership";
import {SoftDeleteModelInstance} from "../../types/mixin";

// region AcquireJobViewSet

export async function acquire_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<JobInstance> {
    let response = await context.get(`${url}/${pk}/acquire`);

    return response.json();
}

export async function release_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<JobInstance> {
    let response = await context.get(`${url}/${pk}/release`);

    return response.json();
}

export async function start_job(
    context: UFDLServerContext,
    url: string,
    pk: number,
    send_notification: string
): Promise<JobInstance> {
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
): Promise<JobInstance> {
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
): Promise<JobInstance> {
    let response = await context.delete_(`${url}/${pk}/reset`);

    return response.json();
}

export async function abort_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<JobInstance> {
    let response = await context.delete_(`${url}/${pk}/abort`);

    return response.json();
}

export async function cancel_job(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<JobInstance> {
    let response = await context.delete_(`${url}/${pk}/cancel`);

    return response.json();
}

// endregion

// region AddJobOutputViewSet

// TODO: add_output

// TODO: delete_output

export async function get_output(
    context: UFDLServerContext,
    url: string,
    pk: number,
    name: string,
    type: string
): Promise<DataStream> {
    const response = await context.download(`${url}/${pk}/outputs/${name}/${type}`);

    return get_response_stream(response);
}

export async function get_output_info(
    context: UFDLServerContext,
    url: string,
    pk: number,
    name: string,
    type: string
): Promise<JobOutputInstance> {
    const response = await context.get(`${url}/${pk}/outputs/${name}/${type}/info`);

    return response.json();
}

// endregion

// region ClearDatasetViewSet

// TODO

// endregion

// region CopyableViewSet

export async function copy<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number,
    params: {}
): Promise<M> {
    let response = await context.post(`${url}/${pk}/copy`, params);

    return response.json();
}

// endregion

// region CreateJobViewSet

export async function create_job(
    context: UFDLServerContext,
    url: string,
    pk: number,
    specification: CreateJobSpec
): Promise<JobInstance> {
    const response = await context.post(
        `${url}/${pk}/create-job`,
        specification
    );

    return response.json();
}

// endregion

// region DowloadableViewSet

export async function download(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filetype?: string,
    params: {} = {}
): Promise<DataStream> {
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
    data: Blob | BufferSource | DataStream
): Promise<NamedFileInstance> {
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
): Promise<DataStream> {
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
): Promise<NamedFileInstance> {
    let response = await context.delete_(
        `${url}/${pk}/files/${filename}`
    );

    return response.json();
}

export async function get_file_by_handle(
    context: UFDLServerContext,
    url: string,
    pk: number,
    handle: string
): Promise<DataStream> {
    let response = await context.download(
        `${url}/${pk}/file-handles/${handle}`
    );

    return get_response_stream(response);
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

export async function import_template(
    context: UFDLServerContext,
    url: string,
    template: JobTemplateSpec
): Promise<JobTemplateInstance> {
    const response = await context.post(`${url}/import`, template);

    return response.json();
}

export async function export_template(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<JobTemplateSpec> {
    const response = await context.get(`${url}/${pk}/export`);

    return response.json();
}

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
): Promise<MembershipInstance> {
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
): Promise<MembershipInstance> {
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
): Promise<MembershipInstance> {
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
): Promise<Permissions> {
    let response = await context.get(
        `${url}/${pk}/permissions/${username}`
    );

    return response.json();
}

// endregion

// region MergeViewSet

export async function merge<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number,
    sourcePK: number,
    delete_: boolean,
    hard?: boolean
): Promise<M> {
    const response = await context.post(`${url}/${pk}/merge/${sourcePK}`, {delete: delete_, hard: hard});

    return response.json();
}

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

export async function hard_delete<M extends SoftDeleteModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<M> {
    const response = await context.delete_(`${url}/${pk}/hard`);

    return response.json();
}

export async function reinstate<M extends SoftDeleteModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<M> {
    const response = await context.delete_(`${url}/${pk}/reinstate`);

    return response.json();
}

// endregion
