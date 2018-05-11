import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Sample } from './sample.model'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class MiganetService {
  private headers: any;
  private webURL: any;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.webURL = "https://searchfeeds.worldbank.org/people/bank?format=json&inst=MIGA&srt=0&order=desc&nohighlight=false&keyword_select=&boost_value=true&pu=false&rows=200";
  }

  public getStaffContent(): Observable<any> {
    return this.httpClient.get("http://localhost:4000/WB_Staff")
     .map(resp => {
         return resp;
     })
     .catch(error =>{
         return Observable.throw(error || 'backend error..')
     })

  }

  public getDeptContent(): Observable<any> {
    return this.httpClient.get("http://localhost:3000/WB_Dept")
     .map(resp => {
         return resp;
     })
     .catch(error =>{
         return Observable.throw(error || 'backend error..')
     })

  }

  public getTeamContent(): Observable<any> {
    return this.httpClient.get("http://localhost:5000/WB_Team")
     .map(resp => {
         return resp;
     })
     .catch(error =>{
         return Observable.throw(error || 'backend error..')
     })

  }

  public getGroupsContent(): Observable<any> {
    return this.httpClient.get("http://localhost:3001/WB_Groups")
     .map(resp => {
         return resp;
     })
     .catch(error =>{
         return Observable.throw(error || 'backend error..')
     })

  }

}
