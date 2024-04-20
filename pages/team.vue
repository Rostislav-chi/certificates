<script setup>
definePageMeta({
  layout: "landing",
});

const TeamImg1 = "https://media.licdn.com/dms/image/C4D03AQFlYAw5ZxTs4g/profile-displayphoto-shrink_800_800/0/1636014444599?e=1718841600&v=beta&t=p_LtqDny_D6f2U4RSpI46xL8VpvgL4sVcePL6jinN58";
const TeamImg2 = "https://media.licdn.com/dms/image/C4E03AQEez8OsmjcEqw/profile-displayphoto-shrink_800_800/0/1641893943433?e=1718841600&v=beta&t=ghrJIQB3LQLqMqnytrKhcE6LYW8FeafPQz74NYemOPU";
const TeamImg3 = "/img/Klim.jpeg";
const TeamImg4 = "/img/Artem.png";
const TeamImg5 = "https://media.licdn.com/dms/image/D4D03AQHNvRiwY0UA3Q/profile-displayphoto-shrink_800_800/0/1670750471286?e=1718841600&v=beta&t=DZdO8vMU3CJ7m36sFKkeISZTol5B0fEnub2eaR7RzuM";

const team = [
  {
    name: "Rostislav",
    title: "Front-end developer",
    avatar: {
      src: TeamImg1,
      width: 580,
      height: 580,
    },
  },
  {
    name: "Mike",
    title: "Back-end developer",
    avatar: {
      src: TeamImg2,
      width: 580,
      height: 580,
    },
  },
  {
    name: "Klim",
    title: "Back-end developer",
    avatar: {
      src: TeamImg3,
      width: 580,
      height: 580,
    },
  },
  {
    name: "Artem",
    title: "Marketing",
    avatar: {
      src: TeamImg4,
      width: 580,
      height: 580,
    },
  },
  {
    name: "Diyar",
    title: "UX/UI designer",
    avatar: {
      src: TeamImg5,
      width: 580,
      height: 580,
    },
  },
];
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>About</template>
      <template v-slot:desc>We are a small passionate team.</template>
    </LandingSectionhead>

    <div class="flex flex-col gap-3 mx-auto max-w-4xl mt-16">
      <h2 class="font-bold text-3xl text-gray-800">
        Empowering the world with Nuxt.
      </h2>
      <p class="text-lg leading-relaxed text-slate-500">
        We're a multi-cultural team from around the world! We come from diverse
        backgrounds, bringing different personalities, experiences and skills to
        the job. This is what makes our team so special.
      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12">
      <div v-for="item of team" class="group">
        <div class="w-full aspect-square">
          <img
            :src="item.avatar.src"
            :width="item.avatar.width"
            :height="item.avatar.height"
            format="avif"
            alt="Team"
            class="w-full h-full object-cover rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
          />
        </div>

        <div class="mt-4 text-center">
          <h2 class="text-lg text-gray-800">{{ item.name }}</h2>
          <h3 class="text-sm text-slate-500">{{ item.title }}</h3>
        </div>
      </div>
      <!-- {
        team.map((item) => (
          <div class="group">
            <div class="w-full aspect-square">
              <Image
                {...item.avatar}
                format="avif"
                alt="Team"
                class="w-full h-full object-cover rounded transition  group-hover:-translate-y-1 group-hover:shadow-xl"
              />
            </div>

            <div class="mt-4 text-center">
              <h2 class="text-lg text-gray-800"> {item.name}</h2>
              <h3 class="text-sm text-slate-500"> {item.title}</h3>
            </div>
          </div>
        ))
      } -->
    </div>
  </LandingContainer>
</template>
