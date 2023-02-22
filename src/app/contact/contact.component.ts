import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  name: string ="";
  email: string ="";
  phone: string = "";
  currentId = "";

  constructor(private http: HttpClient,private toastr: ToastrService )
  {
    this.getAllContact();
  }

  getAllContact()
  {
    this.http.get("http://localhost:8080/contacts")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.contactArray = resultData;
    });
  }
  register()
  {
    if(this.name.trim() == "" || this.email.trim() == ""){
       this.toastr.error('Digite o nome e e-mail corretamente!', 'Atenção', {
        timeOut: 1000,
      })
      return
    }

    let bodyData = {
      "name" : this.name,
      "email" : this.email,
      "phone" : this.phone
    };
    this.http.post("http://localhost:8080/contacts",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.toastr.success('contato salvo com sucesso!', '', {
          timeOut: 1000,
        })
        this.getAllContact();

        this.name = '';
        this.email = '';
        this.phone  =  '';
    });
  }
  setUpdate(data: any)
  {
   this.name = data.name;
   this.email = data.email;
   this.phone = data.phone;
   this.currentId = data.id;
  }
  UpdateRecords()
  {
    if(this.name.trim() == "" || this.email.trim() == ""){
      this.toastr.error('Digite o nome e e-mail corretamente!', 'Atenção', {
       timeOut: 1000,
     })
     return
   }
    let bodyData = {
      "id" : this.currentId,
      "name" : this.name,
      "email" : this.email,
      "phone" : this.phone
    };

    this.http.put(`http://localhost:8080/contacts/${this.currentId}`, bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.toastr.success('contato salvo com sucesso!', '', {
          timeOut: 1000,
        })
        this.getAllContact();
        this.currentId = '';
        this.name = '';
        this.email = '';
        this.phone  =  '';
    });
  }
  save()
  {
    if(this.currentId == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }
  }
  setDelete(data: any)
  {


    this.http.delete(`http://localhost:8080/contacts/${data.id}`,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        this.toastr.success('contato deletado com sucesso!', '', {
          timeOut: 1000,
        })
        this.getAllContact();
        this.currentId = '';
        this.name = '';
        this.email = '';
        this.phone  =  '';

    });
  }
}
