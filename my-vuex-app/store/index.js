import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
    data: []
});

export const mutations = {
    setData(state, data) {
        state.data = data;

    },
    addData(state, newData) {
        newData.id = uuidv4();  // Generowanie unikalnego ID dla nowego członka
        const group = state.data.find(group => group.group === newData.group);

        if (group) {
            group.members.push(newData);
        } else {
            state.data.push({
                group: newData.group,
                members: [newData]
            });

        }
        console.log(group)

    },
    deleteGroup(state, groupName) {
        state.data = state.data.filter(group => group.group !== groupName);
    },
    deleteMember(state, { groupName, memberId }) {
        const group = state.data.find(group => group.group === groupName);
        if (group) {
            const memberIndex = group.members.findIndex(member => member.id === memberId);
            if (memberIndex !== -1) {
                group.members.splice(memberIndex, 1);
                if (group.members.length === 0) {
                    state.data = state.data.filter(g => g.group !== groupName);
                }
            } else {
                console.error('Member not found');
            }
        }
    },


    editMember(state, { groupName, memberId, updatedMember }) {
        console.log(`Vuex: Editing member with ID: ${memberId} in group: ${groupName}`);

        const group = state.data.find(group => group.group === groupName);
        if (!group) {
            console.error('Group not found in Vuex:', groupName);
            return;
        }

        const memberIndex = group.members.findIndex(member => member.id === memberId);
        if (memberIndex !== -1) {
            console.log('Vuex: Member found, updating...');
            group.members.splice(memberIndex, 1, { ...updatedMember, id: memberId });
        } else {
            console.error('Vuex: Member not found for editing with ID:', memberId);
        }
    }
    ,
    moveMemberToGroup(state, { oldGroupName, newGroupName, memberId, updatedMember, image }) {
        const oldGroup = state.data.find(group => group.group === oldGroupName);
        const newGroup = state.data.find(group => group.group === newGroupName);

        if (oldGroup && newGroup) {
            const memberIndex = oldGroup.members.findIndex(member => member.id === memberId);
            if (memberIndex !== -1) {
                const [member] = oldGroup.members.splice(memberIndex, 1);
                newGroup.members.push({ ...member, ...updatedMember });
                if (oldGroup.members.length === 0) {
                    state.data = state.data.filter(g => g.group !== oldGroupName);
                }
            }
        } else if (oldGroup) {
            const memberIndex = oldGroup.members.findIndex(member => member.id === memberId);
            if (memberIndex !== -1) {
                const [member] = oldGroup.members.splice(memberIndex, 1);
                state.data.push({ group: newGroupName, members: [updatedMember || member] });
            }
        }
    },

    editGroupName(state, { oldGroupName, newGroupName }) {
        const group = state.data.find(group => group.group === oldGroupName);
        if (group) {
            group.group = newGroupName;
        }
    }
};

export const actions = {
    async fetchData({ commit }) {
        try {
            const response = await axios.get('/api/data');
            commit('setData', response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    },
    async saveData({ state }) {
        try {
            await axios.post('/api/data', state.data);
        } catch (error) {
            console.error('Failed to save data', error);
        }
    },
    async addData({ commit, dispatch }, newData) {
        commit('addData', newData);
        await dispatch('saveData');
    },
    async deleteGroup({ commit, dispatch }, groupName) {
        commit('deleteGroup', groupName);
        await dispatch('saveData');
    },
    async deleteMember({ commit, dispatch }, payload) {
        commit('deleteMember', payload);
        await dispatch('saveData');
    },
    async editMember({ commit, dispatch }, payload) {
        commit('editMember', payload);
        await dispatch('saveData');
    },
    async moveMemberToGroup({ commit, dispatch }, payload) {
        commit('moveMemberToGroup', payload);
        await dispatch('saveData');
    },
    async editGroupName({ commit, dispatch }, payload) {
        commit('editGroupName', payload);
        await dispatch('saveData');
    }
};

export const getters = {
    groupedData: (state) => state.data
};
