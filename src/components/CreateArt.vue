
<script lang="ts">
import 'ant-design-vue/dist/antd.dark.css'; // or 'ant-design-vue/dist/antd.less'
import { PlusOutlined, InfoCircleOutlined, FireOutlined } from '@ant-design/icons-vue'
import { MenuItem, message } from 'ant-design-vue'
import PopUpsVue from './PopUps.vue'
import Card from './Card.vue'
import event from '../utils/props'
import { placeholder, popular, samples, makeBase64URL } from '../utils/helpers'


const value2:  number = 1


//@COMPONENT NOT WORKING? CHECK IF IT IS LOADED W/ client:load

export default {
    components: {
      PlusOutlined, InfoCircleOutlined, FireOutlined,
      PopUpsVue, Card, MenuItem
    },
    data(){
        return {
            checked: false, modal: false, popular,
            promptVal: '', sample: samples[1],
            placeholder, noi: 1, starting: true,
            loading: true, results: null,
            params: {
                engine: 'stable-diffusion-v1-5',
                cfgScale: 7, steps: 20
            }
        }
    },
    methods:{
        generate(){
            if(!this.promptVal || this.promptVal == ''){
                return message.error('Prompt fill can not be empty!')
            }
            this.loading = true
            let advanced = {}
            message.loading('Hang up while we generate your image...', 3.5)
            .then(() => message.info('Almost there....'))

            if(this.checked){
                advanced = this.params
            }

            let form = {...advanced, ... {
                prompt: this.promptVal,
                samples: this.noi,
                noStore: true,
            }}


            fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify(form)
            }).then(res => res.json()).then(res => {
                if(res.err) return message.error(`Something doesn't seem right... ${res.err}`)

                let sam = res.samples, artifacts = []
                if(sam && sam.length > 0){
                    sam.forEach(el => {
                        artifacts.push({
                            url: makeBase64URL(el.buffer.data),
                            prompt: form.prompt, dl: true
                        })
                    })
                    this.popModal('img', artifacts)
                    this.loading = false
                    this.results = artifacts
                    message.success('Operation completed!')
                }

            }).catch((err) => {
                message.error(`Something doesn't seem right... ${err}`)              
            })
        },
        popModal(g: any, imgs: []){
            event.$emit('modal', {
                s: true, d: this.promptVal,
                genre: g, img: imgs
             })
        },
        appendTag(i: any){
            this.promptVal += `${i} `
        }
    },
    mounted(){
        event.$on('insert-val', (val: any) => {
            this.appendTag(val)
        })
        event.$on('processor', (val: any) => {
            this.promptVal = val
            this.generate()
        })
        this.loading = false

        setTimeout(() => {
            this.starting = false
        }, 1000);
    }
}





</script>


<template>
    <div>
        <div class="create-art">
            <h1 class="ui-header">Flow State AI</h1>
            <div class="ui-form">
                <label>Write a prompt</label>
                <a-textarea v-model:value="promptVal" :placeholder="placeholder" :auto-size="{ minRows: 2, maxRows: 3 }"/>

                <a-button type="dashed" :disabled="results == null" class="mt-5" shape="round" size="small" @click.prevent="popModal('img', results)"> Show recent <FireOutlined /></a-button>
                <a-button type="dashed" class="ml" size="small" shape="round" @click="popModal('mod', [])">
                    <template #icon><PlusOutlined /></template> Design prompts
                </a-button>
            </div>

             <a-skeleton :loading="starting" active>
                <div class="ui-form">
                 <Card :card="sample">
                    <a-button @click="popModal('img', [])" :loading="loading" type="dashed" block>See samples</a-button>
                </Card>
              </div>
             </a-skeleton>

           

              <div class="ui-form">
                <label for="">Number of images</label>
                <p>Select the number of images you would like to generate</p>
                <div class="flex btn-group">
                    <div><a-button size="large" :type="noi == 1 ? 'primary': 'default'" @click="noi = 1">1</a-button></div>
                    <div><a-button size="large" :type="noi == 2 ? 'primary': 'default'" @click="noi = 2">2</a-button></div>
                    <div><a-button size="large" :type="noi == 3 ? 'primary': 'default'" @click="noi = 3">3</a-button></div>
                    <div><a-button size="large" :type="noi == 4 ? 'primary': 'default'" @click="noi = 4">4</a-button></div>
                </div>
              </div>


              <div class="tog-advance">
                <div class="flex">
                    <div>
                        <a-button type="dashed" shape="round" @click="popModal('mod', [])">
                            <template #icon><PlusOutlined /></template> Design prompts
                        </a-button>
                    </div>
                  <div class="grid">
                     <span>Advanced settings</span>
                    <span><a-switch v-model:checked="checked" checked-children="ON" un-checked-children="OFF" /></span>
                   </div>
                </div>
               </div>

              <div class="advanced-setting" v-if="checked">
                <div class="grid g2">
                 <div class="ui-form">
                    <a-tooltip color="#1e293b" title="Lower numbers give the AI more freedom to be creative, while higher numbers forces it to stick to your prompt">
                        <label>Prompt Guidance <InfoCircleOutlined /></label>
                    </a-tooltip>
                    <div class="ui-slide">
                        <a-slider size="large" :min="5" :max="15" v-model:value="params.cfgScale"  />
                    </div>
                  </div>
                  <div class="ui-form">
                    <a-tooltip color="#1e293b" title="More steps will result in a high quality image but will take longer">
                        <label>Quality & details <InfoCircleOutlined /></label>
                    </a-tooltip>
                    <div class="ui-slide">
                        <a-slider size="large" :min="10" :max="150" v-model:value="params.steps"  />
                    </div>
                  </div>
                </div>
                    <div class="ui-form">
                        <label for="">Model</label>
                        <p>Different AI models can produce different or better results so feel free to experiment.</p>
                        <a-select size="large" style="width: 100%" v-model:value="params.engine">
                            <a-select-option value="stable-diffusion-v1">Stable Diffusion 1.0</a-select-option>
                            <a-select-option value="stable-diffusion-v1-5">Stable Diffusion 1.5</a-select-option>
                        </a-select>
                    </div>
              </div>

              <div class="ui-form">
                <a-button size="large" :loading="loading" @click="generate" type="primary" shape="round" block>Generate image</a-button>
              </div>
          </div>


        <PopUpsVue />
    </div>
</template>


<style lang="scss">
@import '../styles/globe.scss';

body{
    background: #090b16 !important;
}

.main-panel{
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 0;
}

.flex{
    display: flex;
    justify-content: space-between;
}
.width-2{
    width: 50%;
}
.width-2-3{
    width: 70%;
}




.ui-card{
    position: relative;
    border-radius: 8px;
    max-width: 300px;
    position: relative;
    img{
        width: 100%;
        border-radius: 10px;
    }
    p, span{
        font-size: .8rem;
    }
  
    .ui-cover-meta{
        position: absolute;
        bottom: 10px;
        background: $bg;
        width: 95%;
        left: 50%; transform: translateX(-50%);
        padding: 10px;
        border-radius: 10px;
        opacity: 0;
        p{
            color: $text;
            font-size: .8rem;
        }
    }
    &:hover{
        .ui-cover-meta{
	        animation: fade-in-bottom 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
            
        }
    }
}


.create-art{
    max-width: 500px;
    margin: 0 auto;
    padding: 40px 0;
}

textarea{
    border-radius: 8px !important;
}

.ant-btn-lg{
    height: 50px !important;
    font-size: 18px !important;
}

.ui-form{
    margin: 30px 0;
    label:not(.l-radio){
        display: block;
        margin-bottom: 5px;
        font-size: 1rem;
    }
    p{
        color: $gray-two;
    }
}

.ui-header{
    font-size: 2rem;
}


@keyframes fade-in-bottom {
  0% {
    transform: translateY(50px) translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
}

.btn-group{
    justify-content: space-between;
    max-width: 300px;
    button{
        padding: 0 20px;
        border-radius: 10px;
    }
}

.hide{
    display: none;
}
.tog-advance{
    border-top: 1px solid rgba(30,41,59,.5);
    padding: 20px 0;
    .flex{
        justify-content: space-between;
        .grid{
            grid-template-columns: auto 60px;
        }
    }
}



.ui-slide{
    padding: 10px;
    border: 1px solid rgba(30,41,59,.5); // #434343;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    border-radius: 8px;
}

    

//@helpers
.mr-5{
    margin-right: 20px;
}
.mt-5{margin-top: 10px;}
.grid{
    display: grid;
    grid-gap: 10px;
}
.g2{grid-template-columns: repeat(2, 1fr);}

.r-float{
    float: right;
}
</style>