import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {  mes } from '../../../Models/estudiantes-registro';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import { ConsultasDashboardService } from '../../../Services/consultas-dashboard.service';
import { Consultas } from 'src/app/Models/consultas';
import { RegistroEventosService } from 'src/app/Services/registro-eventos.service';
import { AlertsService } from 'src/app/Services/alerts/alerts.service';
import { RegistroMentoriaService } from 'src/app/Services/registro-mentoria.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { mes } from 'src/app/Models/estudiantes-registro';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  estudiantes: any = [];
  countEstudiantes = 0;
  countLikes=0;
  countMentoriaAgen=0;
  countMentorias=0;
  countEdit = 0;
  countMent = 0;
  view: any[] = [250,350];
  registro = [
    {
      name: '',
      value: 0,
    },
  ];
  mentoria = [
    {
      name: '',
      value: 0,
    },
  ];
tipoMentoria = [
  {
    name: '',
    value: 0,
  },
];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition: string = 'below'; //rigth ,below
  showXAxisLabel = true;
  xAxisLabel = 'Mes';

  showYAxisLabel = true;
  yAxisLabel = 'Nro. de Estudiantes';
  yAxisLabel1 = 'Nro. de mentorias';
  animations = true;
  showDataLabel = true;
  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private consultasDashboardServices: ConsultasDashboardService,
    private registroEvento: RegistroEventosService,
    private alerts: AlertsService,
    private registroMentoria:RegistroMentoriaService
  ) {
    // Object.assign(this, { mes });
  }
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.getConsultas();
    this.getConsultaMentorias();
    this.getEventos();                              
    this.getTotalMentorias();
    this.getNroMentoriasPorTipo();
  }
  getConsultas() {
    var con = [];
    var m=0;
    this.consultasDashboardServices.getEstudiantesMes().subscribe(
      (res: any) => {
        console.log(res);
        for (let c of res) {
          const mes = c.Mes;
          const nro = c.NroEstudiantes+m;
          m=nro;
         
          let options = {
            name: mes,
            value: nro,
          };
          con.push(options);
        }
        this.registro = con;
      },
      (err) => console.error(err)
    );
  }
  getNroMentoriasPorTipo(){
    var con = [];
    var m=0;
    this.consultasDashboardServices.getTipoMentoria().subscribe(
      (res: any) => {
        console.log("tipo",res);
        for (let c of res) {
          const mes = c.Mes;
          const nro = c.NroEstudiantes+m;
         
         
          let options = {
            name: mes,
            value: nro,
          };
          con.push(options);
        }
        this.tipoMentoria = con;
      },
      (err) => console.error(err)
    );
  }

  getConsultaMentorias() {
    var con = [];
    this.consultasDashboardServices.getMentoriasMes().subscribe(
      (res: any) => {
        console.log(res);
        for (let c of res) {
          const mes = c.Mes;
          const nro = c.NroMentoriasAgendadas;
         
          let options = {
            name: mes,
            value: nro,
          };
          con.push(options);
        }
        this.mentoria = con;
      
        console.log("el arreglo",this.mentoria)
      },
      (err) => console.error(err)
    );
  }

  
  getUsuarios() {
    console.log('hol');
    var usuAE = [];
    var est = 0;
    var edit = 0;
    var ment = 0;

    this.registroUsuarioService.getUsuarios().subscribe(
      (res: any) => {
        console.log(res);
        for (let usu1 of res) {
          if (usu1.tipo_rol == 'Estudiante') {
            est = est + 1;
          }
          if (usu1.tipo_rol == 'Editor') {
            edit = edit + 1;
          }
          if (usu1.tipo_rol == 'Mentora') {
            ment = ment + 1;
          }
        }
        this.countEstudiantes= est;
        this.countEdit = edit;
        this.countMent = ment;
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
getEventos(){
  var likes = 0;
  this.registroEvento.getEventos().subscribe(
    (res:any) => {
      
      console.log("todos los eventos",res)
      for (let usu1 of res) {
        if(usu1.id_tipo_evento=="1"){
          likes=likes+1;
        }
      }
      this.countLikes=likes; 
     },
     (err) => {
       console.log('no se puede obtener');
       this.alerts.showError('Error Operation', 'No se puede guardar')
     }
    )

}
getTotalMentorias(){
  var numMentorias = 0;
  this.registroMentoria.getAgendamientoMentorias().subscribe(
    (res:any) => {
      
      console.log("todos los eventos",res)
      for (let usu1 of res) {
           numMentorias=res.length;
      } 
      this.countMentoriaAgen=numMentorias;
     },
     (err) =>{
       
       console.log('no se puede obtener');
       this.alerts.showError('Error Operation', 'No se puede guardar')
     }
    )
}

}
