const foot = document.querySelector("#foot");

foot.innerHTML = `
  <div class="w-full bg-gradient-to-b from-navySoft via-navy to-black text-gray-300 py-16 px-6 mt-20 border-t border-white/10 backdrop-blur-md bg-glassWhite/10">

    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">

      <!-- Future Vision -->
      <div>
        <h2 class="text-2xl font-semibold text-goldAccent mb-4">Future Vision</h2>
        <p class="text-gray-400 leading-relaxed">
          In the future, we’ll develop this project into a problem-solving platform like
          <span class="text-goldAccent font-semibold">LeetCode</span>,
          powered by advanced AI and intelligent agents.
        </p>
      </div>

      <!-- Useful Links -->
      <div>
        <h3 class="text-xl font-semibold text-goldAccent mb-4">Useful Links</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-goldAccent transition">Google</a></li>
          <li><a href="#" class="hover:text-goldAccent transition">Microsoft</a></li>
          <li><a href="#" class="hover:text-goldAccent transition">Facebook</a></li>
        </ul>
      </div>

      <!-- FAQ -->
      <div>
        <h3 class="text-xl font-semibold text-goldAccent mb-4">FAQ</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-goldAccent transition">How does this project work?</a></li>
          <li><a href="#" class="hover:text-goldAccent transition">Will AI solve problems?</a></li>
          <li><a href="#" class="hover:text-goldAccent transition">Is it free to use?</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-gray-700 my-10"></div>

    <!-- Centered About Me -->
    <div class="text-center text-gray-400 text-sm space-y-2">
      <h2 class="text-white text-lg font-semibold">About Me</h2>
      <p class="text-gray-300 text-base">
        Hi, My Name is <span class="text-goldAccent font-bold">Ghulam Habib</span>. I am a Software Engineer.
      </p>
      <p class="text-gray-500">&copy; 2025 All rights reserved</p>
    </div>

  </div>
`;
