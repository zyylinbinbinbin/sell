const mutations = {
  changeunscrambleId(state, val) {
    state.unscrambleId = val
  },
  increment (state) {
    state.count++
},
  changedoubtId(state, val) {
    state.doubtId = val
  },
  changeNextInfo(state, val) {
    state.nextInfo = val
  },

  changeProjectId(state, val) {
    state.projectId = val;
  },

  changeMenuId(state, val) {
    state.menuId = val;
  },

  changeMenuPath(state, val) {
    state.path = val;
  },

  changeMenuNavId(state, val) {
    state.navId = val;
  },

  changeMenuTitle(state, val) {
    state.menuTitle = val;
  },

  changeMenu(state, val) {
    state.menu = val;
  },

  changeProjectName(state, val) {
    state.projectName = val;
  },

  changeSpecialistOptions(state, val) {
    state.specialistOptions = val;
  },

  changeUserInfo(state, val) {
    state.userInfo = val;
  },

  changeUserRoles(state, val) {
    state.roles = val;
  },

};

export default mutations;
