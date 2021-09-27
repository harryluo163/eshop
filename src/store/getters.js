const getters = {
    name: state => state.user.name,
    roles: state => state.user.roles,
    categorylist: state => state.product.categorylist,
    productlist: state => state.product.productlist,
}
export default getters