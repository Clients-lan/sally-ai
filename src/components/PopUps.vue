

<script lang="ts">
import 'ant-design-vue/dist/antd.dark.css'; // or 'ant-design-vue/dist/antd.less'

import event from '../utils/props'
import { TabPane, message } from 'ant-design-vue'

import { placeholder, samples, modifiers } from '../utils/helpers'
import Card from './Card.vue'

export default {
    components:{
        Card, TabPane, 
    },
   data(){
    return {
        visible: false, tryPrompts: false,
        prompt:  null, images: samples,
        placeholder, activeKey: modifiers[0].name,
        loading: false, modifiers, isResult: false,
        expand: {sh: false, url: null},
    }
   },
   methods:{
    useDl(i: any){
        let a = document.createElement("a"); 
        a.href = i
        a.download = "artwork.png"; //File name Here
        a.click(); 
        
    },
    sendVal(i: any){
        event.$emit('insert-val', i)
        this.prompt += `${i} `
    },
    useSample(i: any){
        this.prompt = i
        this.loading  = true
        event.$emit('processor', i)
        setTimeout(() => this.visible = false, 1000);
    }
   },
   mounted(){
    event.$on('modal', (data: any) => {
        this.isResult = data.img.length > 0 ? true : false
        this.tryPrompts = data.genre == 'img' ? true : false
        this.visible = data.s 
        this.prompt = data.d
        this.loading = false
        this.images = data.img.length > 0 ? data.img : samples
    })
     event.$on('expand', (data: any) => {
        if(!this.visible) return message.warn('Open then modal to expand image! Hint: Click See samples')
        this.expand = { sh: true, url: data }
      })
   }
}
</script>




<template>
    <div>
        <a-modal v-model:visible="visible" width="700px" style="top:10px;" :title="tryPrompts ? 'Discovery': 'Add modifiers'">
            <template #footer>
                <a-button key="submit" @click="visible = false" type="dashed" shape="round">DONE</a-button>
            </template>
             <div class="ui-modal">
                <div class="ui-form mt-5" v-if="!tryPrompts">
                   <a-textarea v-model:value="prompt" :placeholder="placeholder" :auto-size="{ minRows: 2, maxRows: 2 }"/>
                </div>

                <div  v-if="expand.sh" class="expanded">
                    <img :src="expand.url">
                     <a-button type="danger" block @click="expand.sh = false">Undo</a-button>
                </div>

                <div class="container" v-if="tryPrompts && !expand.sh">
                    <div v-for="(item, index) in images" :key="index" class="gallery">
                        <Card :card="item">
                            <a-button v-if="item.dl" type="dashed" @click="useDl(item.url)"  block>Download image</a-button>
                            <a-button v-else :loading="loading" type="dashed" @click="useSample(item.prompt)"  block>Try this prompt</a-button>
                        </Card>
                    </div>
                </div>
                <div v-if="!tryPrompts">
                    <a-tabs v-model:activeKey="activeKey">
                        <a-tab-pane v-for="mod in modifiers" :key="mod.name" :tab="mod.name">
                            <a-tag v-for="(item, index) in mod.words" class="mb" color="#333c47" :key="index">
                               <a href="#" style="color: #c5cdd3;" @click.prevent="sendVal(mod.name == 'Negative Prompts' ? `no ${item}` : item)">{{item}}</a>
                            </a-tag>
                        </a-tab-pane>
                    </a-tabs>
                </div>
             </div>
    </a-modal>
    </div>
</template>


<style lang="scss">
@import '../styles/globe.scss';





.container {
  column-count: 2;
  column-gap: 10px;

  .gallery{
    margin-bottom: 30px;
    break-inside: avoid;
  }
}

.expanded{
   img{
    width: 100%;
   }
}








</style>