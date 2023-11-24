// plugins/toast.js
import { createVNode, render } from 'vue'
import UIToast from '~/components/UIToast.vue'

type ToastType = 'info' | 'success' | 'error'
interface Props {
  message?: string
  duration?: number
  type?: ToastType
}
export default defineNuxtPlugin((_) => {
  const toast = (props: Props) => {
    const container = document.createElement('div')
    const vm = createVNode(UIToast, { ...props })
    render(vm, container)
    document.body.appendChild(container)
    // 清理节点，防止内存泄漏
    setTimeout(() => {
      document.body.removeChild(container)
    }, props.duration || 2000)
  }
  return {
    provide: {
      toast,
    },
  }
})
