<script lang="ts">
	import Bounded from '$lib/components/Bounded.svelte';
	import type { Content } from '@prismicio/client';
  import Heading from '$lib/components/Heading.svelte';
	import { PrismicRichText } from '@prismicio/svelte';
  import { PrismicLink } from '@prismicio/svelte';

	export let slice: Content.ExperiencesSlice;
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<Heading tag="h2" size="lg">
    {slice.primary.heading}
  </Heading>
  {#each slice.primary.items as item}
    <div class="experience-item ml-6 mt-8 max-w-prose md:l-12 md:mt-16 ">
      <Heading tag="h3" size="sm">
        {item.title}
      </Heading>

      <p class="flex mt-1 w-fit items-center text-2xl gap-1 font-semibold tracking-tight text-slate-400">
        <span class="">{item.time_period}</span> {' '}
        <span class="text-3xl font-extralight">/</span> {' '}
        <PrismicLink field={item.institution_link} target="_blank" class="group relative overflow-hidden">
          <span
            class={`absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-50 ease-in-out group-hover:translate-y-7 translate-y-20`}
            ></span>
          <span class="">{item.institution}</span>
        </PrismicLink>
      </p>

      <div class="prose prose-lg prose-invert mt-4">
        <PrismicRichText field={item.description} />
      </div>
    </div>
  {/each}
</Bounded>
