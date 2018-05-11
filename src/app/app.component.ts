
import { Observable } from 'rxjs/Observable'
import { OnInit } from '@angular/core'
import { HttpClient,HttpHeaders } from '@angular/common/http'
//import { Customer } from './customer.model'
import { MiganetService } from "./Service/miganet.service";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Component } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

//declare var ULSaKF : any;
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit{

    ulObj : any;
    private headers : HttpHeaders;
    private tblCustURL : string;
    private tblEmpURL : string;
    private collListItem : any;
    private currentWebUrl : any;
    private context : any;
    private deptResults : any;
    private staffResults : any;
    private teamResults : any;
    private teamFinalResults : any = {};
    private teamOutputResults : any = [];
    private deptFinalResults : any = [];
    private deptOutputResults : any = [];
    private managersResults : any = [];
    private assistantResults : any = [];
    private groupsFinalResults : any;
    private groupsResults : any;
    private teamGenResults : any;
    private othersResults : any = [];
    private othersResults_Sort : any = [];
    private teamNullResults : any = [];
    private teamNullResults_Sort : any = [];
    isTeamTitle : boolean =true;
    public i=0;
    public j: any=0;
    private imgHide : boolean;

  
  

    constructor(private http : HttpClient, private miganetService:MiganetService,
    private spinnerService: Ng4LoadingSpinnerService,private router: Router){
        this.headers = new HttpHeaders({'Content-Type' : 'application/json'});
        this.imgHide = false;
        this.tblCustURL = "http://localhost:3000/WB_USCustomer";
        this.tblEmpURL = "http://localhost:4000/WB_USEmployees";
        this.currentWebUrl = "https://wbghcl.sharepoint.com/sites/miganet";

    }

    ngOnInit(){
        //this.spinnerService.show();
console.log(this.imgHide);
console.log("url",window.location.href)
console.log(this.router.url);
    //    // this.deptResults="<table><tbody><tr><td>dasfsfd</td></tr></tbody></table>"
    //     this.http.get("http://localhost:4000/WB_Staff")
    //     .map(resp => {
    //         this.staffResults = resp;
    //         console.log("staffResults"+ JSON.stringify(this.staffResults));
    //     })
    //     .catch(error =>{
    //         return Observable.throw(error || 'backend error..')
    //     })

    //     this.http.get("http://localhost:3000/WB_Dept")
    //     .map(resp => {
    //         this.deptResults= resp;
    //         console.log("staffResults"+ JSON.stringify(this.deptResults));
    //     })
    //     .catch(error =>{
    //         return Observable.throw(error || 'backend error..')
    //     })

        this.miganetService.getStaffContent()
            .subscribe((tab) => 
            {
                this.staffResults = tab;
                if(this.staffResults!=undefined){

                    // this.staffResults.sort(function(a, b){
                    //     return a.migaStaffSortOrder-b.migaStaffSortOrder;
                    // })
                    // console.log("migaStaffSortOrder sort",this.staffResults);
                    for (let m = 0; m < this.staffResults.length;m++) {
                        if (this.staffResults[m].migaPosition == "Manager") {
                            this.managersResults.push(this.staffResults[m]);
                        }
                    }
                    console.log(this.managersResults);

                    for (let am = 0; am < this.staffResults.length; am++) {
                    if (this.staffResults[am].migaPosition == "Manager Assistant") {
                        this.assistantResults.push(this.staffResults[am]);
                    }
                    }
                    console.log(this.assistantResults);

                    for (let others = 0; others < this.staffResults.length; others++) {
                    if (this.staffResults[others].migaTeamId == null) {
                        this.othersResults.push(this.staffResults[others]);
                    }
                    }
                    console.log(this.othersResults);
                    this.othersResults.sort(function(a, b){
                    var staffFirst=a.migaStaffName.toLowerCase();
                    var staffSecond=b.migaStaffName.toLowerCase();
                    if (staffFirst < staffSecond) 
                        return -1 ;
                    if (staffFirst > staffSecond)
                        return 1;
                    return 0 ;
                })

                if(this.othersResults != undefined)
                {
                    for (let others_Sort = 0; others_Sort < this.othersResults.length; others_Sort++) {
                    if (this.othersResults[others_Sort].migaStaffSortOrder != null) {
                        this.othersResults_Sort.push(this.othersResults[others_Sort]);
                    }
                    }
                    if(this.othersResults_Sort.length>0)
                    {
                        this.othersResults_Sort.sort(function(a, b){
                            return a.migaStaffSortOrder-b.migaStaffSortOrder;
                        })
                    }

                    for (let others_Sort = 0; others_Sort < this.othersResults.length; others_Sort++) {
                    if (this.othersResults[others_Sort].migaStaffSortOrder == null) {
                        this.othersResults_Sort.push(this.othersResults[others_Sort]);
                    }
                    }
                }
                

                    console.log("After sort",this.othersResults);
                    for (let team = 0; team < this.staffResults.length; team++) {
                    if (this.staffResults[team].migaTeamId != null) {
                        this.teamNullResults.push(this.staffResults[team]);
                    }
                    }
                    this.teamNullResults.sort(function(a, b){
                    var staffFirst=a.migaStaffName.toLowerCase();
                    var staffSecond=b.migaStaffName.toLowerCase();
                    if (staffFirst < staffSecond) 
                        return -1 ;
                    if (staffFirst > staffSecond)
                        return 1;
                    return 0 ;
                    })
                    console.log(this.teamNullResults);

                    if(this.teamNullResults != undefined)
                    {
                    for (let team_Sort = 0; team_Sort < this.teamNullResults.length; team_Sort++) {
                    if (this.teamNullResults[team_Sort].migaStaffSortOrder != null) {
                        this.teamNullResults_Sort.push(this.teamNullResults[team_Sort]);
                    }
                    }
                
                    if(this.teamNullResults_Sort.length>0)
                    {
                        this.teamNullResults_Sort.sort(function(a, b){
                            return a.migaStaffSortOrder-b.migaStaffSortOrder;
                        })
                    }

                    for (let team_Sort = 0; team_Sort < this.teamNullResults.length; team_Sort++) {
                    if (this.teamNullResults[team_Sort].migaStaffSortOrder == null) {
                        this.teamNullResults_Sort.push(this.teamNullResults[team_Sort]);
                    }
                    }

                 }
                }
                            // sppnp.lists.getByTitle("Staff").items.top(500).filter("migaTeamId eq null").orderBy("migaStaffName", true).get().then((result: any) => {
            //   this.othersResults = result;

            //   sppnp.lists.getByTitle("Staff").items.top(500).filter("migaTeamId ne null").orderBy("migaStaffName",true).get().then((result: any) => {
            //     this.teamNullResults = result;

             this.miganetService.getDeptContent()
            .subscribe((tab) => 
            {
                this.deptResults = tab;

                if(this.deptResults != undefined && this.staffResults != undefined)
                {
                for (let i = 0; i < this.deptResults.length; i++) {
                    if (this.deptResults[i].migaDepartmentCodes == "MIGAH, MIGSG") {
                      this.deptResults[i].migaDepartmentCodes = "Dup_Asia";
                    }
                    if (this.deptResults[i].migaDepartmentCodes == "MIGAH") {
                      this.deptResults[i].migaDepartmentCodes = "Dup_Korea";
                    }
                  }

                  debugger
                  for (let i = 0; i < this.staffResults.length; i++) {
                    if (this.staffResults[i].migaDepartmentCode == "MIGAH" && this.staffResults[i].migaShowInOtherDepartmentId==null) {
                      this.staffResults[i].migaDepartmentCode = "Dup";
                    }
                    if (this.staffResults[i].migaDepartmentCode == "MIGAH" && this.staffResults[i].migaShowInOtherDepartmentId != null) {
                      for (let d = 0; d < this.deptResults.length; d++) {
                        if (this.deptResults[d].Id == this.staffResults[i].migaShowInOtherDepartmentId)
                        //  if (this.deptResults[d].migaDepartmentCodes == 'MIGAH') {
                            this.staffResults[i].migaDepartmentCode = this.deptResults[d].migaDepartmentCodes;
                          //}
                          //else if (this.deptResults[d].migaDepartmentCodes == "MIGAH, MIGSG") {
                          //  this.staffResults[i].migaDepartmentCode = 'MIGSG';
                          //}

                         
                      }
                    }

                  }
                }

           // console.log("staffResults"+ JSON.stringify(this.staffResults));
          
            //console.log("deptResults"+ JSON.stringify(this.deptResults));
        
           this.miganetService.getTeamContent()
            .subscribe((tab) => 
            {
                this.teamResults = tab;
            //console.log("TeamResults"+ JSON.stringify(this.teamResults));
            this.miganetService.getGroupsContent()
            .subscribe((tab) => 
            {
                this.groupsResults = tab;
           // console.log("GroupsResults"+ JSON.stringify(this.groupsResults));

           if(this.groupsResults!= undefined)
           {
               for(let i=0;i<this.groupsResults.length;i++)
               {
                   this.groupsFinalResults+=this.groupsResults[i].migaGroupCode +",";
               }
              // console.log("GroupsResults"+ JSON.stringify(this.groupsFinalResults));
           }

          
        
           if(this.deptResults != undefined && this.staffResults != undefined)
        {
            for(let i=0;i<this.deptResults.length;i++)
            {
                for(let j=0;j<this.staffResults.length;j++)
                {
                    if(this.deptResults[i].migaDepartmentCodes.indexOf(this.staffResults[j].migaDepartmentCode)>-1)
                    {
                        this.deptFinalResults.push(this.deptResults[i]);
                
                    }
                } 
            }
            
        }

        this.deptOutputResults =  Array.from(new Set(this.deptFinalResults ));
        
        console.log("deptOutputResults",this.deptOutputResults)

           if(this.teamResults != undefined && this.staffResults != undefined)
        {
            for(let i=0;i<this.teamResults.length;i++)
            {
                for(let j=0;j<this.staffResults.length;j++)
                {
                    if( this.staffResults[j].migaTeamId != null && this.staffResults[j].migaTeamId == this.teamResults[i].ID)
                    {
                         var teamFinalResults = {"migaDepartmentCode":"","migaTeamId":"","migaId":"","migaTeamTitle":"","migaDept_Title":""};
                         teamFinalResults.migaDepartmentCode=this.staffResults[j].migaDepartmentCode.trim();
                         teamFinalResults.migaTeamId=this.staffResults[j].migaTeamId;
                         teamFinalResults.migaId=this.teamResults[i].ID;
                         teamFinalResults.migaTeamTitle=this.teamResults[i].Title.trim();
                         teamFinalResults.migaDept_Title=this.staffResults[j].migaDepartmentCode.trim()+this.teamResults[i].Title.trim();
                         this.teamOutputResults.push(teamFinalResults);
                    }
                    
                } 
            }
            var obj = {};

for ( var i=0, len=this.teamOutputResults.length; i < len; i++ )
    obj[this.teamOutputResults[i]['migaDept_Title']] = this.teamOutputResults[i];

this.teamOutputResults = new Array();
for ( var key in obj )
    this.teamOutputResults.push(obj[key]);
// this.teamGenResults = this.teamOutputResults.filter(function(item, pos, self) {
//     return self.indexOf(item) == pos;
// })
       // this.teamGenResults =  Array.from(new Set(this.teamOutputResults));
  
       // console.log("TeamGenResults"+ JSON.stringify(this.teamOutputResults));
        }
        if(this.staffResults != undefined && this.teamOutputResults.length>0)
 {
     this.imgHide=true;
     console.log("false",this.imgHide);
 }
        
            });

        });
       
        });

            
        
        
        
         
                });
                
            
//this.spinnerService.hide();
       

        
        
    }

    public openSPPopup(event){
        
        var target = event.target || event.srcElement || event.currentTarget;
        var targetParent = target.parentElement.parentElement;

        if(this.staffResults != undefined)
        {
            var staffName= targetParent.children[1].innerText;
            var upi;
            for(let i=0;i<this.staffResults.length;i++) {
                if(this.staffResults[i].migaStaffName==staffName)
                {
                
                upi=this.staffResults[i].Title;
                break;
                }
                }
            }
        debugger
        var temp="https://worldbankgroup.sharepoint.com/sites/MIGANet/pages/staffprofile.aspx?upi="+upi;
        console.log(temp);
        if(window != undefined)
        {
        window['OpenPopUpPage'](temp);
        //window.
        }
        
    }
    public OpenPrintVersion() :any{
        var url = "";
        if (url.indexOf("?") == -1)
            url += "?";
        else
            url += "&";
        if (url.indexOf("IsDlg=") == -1)
            url += "IsDlg=0&PrnV=1";
        else
            url += "PrnV=1";
        window.open(url, "_blank");
    }

// public openPopUpModel(event){
// var target = event.target || event.srcElement || event.currentTarget;
//   var targetParent = target.parentElement.parentElement;
//   myOpenDialogBox.OpenDialogBox();
// }

//  public openPopUpModel() {
//      debugger
      
//         //Using a generic object.
//         var options = {
//             title: "",
//             //width: 400,
//             //height: 400,
//             url: "https://github.com/GoogleChromeLabs/sw-precache/issues/180"
//         };
//       //  SP.UI.ModalDialog.showModalDialog(options);
    
//     }

public sanitizeupi(upi:any){
console.log(upi);
}
 public open_DeletePopup(event):any {
 
  var target = event.target || event.srcElement || event.currentTarget;
  var targetParent = target.parentElement.parentElement;
  console.log(targetParent.children[0].innerHTML);
  console.log(targetParent.children[1].innerText);
  console.log(targetParent.children[2].innerText);
  console.log(targetParent.children[3].innerText);
  console.log(targetParent.children[4].innerText);
  console.log(targetParent.children[5].innerText);

//   if(this.staffResults != undefined)
//  {
//      var staffName= targetParent.children[1].innerText;
//      this.staffResults.forEach(element => {
//          if(element.migaStaffName==staffName)
//          {
//             var location=element.migaCityName;
//             var stopNumber=element.migaMailStopNumber;
//             var upi=element.Title;
            
//             var content="<html><body>";
//             content = content + "<table class='staffDetail'><tr><td class='staffPhoto'>"+targetParent.children[0].innerHTML+"</td><td class='staffInfo'><span class='staffDetailsName'>"+targetParent.children[1].innerText+"</span><br /><br /><span class='staffDetailsTitle'>Title:</span><span>"+targetParent.children[2].innerText+"</span><br /><span class='staffDetailsTitle'>Phone:</span><span>"+targetParent.children[3].innerText+"</span><br /><span class='staffDetailsTitle'>Room Number:</span><span>"+targetParent.children[4].innerText+"</span><br /><span class='staffDetailsTitle'>Mail Stop:</span><span>"+stopNumber+"</span><br /><span class='staffDetailsTitle'>Location:</span><span>"+location+"</span><br /><span class='staffDetailsTitle'>Email:</span><a  href='"+targetParent.children[5].innerText+"'> <span>"+targetParent.children[5].innerText+"</span></a><br /></td></tr></table>";
//             content = content +"</body></html>";
//             window.open("https://worldbankgroup.sharepoint.com/sites/MIGANet/pages/staffprofile.aspx?upi="+upi+"IsDlg=1","_blank").document.write(content);
//          }
//      });
  
//  }

var url="https://worldbankgroup.sharepoint.com/sites/MIGANet/pages/staffprofile.aspx?upi="
         //Using a generic object.
        var options = {
            title: "",
            //width: 400,
            //height: 400,
            url: "https://github.com/GoogleChromeLabs/sw-precache/issues/180"
        };
      // SP.UI.ModalDialog.showModalDialog(options);
      // window.UI.ModalDialog.showModalDialog(options);

}

// public OpenPopUpPage() {  
//       debugger
//         //Set options for Modal PopUp  
//         var options = {  
//             url: 'https://worldbankgroup.sharepoint.com/_layouts/15/images/gears_anv4.gif?rev=44', //Set the url of the page  
//             title: 'SharePoint Modal Pop Up', //Set the title for the pop up  
//             allowMaximize: false,  
//             showClose: true,  
//             width: 600,  
//             height: 400  
//         };  
//         //Invoke the modal dialog by passing in the options array variable  
//         SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);  
//         return false;  
//     }  

}

