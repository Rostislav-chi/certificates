<script setup>
const createCert = (data) => {
  console.log(data)
  alert("Congratulations! Your certificate is created!")
  }
</script>

<template>
  <div class="flex justify-center">
    <FormKit 
      type="form" 
      @submit="createCert" 
      outer-class="place-self-center"
    >
      <h2>Please insert your info to create the certificate</h2>
      <FormKit 
        type="text"
        name="company"
        label="Company name"
        id="company"
        validation="required"
        prefix-icon="avatarMan"
      />
      <FormKit 
        type="text" 
        name="issuer-name"
        label="Issuer name"
        id="issuer-name"
        validation="required"
        prefix-icon="avatarMan"
      />
      <FormKit 
        type="text" 
        name="receiver-name"
        label="Receiver name"
        id="receiver-name"
        validation="required"
        prefix-icon="avatarMan"
      />
      <FormKit 
        type="number" 
        name="receiver-id"
        label="Receiver ID"
        id="receiver-id"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="receiver-wallet-address"
        label="Receiver wallet address"
        id="receiver-wallet-address"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="cert-number"
        label="Certificate number"
        id="cert-number"
        validation="required"
      />
      <FormKit 
        type="date" 
        name="issue-date"
        label="Date of issue"
        id="issue-date"
        validation="required"
      />
      <FormKit 
        type="date" 
        name="expiry-date"
        label="Date of expiry"
        id="expiry-date"
        validation="required"
      />
      <FormKit 
        type="text" 
        name="category"
        label="Category"
        id="category"
        validation="required"
      />
      <FormKit 
        type="text" 
        name="testing-standard"
        label="Testing standard"
        id="testing-standard"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="welding-processes"
        label="Welding processes"
        id="welding-processes"
        validation="required"
      />
      <FormKit 
        type="text" 
        name="weld-type"
        label="Weld type"
        id="weld-type"
        validation="required"
      />
      <FormKit 
        type="text" 
        name="filler-metal-group"
        label="Filler metal group"
        id="filler-metal-group"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="Material-thickness-min"
        label="Material minimum thickness"
        id="Material-thickness-min"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="Material-thickness-max"
        label="Material maximum thickness"
        id="Material-thickness-max"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="Outside-diameter-min"
        label="Minimum outside diameter"
        id="Outside-diameter-min"
        validation="required"
      />
      <FormKit 
        type="number" 
        name="Outside-diameter-max"
        label="Maximum outside diameter"
        id="Outside-diameter-max"
        validation="required"
      />
      <FormKit 
        type="textarea" 
        name="other-data"
        label="Other data"
        id="other-data"
        help="Insert other data"
      />
    </FormKit>
  </div>
</template>