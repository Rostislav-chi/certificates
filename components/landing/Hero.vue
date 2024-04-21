<template>
  <main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-8">
    <div class="p-24 md:order-1 hidden md:block">
      <img
        class="rounded-full transition-transform transform hover:scale-125"
        src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Certicon empowers confidence"
        loading="eager"
        format="avif"
        width="512"
        height="512"
      />
    </div>

    <div>
      <h1 class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">
        Empowering Confidence in Credentials
      </h1>
      <p class="text-lg mt-4 text-slate-600 max-w-xl">
        CertiCon is a blockchain-based platform designed to enhance the security, transparency, 
        and efficiency of certificate verification across multiple industries. It enables secure issuance, 
        sharing, and verification of credentials, ensuring their authenticity and integrity. 
        <wbr />Ideal for sectors like education, healthcare, construction, and more, CertiCon supports global operations 
        in both developed and developing markets, making it a versatile solution for managing verified credentials worldwide.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <LandingLink
          href="/validate"
          rel="noopener"
          >Verify your certificate</LandingLink
        >
        <LandingLink
          size="lg"
          styleName="outline"
          rel="noopener"
          href="/create"
          target="_blank"
          >Create new certificate</LandingLink
        >
      </div>
    </div>
  </main>
</template>
