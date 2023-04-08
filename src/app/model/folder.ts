export interface FolderRequest {
    projectName: string,
    userId: string
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
    username?: string
}

export interface FolderResponsePagination {

    totalPages: number,
    folderResponses: Array<FolderResponse>

}
