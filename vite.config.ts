import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VantResolver} from "@vant/auto-import-resolver";
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    server:{
        proxy:{
            '/user-match/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/user-match\/api/, '')
            },
        }
    }
})
