<script setup>
const validateCert = (data) => {
  // $fetch(data)
    alert("This certificate is valid")
  }
</script>

<template>
  <div class="flex justify-center">
    <FormKit 
      type="form" 
      @submit="validateCert" 
      outer-class="place-self-center"
    >
      <h2>Please insert the unique access code of the certificate</h2>
      <FormKit 
        type="text"
        name="key"
        label="Access key"
        id="key"
        validation="required"
      />
      <FormKit 
      type="text"
        name="walletAddress"
        label="Wallet Address"
        id="walletAddress"
        validation="required"
      />
    </FormKit>
  </div>
</template>