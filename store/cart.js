export const state = () => ({
  carts: [],
  total: null,
  finalTotal: null,
  isLoading: false,
});

export const mutations = {
  setCarts(state, carts) {
    state.carts = carts.carts;
    state.total = carts.total;
    state.finalTotal = carts.final_total;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

export const actions = {
  async getCarts({ commit }) {
    const res = await this.$axios.$get(`${this.$config.apiPath}/api/${
      this.$config.customPath}/cart`);
    // console.log(res.data);
    commit('setCarts', res.data);
  },
  async addtoCart({ commit }, product) {
    const data = {
      product_id: product.id,
      qty: product.qty,
    };
    // console.log(data);
    commit('setLoading', true);
    await this.$axios.$post(`${this.$config.apiPath}/api/${
      this.$config.customPath}/cart`, { data });
    commit('setLoading', false);
    // console.log(res);
  },
  async removeCartItem({ commit }, id) {
    commit('setLoading', true);
    await this.$axios.$delete(`${this.$config.apiPath}/api/${
      this.$config.customPath}/cart/${id}`);
    commit('setLoading', false);
  },
};
