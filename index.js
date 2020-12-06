/* IMPORTS */
import { UFDLServerContext } from "./src/ufdl/context.js";
import {
    list as licences_list
} from "./src/ufdl/functional/core/licence.js";
import  {
    list,
    create as user_create
} from "./src/ufdl/functional/core/user.js";
import {
    create as team_create,
    list as team_list,
    add_membership as team_add_member
} from "./src/ufdl/functional/core/team.js";
import {
    create as project_create,
    list as project_list
} from "./src/ufdl/functional/core/project.js";
import {
    create as dataset_create,
    add_file as dataset_add_file,
    list as dataset_list,
    get_file as dataset_get_file,
    get_annotations_for_image as dataset_get_annotations,
    set_annotations_for_image as dataset_set_annotations,
    delete_annotations_for_image as dataset_delete_annotations
} from "./src/ufdl/functional/object_detection/dataset.js";

/* Static context and dataset objects to be set when logging in and
 * starting to annotate */
let context = undefined;
let dataset = undefined;

/* Check the login details of the given user with backend server details */
async function checkLoginDetails(serverAddress, port, username, password) {
    context = new UFDLServerContext(serverAddress, port,
                                    username, password);
    /* Get the licences to test the context is created with valid
     * credentials */
    let licences = await getLicences();
    return {valid: licences.valid,
            context: context};
}

/* Get the licences available from the backend */
async function getLicences() {
    let licences = await licences_list(context)
        .catch(error => (console.error(error.json())));
    return {valid: licences.length > 0,
            licences: licences};
}

/* Get the teams a user is in by getting all of the teams and manually
 * filtering */
async function getTeamsForUser() {
    var userTeams = [];
    let teams = await team_list(context);
    let username = context.username;
    teams.forEach(team => {
        let teamMembers = team.members;
        teamMembers.some(member => {
            if (member.username === username) {
                userTeams.push(team);
                return true;
            }
            return false;
        });
    });
    return {valid: userTeams.length > 0,
            teams: userTeams};
}

/* Get the projects available for a given team */
async function getProjectsForTeam(team) {
    let filter = {
        expressions: [
            {
                field:"team",
                value:team.pk,
                type:"exact"
            }
        ]
    };
    let projects = await project_list(context, filter)
        .catch(error => (console.error(error.json())));
    return {valid: projects.length > 0,
            projects: projects};
}

/* Get the datasets used in a given project */
async function getDatasetsForProject(project) {
    let filter = {
        expressions: [
            {
                field:"project",
                value:project.pk,
                type:"exact"
            }
        ]
    };
    let datasets = await dataset_list(context, filter)
        .catch(error => (console.error(error.json())));
    return {valid: datasets.length > 0,
            datasets: datasets};
}

/* Create a dataset using the required inputs, which include a licence
 * and project object */
async function createDataset(name, licence, project,
                             description = "", tags = "") {
    let dataset = await dataset_create(context, name, description,
                                       project.pk, licence.pk,
                                       false, tags)
        .catch(error => (console.error(error.json())));
    return {valid: dataset.pk > 0,
            dataset: dataset};
}

/* Set the current dataset to use for annotating */
function setDatasetInUse(selectedDataset) {
    dataset = selectedDataset;
}

/* Get all of the filenames, file data and annotations for the current
 * dataset */
async function getFilesFromUsedDataset() {
    let files = [];
    let annotations = [];
    let filenames = dataset.files;
    for (const filename of filenames) {
        let file = await dataset_get_file(context, dataset.pk, filename);
        let annotation = await dataset_get_annotations(context,
                                                       dataset.pk,
                                                       filename);
        files.push(file);
        annotations.push(annotation);
    }
    return {valid: files.length > 0,
            filenames: filenames,
            files: files,
            annotations: annotations};
}

/* Upload a set of images with or without annotations to the backend */
async function uploadLabelledImages(filenames, images, annotations) {
    let existingFiles = await getFilesFromUsedDataset()
        .catch(error => (console.error(error.json())));
    let existingFilenames = existingFiles.filenames;

    for (var i = 0; i < filenames.length; i++) {
        let existingFilename = existingFilenames[i];
        let filename = filenames[i];
        let image = images[i];
        let annotation = annotations[i];

        if (existingFilename === filename) {
            if (annotation !== undefined) {
                await dataset_delete_annotations(context, dataset.pk, filename)
                    .then(await dataset_set_annotations(context, dataset.pk,
                                                        filename, annotation))
                    .catch(error => (console.error(error.json())));
            }
        }
        else {
            await dataset_add_file(context, dataset.pk, filename, image)
                .catch(error => (console.error(error.json())));
            if (annotation !== undefined) {
                await dataset_set_annotations(context, dataset.pk,
                                              filename, annotation)
                    .catch(error => (console.error(error.json())));
            }
        }
    }
}

/* Allows initial setup of the backend by populating it with a set of
 * users, teams, projects and datasets */
async function setup() {
    let user = await user_create(context, "User1", "Pass1",
                                 "email@email.com", "User", "Name")
        .catch(error => (console.error(error.json())));
    let user2 = await user_create(context, "User2", "Pass2",
                                  "email2@email.com", "User", "Name2")
        .catch(error => (console.error(error.json())));
    let team = await team_create(context, "Team1")
        .catch(error => (console.error(error.json())));
    let team2 = await team_create(context, "Team2")
        .catch(error => (console.error(error.json())));
    let team3 = await team_create(context, "Another Team")
        .catch(error => (console.error(error.json())));
    let project = await project_create(context, "Project1", team.pk)
        .catch(error => (console.error(error.json())));
    let project2 = await project_create(context, "Project2", team2.pk)
        .catch(error => (console.error(error.json())));
    let project3 = await project_create(context, "Another Project", team.pk)
        .catch(error => (console.error(error.json())));
    let dataset = await dataset_create(context, "Dataset1", "Description",
                                       project.pk, 1)
        .catch(error => (console.error(error.json())));
    let dataset2 = await dataset_create(context, "Dataset2",
                                        "Description 2", project2.pk, 1)
        .catch(error => (console.error(error.json())));
    let membership = await team_add_member(context, team.pk, user.username, "W")
        .catch(error => (console.error(error.json())));
    let membership2 = await team_add_member(context, team2.pk,
                                            user2.username, "W")
        .catch(error => (console.error(error.json())));
    let membership3 = await team_add_member(context, team3.pk,
                                            user.username, "W")
        .catch(error => (console.error(error.json())));
    return true;
}

/* EXPORTS */
export { checkLoginDetails, context, getTeamsForUser,
         getProjectsForTeam, getDatasetsForProject, setDatasetInUse,
         getFilesFromUsedDataset, uploadLabelledImages, getLicences,
         createDataset};
