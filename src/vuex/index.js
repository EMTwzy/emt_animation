import { createStore } from "vuex";

export default createStore({
    namespaced: true,
    state: {
        // 在这里定义你的 state 变量  
        input: '',          //输入框中输入的内容

    },

    mutations: {
        // 在这里定义你的 mutations 函数  
        setInput(state, newValue) {
            state.input = newValue;
        },
        // 其他 mutations 函数...  
    },

    actions: {
        // 推荐在 action 中进行异步操作，然后再调用 mutation
        async setInput({ commit }, newValue) {
            // 可以在这里进行一些异步的操作，比如 API 请求
            // 然后再调用 mutation 来更新 state
            commit('setInput', newValue);
        },
    },
})