<style>
body{
  font-family: Arial, Helvetica, sans-serif;
  width: 92vw;
}
  .root{
    padding: 30px;
  }
  .logo{
    display: flex;
    justify-content: center;
  }
  form{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* From Uiverse.io by AbanoubMagdy1 */ 
.wave-group {
  position: relative;
  margin:50px;
}

.wave-group .input {
  
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 200px;
  border:none;
  border-bottom: 1px solid #515151;
  background: transparent;
}

.wave-group .input:focus {
  outline: none;
}

.wave-group .label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  display: flex;
}

.wave-group .label-char {
  transition: 0.2s ease all;
  transition-delay: calc(var(--index) * .01s);
}

.wave-group .input:focus ~ label .label-char,
.wave-group .input:valid ~ label .label-char {
  transform: translateY(-20px);
  font-size: 14px;
  color: #db3c36;
}

.wave-group .bar {
  position: relative;
  display: block;
  width: 200px;
}

.wave-group .bar:before,.wave-group .bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #db3c36;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.wave-group .bar:before {
  left: 50%;
}

.wave-group .bar:after {
  right: 50%;
}

.wave-group .input:focus ~ .bar:before,
.wave-group .input:focus ~ .bar:after {
  width: 50%;
}

/* From Uiverse.io by adamgiebl */ 
.button {
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

.button:before {
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
  content: 'USUŃ';
  background-color: #db3c36;
  z-index: 1;
}

.button:hover, .button:focus {
  color: white;
}

.button:hover:before, button:focus:before {
  transition: 0.5s all ease;
  left: 0;
  right: 0;
  opacity: 1;
}

.button:active {
  transform: scale(0.9);
}

input{
  text-transform:uppercase;
}
.twoButtons{

  margin: 30px
  
}
.membersToPrint{
  display: flex;

}
</style>

<template>

  
  <div class="root"> 
    <div class="logo">
      <img src="../database/cropped-logo_wis-3.png" alt="">
    </div>
    <div class="form">
      <form @submit.prevent="submitForm">
        <div class="wave-group">
          
          <input v-model="firstName" id="firstName" required class="input"  >
          <span class="bar"></span>
          <label class="label">
            <span class="label-char" style="--index: 0">I</span>
            <span class="label-char" style="--index: 1">m</span>
            <span class="label-char" style="--index: 2">i</span>
            <span class="label-char" style="--index: 3">ę</span>
          </label>
        </div>
        <div class="wave-group">
          <input v-model="lastName" id="lastName" required class="input">
          <span class="bar"></span>
          <label class="label">
            <span class="label-char" style="--index: 0">N</span>
            <span class="label-char" style="--index: 1">a</span>
            <span class="label-char" style="--index: 2">z</span>
            <span class="label-char" style="--index: 3">w</span>
            <span class="label-char" style="--index: 4">i</span>
            <span class="label-char" style="--index: 5">s</span>
            <span class="label-char" style="--index: 6">k</span>
            <span class="label-char" style="--index: 7">o</span>
          </label>
          
        </div>
        <div class="wave-group">
          <input v-model="group" id="group" required class="input">
          <span class="bar"></span>
          <label class="label">
            <span class="label-char" style="--index: 0">G</span>
            <span class="label-char" style="--index: 1">r</span>
            <span class="label-char" style="--index: 2">u</span>
            <span class="label-char" style="--index: 3">p</span>
            <span class="label-char" style="--index: 4">a</span>
          </label>
          
        </div>
        <div class="wave-group">
          <input v-model="phoneNumber" id="phoneNumber" required class="input">
          <span class="bar"></span>
          <label class="label">
            <span class="label-char" style="--index: 0">N</span>
            <span class="label-char" style="--index: 1">r</span>
            <span class="label-char" style="--index: 2">.</span>
            <span class="label-char" style="--index: 3">t</span>
            <span class="label-char" style="--index: 4">e</span>
            <span class="label-char" style="--index: 5">l</span>
            <span class="label-char" style="--index: 6">.</span>

          </label>
          
        </div>
        <div class="wave-group">
          <label for="image">Image:</label>
          <input type="file" @change="handleFileUpload" />
        </div>
        
      </form>
      <form @submit.prevent="submitForm">
        <button type="submit" class="button twoButtons">Zapisz</button> 
         
      </form>
      <form @submit.prevent="printJson">
        <button type="submit" class="button twoButtons">Drukuj</button>
      </form>
    </div>
</div>
</template>

<script>
      import fs from 'fs';
      import path from 'path';
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      group: '',
      phoneNumber: '',
      image: '',
      errorMessage: '',
      jsonData: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log('Selected file:', file);
      
      // Sprawdź typ pliku
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'File must be an image';
        console.log('File type error:', this.errorMessage);
        return;
      }

      // Sprawdź rozmiar pliku (maks. 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = 'File size should be less than 2MB';
        console.log('File size error:', this.errorMessage);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File content:', e.target.result);
        this.image = e.target.result;
        this.errorMessage = ''; // Wyczyść poprzednie komunikaty o błędach
      };
      reader.onerror = (e) => {
        this.errorMessage = 'Failed to read file';
        console.error('File read error:', e);
      };
      reader.readAsDataURL(file);
    },
    async submitForm() {
      const newData = {
        firstName: this.firstName,
        lastName: this.lastName,
        group: this.group,
        phoneNumber: this.phoneNumber,
        image: this.image
      };
      if (this.$store) {
        await this.$store.dispatch('addData', newData);
        this.resetForm();
      } else {
        console.error('Vuex store is not available');
      }
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.group = '';
      this.phoneNumber = '';
      this.image = '';
      this.errorMessage = '';
    },
    async printJson() {
  try {
    const response = await fetch('/data.json'); // This points to the static/data.json file
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    this.jsonData = data;

    let htmlContent = `
      <style>
        @media print {
          body {
            font-size:12px;
            font-family: Arial, Helvetica, sans-serif;
            width: 100%;
            page-break-inside: auto;
          }
          .groupsContainer {
            display: flex;
            flex-wrap: wrap; /* Allow groups to wrap horizontally */
            align-items: flex-start;
            width: 100%;
            page-break-inside: auto;
            justify-content:center;
          }
          .groupToPrint {
            display: inline-block;
            page-break-inside: auto;
          }
          .membersToPrint {
            width: auto;
            page-break-inside: auto;
          }
          .memberToPrint {
            display: inline-block;
            vertical-align: top;
            width: 120px;
            height: auto;
            text-align: center;
            box-sizing: border-box;
            page-break-inside: auto;
          }
          .memberToPrint img {
          }
          h2 {
            page-break-inside: auto;
            margin-top: 0;
          }
        }
      </style>
      <div class="groupsContainer">`; // Wrapping container for groups

    for (let index = 0; index < data.length; index++) {
      htmlContent += `
        <div class="groupToPrint">
          <center>
            <h2>${data[index].group}</h2>
          </center>
          <br/>
          <center>
            <div class="membersToPrint">
              ${generateTable(data.slice(index, index + 1))}
            </div>
          </center>
        </div>`;
    }

    function generateTable(data) {
      let table = '';

      data.forEach(item => {
        item.members.forEach(member => {
          let imageData = member.image || '';
          if (imageData && !imageData.startsWith('data:image/')) {
            imageData = 'data:image/png;base64,' + imageData;
          }

          const imgTag = imageData
            ? `<img src="${imageData}" alt="Image" style="max-width:70px; max-height:80px;">`
            : '';

          table += `
            <div class="memberToPrint">
              <span>${imgTag}</span><br/>
              <span>${member.firstName || ''}</span>
              <span>${member.lastName || ''}</span>
              <span>${member.phoneNumber || ''}</span>
            </div>
          `;
        });
      });

      return table;
    }

    printJS({
      printable: htmlContent,
      type: 'raw-html',
      documentTitle: 'User Data'
    });
  } catch (error) {
    console.error('Failed to load JSON data:', error);
  }
}



    }
  }
;
</script>