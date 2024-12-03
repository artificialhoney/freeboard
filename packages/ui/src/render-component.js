import { createVNode, render } from "vue";

export default function renderComponent({ el, component, props }) {
  let vnode = createVNode(component, props);
  // vnode.appContext = { ...appContext }
  render(vnode, el);

  return {
    vnode,
    destroy: () => {
      // destroy vnode
      render(null, el);
      vnode = undefined;
    },
  };
}
