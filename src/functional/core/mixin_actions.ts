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
import {RawJSONObject} from "../../types/raw";
import {DatasetInstance} from "../../types/core/dataset";
import {HardwareInstance} from "../../types/core/nodes/hardware";
import {LicenceInstance} from "../../types/core/licence";

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
    let response = await context.delete_(`${url}/${pk}/release`);

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

export async function progress_job(
    context: UFDLServerContext,
    url: string,
    pk: number,
    progress: number,
    body: RawJSONObject = {}
): Promise<JobInstance> {
    let response = await context.post(
        `${url}/${pk}/progress/${progress}`,
        body
    );

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

export async function add_output(
    context: UFDLServerContext,
    url: string,
    pk: number,
    name: string,
    type: string,
    data: Blob | BufferSource | DataStream
): Promise<JobOutputInstance> {
    const response = await context.upload(
        `${url}/${pk}/outputs/${name}/${type}`,
        name,
        data
    );

    return response.json();
}

export async function delete_output(
    context: UFDLServerContext,
    url: string,
    pk: number,
    name: string,
    type: string
): Promise<JobOutputInstance> {
    const response = await context.delete_(`${url}/${pk}/outputs/${name}/${type}`);

    return response.json();
}

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

export async function clear<D extends DatasetInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<D> {
    const response = await context.delete_(`${url}/${pk}/clear`);

    return response.json();
}

// endregion

// region CopyableViewSet

export async function copy<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number,
    params: RawJSONObject
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

export async function add_files(
    context: UFDLServerContext,
    url: string,
    pk: number,
    files: Uint8Array
): Promise<NamedFileInstance[]> {
    let response = await context.upload(
        `${url}/${pk}/files-multi`,
        "data",
        files
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
): Promise<{readonly [filename: string]: string | undefined}> {
    let response = await context.get(
        `${url}/${pk}/metadata`
    );

    return response.json()
}

// endregion

// region GetByNameViewSet

export async function get_by_name<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    name: string
): Promise<M[]> {
    let response = await context.get(
        `${url}/${name}`
    );

    return response.json()
}

// endregion

// region GetHardwareGenerationViewSet

export async function get_hardware_generation(
    context: UFDLServerContext,
    url: string,
    compute: number
): Promise<HardwareInstance> {
    let response = await context.get(
        `${url}/get-hardware-generation/${compute}`
    );

    return response.json()
}

// endregion

// region ImportTemplateViewSet

export async function import_template<M extends JobTemplateInstance>(
    context: UFDLServerContext,
    url: string,
    template: JobTemplateSpec
): Promise<M> {
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

export async function add_subdescriptors(
    context: UFDLServerContext,
    url: string,
    pk: number,
    type: string,
    names: (number | string)[]
): Promise<LicenceInstance> {
    const response = await context.patch(
        `${url}/${pk}/subdescriptors`,
        {
            method: "add",
            type: type,
            names: names
        }
    );

    return response.json();
}

export async function remove_subdescriptors(
    context: UFDLServerContext,
    url: string,
    pk: number,
    type: string,
    names: (number | string)[]
): Promise<LicenceInstance> {
    const response = await context.patch(
        `${url}/${pk}/subdescriptors`,
        {
            method: "remove",
            type: type,
            names: names
        }
    );

    return response.json();
}

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

export async function set_file<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number,
    data: Blob | BufferSource | DataStream
): Promise<M> {
    const response = await context.upload(
        `${url}/${pk}/data`,
        "data",
        data
    );

    return response.json();
}

export async function delete_file_sf<M extends RawModelInstance>(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<M> {
    const response = await context.delete_(`${url}/${pk}/data`);

    return response.json();
}

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
