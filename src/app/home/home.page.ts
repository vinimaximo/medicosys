import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  agenda:any[]=[];

  constructor(
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private actionSheetCtrl:ActionSheetController,
    private router: Router
  ) {
    //Carregando tarefas a partir do localstorage
    let agendaJson = localStorage.getItem('agendaSys');
    if(agendaJson != null){
      this.agenda = JSON.parse(agendaJson);
    }
  }


   Consultas(){
    this.router.navigate(['add-consulta']);
  }
  
  
  async addMedico(){
    const alerta = await this.alertCtrl.create({
      header:'Adicionar um Médico',
      inputs:[
        {name:'txtnome',type:'text',placeholder:'Digite aqui...'},
        {name:'txtfuncao',type:'text',placeholder:'Função...'},
        
      
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
    if(nova.length < 1){
      const toast = await this.toastCtrl.create({
        message:'Informe dos Dados do Medico',
        duration:2000,
        position:'middle',
        color:'warning'
      });
      toast.present();
    }else{
      let agenda = {nome:nova.txtnome,funcao:nova.txtfuncao, feito:false}
      this.agenda.push(agenda);
      //Armazenamento no celular...
      this.atualizaLocalStorage();
      const toast = await this.toastCtrl.create({
        message:'Medico inserido com Sucesso!',
        duration:2000,
        position:'middle',
        color:'success'
      });
      toast.present();
    }

  }
  excluir(agendas:any){
    this.agenda = this.agenda.filter(res => agendas != res);
    this.atualizaLocalStorage();
  }
  atualizaLocalStorage(){
    localStorage.setItem('agendaSys',JSON.stringify(this.agenda));
  }

}
