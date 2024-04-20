<script setup>
const createCert = (data) => {
    console.log(data)
  }
</script>

<template>
  <FormKit 
    type="form" 
    @submit="createCert" 
    outer-class="place-self-center"
  >
    <h2>Please insert your info to create the certificate</h2>
    <FormKit 
      type="text"
      name="username" 
      label="Username" 
      validation="required"
      help="Pick a new username" 
      prefix-icon="avatarMan"  
    />
    <FormKit 
      type="text" 
      validation="required"

    />
    <FormKit type="textarea" />
  </FormKit>
</template>