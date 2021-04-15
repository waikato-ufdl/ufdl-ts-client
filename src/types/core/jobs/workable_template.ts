import {JobTemplateInstance} from "./job_template";

export type WorkableTemplateInstance = {
    readonly framework: number
    readonly type: string
    readonly executor_class: string
    readonly required_packages: string
    readonly body: string
} & JobTemplateInstance
