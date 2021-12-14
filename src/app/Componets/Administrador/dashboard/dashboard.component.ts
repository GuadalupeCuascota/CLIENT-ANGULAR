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
  countLikes = 0;
  countMentoriaAgen = 0;
  countMentorias = 0;
  countEdit = 0;
  countMent = 0;
  mes1 = '';
  mes2 = '';
  NroEstBachillerato = 0;
  NroEstUniversidad = 0;

  registro = [
    {
      name: '',
      value: 0,
    },
  ];
  LikesPerfil = [
    {
      name: '',
      value: 0,
    },
  ];
  registroEst = [
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
  eventosCarrera = [
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

  tipo = [
    {
      name: '',
      series: [
        {
          name: '',
          value: 0,
        },
      ],
    },
  ];

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  view: any[] = [210, 350];
  //////GRAFICO NRO DE ESTUDIANTES POR MES////
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
 legendPosition : string = 'left'; //rigth ,below
  showXAxisLabel = true;
  xAxisLabel = 'Mes';

  showYAxisLabel = true;
  yAxisLabel = 'Nro. de Estudiantes';

  animations = true;
  showDataLabel = true;
/////nro/
// options
viewNro: any[] = [300, 300];
gradientNro: boolean = true;
showLegendNro: boolean = true;
showLabelsNro: boolean = true;

legendPosition1: string = 'below';
colorScheme1 = {
  domain: [ '#A10A28', '#C7B42C', '#AAAAAA']
};
  ///////TIPO MENTORIA ////

  showXAxis1: boolean = true;
  showYAxis1: boolean = true;
  gradient1: boolean = false;
  showLegend1: boolean = true;
  showXAxisLabel1: boolean = true;
  yAxisLabel2: string = 'Tipo mentoria';
  showYAxisLabel1: boolean = true;
  xAxisLabel1: string = 'Nro de mentorias';

  ////////grafico circular//
  gradientC: boolean = true;
  showLegendC: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPositionC: string = 'below';

  constructor(
    private registroUsuarioService: RegistroUsuarioService,
    private consultasDashboardServices: ConsultasDashboardService,
    private registroEvento: RegistroEventosService,
    private alerts: AlertsService,
    private registroMentoria: RegistroMentoriaService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
    this.getConsultas();
    this.getConsultaMentorias();
    this.getEventos();
    this.getTotalMentorias();
    this.getNroMentoriasPorTipo();
    this.getNroLikesPorCarrera();
    this.getNroLikesPorPerfil();
  }

  getConsultas() {
    var con = [];
    var m = 0;
    this.consultasDashboardServices.getEstudiantesMes().subscribe(
      (res: any) => {
        for (let c of res) {
          const mes = c.Mes;
          const nro = c.NroEstudiantes + m;
          m = nro;

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

  getNroMentoriasPorTipo() {
    var con = [];

    this.consultasDashboardServices.getTipoMentoria().subscribe(
      (res: any) => {
        for (let c of res) {
          const tipo = c.TipoMentoria;
          const nro = c.NroMentoriasAgendadas;
          let options = {
            name: tipo,
            value: nro,
          };
          con.push(options);

          // if (c.Mes == 'noviembre') {
          //   console.log('PASA');
          //   this.mes1 = c.Mes;
          //   const tip = c.TipoMentoria;
          //   const nro = c.NroMentoriasAgendadas;

          //   let options = {
          //     name: tip,
          //     value: nro,
          //   };

          //   series.push(options);
          // } else {
          //   if (c.Mes == 'diciembre') {
          //     console.log('es diciembre');
          //     this.mes2 = c.Mes;
          //     const tip = c.TipoMentoria;
          //     const nro = c.NroMentoriasAgendadas;

          //     let options1 = {
          //       name: tip,
          //       value: nro,
          //     };

          //     series1.push(options1);
          //   }
          // }
          // var a = [
          //   {
          //     name: this.mes1,
          //     series,
          //   },
          // ];
        }

        this.tipoMentoria = con;
        console.log('nuevo tipo', this.tipoMentoria);
      },
      (err) => console.error(err)
    );
  }

  getConsultaMentorias() {
    var con = [];
    this.consultasDashboardServices.getMentoriasMes().subscribe(
      (res: any) => {
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
      },
      (err) => console.error(err)
    );
  }

  getUsuarios() {
    var est = 0;

    var con = [];
    this.registroUsuarioService.getUsuarios().subscribe(
      (res: any) => {
        console.log('los usuarios', res);
        for (let usu1 of res) {
          if (usu1.id_rol == 4) {
            est = est + 1;
            if (usu1.nivel_academico == 'secundaria') {
              this.NroEstBachillerato = this.NroEstBachillerato + 1;
            }
            if (usu1.nivel_academico == 'superior') {
              this.NroEstUniversidad = this.NroEstUniversidad + 1;
            }
          }
        }
        let options = {
          name: 'Estudiantes Bachillerato',
          value: this.NroEstBachillerato,
        };

        let options1 = {
          name: 'Estudiantes FICA',
          value: this.NroEstBachillerato,
        };
        con.push(options, options1);
        this.registroEst=con
        this.countEstudiantes = est;
        console.log('el resgistro', this.registroEst);
      },
      /*  res=> console.log(res), */
      (err) => console.error(err)
    );
  }
  getNroLikesPorCarrera() {
    var con = [];
    this.consultasDashboardServices.getNroEventoPorCarrera().subscribe(
      (res: any) => {
        for (let c of res) {
          if (c.id_carrera != 1) {
            const carrera = c.nombre_carrera;
            const nro = c.likes;
            let options = {
              name: carrera,
              value: nro,
            };

            con.push(options);
          }
        }
        this.eventosCarrera = con;
      },
      (err) => console.error(err)
    );
  }

  getEventos() {
    var likes = 0;
    this.registroEvento.getEventos().subscribe(
      (res: any) => {
        for (let usu1 of res) {
          if (usu1.id_tipo_evento == '1') {
            likes = likes + 1;
          }
        }
        this.countLikes = likes;
      },
      (err) => {
        console.log('no se puede obtener');
        this.alerts.showError('Error Operation', 'No se puede guardar');
      }
    );
  }
  getTotalMentorias() {
    var numMentorias = 0;
    this.registroMentoria.getMentoriasAgendadas().subscribe(
      (res: any) => {
        for (let usu1 of res) {
          numMentorias = res.length;
        }
        this.countMentoriaAgen = numMentorias;
      },
      (err) => {
        console.log('no se puede obtener');
        this.alerts.showError('Error Operation', 'No se puede guardar');
      }
    );
  }


  getNroLikesPorPerfil() {
    var con = [];
    this.consultasDashboardServices.getNroLikesPorPerfil().subscribe(
      (res: any) => {
        for (let c of res) {
          if (c.id_carrera != 1) {
            const perfil = c.nombre_perfil;
            const nro = c.likes;
            let options = {
              name: perfil,
              value: nro,
            };

            con.push(options);
          }
        }
        this.LikesPerfil = con;
        console.log("likes perfil",this.LikesPerfil)
      },
      (err) => console.error(err)
    );
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
