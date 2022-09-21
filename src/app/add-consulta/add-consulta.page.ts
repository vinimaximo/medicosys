import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-consulta',
  templateUrl: './add-consulta.page.html',
  styleUrls: ['./add-consulta.page.scss'],
})
export class AddConsultaPage implements OnInit {
  consultas:any[]=[];
  constructor(
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private actionSheetCtrl:ActionSheetController,
    private router: Router
  ) {
    let consultaJson = localStorage.getItem('consulta');
    if(consultaJson != null){
      this.consultas = JSON.parse(consultaJson);
    }
   }
   async addConsulta(){
    const alerta = await this.alertCtrl.create({
      header:'O que você precisa fazer?',
      inputs:[
        {name:'txtnome', type:'text', placeholder:'Digite seu nome aqui!'},
        {name:'txthora', type:'time'},
        {name:'txtmedico', type:'text', placeholder:'Digite o Nome do Medico'},
   
        
      ],
      buttons:[
        {text:'cancelar',role:'cancel',cssClass:'light',handler:()=>{
          console.log('Você Cancelou')
        }},
        {text:'ok',handler:(form)=>{
          this.add(form);
        }}
      ]
    });
    alerta.present();
   }
   async add(nova:any){
    console.log(nova);
    if(nova.length < 1){
      const toast = await this.toastCtrl.create({
        message:'Informe os Seus dados e sintomas!',
        duration:2000,
        position:'middle',
        color:'warning'
      });
      toast.present();
    }else{
      let consultas = {nome:nova.txtnome,hora:nova.txthora,medico:nova.txtmedico, feito:false}
      this.consultas.push(consultas);
      //Armazenamento no celular...
      this.atualizaLocalStorage();
      const toast = await this.toastCtrl.create({
        message:'Consulta Inserida Com sucesso!',
        duration:2000,
        position:'middle',
        color:'success'
      });
      toast.present();
    }

  }

  ngOnInit() {
  }

  medicoSys(){
    this.router.navigate(['home']);
  }

  async abrirConsultas(consultas:any){
    const actsheet = await this.actionSheetCtrl.create({
      header:'Escolha uma ação',
      buttons:[
        {text:consultas.feito?'Desmarcar':'Marcar',icon:consultas.feito?'radio-button-off':'checkmark-circle', handler:()=>{
          consultas.feito=!consultas.feito;
          this.atualizaLocalStorage;
        }},
        {
          text:'Cancelar',
          icon:'close',
          role:'cancel',
          handler:()=>{}
        }
      ]
      
    });
    actsheet.present();
  }
  atualizaLocalStorage(){
  localStorage.setItem('consulta',JSON.stringify(this.consultas));
  }
  excluir(consulta){
    this.consultas = this.consultas.filter(res => consulta != res);
    this.atualizaLocalStorage();
  }
  verconsulta(consulta){
    console.log(consulta);
  }


  teste(){
    console.log('teste');
  }

}
