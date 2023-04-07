export interface FolderRequest {
    projectName: string,
    userId: string
}

export interface FolderResponse {
    id: number,
    projectName: string,
    createDate: Date,
    updateDate: Date,
    numberOfImages: number,
    numberOfVideos: number,
    numberOfOtherFiles: number,
    folderCapacity: string,
    currentFolderCapacity: string,
    lastUpdateByUser: Date,
    userId: number
}
