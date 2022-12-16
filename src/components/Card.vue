<template>
    <div>
        <div class="ui-card">
            <img :src="card.url" />
                <div class="ui-cover-meta">
                 <div class="flex mb">
                    <span class="text-red">
                        <a href="#" @click.prevent="copy(card.prompt)" class="text-red">Copy <CopyOutlined /></a>
                    </span>
                    <span>
                        <a href="#" @click.prevent="expand(card.url)" class="text-gray"><ExpandAltOutlined /></a>
                    </span>
                 </div>
                <p>{{card.prompt}}</p>
                <slot></slot>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import 'ant-design-vue/dist/antd.dark.css'; // or 'ant-design-vue/dist/antd.less'

import event from '../utils/props'
import { CopyOutlined, ExpandAltOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

export default{
    props:{
        card: Object
    },
    components:{
        CopyOutlined, ExpandAltOutlined
    },
    methods:{
       expand(url: any){
        event.$emit('expand', url)
       },
       copy(text: any){
        navigator.clipboard.writeText(text);
        message.success('Prompt copied to clipboard')
       }
    }
}
</script>
