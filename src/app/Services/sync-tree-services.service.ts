import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { userSocialMediaMapping } from '../models/userSocialMediaMapping';
import { users } from '../models/user';
import { userSocialMediaImageMapping } from '../models/userSocialMediaImageMapping';
import { userSocialMediaLogo } from '../models/userSocialMediaLogo';
import { IClickAnalysis } from '../models/ClickAnalytics';
import { IVisitAnalysis } from '../models/visitAnalysis';

@Injectable({
  providedIn: 'root'
})
export class SyncTreeServicesService {
   headers= new HttpHeaders()
  .set('content-type', 'multipart/form-data')
  .set('Access-Control-Allow-Origin', '*');
 
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getUsers(userId : number): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/' + userId;

    return this.httpClient.get<any>(url);
  }

  public updateUserSocialMedia(userSocialMapp : userSocialMediaMapping): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/UserSocialMediaMapping';

    return this.httpClient.post<any>(url, userSocialMapp);
  }

  public userSocialMediaMappingDelete(userSocialMapp : userSocialMediaMapping): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/UserSocialMediaMappingDelete';

    return this.httpClient.post<any>(url, userSocialMapp);
  }
  public userSocialMediaMappingUpdate(userSocialMapp : userSocialMediaMapping): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/UserSocialMediaMappingUpdate';

    return this.httpClient.post<any>(url, userSocialMapp);
  }
  public getSocialMediaUserDetails(userId: number): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/getSocialMediaUserDetails/'+userId;

    return this.httpClient.get<any>(url);
  }
  
  public signUpUser(user : users): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/user';

    return this.httpClient.post<any>(url, user);
  }

  public validateUser(user : users): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/validateUser';

    return this.httpClient.post<any>(url, user);
  }

  public uploadBackgroundImageFile(fileData, userId): Observable<any> {
    /* Image Post Request */
    const formData = new FormData(); 
    formData.append("file", fileData, fileData.name);
    return this.httpClient.post('https://localhost:44331/WeatherForecast/UserImageData/'+userId, formData);
  }

  public updatePostImage(userSocialMediaImageMapping : userSocialMediaImageMapping, userId : number): Observable<any> {
    /* Image Post Request */
    const formData = new FormData(); 
    formData.append("value", userSocialMediaImageMapping.Value, userSocialMediaImageMapping.Value.name);
    return this.httpClient.post('https://localhost:44331/WeatherForecast/updatePostImage/'+
    userSocialMediaImageMapping.id + '/'+userSocialMediaImageMapping.userSocialMediaMappingId + '/'+userId, formData);
  }

  public updatePostLogo(userSocialMediaLogo : userSocialMediaLogo, userId : number): Observable<any> {
    /* Image Post Request */
    if(userSocialMediaLogo.logo && userSocialMediaLogo.logo.name && userSocialMediaLogo.logo.name != null){
      const formData = new FormData(); 
      formData.append("value", userSocialMediaLogo.logo, userSocialMediaLogo.logo.name);
      return this.httpClient.post('https://localhost:44331/WeatherForecast/updatePostLogo/'+
      userSocialMediaLogo.id + '/'+userSocialMediaLogo.userSocialMediaMappingId + '/'+userId, formData);
    }

  }

  public updateSequence(userSocialMapp : userSocialMediaMapping): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/updateSequence';

    return this.httpClient.post<any>(url, userSocialMapp);
  }

  public updateUserAboutme(userid : number, aboutMe : string, domain : string ): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/updateUserAboutme';
    return this.httpClient.post<any>(url,{"id" : userid , "aboutMe" : '', "domain" : domain  });
  }

  public updateClickAnalytics(clickAnalysis : IClickAnalysis ): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/updateClickAnalytics';
    return this.httpClient.post<any>(url,clickAnalysis);
  }

  public getVisitAnalysis(userId : number, type : string ): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/getVisitAnalysis/'+userId + '/'+type;
    return this.httpClient.post<any>(url,userId);
  }

  public updateClickAnalysis(userId : number, type : string ): Observable<any> {
    const url = 'https://localhost:44331/WeatherForecast/getClickAnalysis/'+userId + '/'+type;
    return this.httpClient.post<any>(url,userId);
  }

  public updateProfileImage(userId : number, fileData : File): Observable<any> {
    const formData = new FormData(); 
      formData.append("value", fileData, fileData.name);
    const url = 'https://localhost:44331/WeatherForecast/updateProfileImage/'+userId ;
    return this.httpClient.post<any>(url,formData);
  }
}
