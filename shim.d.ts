//  RouteMeta` w/ cusotm properties, like `requiredAuth`
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {
    requiredAuth?: boolean
  }
}
