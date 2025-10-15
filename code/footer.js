const foot = document.querySelector("#foot");
let divfott = document.createElement("div");
divfott.innerHTML = ` <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          Future Vision
        </h2>
        <p class="text-gray-300 leading-relaxed">
          In the future, we’ll develop this project into a problem-solving platform like
          <span class="text-amber-400 font-semibold">LeetCode</span>,
          powered by advanced AI and intelligent agents.
        </p>
      </div>

      <div class="md:text-right">
        <h3 class="text-xl font-semibold mb-4">Links</h3>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#" class="hover:text-amber-400 transition">Google</a></li>
          <li><a href="#" class="hover:text-amber-400 transition">Microsoft</a></li>
          <li><a href="#" class="hover:text-amber-400 transition">Facebook</a></li>
        </ul>
      </div>

    </div>


    <div class="border-t border-gray-600 my-8"></div>


    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
      <div>
        <h2 class="text-white text-lg font-semibold">About Me</h2>
        <p class="text-gray-300 text-7xl">I am Still X</p>
      </div>

      <p class="mt-4 md:mt-0">&copy; 2025 All rights reserved</p>
    </div>`;
foot.appendChild(divfott);
