import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果使用模板方式进行开发，可以使用 unplugin-vue-components 插件来按需自动加载组件。
// 插件会自动解析模板中的使用到的组件，并导入组件。
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'

//获取当前索引路径'D:/WebDevelopment/project/code/ewshopadmin/src'
function pathResolve(dir:string){
  return resolve(process.cwd(),'.',dir)
}
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  //配置索引别名
  resolve:{
    alias:[
      {
        find:'@',//寻找的路径
        replacement:pathResolve('src')

      }

    ]
  },
  //配置端口
  server:{
    host:'localhost',
    port:8000
  }

})
