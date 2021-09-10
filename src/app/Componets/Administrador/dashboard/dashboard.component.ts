import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {  mes } from '../../../Models/estudiantes-registro';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RegistroUsuarioService } from '../../../Services/registro-usuario.service';
import { ConsultasDashboardService } from '../../../Services/consultas-dashboard.service';
import { Consultas } from 'src/app/Models/consultas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  estudiantes: any = [];
  countEstudiantes = 0;
  countEdit = 0;
  countMent = 0;
  view: any[] = [350, 300];
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
  animations = true;
  showDataLabel = true;
  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private consultasDashboardServices: ConsultasDashboardService
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
  }
  getConsultas() {
    var con = [];
    this.consultasDashboardServices.getEstudiantesMes().subscribe(
      (res: any) => {
        console.log(res);
        for (let c of res) {
          const mes = c.Mes;
          const nro = c.NroEstudiantes;
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
        this.countEstudiantes = est;
        this.countEdit = edit;
        this.countMent = ment;
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
}
