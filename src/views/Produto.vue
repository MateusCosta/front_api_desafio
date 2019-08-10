<template>
  <div id="admin">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>  
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-flex xs10 sm10>
                <v-toolbar card dense color="transparent">
                  <v-toolbar-title class="hidden-sm-and-down">
                    <h4>{{ formTitle }}</h4>
                  </v-toolbar-title>
                  
                </v-toolbar>
              </v-flex>
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Pesquisar"
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>     
               <v-dialog v-model="dialog" persistent max-height="600px" max-width="1000px">
              <v-btn slot="activator" depressed outline icon fab dark color="primary" small>
                <v-icon>add</v-icon>
              </v-btn>
              <v-card>
                <v-card-title>
                  <v-layout row wrap class="dark--text">
                    <v-flex xs10 sm10>
                      <v-toolbar card dense color="transparent">
                        <v-toolbar-title>
                          <h4> {{ formTitle }}</h4>
                        </v-toolbar-title>
                      </v-toolbar>
                    </v-flex>
                    <v-flex xs2 sm2>
                      <v-switch v-model="switch1" label="Ativo" color="primary"></v-switch>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                  <v-container grid-list-md>
                    <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                    >
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-text-field
                            v-model="entidade.descricao"
                            label="Descrição"
                            hint="Descrição reduzida do produto"
                            persistent-hint
                            :rules="descricaoRule"
                            :counter="30"
                            required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3>
                          <v-text-field
                            v-model="entidade.preco"
                            label="Preço"
                            hint="Preço de venda"
                            :mask="maskPreco"
                            :counter="6"
                            persistent-hint
                            :rules="precoRule" 
                            required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3>
                          <v-text-field
                            v-model="entidade.quantidade"
                            label="Quantidade"
                            hint="Quantidade em estoque"
                            :mask="maskQuantidade"
                            :counter="9"
                            persistent-hint
                            :rules="quantidadeRule"
                            required>
                          </v-text-field>
                        </v-flex>
                        <v-flex xs4 mt-3>
                          <v-card raised ripple flat>
                              <v-flex xs12>
                                <div id="upload">
                                  <vue-dropzone 
                                    ref="dropzone"
                                    id="drop1"
                                    required
                                    :include-styling="true"
                                    :options="dropOptions"
                                    v-on:vdropzone-sending="sendingEvent"
                                    >
                                  </vue-dropzone>
                                </div>
                              </v-flex>
                          </v-card>
                        </v-flex>
                        <v-flex xs4 md8 row wrap>
                          <v-layout row wrap>  
                          <v-flex xs12 sm4 pl-3>
                          <v-select
                            v-model="entidade.idMarca"
                            label="Marca"
                            hint="Marca"
                            persistent-hint=""
                            @change="loadItensTipo"
                            :disabled="disabledMarca"
                            :items="itensMarca"
                            item-text="descricao"
                            item-value="id"
                            :rules="selectRule"
                            chips
                            required>
                          </v-select>
                        </v-flex>
                        <v-flex xs4 sm4 pl-3>
                          <v-select
                            v-model="entidade.idTipo"
                            label="Tipo"
                            hint="Tipo"
                            persistent-hint=""
                            @change="loadItensSabor"
                            :disabled="disabledTipo"
                            :items="itensTipo"
                            item-text="descricao"
                            item-value="id"
                            :rules="selectRule"
                            chips
                            required>
                          </v-select>
                        </v-flex>
                          <v-flex xs4 sm4 pl-3>
                          <v-select
                            v-model="entidade.idSabor"
                            label="Sabor"
                            hint="Sabor"
                            persistent-hint=""
                            @change="loadItensUnidade"
                            :disabled="disabledSabor"
                            :items="itensSabor"
                            item-text="descricao"
                            item-value="id"
                            :rules="selectRule"
                            chips
                            required>
                          </v-select>
                          </v-flex>
                          <v-flex xs12 sm4 pl-3>
                          <v-select
                            v-model="entidade.idUnidade"
                            label="Unidade"
                            hint="Unidade"
                            persistent-hint=""
                            :items="itensUnidade"
                            :disabled="disabledUnidade"
                            item-text="descricao"
                            item-value="id"
                            :rules="selectRule"
                            chips
                            required>
                          </v-select>
                        </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal darken-2" flat @click="close">Cancelar</v-btn>
                  <v-btn slot="activator" color="teal darken-2" flat :disabled="!valid" @click="submit">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>        
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
          <v-data-table
              
          :headers="headers"
          :items="items"
          :search="search"
          :rows-per-page-items="[5,10,25,{text:'Todos','value':-1}]"
          rows-per-page-text="resultados por página"
          no-data-text="nenhum resultado encontrado"
          >
      
          <template  slot="items" slot-scope="props">
          <td align="center">{{props.item.id}}</td>
          <td align="center">{{props.item.descricao}}</td>
          <td align="center">{{props.item.marca }}</td>
          <td align="center">{{props.item.tipo}}</td>
          <td align="center">{{props.item.sabor}}</td>
          <td align="center">{{props.item.unidade}}</td>
          <td align="center">{{props.item.preco}}</td>
          <td align="center">{{props.item.quantidade}}</td>
          <td align="center">{{props.item.ativo ? 'Ativo' : 'Inativo'}}</td>
         <td align="center">
                    <v-btn depressed small outline icon fab dark color="primary" small @click="edit(props.item)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed small outline icon fab dark color="pink" small @click="del(props.item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
          </template>
          <v-alert slot="no-results" value="true" color="primary" icon="warning">
            O resultado "{{ search }}" não foi encontrado.
          </v-alert>
          </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>  
      </v-layout>
        <v-snackbar bottom right color="success" v-model="snackbarsuccess">{{ textsuccess }}<v-btn dark flat @click.native="snackbarsuccess = false" icon><v-icon>close</v-icon></v-btn></v-snackbar>
        <v-snackbar bottom right color="warning" v-model="snackbarerror">{{ texterror }}<v-btn dark flat @click.native="snackbarerror = false" icon><v-icon>close</v-icon></v-btn></v-snackbar>
        <v-snackbar bottom right color="success" v-model="snackbardel">{{ textdel }}<v-btn dark flat @click.native="snackbardel = false" icon><v-icon>close</v-icon></v-btn></v-snackbar>
    </v-container>
  </div>
</template>
<script>
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
const api = require('../common/api').produtos
const apiMarca = require('../common/api').marcas
const apiTipo = require('../common/api').tipos
const apiSabor = require('../common/api').sabores
const apiUnidade = require('../common/api').unidades

export default {
  name: 'Produto',
  data: () => ({
               pagination: {
        sortBy: 'name'
      },
      selected: [],
    maskPreco: 'R$: ###,##',
    maskQuantidade: '#######',
      date: '',
      menu: false,
      modal: false,
      menu2: false,
      idCliente: '',
      disabledMarca: false,
      disabledTipo: true,
      disabledSabor: true,
      disabledUnidade: true,

        dropOptions: {
      url: "http://localhost:3000/produtos/upload/",
      method: "post",
      maxFilesize: 1, // MB
      maxFiles: 1,
      chunking: false,
      chunkSize: 1000, // Bytes
      createImageThumbnails: true,
      renameFile: function(file) {
        let newName = file.name
        newName = newName.toLowerCase();                                                         
        newName = newName.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        newName = newName.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        newName = newName.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        newName = newName.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        newName = newName.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        newName = newName.replace(new RegExp('[Ç]','gi'), 'c');
        newName = newName.replace(/\s/gi, "_");

        return newName;
      },
      autoProcessQueue: true,
      paramName: "file",
      addRemoveLinks: true,
      acceptedFiles: "image/*",
      dictDefaultMessage:
        "<i class='fa fa-cloud-upload fa-5x'></i><br><span>Escolha uma imagem para o produto</span>"
    
    },

    snackbarsuccess: false,
    snackbarerror: false,
    snackbardel: false,
    dialog: false,
    switch1: true,
    textsuccess: 'Informação salva com sucesso !',
    texterror: 'Informação incorreta, verifique !',
    textdel: 'Informação deletada com sucesso !',
    search: null,
    items: [],
    itensMarca: [],
    itensTipo: [],
    itensSabor: [],
    itensUnidade: [],
    valid: false,
    entidade: {},
    editedIndex: -1,
    descricaoRule: [
      v => !!v || 'preencha esse campo',
      v => (v && v.length <= 30) || 'preencher com até 30 caracteres'
    ],
    precoRule: [
      v => !!v || 'informe o preço de venda',
      v => (v && v.length <= 6) || 'preço inválido'
    ],
    quantidadeRule: [
      v => !!v || 'informe a quantidade em estoque',
      v => (v && v.length <= 11) || 'telefone inválido'
    ],
    selectRule: [
      v => !!v || 'selecione uma opção'
    ],
    
    headers: [
      {text: 'Id', align: 'center', value: 'id'},
      {text: 'Descrição', align: 'center', value: 'descricao'},
      {text: 'Marca', align: 'center', value: 'entidade.marca'},
      {text: 'Tipo', align: 'center', value: 'entidade.tipo'},
      {text: 'Sabor', align: 'center', value: 'entidade.sabor'},
      {text: 'Unidade', align: 'center', value: 'entidade.unidade'},
      {text: 'Preço', align: 'center', value: 'entidade.preco'},
      {text: 'Quantidade', align: 'center', value: 'entidade.quantidade'},
      {text: 'Ativo', align: 'center', value: 'entidade.ativo'},
      {text: 'Ação', align: 'center', sortable: 'false', value: 'acao'}
    ]
  }),

   
  created: function () {
    this.list()
    this.loadItensMarca()
  },

  computed: {
    formTitle () {
      return (this.editedIndex === -1 ? 'Cadastrar' : 'Editar') + ' Produto'
    },

  },

  methods: {

      vsuccess(file, response) {
      this.success = true;
      this.entidade.imagemProduto = ret.data.mensagem;
    },
    sendingEvent(file, xhr, formData) {
      formData.append("paramName", "multipart/form-data");
      this.entidade.imagemProduto =
        "http://localhost:3000/produtos/upload/" +  
        file.name.replace(/\s/gi, "_");
    },

      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },

    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
    },

    loadItensMarca () {
      apiMarca.list().then(ret => {
        this.itensMarca = ret.data
      })
    },

    loadItensTipo () {
      apiTipo.list().then(ret => {
        this.itensTipo = ret.data
        this.disabledTipo = false
        this.itensSabor = ''
        this.disabledSabor = true
      })

    },
    
    loadItensSabor () {
      apiSabor.list().then(ret => {
        this.itensSabor = ret.data
        this.disabledSabor = false
        this.itensUnidade = ''
        this.disabledUnidade = true
      })
    },

    loadItensUnidade () {
      apiUnidade.list().then(ret => {
        this.itensUnidade = ret.data
        this.disabledUnidade = false
      })
    },

    list () {
      api.list().then(ret => {
        this.items = ret.data
        this.initEntidade()
      })
    },

    toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },

    submit () {
      if (this.$refs.form.validate()) {
        this.entidade.ativo = this.switch1;
        api.save(this.entidade)
        .then(
          ret => {
            this.list()
            this.snackbarsuccess = true
            this.close()
            this.initEntidade()
          }
        ).catch(
          (erro) => {
            this.snackbarerror = true
          }
        )
      } else {
        this.snackbarerror = true
      }
    },

    edit (item) {
      this.entidade = Object.assign({}, item)
      this.editedIndex = this.entidade
      console.log(item)
      this.loadItensMarca()
      this.loadItensTipo()
      this.loadItensSabor()
      this.loadItensUnidade()

      this.disabledMarca = false
      this.disabledTipo = false
      this.disabledSabor = false
      this.disabledUnidade = false
      
      this.entidade.idMarca = item.idMarca
      this.entidade.idTipo = item.idTipo
      this.entidade.idSabor = item.idSabor
      this.entidade.idUnidade = item.idUnidade
      
      this.dialog = true
    },

    del (item) {
      let inf = confirm('Tem certeza que deseja excluir esse item?')
      if (inf === true) {
        api.del(item.id).then(ret => this.list())
        this.close()
        this.snackbardel = true
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.initEntidade()
        this.editedIndex = -1
        this.$refs.form.reset()
        this.$refs.dropzone.removeAllFiles();
   	   }, 300)
    },

    initEntidade () {
      this.isEdicao = false
      this.entidade = {
       
      }
    }

  },

    components: {
    vueDropzone
  },
}
</script>