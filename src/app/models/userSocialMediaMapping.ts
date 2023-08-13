export interface userSocialMediaMapping{
    id: number,
    userId : number,
    socialMediaId : number,
    socialMediaLink : string,
    type: string,
    value : string,
    logo : string,
    fileData : File,
    styles : string,
    styleObject : object ;
    sequence : number;
    title : string;
    formValues : string
}