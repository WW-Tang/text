import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sex: "男",
    bookrack: []
  },
  getters: {
    getBookById: (state) => (id) => {
      return state.bookrack.find(book => book.id === id)
    }
  },
  mutations: {
    setSex(state, newStr) {
      state.sex = newStr;
    },
    addBookrack(state, newBook) {
      state.bookrack.push(newBook);
    },
    deleteBook(state, id) {
      for (let i = 0; i < state.bookrack.length; i++) {
        if (state.bookrack[i].id === id) {
          state.bookrack.splice(i, 1);
        }
      }
    },
    setBook(state, {id, key, value}){
      for (let i = 0; i < state.bookrack.length; i++) {
        if (state.bookrack[i].id === id) {
          state.bookrack[i][key] = value;
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
