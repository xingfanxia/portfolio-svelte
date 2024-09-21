<script lang="ts">
  import { PrismicImage } from '@prismicio/svelte';
  import type { ImageField } from '@prismicio/client';
  import clsx from 'clsx';
  import gsap from 'gsap';
  import { onMount, onDestroy } from 'svelte';

  export let image: ImageField;
  let className: string = '';
  export { className as class };
  let component: HTMLElement;

  function handleMouseMove(e: MouseEvent) {
    if (!component) return;
    const componentRect = component.getBoundingClientRect();
    const componentCenterX = componentRect.left + componentRect.width / 2;

    let componentPercent = {
      x: (e.clientX - componentCenterX) / componentRect.width / 2
    }

    let distFromCenterX = 1 - Math.abs(componentPercent.x);

    gsap
				.timeline({
					defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' }
				})
				.to(
					'.avatar',
					{
						rotation: gsap.utils.clamp(-2, 2, 10 * componentPercent.x)
					},
					0
				)
				.to(
					'.highlight',
					{
						opacity: distFromCenterX - 0.5,
						x: -10 + 20 * componentPercent.x
					},
					0
				);
		};

  onMount(() => {
    gsap.fromTo('.avatar', {
      opacity: 0,
      scale: 1.4
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.3,
      ease: 'power3.inOut'
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  });
</script>

<div class={clsx('relative h-full w-full', className)} bind:this={component}>
  <div class="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700">
    <PrismicImage 
      field={image} 
      class="avatar-image h-full w-full object-fill" 
      imgixParams={{ q: 90}}/>
      <div class="highlight absolute inset-0 w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0"></div>
  </div>
</div>

<style>
  .avatar {
    perspective: 500px;
    perspective-origin: 150%;
  }
</style>