<script lang="ts">
  import { type Content, isFilled } from '@prismicio/client';
  import NavbarLink from './NavbarLink.svelte';
  import Button from './Button.svelte';
  import IconMenu from '~icons/ic/baseline-menu';
  import IconClose from '~icons/ic/baseline-cancel';
  import IconArrowOut from '~icons/ic/outline-arrow-outward'

  export let settings: Content.SettingsDocument;

  let open = false;

  function onLinkClick() {
    open = false;
  }
</script>

<header class="top-0 mx-auto z-50 max-w-7xl md:sticky md:top-4 relative">
  <nav>
    <div class="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m4 md:flex-row md:items-center md:roounded-xl">
      <div class="flex items-center justify-between">
        <a href="/" aria-label="Homepage"
        class="text-xl font-extrabold tracking-tighter text-slate-900">
        {settings.data.name}
      </a>
      <button class="block p-2 text-2xl text-slate-800 md:hidden" aria-expanded={open} aria-label="Open Menu" on:click={() => (open=true)}>
        <IconMenu />
      </button>
      </div>
      <!-- Mobile Nav-->
       <ul class={`fixed inset-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : 'translate-x-[100%]'}`}>
        <li>
          <button class="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden" aria-expanded={open} aria-label="Close Menu" on:click={() => (open=false)}>
            <IconClose />
          </button>
        </li>
        {#each settings.data.nav_item as nav_item}
          <li class="first:mt-8">
            <NavbarLink field={nav_item.link} label={nav_item.label} onLinkClick={onLinkClick} type="mobile" />
          </li>
        {/each}
        {#if isFilled.link(settings.data.cta_link)}
          <Button linkField={settings.data.cta_link} label={settings.data.cta_label} showIcon={true} Icon={IconArrowOut}/>
        {/if}
      </ul>
      <!-- Desktop Nav-->
      <ul class="hidden relative md:flex z-50 flex-row items-center gap-1 bg-transparent py-0">
        {#each settings.data.nav_item as nav_item}
          <li>
            <NavbarLink field={nav_item.link} label={nav_item.label} onLinkClick={onLinkClick} type="desktop" />
          </li>
        {/each}
        {#if isFilled.link(settings.data.cta_link)}
            <Button linkField={settings.data.cta_link} label={settings.data.cta_label} class="ml-3" showIcon={true} Icon={IconArrowOut}/>
        {/if}
      </ul>

    </div>
  </nav>
</header>