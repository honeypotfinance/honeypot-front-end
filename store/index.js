export const state = () => ({
  theme: "light",
  overlay: { opacity: 0.2, color: "black" },
  dataUser: {
    banner: undefined,
    avatar: undefined,
    accountId: undefined,
    username: undefined,
    email: undefined,
    discord: undefined,
    instagram: undefined,
    twitter: undefined,
    telegram: undefined,
    logged: false,
    tier: 2,
    balance: 0,
    dataSocial: [],
  },
});

export const mutations = {
  switchTheme(state, theme) {
    // theme
    state.theme = theme
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme;
    // overlay
    if (theme === "light") { state.overlay.opacity = 0.2; state.overlay.color = "white" }
    else { state.overlay.opacity = 0.5; state.overlay.color = "black" }
  },
  setData(state, data) {
    // if (wallet.isSignedIn() && typeof data === 'string') {
    //   state.dataUser.avatar = require('~/assets/sources/images/avatar.png');
    //   state.dataUser.accountId = data;
    //   state.dataUser.logged = true;
    // };
  },
  signIn(state, data = "0x39283....9302") {
    try {
      // console.log("make login")
    // catch error
    } catch (error) {
      this.$alert("cancel", {desc: error.message})
      console.error(error);
    }
    // wallet.requestSignIn(
    //   'contract.globaldv.testnet'
    // );
    if (/0+x/.test(data))
      state.dataUser.accountId = data.limitString(7) + data.substring(data.length - 4, data.length);
    state.dataUser.logged = true;
  },
  signOut(state) {
    // wallet.signOut();
    state.dataUser.logged = false;
    this.$router.push(this.localePath('/'));
  },
};

export const actions = {
  // getData({commit}) {
  // },
};

export const getters = {
  pagination: () => ({items, currentPage, itemsPerPage, search, filterA, filterB}) => {
    // filters
    let filters = items;
    // search
    if (search) filters = filters.filter(data => data.name.includes(search))

    return filters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  },
  filters: () => ({items, search, filterA, filterB}) => {
    // filters
    let filters = items;
    // search
    if (search) filters = filters.filter(data => data.name.includes(search))

    return filters
  }
};

export const modules = {
};
