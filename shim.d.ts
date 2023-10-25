//  RouteMeta` w/ custom properties, like `requiredAuth`
declare module 'vue-router' {
  interface RouteMeta extends RouteMeta {
    requiredAuth?: boolean
  }
}
