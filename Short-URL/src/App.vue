<!-- <script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
 const fullUrl = ref('')
 const shortUrls = ref([]);
 
 
const createShortUrl = async() => {
    try {
      const  data  = await axios.post('/api/shorten', { fullUrl: fullUrl.value }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (data.shortUrl) {
        shortUrl = data.shortUrl;
        console.log(data);
        fullUrl.value = ''; // ล้างค่าใน input
      } else {
        console.error('ไม่สามารถสร้าง Short URL ได้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการสร้าง Short URL', error);
    }
  }

  const fetchShortUrls = async () => {
  try {
    const  data  = await axios.get('/api/short'); // เรียก API ด้วย HTTP GET
    shortUrls.value = data; // เก็บผลลัพธ์ลงใน shortUrls
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึง Short URLs', error);
  }
};

onMounted(() =>{
  fetchShortUrls()
 })
</script>
<template>
 <div id="app" class="flex flex-col items-center mt-8">
  <input v-model="fullUrl" placeholder="ป้อน URL ที่คุณต้องการสร้าง Short URL" class="border p-2 rounded-lg mb-4  w-96">
  <button @click="createShortUrl" class="bg-green-500 hover:bg-green-600 h-12 w-36  rounded-lg text-white">สร้าง Short URL</button>

   <div v-if="shortUrl" class="mt-4">
    <p class="text-lg font-semibold">Short URL: <a :href="shortUrl" target="_blank" class="text-blue-500">{{ shortUrl }}</a></p>
    <img :src="qrcodeImage" alt="QR Code" class="mt-2">
  </div>

  <h2 class="mt-8 text-xl font-semibold">ประวัติการสร้าง Short URL</h2>
  <ul class="mt-4">
    <li v-for="(item, index) in history" :key="index" class="mb-4">
      <p class="text-lg font-semibold">Short URL: <a :href="item.shortUrl" target="_blank" class="text-blue-500">{{ item.shortUrl }}</a></p>
      <img :src="item.qrcode" alt="QR Code" class="mt-2">
    </li>
  </ul> -->
 
  <template>
    <div class="container mt-5 flex justify-center items-center min-h-screen">
      <h1 class="text-center">Short URL Generator</h1>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="generateShortURL" class="mb-4">
            <div class="input-group">
              <input v-model="originalURL" class="form-control" placeholder="Enter URL" />
              <div class="input-group-append">
                <button type="submit" class="btn btn-primary">Generate Short URL</button>
              </div>
            </div>
          </form>
          <p v-if="shortURL" class="alert alert-success">
            <strong>Short URL:</strong> <a :href="shortURL" target="_blank">{{ shortURL }}</a>
          </p>
          <form @submit.prevent="fetchdata">
            <button type="submit" class="btn btn-secondary">History Short URL</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .min-h-screen {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .container {
    max-width: 600px;
  }
  
  .col-md-6 {
    background-color: #257beb;
    padding: 20px;
    border-radius: 10px;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .btn-primary {
    width: 100%;
  }
  
  .alert-success {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
  
  .alert-success a {
    text-decoration: none;
  }
  </style>
  
  <script>

  export default {
    el: '#app',
    data() {
      return {
        originalURL: "",
        shortURL: "",
      };
    },
    methods: {
      async generateShortURL() {
        // Call the backend API to generate a short URL
        const response = await fetch("http://localhost:3000/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalURL: this.originalURL }),
        });
        const data = await response.json();
        this.shortURL = data.shortURL;
      },
      
    
    async fetchdata(){
  try {
    const response = await fetch('http://localhost:3000/api/short'); // เปลี่ยน '/api/data' เป็น URL ของ API ของคุณ
    
    if (!response.ok) {
      throw new Error('ไม่สามารถเรียกข้อมูลได้');
    }

    const data = await response.json();
    console.log('ข้อมูลที่ได้:', data);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
  }
}
    
}
  }
  </script>
  

