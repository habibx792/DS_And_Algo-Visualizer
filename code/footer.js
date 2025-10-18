const foot = document.querySelector("#foot");
let divfott = document.createElement("div");

divfott.innerHTML = `
  <div class="w-full bg-gray-900 text-white py-16 px-6 md:px-12">

    <!-- Main Footer Grid -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

      <!-- Future Vision -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">Future Vision</h2>
        <p class="text-gray-400 leading-relaxed">
          In the future, we’ll develop this project into a problem-solving platform like
          <span class="text-amber-400 font-semibold">LeetCode</span>,
          powered by advanced AI and intelligent agents.
        </p>
      </div>

      <!-- Useful Links -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Useful Links</h3>
        <ul class="space-y-2 text-gray-400">
          <li><a href="#" class="hover:text-amber-400 transition">Google</a></li>
          <li><a href="#" class="hover:text-amber-400 transition">Microsoft</a></li>
          <li><a href="#" class="hover:text-amber-400 transition">Facebook</a></li>
        </ul>
      </div>

      <!-- FAQ -->
      <div>
        <h3 class="text-xl font-semibold mb-4">FAQ</h3>
        <ul class="space-y-2 text-gray-400">
          <li><a href="#" class="hover:text-amber-400 transition">How does this project work?</a></li>
          <li><a href="#" class="hover:text-amber-400 transition">Will AI solve problems?</a></li>
          <li><a href="#" class="hover:text-amber-400 transition">Is it free to use?</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-gray-700 my-10"></div>

    <!-- Bottom Bar -->
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
      <div class="text-center md:text-left">
        <h2 class="text-white text-lg font-semibold">About Me</h2>
        <p class="text-gray-300 text-base">
          Hi, My Name is <span class="text-amber-400 font-bold">Ghulam Habib</span>. I am a Software Engineer.
        </p>
      </div>
      <p class="mt-4 md:mt-0">&copy; 2025 All rights reserved</p>
    </div>

  </div>
`;

foot.appendChild(divfott);
