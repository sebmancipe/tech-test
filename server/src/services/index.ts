export interface FileService {
    toText: (path: string) => Promise<string> 
}