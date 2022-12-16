import type { App } from 'vue'
import 'ant-design-vue/dist/antd.dark.css'; // or 'ant-design-vue/dist/antd.less'
import '../styles/globe.scss'

import { Button, Input, Card, Slider, Switch, Tooltip, Menu, Tag, Modal, Tabs, Select, SelectOption } from 'ant-design-vue'

export default (app: App) => {
     app.use(Button), app.use(Input),
     app.use(Card), app.use(Slider),
     app.use(Switch), app.use(Tooltip),
     app.use(Select), app.use(Menu),
     app.use(Tag), app.use(Modal),
     app.use(Tabs), app.use(SelectOption)
    //  app.use(MenuItem)
    
}

// export { supabase }