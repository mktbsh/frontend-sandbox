<script lang="ts">
  import { cryptoAESGCM } from "../shared/helper";

  const cryptor = cryptoAESGCM();

  let jwk = "";

  const handleClick = async () => {
    const key = await cryptor.exportJWK();
    jwk = JSON.stringify(key, null, 2);
  };
</script>

<div class="bg-white sm:rounded-lg">
  <div class="px-4 py-5 sm:p-6">
    <h3 class="text-lg font-medium leading-6 text-gray-900">Crypto</h3>
    <div class="mt-5">
        <button
          type="button"
          on:click={handleClick}
          class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
          >Generate Key</button
        >
      </div>
    <div class="mt-2 max-w-xl text-sm text-gray-500">
      <code class="block bg-gray-100 h-24">
        {jwk}
      </code>
    </div>
    
  </div>
</div>
