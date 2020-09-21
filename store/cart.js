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

    commit('setCarts', res.data);
  },
  async addtoCart({ commit }, product) {
    const data = {
      product_id: product.id,
      qty: product.qty,
    };

    commit('setLoading', true);
    await this.$axios.$post(`${this.$config.apiPath}/api/${
      this.$config.customPath}/cart`, { data });
    commit('setLoading', false);
  },
  async removeCartItem({ commit }, id) {
    commit('setLoading', true);
    await this.$axios.$delete(`${this.$config.apiPath}/api/${
      this.$config.customPath}/cart/${id}`);
    commit('setLoading', false);
  },
};
