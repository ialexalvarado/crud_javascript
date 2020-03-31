import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuariosserviceService {

  url:string ="http://localhost:3000/api/"

  constructor(
    private httpclient:HttpClient
  ) { }


  get_usuarios()
  {
    return this.httpclient.get(this.url+"get_usuarios")
  }

  post_usuario(nombre,apellido,telefono,edad,fecha_ingreso,foto)
  {
    return this.httpclient.post(this.url+"post_usuario",{nombre:nombre,apellido:apellido,telefono:telefono,edad:edad,fecha_ingreso:fecha_ingreso,foto:foto})
  }

  put_usuario(id,nombre,apellido,telefono,edad,fecha_ingreso,foto)
  {
    return this.httpclient.put(this.url+"put_usuario", {id:id,nombre:nombre,apellido:apellido, telefono:telefono, edad:edad, fecha_ingreso:fecha_ingreso, foto:foto})
  }

  delete_usuario(id)
  {
    return this.httpclient.delete(this.url+"delete_usuario/"+id)
  }
}
