import { Component, OnInit } from '@angular/core';
import { UsuariosserviceService } from "../services/usuariosservice.service";
import { Usuario } from "../models/usuario";
import { NgbModal, ModalDismissReasons, NgbDatepicker } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2'
import * as XLSX from "xlsx";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(
    private usuarioService: UsuariosserviceService,
    private modalService: NgbModal
  ) { }

  usuarios_list: Array<Usuario> = []
  nuevo_usuario: Usuario = new Usuario()
  input_nombre: string = ""
  closeResult = '';
  titulo_modal = '';
  files: File[] = [];
  nueva_imagen: boolean = false
  comando_onclick: string = ""
  filterData: Array<Usuario>=[];

  ngOnInit() {
    this.usuarioService.get_usuarios().subscribe(data => {
      console.log(data)
      Object.assign(this.usuarios_list, data)
    },
      error => {
        console.log(error)
      })
  }


  guardar_usuario(accion) {
    console.log(accion)
    console.log(this.nuevo_usuario)
    let elementos_en_objeto = this.countProperties(this.nuevo_usuario)
    console.log(elementos_en_objeto)
    console.log(this.nuevo_usuario.vchar_foto)
    if (this.nuevo_usuario.vchar_foto == undefined) {
      Swal.fire('Atención!', 'Agrega una imagen antes de continuar', 'warning')
    }
    else {
      if (elementos_en_objeto >= 6) {
        if (this.nuevo_usuario.int_edad.toString().trim() == "" || this.nuevo_usuario.vchar_apellido.trim() == "" || this.nuevo_usuario.vchar_nombre.trim() == "" || this.nuevo_usuario.vchar_telefono.trim() == "") {
          Swal.fire('Atención!', 'Completa todos los campos antes de continuar', 'warning')
        }
        else {
          if (accion == "nuevo") {

            this.usuarioService.post_usuario(this.nuevo_usuario.vchar_nombre, this.nuevo_usuario.vchar_apellido, this.nuevo_usuario.vchar_telefono, this.nuevo_usuario.int_edad, this.nuevo_usuario.date_fecha_ingreso, this.nuevo_usuario.vchar_foto).subscribe(
              data => {
                console.log(data)
                Swal.fire('Correcto!', 'Se ha agregado un nuevo usuario', 'success')
                this.usuarioService.get_usuarios().subscribe(data => {
                  console.log(data)
                  Object.assign(this.usuarios_list, data)
                },
                  error => {
                    console.log(error)
                  })
              },
              error => {
                console.log(error)
              }
            )
          }
          else {
            this.usuarioService.put_usuario(this.nuevo_usuario.int_id_usuario, this.nuevo_usuario.vchar_nombre, this.nuevo_usuario.vchar_apellido, this.nuevo_usuario.vchar_telefono, this.nuevo_usuario.int_edad, this.nuevo_usuario.date_fecha_ingreso, this.nuevo_usuario.vchar_foto).subscribe(
              data => {
                console.log(data)
                Swal.fire('Correcto!', 'Se ha acutalizado el usuario', 'success')
                // this.modalService.dismissAll()
                this.usuarioService.get_usuarios().subscribe(data => {
                  console.log(data)
                  Object.assign(this.usuarios_list, data)
                },
                  error => {
                    console.log(error)
                  })
              },
              error => {
                console.log(error)
              }
            )
          }

        }

      }
      else {
        Swal.fire('Atención!', 'Completa todos los campos antes de continuar', 'warning')
      }
    }


    // this.usuarioService.post_usuario().subscribe(data=>{
    //   console.log(data)
    // },
    // error=>{
    //   console.log(error)
    // })
  }

  open_formulario_usuario(content, accion) {
    this.comando_onclick = accion
    console.log(accion)
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


    if (accion == "nuevo") {
      this.nueva_imagen = true
      this.titulo_modal = "Nuevo usuario"
      this.nuevo_usuario = Object();
      this.files = []
      console.log(this.nuevo_usuario)
    }
    else {
      this.nueva_imagen = false
      let usuario = this.usuarios_list.find(x => x.int_id_usuario == accion)
      // this.nuevo_usuario.date_fecha_ingreso= usuario.date_fecha_ingreso
      // this.nuevo_usuario.int_edad= usuario.int_edad
      // this.nuevo_usuario.int_id_usuario= usuario.int_id_usuario
      // this.nuevo_usuario.vchar_apellido= usuario.vchar_apellido
      // this.nuevo_usuario.vchar_foto= usuario.vchar_foto
      // this.nuevo_usuario.
      this.titulo_modal = "Editando usuario: " + usuario.vchar_nombre
      Object.assign(this.nuevo_usuario, usuario)
      console.log(usuario)
      console.log(this.nuevo_usuario)
    }
  }

  onSelect(event) {
    var base64 = ''
    var base64t = ''
    let nombre = '';
    let reader = new FileReader();
    let there = this
    // console.log("holito")
    // console.log(event.addedFiles[0])
    nombre = event.addedFiles[0].name
    // console.log(nombre)
    // this.new_name = nombre
    // this.new_model = nombre.split('.')[0];
    // console.log("tamaño de files actual: " + this.files.length)
    if (this.files.length == 0) {
      this.files.push(...event.addedFiles);
    }
    else {
      Swal.fire('!!', 'número de archivos permitidos excedido', 'warning')
    }
    // console.log("this.files:")

    reader.onload = handleReaderLoad;
    reader.readAsDataURL(this.files[0])
    function handleReaderLoad(evt) {
      base64t = evt.target.result
      base64 = base64t.split(',')[1];
      // console.log(base64)
      // console.log("guid")
      // console.log(uuidv4())
      // there.uuid_new = uuidv4()
      // there.new_image_base64 = base64
      there.nuevo_usuario.vchar_foto = base64
      console.log(there.nuevo_usuario)
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  countProperties(obj) {
    var count = 0;

    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        ++count;
    }

    return count;
  }

  mostrar_input_imagen() {
    this.nueva_imagen = true
  }

  validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
      key = theEvent.clipboardData.getData('text/plain');
    } else {
      // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  delete_usuario(id) {
    this.usuarioService.delete_usuario(id).subscribe(data => {
      console.log(data)
      Swal.fire('Correcto!', 'Usuario eliminado', 'success')
      location.reload()
    },
      error => {
        console.log(error)
      })
  }

  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    let cantidad_insertados=0
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(worksheet)
      // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      let contenido_excel = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      console.log(contenido_excel)
      if (contenido_excel.length != 0) {


        // console.log(typeof(contenido_excel))
        contenido_excel.forEach((value) => {
          let key_nombre = Object.keys(value)[0]
          // console.log(key_nombre)
          let nombre = value[key_nombre]
          // console.log(nombre)
          let key_apellido = Object.keys(value)[1]
          let apellido = value[key_apellido]
          let key_telefono = Object.keys(value)[2]
          let telefono = value[key_telefono]
          let key_edad = Object.keys(value)[3]
          let edad = value[key_edad]
          let key_fecha_ingreso_dia = Object.keys(value)[4]
          let fecha_ingreso_dia = value[key_fecha_ingreso_dia]
          let key_fecha_ingreso_mes = Object.keys(value)[5]
          let fecha_ingreso_mes = value[key_fecha_ingreso_mes]
          let key_fecha_ingreso_anio = Object.keys(value)[6]
          let fecha_ingreso_anio = value[key_fecha_ingreso_anio]

          console.log(nombre)
          console.log(apellido)
          console.log(telefono)
          console.log(edad)
          console.log(fecha_ingreso_dia+"-"+fecha_ingreso_mes+"-"+fecha_ingreso_anio)
          let fecha = fecha_ingreso_anio+"-"+fecha_ingreso_mes+"-"+fecha_ingreso_dia
          this.usuarioService.post_usuario(nombre,apellido,telefono,edad,fecha,'').subscribe(data=>{
            cantidad_insertados++
            console.log(data)
          },
          error=>{
            console.log()
          })
        })

        if(cantidad_insertados==contenido_excel.length)
        {
          Swal.fire('Correcto','se han agregado nuevos usuarios','success')
        }
      }
      else {
        Swal.fire('Atención','el archivo no contiene información que cargar al sistema','warning')
      }

    }
    fileReader.readAsArrayBuffer(this.file);
  }

  buscar(term:string)
  {
    if(!term) {
      this.filterData = this.usuarios_list;
    } else {
      this.filterData = this.usuarios_list.filter(x => x.vchar_nombre.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
      if(this.filterData.length==0)
      {
        this.filterData= this.usuarios_list.filter(x=> x.vchar_apellido.toString().toLowerCase().includes(term.trim().toLowerCase()))
      }
      if(this.filterData.length==0)
      {
        this.filterData= this.usuarios_list.filter(x=>x.vchar_telefono.toString().trim().includes(term.trim()))
      }
      if(this.filterData.length==0)
      {
        this.filterData= this.usuarios_list.filter(x=>x.int_edad.toString().trim().includes(term.trim().toLowerCase()))
      }
      console.log("**resultado filtro**")
      console.log(this.filterData)
    }
  }

  openo(contento) {
    this.modalService.open(contento, {size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
  }



}
