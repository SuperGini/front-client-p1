export interface FolderRequest {
    projectName: string,
    userId: string,
    folderType: string
}

export interface FolderResponse {
    id: string,
    projectName: string,
    createDate: string,
    updateDate: string,
    numberOfImages?: number,
    numberOfVideos?: number,
    numberOfOtherFiles?: number,
    folderCapacity?: string,
    currentFolderCapacity?: string,
    lastUpdateByUser: string,
    userId: string,
    username?: string,
    folderType?: string

}

export interface FolderResponsePagination {
    totalPages: number,
    totalElements: number,
    folderResponses: Array<FolderResponse>
}

// export enum FolderType {
//     VIDEO = 'video',
//     AUDIO = 'audio',
//     FILE = 'file',
//     OTHER = 'other',
//     PICTURE = 'picture'
// }
