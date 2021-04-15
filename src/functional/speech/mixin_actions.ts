import UFDLServerContext from "../../UFDLServerContext";
import {TranscriptionInstance} from "../../types/speech/transcription";

// region TranscriptionsViewSet

export async function get_transcriptions(
    context: UFDLServerContext,
    url: string,
    pk: number
): Promise<{readonly [filename: string]: TranscriptionInstance | undefined}> {
    const response = await context.get(
        `${url}/${pk}/transcriptions`
    );

    return response.json();
}

export async function get_transcriptions_for_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string
): Promise<TranscriptionInstance> {
    const response = await context.get(
        `${url}/${pk}/transcriptions/${filename}`
    );

    return response.json();
}

export async function set_transcriptions_for_file(
    context: UFDLServerContext,
    url: string,
    pk: number,
    filename: string,
    transcription: string
): Promise<TranscriptionInstance> {
    const response = await context.post(
        `${url}/${pk}/transcriptions/${filename}`,
        {
            transcription: transcription
        }
    );

    return response.json();
}

// endregion
