<style>
/* testowe */
form{
  z-index: 100000000000000;
  position: relative;
  left: 100px;
}
.root2{
  width:96%;
}
  .groups{
    display: flex;
    width: 100%;
  }
  .groupName{
    position: sticky;
    width: 30%;
    text-transform:uppercase;
  }
  .photo{
    width: 60%;
  }
  .members{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .member{
    max-width: 240px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
  }
  .deleteButton{
    margin-bottom: 50px;
  }
  .buttonEdit {
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0.7em 2em;
  
  /*    border: 3px solid #db3c36; */
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);

  color: #db3c36;
  text-decoration: none;
  transition: 0.3s ease all;
  z-index: 1;
}

.buttonEdit:before {
  transition: 0.5s all ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  bottom: 0;
  opacity: 0;
  content: 'EDYTUJ';
  background-color: #db3c36;
  z-index: 1;
}

.buttonEdit:hover, .buttonEdit:focus {
  color: white;
}

.buttonEdit:hover:before, .buttonEdit:focus:before {
  transition: 0.5s all ease;
  left: 0;
  right: 0;
  opacity: 1;
}

.buttonEdit:active {
  transform: scale(0.9);
}

.data{
  min-width: 170px;
  max-height: 150px;
  min-height: 140px;
}
.image{

  min-height: 160px;

}
.imageDiv{
  width: 100%;
}
</style>
<template>
  <div class="root2">
    <div v-for="(group, index) in sortedGroupedData" :key="index" class="groups">
      <h2 class="groupName">{{ group.group }}
        <button @click="deleteGroup(group.group)">Delete Group</button>
      </h2>
      <ul class="members">
        <li v-for="(member, idx) in group.members" :key="member.id" class="member " >
          <div @click="toggleMember(idx, group.group)" class="imageDiv">
            <div class="image button" @click="deleteMember(group.group, member.id)">
              <img :src="member.image" alt="User Image" v-if="member.image" class="photo"/>
            </div>  
            <div class="data buttonEdit" @click.stop="editMember(group.group, member.id)">
            <p>{{ member.firstName }} {{ member.lastName }}</p>
            <p>Nr. tel. :<br />{{ member.phoneNumber }}</p>
    </div>
 
    <div v-if="editingMember === member.id && editingGroup === group.group" class="editDiv">
      <!-- Formularz do edycji -->
      <form @submit.prevent="saveEdit(group.group, member.id)">
        <input v-model="editForm.firstName" placeholder="Imię">
        <input v-model="editForm.lastName" placeholder="Nazwisko">
        <input v-model="editForm.phoneNumber" placeholder="Nr. tel.">
        <input v-model="editForm.group" placeholder="Grupa">
        <button type="submit">Save</button>
        <button @click="cancelEdit">Cancel</button>


        <button class="btn">Button</button>


      </form>
    </div>z

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMember: null,
      editingMember: null,
      editingGroup: null,
      editForm: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        group: '',
        image: ''
      },
      editGroupForm: {
        groupName: ''
      }
    }
  },
  computed: {
    groupedData() {
      return this.$store.getters.groupedData;
    },
    sortedGroupedData() {
      return this.groupedData.map(group => {
        
        return {
          ...group,
          members: [...group.members].sort((a, b) => a.firstName.localeCompare(b.firstName))
        };
      });
    }
  },
  methods: {
    toggleMember(idx, group) {
      if (this.showMember === idx) {
        this.showMember = null;  // Jeśli kliknięty ponownie, ukryj tekst
      } else {
        this.showMember = idx;  // Pokaż tekst dla klikniętego elementu
      }
    },
    async deleteGroup(groupName) {
        if (confirm('Are you sure you want to save this thing into the database?')) {
          // Save it!
          console.log('Thing was saved to the database.');
        } 
        else {
          // Do nothing!
          return
        }
        await this.$store.dispatch('deleteGroup', groupName);
    },
    deleteMember(groupName, memberId) {
        console.log(memberId)
        if (confirm('Are you sure you want to save this thing into the database?')) {
          // Save it!
          console.log('Thing was saved to the database.');
        } 
        else {
          // Do nothing!
          return
        }
        this.$store.dispatch('deleteMember', { groupName, memberId });
    },
    editMember(groupName, memberId) {
      console.log(`Attempting to edit member with ID: ${memberId} in group: ${groupName}`);
  
      const group = this.groupedData.find(group => group.group === groupName);
      if (!group) {
        console.error('Group not found:', groupName);
        return;
      }

      const member = group.members.find(member => member.id === memberId);
      if (member) {
        this.editingGroup = groupName;
        this.editingMember = memberId;
        this.editForm = { ...member };
        console.log('Loaded member data for editing:', this.editForm);
      } 
      else {
        console.error('Member not found for editing with ID:', memberId);
      }
    },
    async saveEdit(groupName) {
      if (confirm('Are you sure you want to save this thing into the database?')) {
        // Save it!
        console.log('Thing was saved to the database.');
      } 
      else {
          // Do nothing!
        return
      }
      const memberId = this.editingMember; 
      const updatedMember = { ...this.editForm, id: memberId }; 
      if (updatedMember.group !== groupName) {
        await this.$store.dispatch('moveMemberToGroup', { oldGroupName: groupName, newGroupName: updatedMember.group, memberId, updatedMember });
      } 
      else {
        await this.$store.dispatch('editMember', { groupName, memberId, updatedMember });
      }
      this.cancelEdit();
    },
    cancelEdit() {
        this.editingMember = null;
        this.editingGroup = null;
        this.editForm = { firstName: '', lastName: '', phoneNumber: '', group: '' };
    }
  },
  created() {
    //console.log('Grouped Data in DisplayData:', this.groupedData);
  }
};
</script>

