<script lang="ts">
  import { onMount } from 'svelte';
  import type { Content } from '@prismicio/client';
  import Scene from './Scene.svelte'
  import gsap from 'gsap'
  import Bounded from '../../components/Bounded.svelte';

  export let slice: Content.HeroSlice;

  const first_name_letters = slice.primary.first_name?.split('') ?? ""
  const last_name_letters = slice.primary.last_name?.split('') ?? ""

  onMount(() => {
    const tl = gsap.timeline()

    tl.fromTo('.name-animation', 
    {
      x:-100,
      opacity: 0,
      rotate: -10
    }, 
    {
      x: 0,
      rotate: 0,
      opacity: 1,
      duration: 1,
      ease: 'elastic.out(1,0.3)',
      transformOrigin: 'left top',
      delay: 0.5,
      stagger: {
        each: .1,
        from: 'random'
      }
    })

    tl.fromTo('.tagline', 
    {
      y: 20,
      opacity: 0,
      scale: 1.2
    }, 
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'elastic.out(1,0.3)'
    }, "-=0.5")
  });
</script>

<style>
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="px-4 md:px-6">
  <div class="mx-auto w-full max-w-7xl">
    <div class="grid min-h-[65vh] grid-cols-1 items-center md:grid-cols-2">
      <div class="relative z-10 row-span-1 row-start-1 -my-10 aspect-[1/1.3] overflow-hidden md:col-span-1 md:col-start-2 md:mt-0">
        <Scene />
      </div>
      <div class="col-start-1 md:row-start-1">
        <h1 class="mb-2 md-8 text-[clamp(3rem,20vmin,13rem)] font-extrabold leading-none tracking-tighter text-nowrap no-select"
        aria-label={`${slice.primary.first_name}+ " " + ${slice.primary.last_name}`}>
          {#if first_name_letters.length && last_name_letters.length}
          <span class="block text-slate-300">
            {#each first_name_letters as letter}
              <span class="name-animation inline-block opacity-0">{letter}</span>
            {/each}
          </span>
          <span class="block text-slate-500 -mt-[.2em]">
            {#each last_name_letters as letter}
              <span class="name-animation inline-block opacity-0">{letter}</span>
            {/each}
          </span>
          {/if}
        </h1>
        
        <span class="tagline block bg-gradient-to-tr from-stone-500 via-stone-300 to-stone-100 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] md:text-4xl text-transparent no-select">
          {slice.primary.tag_line}
        </span>
      </div>
    </div>
  </div>
</section>
